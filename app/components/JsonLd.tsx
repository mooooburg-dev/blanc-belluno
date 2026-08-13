import {
  SITE_NAME,
  SITE_NAME_KO,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  SERVICE_AREAS,
} from "@/lib/seo";

export interface JsonLdServiceItem {
  url: string;
  name: string;
  description: string;
  image?: string;
}

interface JsonLdProps {
  phone?: string;
  instagram?: string;
  naverBlog?: string;
  services?: JsonLdServiceItem[];
}

export default function JsonLd({
  phone,
  instagram,
  naverBlog,
  services,
}: JsonLdProps) {
  const sameAs = [
    instagram ? `https://instagram.com/${instagram.replace(/^@/, "")}` : null,
    naverBlog || null,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME_KO,
    alternateName: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/blanc-belluno-og.png`,
    logo: `${SITE_URL}/icon-512.png`,
    ...(phone ? { telephone: phone } : {}),
    priceRange: "₩₩",
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name: city,
      address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: city },
    })),
    address: { "@type": "PostalAddress", addressCountry: "KR" },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    knowsAbout: [
      "풍선 장식",
      "풍선 아치",
      "풍선 가랜드",
      "돌잔치 포토존",
      "소규모 돌잔치",
      "프러포즈 장식",
      "웨딩 풍선",
      "돌잔치 풍선",
      "베이비샤워",
      "젠더 리빌",
      "생일 파티",
      "기업 행사 데코레이션",
      "김포 풍선 장식",
      "서울 풍선 장식",
      "인천 풍선 장식",
      "송도 풍선 장식",
      "부천 풍선 장식",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "돌잔치 풍선 장식 및 포토존" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "소규모 돌잔치 연출" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "프러포즈 풍선 장식" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "웨딩 풍선 장식" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "생일파티 풍선 장식" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "베이비샤워 풍선 장식" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "기업 행사 풍선 장식" } },
    ],
  };

  // 서비스 페이지들을 이미지+제목+URL 카드 목록으로 선언 (검색 결과 리스트/캐러셀 노출용)
  const itemList =
    services && services.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${SITE_URL}/#services-list`,
          name: `${SITE_NAME_KO} 풍선 장식 서비스`,
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: s.url,
            name: s.name,
            ...(s.image ? { image: s.image } : {}),
            item: {
              "@type": "Service",
              "@id": `${s.url}#service`,
              name: s.name,
              description: s.description,
              url: s.url,
              ...(s.image ? { image: s.image } : {}),
              provider: { "@id": `${SITE_URL}/#business` },
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      {itemList && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      )}
    </>
  );
}
