"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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

const SWIPE_THRESHOLD = 50;

export default function PortfolioLightbox({
  items,
  startIndex,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const total = items.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, onClose]);

  const current = items[index];
  if (!current) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const delta = touchDeltaX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

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
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
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
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 font-display text-[11px] tracking-[0.3em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="이전 이미지"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="다음 이미지"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full flex items-center justify-center px-4 py-16 md:px-20 md:py-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full max-w-5xl max-h-full">
          <Image
            key={current.id}
            src={current.imageUrl}
            alt={current.title || current.originalName || "포트폴리오 이미지"}
            fill
            className="object-contain select-none"
            sizes="100vw"
            priority
          />
        </div>

        {/* Caption */}
        {(current.title || current.tag || current.linkUrl) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 px-4 text-center pointer-events-none">
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
      </div>
    </div>
  );
}
