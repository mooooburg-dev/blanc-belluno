import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel 이미지 최적화 활성화 — 원본(수 MB) 대신 sizes에 맞춰 리사이즈된
    // AVIF/WebP를 서빙하고 엣지에 캐싱한다. (기존 unoptimized:true가 로딩 지연 원인)
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31일 — 포트폴리오 이미지는 잘 바뀌지 않음
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eqzxubqqcabifeqtdjws.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "blogthumb.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
