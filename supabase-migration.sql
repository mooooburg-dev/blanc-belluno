-- ============================================
-- Blanc Belluno - Supabase 테이블 마이그레이션
-- ============================================

-- 1. belluno_portfolio 테이블
CREATE TABLE belluno_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'PARTY',
  title TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_belluno_portfolio_sort_order ON belluno_portfolio (sort_order);
CREATE INDEX idx_belluno_portfolio_category ON belluno_portfolio (category);

-- 2. belluno_settings 테이블 (key-value)
CREATE TABLE belluno_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 기본 설정값 삽입
INSERT INTO belluno_settings (key, value) VALUES
  ('instagram', 'blancbelluno'),
  ('kakaoChannel', '@blancbelluno'),
  ('naverBlog', ''),
  ('phone', ''),
  ('email', ''),
  ('businessHours', 'Mon - Fri / 10:00 - 18:00'),
  ('brandDescription', '당신의 특별한 날을 더욱 빛나게.\n섬세한 감각으로 빚어내는 프리미엄 파티 스타일링.');

-- 3. Supabase Storage 버킷 (SQL Editor에서 실행 불가, 대시보드에서 생성 필요)
-- 버킷명: belluno-uploads
-- Public 버킷으로 생성

-- 4. RLS 정책 (Service Role Key 사용 시 bypass 됨, anon key 사용 시 필요)
ALTER TABLE belluno_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE belluno_settings ENABLE ROW LEVEL SECURITY;

-- 읽기는 모두 허용
CREATE POLICY "Allow public read on belluno_portfolio"
  ON belluno_portfolio FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on belluno_settings"
  ON belluno_settings FOR SELECT
  USING (true);

-- 쓰기는 service role만 (기본적으로 RLS bypass)
CREATE POLICY "Allow service write on belluno_portfolio"
  ON belluno_portfolio FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service write on belluno_settings"
  ON belluno_settings FOR ALL
  USING (auth.role() = 'service_role');
