# CLAUDE.md

Blanc Belluno — 프리미엄 이벤트 스타일링 포트폴리오 웹사이트

## 개발 명령어

```bash
yarn dev         # 개발 서버 (http://localhost:4020)
yarn build       # 프로덕션 빌드
yarn start       # 프로덕션 서버
yarn lint        # ESLint 검사
```

## 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack)
- **언어**: TypeScript (strict 모드)
- **스타일링**: Tailwind CSS 4 (별도 config 없이 `globals.css`의 `@theme` 디렉티브 사용)
- **React**: React 19
- **DB/스토리지**: Supabase (PostgreSQL + Storage)
- **드래그앤드롭**: @dnd-kit (관리자 정렬)
- **캐러셀**: swiper (히어로 슬라이드, 라이트박스)
- **외부 API**: Instagram Graph API, 카카오 알림톡 (Solapi SDK)

## 프로젝트 구조

- `app/` — Next.js App Router 페이지 및 레이아웃
  - `page.tsx` — 홈페이지 (히어로, 서비스, 갤러리, 진행방식, 문의폼, 인스타 피드)
  - `layout.tsx` — 루트 레이아웃 (Cormorant Garamond / Noto Sans KR / Playfair Display 폰트)
  - `globals.css` — 전역 스타일 + Tailwind 테마 변수 (파스텔 팔레트)
  - `components/` — UI 컴포넌트 (Header, Hero, Services, Gallery, Process, ContactForm, Footer, FloatingContact, PortfolioLightbox 등)
  - `admin/` — 관리자 대시보드 (포트폴리오, 히어로 슬라이드, 사이트 설정)
  - `portfolio/` — 전체 포트폴리오 페이지
  - `services/[slug]/` — 카테고리별 서비스 상세 페이지
  - `robots.ts`, `sitemap.ts` — SEO 메타데이터
  - `api/` — REST API 라우트
    - `portfolio/` — 포트폴리오 CRUD + 순서 변경
    - `hero-slides/` — 히어로 슬라이드 CRUD + 순서 변경
    - `settings/` — 사이트 설정 조회/수정
    - `inquiry/` — 상담 문의 접수
    - `instagram/` — 인스타그램 피드 및 스토리 프록시
- `lib/` — 비즈니스 로직 및 유틸리티
  - `supabase.ts` — Supabase 클라이언트 초기화 + 스토리지 URL 헬퍼
  - `portfolio.ts` — 포트폴리오 CRUD + 카테고리 정의 (`CATEGORIES`, `Category`)
  - `service-categories.ts` — 서비스 카테고리 메타데이터 (title/subtitle/description/highlights/color 등)
  - `hero-slides.ts` — 히어로 슬라이드 CRUD
  - `settings.ts` — 사이트 설정 관리
  - `instagram.ts` — Instagram Graph API 연동
  - `kakao-alimtalk.ts` — Solapi 기반 카카오 알림톡 발송 (고객/관리자 양쪽)
  - `seo.ts` — SEO 메타데이터 헬퍼
- `data/` — JSON 폴백 데이터 (settings.json, portfolio.json)
- `public/` — 정적 파일
- `supabase-*.sql` — Supabase 초기 스키마 (portfolio, settings, hero-slides, inquiries, portfolio-link)

## 서비스 카테고리

`lib/portfolio.ts`의 `CATEGORIES`와 `lib/service-categories.ts`가 단일 진실 공급원(SSOT)입니다. 신규 카테고리 추가/변경 시 두 파일을 함께 업데이트해야 합니다.

현재 8개:
`ARCH` / `NUMBER TOWER` / `DOL` / `SENIOR` / `CORPORATE` / `PARTY` / `SCHOOL` / `WEDDING`

DB의 `belluno_portfolio.category`는 `TEXT NOT NULL`로 CHECK 제약이 없으므로 코드 상수만 바꾸면 DB 스키마 변경 없이 신규 값 저장이 가능합니다.

## 코드 스타일

- 경로 별칭: `@/*` → 프로젝트 루트 (예: `@/lib/supabase`)
- 컴포넌트: `app/components/`에 단일 파일로 관리
- API 라우트: `route.ts`에서 GET/POST/PATCH/DELETE/PUT 핸들러 export
- 색상: stone 팔레트 기반 (관리자), 커스텀 파스텔 팔레트 (프론트, `bg-blanc-*` 토큰)
- Tailwind CSS 4: `bg-gradient-to-*` 대신 `bg-linear-to-*` 사용

## 작업 시 주의사항

- `app/admin/page.tsx`, `app/admin/SortableItem.tsx`는 `lib/portfolio`의 `CATEGORIES`/`Category`를 import해서 사용 — 별도 정의 금지 (중복 시 타입 불일치 발생)
- 서비스 페이지 슬러그(`/services/[slug]`)는 `serviceCategories[].slug`를 기준으로 정적 생성됨
- 환경변수는 `.env.local`에 정의. 카카오 채널 ID는 `NEXT_PUBLIC_KAKAO_CHANNEL_ID`로 브라우저에 노출됨
