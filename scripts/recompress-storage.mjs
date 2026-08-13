// 기존 스토리지 이미지 일괄 재압축 스크립트
//
// belluno_portfolio / belluno_hero_slides의 각 행이 참조하는 원본 이미지를
// 다운로드 → sharp로 리사이즈·WebP 압축 → 재업로드하고, DB의 filename을 갱신한다.
// (업로드 라우트의 processUploadImage와 동일한 정책: GIF는 원본 유지)
//
// 사용법:
//   node --env-file=.env.local scripts/recompress-storage.mjs            # 실제 실행
//   node --env-file=.env.local scripts/recompress-storage.mjs --dry-run  # 미리보기(변경 안 함)
//
// 필요 환경변수: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// 안전: 새 WebP가 원본보다 작을 때만(또는 확장자가 바뀔 때만) 교체한다.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'belluno-uploads';
const DRY_RUN = process.argv.includes('--dry-run');

const TABLES = [
  { name: 'belluno_portfolio', maxDimension: 2000 },
  { name: 'belluno_hero_slides', maxDimension: 2560 },
];

// --env-file 미사용 환경을 위한 .env.local 폴백 로더
function loadEnvFallback() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    const text = readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local 없으면 무시
  }
}

loadEnvFallback();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 필요합니다.');
  console.error('   node --env-file=.env.local scripts/recompress-storage.mjs 형태로 실행하세요.');
  process.exit(1);
}

const supabase = createClient(url, key);

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function processRow(table, row) {
  const filename = row.filename;
  if (!filename) return { status: 'skip', reason: 'no-filename' };

  // GIF는 애니메이션 보존을 위해 건드리지 않음
  if (filename.toLowerCase().endsWith('.gif')) {
    return { status: 'skip', reason: 'gif', filename };
  }

  // 원본 다운로드
  const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(filename);
  if (dlErr || !blob) {
    return { status: 'error', reason: `download 실패: ${dlErr?.message ?? 'no data'}`, filename };
  }
  const original = Buffer.from(await blob.arrayBuffer());

  // sharp 재압축
  let compressed;
  try {
    compressed = await sharp(original)
      .rotate()
      .resize(table.maxDimension, table.maxDimension, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch (e) {
    return { status: 'error', reason: `sharp 실패: ${e.message}`, filename };
  }

  const base = filename.replace(/\.[^./]+$/, '');
  const newFilename = `${base}.webp`;
  const extChanged = newFilename !== filename;
  const smaller = compressed.length < original.length;

  // 확장자가 바뀌거나(=jpg/png→webp) 용량이 줄어들 때만 교체
  if (!extChanged && !smaller) {
    return { status: 'skip', reason: '이미 최적화됨', filename, before: original.length, after: compressed.length };
  }

  if (DRY_RUN) {
    return { status: 'would-update', filename, newFilename, before: original.length, after: compressed.length };
  }

  // 새 파일 업로드 (같은 이름이면 덮어쓰기)
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(newFilename, compressed, { contentType: 'image/webp', upsert: true });
  if (upErr) {
    return { status: 'error', reason: `upload 실패: ${upErr.message}`, filename };
  }

  // DB filename 갱신
  if (extChanged) {
    const { error: updErr } = await supabase.from(table.name).update({ filename: newFilename }).eq('id', row.id);
    if (updErr) {
      return { status: 'error', reason: `DB 갱신 실패: ${updErr.message}`, filename };
    }
    // 확장자가 바뀐 경우에만 이전 원본 파일 삭제
    await supabase.storage.from(BUCKET).remove([filename]);
  }

  return { status: 'updated', filename, newFilename, before: original.length, after: compressed.length };
}

async function run() {
  console.log(`\n🖼  스토리지 이미지 재압축 ${DRY_RUN ? '(DRY-RUN — 변경 없음)' : ''}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const counts = { updated: 0, wouldUpdate: 0, skip: 0, error: 0 };

  for (const table of TABLES) {
    const { data: rows, error } = await supabase.from(table.name).select('id, filename');
    if (error) {
      console.error(`❌ ${table.name} 조회 실패: ${error.message}`);
      continue;
    }
    console.log(`\n■ ${table.name} — ${rows.length}개`);

    for (const row of rows) {
      const r = await processRow(table, row);
      switch (r.status) {
        case 'updated':
          counts.updated++;
          totalBefore += r.before;
          totalAfter += r.after;
          console.log(`  ✅ ${r.filename} → ${r.newFilename}  ${fmtKB(r.before)} → ${fmtKB(r.after)}`);
          break;
        case 'would-update':
          counts.wouldUpdate++;
          totalBefore += r.before;
          totalAfter += r.after;
          console.log(`  ➜ ${r.filename} → ${r.newFilename}  ${fmtKB(r.before)} → ${fmtKB(r.after)}`);
          break;
        case 'skip':
          counts.skip++;
          console.log(`  ⏭  ${r.filename ?? '(no filename)'} — ${r.reason}`);
          break;
        case 'error':
          counts.error++;
          console.log(`  ❌ ${r.filename ?? ''} — ${r.reason}`);
          break;
      }
    }
  }

  const changed = DRY_RUN ? counts.wouldUpdate : counts.updated;
  console.log('\n──────── 요약 ────────');
  console.log(`대상 ${DRY_RUN ? '예정' : '완료'}: ${changed}  |  건너뜀: ${counts.skip}  |  오류: ${counts.error}`);
  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((saved / totalBefore) * 100).toFixed(1);
    console.log(`용량: ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)}  (−${fmtKB(saved)}, ${pct}% 절감)`);
  }
  console.log('');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
