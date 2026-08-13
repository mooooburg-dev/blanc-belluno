import type { Metadata } from "next";
import Image from "next/image";
import { getPortfolioItems } from "@/lib/portfolio";
import { SITE_NAME_KO, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "포트폴리오 — 풍선 장식 작품 갤러리",
  description:
    "블랑벨루노의 웨딩, 돌잔치, 생일파티, 베이비샤워, 기업 행사 풍선 장식 포트폴리오. 실제 연출 사례를 통해 프리미엄 풍선 데코레이션을 확인하세요.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "포트폴리오 — 풍선 장식 작품 갤러리",
    description:
      "웨딩, 돌잔치, 생일파티, 베이비샤워, 기업 행사 풍선 장식 포트폴리오.",
    url: "/portfolio",
  },
};

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  // 포트폴리오 이미지를 갤러리 구조화 데이터로 선언 (이미지 검색·리치 결과 노출용)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${SITE_URL}/portfolio#gallery`,
    name: `${SITE_NAME_KO} 풍선 장식 포트폴리오`,
    url: `${SITE_URL}/portfolio`,
    creator: { "@id": `${SITE_URL}/#business` },
    image: items.map((item) => ({
      "@type": "ImageObject",
      contentUrl: item.imageUrl,
      name:
        [item.title, item.category, "풍선 장식"].filter(Boolean).join(" — ") ||
        item.originalName,
      creator: { "@id": `${SITE_URL}/#business` },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          풍선 장식 포트폴리오
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          블랑벨루노가 연출한 웨딩, 돌잔치, 생일파티, 베이비샤워, 기업 행사 풍선 데코레이션 작품을 모았습니다.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-20">
            등록된 포트폴리오가 없습니다.
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {items.map((item) => {
              const alt = [item.title, item.category, "풍선 장식"]
                .filter(Boolean)
                .join(" — ");
              return (
                <figure
                  key={item.id}
                  className="break-inside-avoid rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.imageUrl}
                    alt={alt || item.originalName}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  {(item.title || item.category) && (
                    <figcaption className="sr-only">
                      {item.title} {item.category}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
