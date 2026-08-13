// 스토리지 이미지 + DB 행 백업 스크립트 (재압축 실행 전 안전장치)
//
// belluno_portfolio / belluno_hero_slides의 전체 행을 JSON으로 저장하고,
// 각 행이 참조하는 스토리지 원본 파일을 로컬로 다운로드한다.
// 재압축(recompress) 실행 후 문제가 생기면 이 백업으로 복원할 수 있다.
//
// 사용법:
//   node --env-file=.env.local scripts/backup-storage.mjs
//
// 결과: storage-backup/<타임스탬프>/
//   ├─ manifest.json           (테이블별 전체 행)
//   └─ files/<filename>...      (원본 이미지)

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'belluno-uploads';
const TABLES = ['belluno_portfolio', 'belluno_hero_slides'];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 필요합니다.');
  process.exit(1);
}
const supabase = createClient(url, key);

// 타임스탬프 (YYYYMMDD-HHmmss)
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

const outDir = path.resolve(process.cwd(), 'storage-backup', stamp);
const filesDir = path.join(outDir, 'files');
mkdirSync(filesDir, { recursive: true });

const fmtMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

async function run() {
  console.log(`\n💾 백업 시작 → storage-backup/${stamp}\n`);

  const manifest = {};
  let downloaded = 0;
  let failed = 0;
  let totalBytes = 0;

  for (const table of TABLES) {
    const { data: rows, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`❌ ${table} 조회 실패: ${error.message}`);
      process.exit(1);
    }
    manifest[table] = rows;
    console.log(`■ ${table} — ${rows.length}개`);

    for (const row of rows) {
      const filename = row.filename;
      if (!filename) continue;
      const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(filename);
      if (dlErr || !blob) {
        failed++;
        console.log(`  ❌ ${filename} — ${dlErr?.message ?? 'no data'}`);
        continue;
      }
      const buf = Buffer.from(await blob.arrayBuffer());
      writeFileSync(path.join(filesDir, filename), buf);
      downloaded++;
      totalBytes += buf.length;
      if (downloaded % 50 === 0) console.log(`  ... ${downloaded}개 다운로드`);
    }
  }

  writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('\n──────── 백업 완료 ────────');
  console.log(`파일: ${downloaded}개 (${fmtMB(totalBytes)})  |  실패: ${failed}`);
  console.log(`위치: storage-backup/${stamp}/`);
  console.log(`manifest.json 에 DB 행 전체 저장됨\n`);

  if (failed > 0) {
    console.error('⚠️  일부 파일 다운로드 실패 — 재압축 실행 전 확인하세요.');
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
