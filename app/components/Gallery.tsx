"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceCategories } from "@/lib/service-categories";
import PortfolioLightbox from "./PortfolioLightbox";

interface PortfolioItem {
  id: string;
  filename: string;
  originalName: string;
  order: number;
  category: string;
  title: string;
  tag: string;
  linkUrl: string;
  imageUrl: string;
}

const CATEGORIES = ["ALL", "WEDDING", "BABY SHOWER", "PARTY", "CORPORATE"];
const INITIAL_VISIBLE = 16;
const LOAD_MORE_STEP = 16;

const placeholderItems = [
  {
    id: "p1",
    category: "PARTY",
    title: "Soft Peony Dream",
    tag: "Private Party",
    gradient: "from-[#f8e8ee] via-[#f5dde5] to-[#eedcd4]",
  },
  {
    id: "p2",
    category: "WEDDING",
    title: "Champagne Elegance",
    tag: "Wedding Arch",
    gradient: "from-[#f2ebe1] via-[#ede4d8] to-[#e8ddd0]",
  },
  {
    id: "p3",
    category: "BABY SHOWER",
    title: "Sky Blue Whisper",
    tag: "Gender Reveal",
    gradient: "from-[#e8eef5] via-[#e3e9f0] to-[#dde5ed]",
  },
  {
    id: "p4",
    category: "CORPORATE",
    title: "Modern Minimalist",
    tag: "Brand Launch",
    gradient: "from-[#f0ede8] via-[#eae6e0] to-[#e4e0d8]",
  },
  {
    id: "p5",
    category: "WEDDING",
    title: "Classic Pearl",
    tag: "Photo Zone",
    gradient: "from-[#f5f0ea] via-[#f0e8e0] to-[#ebe3d8]",
  },
  {
    id: "p6",
    category: "PARTY",
    title: "Midnight Rose",
    tag: "Birthday",
    gradient: "from-[#f0e2e8] via-[#ebdce2] to-[#e5d5dc]",
  },
];

export default function Gallery({ items }: { items: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const hasRealItems = items.length > 0;

  // 실제 데이터가 있으면 사용, 없으면 placeholder
  const displayCategories = hasRealItems
    ? [
        "ALL",
        ...Array.from(new Set(items.map((i) => i.category))),
      ]
    : CATEGORIES;

  const filteredReal =
    activeCategory === "ALL"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const filteredPlaceholder =
    activeCategory === "ALL"
      ? placeholderItems
      : placeholderItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-blanc-base">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
            Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary tracking-tight mb-6">
            블랑벨루노의{" "}
            <span className="italic text-blanc-text-secondary">작품들</span>
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(INITIAL_VISIBLE);
              }}
              className={`font-body text-[11px] tracking-[0.15em] uppercase transition-all duration-300 pb-2 border-b ${
                activeCategory === cat
                  ? "text-blanc-text-primary border-blanc-text-primary"
                  : "text-blanc-text-muted border-transparent hover:text-blanc-text-secondary hover:border-blanc-champagne"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active category detail link */}
        <div className="flex justify-center mb-12 min-h-[24px]">
          {(() => {
            const matched = serviceCategories.find(
              (s) => s.category === activeCategory
            );
            if (!matched) return null;
            return (
              <Link
                href={`/services/${matched.slug}`}
                className="group font-body text-[11px] tracking-[0.2em] uppercase text-blanc-text-secondary hover:text-blanc-text-primary transition-colors inline-flex items-center gap-2"
              >
                {matched.label} 서비스 자세히 보기
                <span className="inline-block transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            );
          })()}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {hasRealItems
            ? filteredReal.slice(0, visibleCount).map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden bg-blanc-surface block w-full text-left cursor-zoom-in"
                  aria-label={`${item.title || item.category} 크게 보기`}
                >
                  <div className="w-full aspect-square relative overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title || item.originalName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                    {/* Content Reveal */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                      {item.tag && (
                        <span className="font-display text-[9px] tracking-[0.3em] text-white/80 uppercase mb-1.5">
                          {item.tag}
                        </span>
                      )}
                      <p className="font-display text-sm md:text-base text-white font-light tracking-wide line-clamp-2">
                        {item.title || item.category}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            : filteredPlaceholder.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-blanc-surface"
                >
                  <div className="w-full aspect-square relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
                        <span className="font-display text-xs italic text-blanc-text-muted/50">
                          Photo
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                      <span className="font-display text-[9px] tracking-[0.3em] text-white/80 uppercase mb-1.5">
                        {item.tag}
                      </span>
                      <p className="font-display text-sm md:text-base text-white font-light tracking-wide line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Load more */}
        {hasRealItems && filteredReal.length > visibleCount && (
          <div className="mt-10 md:mt-12 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((v) =>
                  Math.min(v + LOAD_MORE_STEP, filteredReal.length)
                )
              }
              className="group font-body text-[11px] tracking-[0.25em] uppercase text-blanc-text-secondary hover:text-blanc-text-primary border border-blanc-champagne hover:border-blanc-text-primary px-8 py-3 transition-colors inline-flex items-center gap-3"
            >
              더 보기
              <span className="text-blanc-text-muted group-hover:text-blanc-text-primary transition-colors">
                +{filteredReal.length - visibleCount}
              </span>
            </button>
          </div>
        )}

        {/* Notice */}
        {!hasRealItems && (
          <div className="mt-16 text-center">
            <p className="font-body text-[11px] tracking-widest uppercase text-blanc-text-muted flex items-center justify-center gap-3">
              <span className="w-10 h-px bg-blanc-champagne" />
              /admin 에서 포트폴리오를 추가하세요
              <span className="w-10 h-px bg-blanc-champagne" />
            </p>
          </div>
        )}
      </div>

      {hasRealItems && lightboxIndex !== null && (
        <PortfolioLightbox
          items={filteredReal.slice(0, visibleCount)}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
