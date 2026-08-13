import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FloatingContact from "@/app/components/FloatingContact";
import CategoryPortfolioGrid from "@/app/components/CategoryPortfolioGrid";
import {
  getServiceCategoryBySlug,
  serviceCategories,
} from "@/lib/service-categories";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";
import {
  OG_IMAGE_URL,
  SERVICE_AREAS,
  SITE_NAME_KO,
  SITE_URL,
} from "@/lib/seo";

export const revalidate = 300;

const AREA_LABEL = SERVICE_AREAS.join("·");

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);
  if (!category) return {};
  const title = `${category.seoTitle} | ${AREA_LABEL} ${SITE_NAME_KO}`;
  const description = `${category.description} ${AREA_LABEL} 출장 ${category.regionKeyword} 전문 ${SITE_NAME_KO}.`;
  const keywords = [
    ...category.keywords,
    ...SERVICE_AREAS.map((area) => `${area} ${category.regionKeyword}`),
    SITE_NAME_KO,
    "Blanc Belluno",
  ];

  // 해당 카테고리의 대표 포트폴리오 이미지를 OG 이미지로 사용 (없으면 기본 이미지)
  const allItems = await getPortfolioItems();
  const firstItem = allItems.find(
    (item) => item.category === category.category,
  );
  const ogImage = firstItem?.imageUrl || OG_IMAGE_URL;
  const ogImageAlt = firstItem
    ? `${SITE_NAME_KO} ${category.subtitle} 풍선 장식 — ${firstItem.title || category.regionKeyword}`
    : `${SITE_NAME_KO} — ${category.regionKeyword} 장식`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME_KO,
      title,
      description,
      url: `/services/${category.slug}`,
      images: [{ url: ogImage, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);
  if (!category) notFound();

  const [allItems, settings] = await Promise.all([
    getPortfolioItems(),
    getSettings(),
  ]);

  const items = allItems.filter((item) => item.category === category.category);

  const serviceUrl = `${SITE_URL}/services/${category.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: `${category.subtitle} 풍선 장식`,
        serviceType: category.regionKeyword,
        description: category.longDescription,
        url: serviceUrl,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: SERVICE_AREAS.map((city) => ({
          "@type": "City",
          name: city,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "서비스",
            item: `${SITE_URL}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.subtitle,
            item: serviceUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section
          className={`section-padding border-b border-blanc-champagne/30 ${category.color}`}
        >
          <div className="max-w-6xl mx-auto">
            <nav className="font-body text-[11px] tracking-[0.2em] uppercase text-blanc-text-muted mb-6">
              <Link href="/" className="hover:text-blanc-text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/#services" className="hover:text-blanc-text-primary">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-blanc-text-secondary">{category.label}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
                {category.label}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary mb-4 tracking-tight">
                {category.title}
              </h1>
              <p className="font-body text-sm text-blanc-text-muted tracking-widest mb-6">
                — {category.subtitle}
              </p>
              <div className="w-10 h-px bg-blanc-gold" />
              <p className="font-body text-sm md:text-base mt-6 leading-relaxed text-blanc-text-secondary font-light">
                {category.longDescription
                  .split(/(?<=\.)\s+/)
                  .filter(Boolean)
                  .map((sentence, idx, arr) => (
                    <span key={idx}>
                      {sentence}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] tracking-widest text-blanc-text-muted uppercase relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-blanc-champagne"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-body text-[13px] text-blanc-text-muted mt-8 leading-relaxed font-light">
                {AREA_LABEL} 전 지역 출장 {category.regionKeyword} 전문. 현장
                답사부터 설치·철수까지 함께합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="section-padding bg-blanc-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
                What we offer
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight mb-6">
                제공 서비스
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {category.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="border border-blanc-champagne/40 bg-white p-6 md:p-7"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-blanc-gold block mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-light text-blanc-text-primary mb-2">
                    {h.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-blanc-text-secondary font-light">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="section-padding bg-blanc-base">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
                Portfolio
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight mb-6">
                {category.label}{" "}
                <span className="text-blanc-text-secondary">
                  작품 사례
                </span>
              </h2>
              <div className="divider-gold" />
            </div>

            {items.length === 0 ? (
              <p className="text-center py-12 font-body text-sm text-blanc-text-muted">
                준비 중입니다. 곧 작품을 업데이트해 드릴게요.
              </p>
            ) : (
              <CategoryPortfolioGrid items={items} />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-blanc-surface">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
              Inquire
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight mb-5">
              {category.subtitle},{" "}
              <span className="text-blanc-text-secondary">
                지금 상담받기
              </span>
            </h2>
            <div className="divider-gold" />
            <p className="font-body text-sm md:text-base mt-6 leading-relaxed text-blanc-text-secondary font-light mb-8">
              일정과 콘셉트만 알려주시면, 공간과 예산에 맞춰 1:1 제안서를
              만들어 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="btn-outline group">
                맞춤 상담 문의
                <span className="inline-block transform transition-transform group-hover:translate-x-2 ml-3">
                  →
                </span>
              </Link>
              <Link
                href="/#services"
                className="font-body text-[11px] tracking-[0.2em] uppercase text-blanc-text-muted hover:text-blanc-text-primary transition-colors"
              >
                ← 다른 서비스 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <FloatingContact
        phone={settings.phone}
        kakaoChannel={settings.kakaoChannel}
      />
    </>
  );
}
