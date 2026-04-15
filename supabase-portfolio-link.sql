-- ============================================
-- Blanc Belluno - 포트폴리오 링크 주소 컬럼 추가
-- ============================================

-- 포트폴리오 아이템 클릭 시 이동할 외부 링크(예: 블로그 포스팅)
ALTER TABLE belluno_portfolio
  ADD COLUMN IF NOT EXISTS link_url TEXT;
