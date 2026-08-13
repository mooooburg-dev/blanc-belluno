"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

export interface LightboxItem {
  id: string;
  imageUrl: string;
  title?: string;
  tag?: string;
  category?: string;
  originalName?: string;
  linkUrl?: string;
}

interface Props {
  items: LightboxItem[];
  startIndex: number;
  onClose: () => void;
}

export default function PortfolioLightbox({
  items,
  startIndex,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [showHint, setShowHint] = useState(() => {
    if (typeof window === "undefined") return false;
    if (items.length <= 1) return false;
    return window.matchMedia("(hover: none)").matches;
  });

  const total = items.length;

  const goPrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const goNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(false), 2200);
    return () => clearTimeout(t);
    // showHint는 의도적으로 의존성에서 제외 — 첫 진입 시 한 번만 타이머 등록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = items[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="포트폴리오 이미지 보기"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30 font-display text-[11px] tracking-[0.3em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Prev (desktop) */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="이전 이미지"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M15 6l-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Next (desktop) */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="다음 이미지"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M9 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Swiper */}
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Keyboard, Pagination, Zoom]}
          initialSlide={startIndex}
          onSwiper={setSwiper}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3 }}
          pagination={{
            el: ".portfolio-lightbox-pagination",
            clickable: true,
            dynamicBullets: total > 8,
          }}
          spaceBetween={24}
          speed={350}
          grabCursor
          className="w-full h-full"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-full flex items-center justify-center px-4 py-16 md:px-20 md:py-20">
                <div className="swiper-zoom-container w-full h-full max-w-5xl max-h-full flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || item.originalName || "포트폴리오 이미지"}
                    width={1600}
                    height={1200}
                    className="object-contain select-none w-auto h-auto max-w-full max-h-full"
                    sizes="100vw"
                    priority={item.id === current.id}
                    unoptimized={item.imageUrl.endsWith('.gif')}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swipe hint (mobile, first open) */}
        {showHint && total > 1 && (
          <div
            className="md:hidden pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="flex items-center gap-6 text-white/80 animate-swipe-hint">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display text-[11px] tracking-[0.3em] uppercase">
                Swipe
              </span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M9 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Caption */}
        {(current.title || current.tag || current.linkUrl) && (
          <div className="absolute bottom-16 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 px-4 text-center pointer-events-none">
            {current.tag && (
              <span className="font-display text-[10px] tracking-[0.3em] text-white/70 uppercase">
                {current.tag}
              </span>
            )}
            {(current.title || current.category) && (
              <p className="font-display text-base md:text-lg text-white font-light tracking-wide">
                {current.title || current.category}
              </p>
            )}
            {current.linkUrl && (
              <a
                href={current.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto mt-1 font-body text-[11px] tracking-[0.2em] uppercase text-white/90 hover:text-white border border-white/40 hover:border-white px-5 py-2 transition-colors"
              >
                자세히 보기 →
              </a>
            )}
          </div>
        )}

        {/* Dot pagination */}
        {total > 1 && (
          <div
            className="portfolio-lightbox-pagination absolute bottom-5 left-0 right-0 z-20 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
}
