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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
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
      className={`group relative overflow-hidden p-3.5 sm:p-5 lg:p-6 transition-all duration-500 hover:-translate-y-1 border border-blanc-champagne/40 block ${service.color}`}
    >
      {/* Decorative Background Accent */}
      <div
        className={`absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 rounded-bl-full ${service.accent} opacity-40 transform translate-x-8 -translate-y-8 sm:translate-x-10 sm:-translate-y-10 group-hover:translate-x-4 group-hover:-translate-y-4 sm:group-hover:translate-x-5 sm:group-hover:-translate-y-5 transition-transform duration-700 ease-out`}
      />

      <div className="relative z-10 flex flex-col">
        {/* Category & Title */}
        <span className="font-display text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-blanc-gold block mb-1 sm:mb-2">
          {service.label}
        </span>
        <h3 className="font-display text-[15px] sm:text-lg lg:text-xl font-light text-blanc-text-primary tracking-wide leading-snug mb-3 sm:mb-5">
          {service.subtitle}
        </h3>

        {/* View More */}
        <span className="font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-blanc-text-secondary inline-flex items-center gap-1.5 group-hover:text-blanc-text-primary transition-colors">
          자세히
          <span className="inline-block transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
