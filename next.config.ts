import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
