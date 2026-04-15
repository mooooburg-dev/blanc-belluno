-- ============================================
-- Blanc Belluno - 상담 문의 테이블 마이그레이션
-- ============================================

-- belluno_inquiries 테이블
CREATE TABLE belluno_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_type TEXT NOT NULL,
  event_date TEXT NOT NULL,
  location TEXT,
  budget TEXT,
  message TEXT,
  kakao_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 최신 문의부터 조회하기 위한 인덱스
CREATE INDEX idx_belluno_inquiries_created_at ON belluno_inquiries (created_at DESC);

-- RLS 활성화 (Service Role Key bypass, anon은 차단)
ALTER TABLE belluno_inquiries ENABLE ROW LEVEL SECURITY;

-- 쓰기는 service role만 허용
CREATE POLICY "Allow service write on belluno_inquiries"
  ON belluno_inquiries FOR ALL
  USING (auth.role() = 'service_role');
