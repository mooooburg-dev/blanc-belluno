import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FloatingContact from "@/app/components/FloatingContact";
import {
  getServiceCategoryBySlug,
  serviceCategories,
} from "@/lib/service-categories";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

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
  const title = `${category.title} — ${category.subtitle} 풍선 장식`;
  return {
    title,
    description: category.longDescription,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      title,
      description: category.longDescription,
      url: `/services/${category.slug}`,
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

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section
          className={`section-padding border-b border-blanc-champagne/30 ${category.color}`}
        >
          <div className="max-w-6xl mx-auto">
            <nav className="font-body text-[11px] tracking-[0.2em] uppercase text-blanc-text-muted mb-8">
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
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
                {category.label}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary mb-5 tracking-tight">
                {category.title}
              </h1>
              <p className="font-body text-sm text-blanc-text-muted tracking-widest mb-8">
                — {category.subtitle}
              </p>
              <div className="w-10 h-px bg-blanc-gold" />
              <p className="font-body text-sm md:text-base mt-8 leading-relaxed text-blanc-text-secondary font-light">
                {category.longDescription}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] tracking-widest text-blanc-text-muted uppercase relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-blanc-champagne"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="section-padding bg-blanc-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
                What we offer
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight">
                제공 서비스
              </h2>
              <div className="divider-gold mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {category.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="border border-blanc-champagne/40 bg-white p-7 md:p-8"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-blanc-gold block mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-light text-blanc-text-primary mb-3">
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
            <div className="text-center mb-14">
              <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
                Portfolio
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight">
                {category.label}{" "}
                <span className="italic text-blanc-text-secondary">
                  작품 사례
                </span>
              </h2>
              <div className="divider-gold mt-6" />
            </div>

            {items.length === 0 ? (
              <p className="text-center py-16 font-body text-sm text-blanc-text-muted">
                준비 중입니다. 곧 작품을 업데이트해 드릴게요.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {items.map((item) => {
                  const content = (
                    <div className="w-full aspect-4/5 relative overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title || item.originalName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                        {item.tag && (
                          <span className="font-display text-[10px] tracking-[0.3em] text-white/80 uppercase mb-2">
                            {item.tag}
                          </span>
                        )}
                        <p className="font-display text-xl text-white font-light tracking-wide">
                          {item.title || item.category}
                        </p>
                      </div>
                    </div>
                  );
                  return item.linkUrl ? (
                    <a
                      key={item.id}
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden bg-blanc-surface block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden bg-blanc-surface"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-blanc-surface">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
              Inquire
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-blanc-text-primary tracking-tight mb-6">
              {category.subtitle},{" "}
              <span className="italic text-blanc-text-secondary">
                지금 상담받기
              </span>
            </h2>
            <div className="divider-gold" />
            <p className="font-body text-sm md:text-base mt-8 leading-relaxed text-blanc-text-secondary font-light mb-10">
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
