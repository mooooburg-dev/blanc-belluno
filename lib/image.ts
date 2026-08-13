import sharp from 'sharp';

export interface ProcessedImage {
  /** 업로드할 이미지 바이트 */
  buffer: Buffer;
  /** 파일 확장자 (예: 'webp', 'gif') */
  ext: string;
  /** Storage contentType */
  contentType: string;
}

interface ProcessOptions {
  /** 가로/세로 최대 픽셀 (넘으면 비율 유지 축소, 확대는 안 함) */
  maxDimension?: number;
  /** WebP 품질 (1~100) */
  quality?: number;
}

/**
 * 업로드 이미지를 sharp로 리사이즈·압축한다.
 * - EXIF 방향 자동 보정 후 회전 정보 제거
 * - maxDimension 초과분만 축소 (원본이 작으면 그대로)
 * - WebP로 변환해 용량 최소화
 * - 애니메이션 GIF는 프레임 손실을 막기 위해 원본 그대로 반환
 */
export async function processUploadImage(
  file: File,
  { maxDimension = 2000, quality = 80 }: ProcessOptions = {}
): Promise<ProcessedImage> {
  const input = Buffer.from(await file.arrayBuffer());

  // GIF는 애니메이션 보존을 위해 변환하지 않음
  if (file.type === 'image/gif') {
    return { buffer: input, ext: 'gif', contentType: 'image/gif' };
  }

  const buffer = await sharp(input)
    .rotate() // EXIF 방향 반영
    .resize(maxDimension, maxDimension, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();

  return { buffer, ext: 'webp', contentType: 'image/webp' };
}
