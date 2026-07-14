# Blanc Belluno 2026

프리미엄 이벤트 스타일링 포트폴리오 웹사이트

## 기술 스택

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript (strict)**
- **Tailwind CSS 4** — `@theme` 디렉티브 기반 커스텀 파스텔 팔레트, 글래스모피즘 효과
- **폰트** — Cormorant Garamond / Noto Sans KR / Noto Serif KR / Playfair Display (`next/font/google`)
- **Supabase** — PostgreSQL 데이터베이스 + 이미지 스토리지 (`belluno-uploads`)
- **@dnd-kit** — 관리자 드래그앤드롭 정렬
- **swiper** — 히어로 슬라이드 및 포트폴리오 라이트박스
- **Solapi** — 카카오 알림톡 발송 (상담 접수 시 고객/관리자 알림)
- **ISR** — 홈페이지 `revalidate = 300` (5분 단위 재생성), 인스타그램 피드는 `<Suspense>`로 스트리밍

## 시작하기

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

[http://localhost:4020](http://localhost:4020)에서 확인할 수 있습니다.

## 환경 변수

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Instagram Graph API
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=

# 카카오 비즈니스 채널 (상담 채팅 링크용)
NEXT_PUBLIC_KAKAO_CHANNEL_ID=    # 예: _Hxmdyxj (pf.kakao.com/{ID}/chat)

# 카카오 알림톡 (Solapi, 선택)
SOLAPI_API_KEY=
SOLAPI_API_SECRET=
SOLAPI_PFID=                    # 카카오 비즈니스 채널 ID
SOLAPI_SENDER_PHONE=            # 발신 전화번호 (Solapi에 등록된 번호)
SOLAPI_TEMPLATE_ID_CUSTOMER=    # 고객 접수 확인 템플릿 ID
SOLAPI_TEMPLATE_ID_ADMIN=       # 관리자 신규 상담 알림 템플릿 ID
ADMIN_PHONE=                    # 관리자 수신 번호
```

## 주요 기능

- **홈페이지** — 헤더(히어로 슬라이더), 서비스 소개, 진행방식, 갤러리, 인스타그램 피드(스트리밍), 상담 문의폼
- **서비스 상세** (`/services/[slug]`) — 카테고리별 소개·하이라이트·작업 사례 (정적 생성)
- **포트폴리오** — 8개 카테고리(돌잔치, 생신연, 기업 행사, 파티, 졸업·입학식, 웨딩·프로포즈, 아치/반아치, 숫자 타워)별 작업물 갤러리, 라이트박스 모달 지원
- **상담 문의** — 폼 제출 시 Supabase DB 저장 + 카카오 알림톡 자동 발송 (고객 접수 확인 + 관리자 신규 알림)
- **관리자 페이지** (`/admin`) — 포트폴리오/히어로 슬라이드 관리(@dnd-kit 드래그 정렬), 사이트 설정

## 명령어

```bash
yarn dev         # 개발 서버
yarn build       # 프로덕션 빌드
yarn start       # 프로덕션 서버
yarn lint        # ESLint 검사
```

## 배포

Vercel에 배포 가능합니다. 환경 변수를 Vercel 프로젝트 설정에 추가하세요.
