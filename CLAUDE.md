# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# ESLint 검사
npm run lint
```

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript (strict 모드)
- **스타일링**: Tailwind CSS 4
- **React**: React 19

## 프로젝트 구조

- `app/` - Next.js App Router 기반 페이지 및 레이아웃
  - `layout.tsx` - 루트 레이아웃 (Geist 폰트 설정 포함)
  - `page.tsx` - 홈페이지
  - `globals.css` - 전역 스타일
- `public/` - 정적 파일

## 경로 별칭

`@/*`는 프로젝트 루트를 가리킴 (예: `@/app/page.tsx`)
