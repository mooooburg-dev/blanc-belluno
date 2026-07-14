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
  - `page.tsx` — 홈페이지 (헤더, 서비스, 진행방식, 갤러리, 인스타 피드, 문의폼). `revalidate = 300`으로 ISR 적용
  - `layout.tsx` — 루트 레이아웃 (Cormorant Garamond / Noto Sans KR / Noto Serif KR / Playfair Display 4종 폰트)
  - `globals.css` — 전역 스타일 + Tailwind `@theme` 토큰 (파스텔 팔레트, 글래스모피즘, Instagram 스토리 링, 라이트박스 페이지네이션 등)
  - `components/` — UI 컴포넌트 (Header, Hero, Services, Process, Gallery, CategoryPortfolioGrid, ContactForm, DatePicker, Footer, FloatingContact, InstagramFeed, InstagramFeedSkeleton, InstagramPostImage, JsonLd, PortfolioLightbox, StoryViewer)
  - `admin/` — 관리자 대시보드 (`page.tsx`, `SortableItem.tsx`, `layout.tsx`) — 포트폴리오/히어로 슬라이드/사이트 설정 관리
  - `portfolio/` — 전체 포트폴리오 페이지
  - `services/[slug]/` — 카테고리별 서비스 상세 페이지 (정적 생성)
  - `robots.ts`, `sitemap.ts` — SEO 메타데이터
  - `api/` — REST API 라우트
    - `portfolio/` — 포트폴리오 CRUD + 순서 변경
    - `hero-slides/` — 히어로 슬라이드 CRUD + 순서 변경
    - `settings/` — 사이트 설정 조회/수정
    - `inquiry/` — 상담 문의 접수 (Supabase 저장 + 카카오 알림톡 발송)
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

현재 8개 (목록 순서가 곧 노출 순서):
`DOL` / `SENIOR` / `CORPORATE` / `PARTY` / `SCHOOL` / `WEDDING` / `ARCH` / `NUMBER TOWER`

`ARCH`(아치/반아치)와 `NUMBER TOWER`(숫자 타워)는 서비스 페이지 목록 맨 뒤에 배치되어 있습니다.

DB의 `belluno_portfolio.category`는 `TEXT NOT NULL`로 CHECK 제약이 없으므로 코드 상수만 바꾸면 DB 스키마 변경 없이 신규 값 저장이 가능합니다.

## 코드 스타일

- 경로 별칭: `@/*` → 프로젝트 루트 (예: `@/lib/supabase`)
- 컴포넌트: `app/components/`에 단일 파일로 관리
- API 라우트: `route.ts`에서 GET/POST/PATCH/DELETE/PUT 핸들러 export
- 색상: stone 팔레트 기반 (관리자), 커스텀 파스텔 팔레트 (프론트, `bg-blanc-*` 토큰)
- Tailwind CSS 4: `bg-gradient-to-*` 대신 `bg-linear-to-*` 사용
- 따옴표: JSX/TS 모두 작은따옴표(`'`) 사용 — 일부 기존 파일은 큰따옴표지만 신규/수정 시 작은따옴표 권장 (e.g. `CategoryPortfolioGrid.tsx`)
- 디스플레이 폰트: `.font-display`(라틴=Cormorant Garamond, 한글=Noto Serif KR 폴백) / `.font-logo`(Playfair Display)

## 작업 시 주의사항

- `app/admin/page.tsx`, `app/admin/SortableItem.tsx`는 `lib/portfolio`의 `CATEGORIES`/`Category`를 import해서 사용 — 별도 정의 금지 (중복 시 타입 불일치 발생)
- 서비스 페이지 슬러그(`/services/[slug]`)는 `serviceCategories[].slug`를 기준으로 정적 생성됨
- 홈페이지(`app/page.tsx`)는 `revalidate = 300` ISR 적용 — 5분 단위로 재생성. 인스타그램 피드는 `<Suspense>`로 분리되어 초기 LCP 영향 없음
- 환경변수는 `.env.local`에 정의. 카카오 채널 ID는 `NEXT_PUBLIC_KAKAO_CHANNEL_ID`로 브라우저에 노출됨
- Solapi 알림톡은 `SOLAPI_*` 환경변수가 모두 설정된 경우에만 발송되며, 누락 시 콘솔 로그 후 스킵 (문의 접수 자체는 정상 처리)
- Supabase Storage 버킷명: `belluno-uploads` (이미지), 테이블 접두어: `belluno_*` (`belluno_portfolio`, `belluno_hero_slides`, `belluno_settings`, `belluno_inquiries`)
