import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_KR,
  Noto_Serif_KR,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
  SITE_NAME,
  SITE_NAME_KO,
  SITE_URL,
  OG_IMAGE_URL,
} from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME_KO} ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME_KO,
  authors: [{ name: SITE_NAME_KO }],
  creator: SITE_NAME_KO,
  publisher: SITE_NAME_KO,
  category: "lifestyle",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME_KO,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME_KO} — 풍선 장식 포트폴리오`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    ...(NAVER_SITE_VERIFICATION
      ? { other: { "naver-site-verification": NAVER_SITE_VERIFICATION } }
      : {}),
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${notoSansKR.variable} ${notoSerifKR.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
