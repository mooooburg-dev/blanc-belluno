'use client';

import { useState } from 'react';
import Image from 'next/image';
import PortfolioLightbox, { type LightboxItem } from './PortfolioLightbox';

interface Props {
  items: LightboxItem[];
}

export default function CategoryPortfolioGrid({ items }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {items.map((item, idx) => (
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
                alt={item.title || item.originalName || ''}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={idx < 8 ? 'eager' : 'lazy'}
                unoptimized={item.imageUrl.endsWith('.gif')}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
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
        ))}
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
