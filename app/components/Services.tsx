'use client';

import Link from 'next/link';
import {
  serviceCategories,
  type ServiceCategory,
} from '@/lib/service-categories';

export default function Services() {
  return (
    <section id="services" className="section-padding bg-blanc-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary mb-5 tracking-tight">
            어떤 날이든,{' '}
            <span className="text-blanc-text-secondary">특별하게</span>
          </h2>
          <div className="divider-gold" />
          <p className="font-body text-sm md:text-base mt-6 mx-auto leading-relaxed text-blanc-text-secondary font-light">
            블랑벨루노는 모든 순간을 소중히 여깁니다.
            <br className="hidden sm:block" />
            작은 홈파티부터 대규모 브랜드 행사까지, 고객의 상상을 우아한 현실로
            만들어드립니다.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
          {serviceCategories.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-14 flex flex-col items-center">
          <p className="font-body text-xs text-blanc-text-muted mb-5 tracking-widest uppercase">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline group"
          >
            맞춤 상담 문의
            <span className="inline-block transform transition-transform group-hover:translate-x-2 ml-3">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceCategory }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative overflow-hidden p-5 sm:p-7 lg:p-8 transition-all duration-500 hover:-translate-y-1 border border-blanc-champagne/40 block ${service.color}`}
    >
      {/* Decorative Background Accent */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 rounded-bl-full ${service.accent} opacity-40 transform translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700 ease-out`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Category & Title */}
        <div className="mb-5 sm:mb-6 lg:mb-8">
          <span className="font-display text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-blanc-gold block mb-2 sm:mb-3">
            {service.label}
          </span>
          <h3 className="font-display text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-blanc-text-primary tracking-wide mb-1.5 sm:mb-2">
            {service.title}
          </h3>
          <p className="font-body text-[11px] sm:text-xs text-blanc-text-muted tracking-widest">
            — {service.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-xs sm:text-sm leading-relaxed sm:leading-loose text-blanc-text-secondary font-light grow mb-5 sm:mb-6 lg:mb-8">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 mb-5 sm:mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest text-blanc-text-muted uppercase relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-blanc-champagne"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View More */}
        <span className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-blanc-text-primary inline-flex items-center gap-2 mt-auto">
          자세히 보기
          <span className="inline-block transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
