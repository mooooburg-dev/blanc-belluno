"use client";

import { useState } from "react";

const categories = ["ALL", "WEDDING", "BABY SHOWER", "PARTY", "CORPORATE"];

const galleryItems = [
  {
    id: 1,
    category: "PARTY",
    title: "Soft Peony Dream",
    tag: "Private Party",
    gradient: "from-[#f8e8ee] via-[#f5dde5] to-[#eedcd4]",
  },
  {
    id: 2,
    category: "WEDDING",
    title: "Champagne Elegance",
    tag: "Wedding Arch",
    gradient: "from-[#f2ebe1] via-[#ede4d8] to-[#e8ddd0]",
  },
  {
    id: 3,
    category: "BABY SHOWER",
    title: "Sky Blue Whisper",
    tag: "Gender Reveal",
    gradient: "from-[#e8eef5] via-[#e3e9f0] to-[#dde5ed]",
  },
  {
    id: 4,
    category: "CORPORATE",
    title: "Modern Minimalist",
    tag: "Brand Launch",
    gradient: "from-[#f0ede8] via-[#eae6e0] to-[#e4e0d8]",
  },
  {
    id: 5,
    category: "WEDDING",
    title: "Classic Pearl",
    tag: "Photo Zone",
    gradient: "from-[#f5f0ea] via-[#f0e8e0] to-[#ebe3d8]",
  },
  {
    id: 6,
    category: "PARTY",
    title: "Midnight Rose",
    tag: "Birthday",
    gradient: "from-[#f0e2e8] via-[#ebdce2] to-[#e5d5dc]",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-blanc-surface"
            >
              {/* Placeholder with gradient */}
              <div className="w-full aspect-[4/5] relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />

                {/* Decorative circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center">
                    <span className="font-display text-sm italic text-blanc-text-muted/50">
                      Photo
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />

                {/* Content Reveal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                  <span className="font-display text-[10px] tracking-[0.3em] text-white/80 uppercase mb-2">
                    {item.tag}
                  </span>
                  <p className="font-display text-xl text-white font-light tracking-wide">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Notice */}
        <div className="mt-16 text-center">
          <p className="font-body text-[11px] tracking-widest uppercase text-blanc-text-muted flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-blanc-champagne" />
            Add photos to /public/gallery/
            <span className="w-10 h-px bg-blanc-champagne" />
          </p>
        </div>
      </div>
    </section>
  );
}
