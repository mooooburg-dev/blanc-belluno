'use client';

const steps = [
  {
    step: '01',
    title: '견적 신청',
    subtitle: 'Inquiry',
    description: '원하시는 행사 컨셉과 일정을 알려주세요.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <rect x="6" y="4" width="12" height="17" rx="1.5" />
        <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
        <path d="M9 11h6M9 14h6M9 17h4" />
      </svg>
    ),
  },
  {
    step: '02',
    title: '상담',
    subtitle: 'Consulting',
    description: '전문 디자이너가 1:1 맞춤 상담을 진행합니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <path d="M4 13a8 8 0 1116 0v4a2 2 0 01-2 2h-1v-6h3" />
        <path d="M4 13v4a2 2 0 002 2h1v-6H4" />
      </svg>
    ),
  },
  {
    step: '03',
    title: '시안 제작',
    subtitle: 'Proposal',
    description: '공간과 컨셉에 어울리는 디자인 시안을 제안드립니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <rect x="3" y="4" width="18" height="14" rx="1.5" />
        <path d="M3 8h18" />
        <path d="M7 13l1.5 1.5L11 12M14 13h4M14 16h3" />
      </svg>
    ),
  },
  {
    step: '04',
    title: '최종 확정',
    subtitle: 'Confirmation',
    description: '디테일을 함께 점검하고 디자인을 확정합니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: '05',
    title: '행사 진행',
    subtitle: 'Event Day',
    description: '약속된 날, 완벽한 셋업으로 특별한 순간을 만들어드립니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="section-padding bg-blanc-blush-light/40 relative overflow-hidden"
    >
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-blanc-blush/40 orb-shape blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 w-96 h-96 bg-blanc-champagne/40 orb-shape blur-3xl opacity-50"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
            Our Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary mb-6 tracking-tight">
            진행 <span className="italic text-blanc-text-secondary">방식</span>
          </h2>
          <div className="divider-gold" />
          <p className="font-body text-sm md:text-base mt-8 max-w-xl mx-auto leading-relaxed text-blanc-text-secondary font-light">
            첫 문의부터 행사 당일까지,
            <br />
            블랑벨루노가 모든 과정을 섬세하게 함께합니다.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-6 lg:grid-cols-5 gap-y-8 sm:gap-y-10 lg:gap-y-12 gap-x-2 sm:gap-x-4 lg:gap-x-2 relative">
          {steps.map((item, index) => {
            // Mobile (<lg): 6-col grid — first 3 items span 2 (3-up row).
            // Last 2 items span 2 and start at col 2 / col 4 so they sit centered and close together.
            // Desktop (lg+): natural 5-col layout, all equal.
            const mobileLayout =
              index < 3
                ? 'col-span-2'
                : index === 3
                ? 'col-span-2 col-start-2'
                : 'col-span-2';

            return (
              <li
                key={item.step}
                className={`${mobileLayout} lg:col-span-1 lg:col-start-auto relative flex flex-col items-center text-center`}
              >
                {/* Step number */}
                <span className="font-display text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-blanc-gold mb-2 sm:mb-3 lg:mb-4">
                  Step {item.step}
                </span>

                {/* Icon circle */}
                <div className="relative mb-3 sm:mb-4 lg:mb-6 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  {/* Connector line (lg+ only) — anchored to the circle's vertical center */}
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full w-[calc(100%+3.5rem)] h-px z-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, var(--color-sand) 50%, transparent 0%)',
                        backgroundSize: '8px 1px',
                        backgroundRepeat: 'repeat-x',
                      }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-blanc-rose/30 blur-xl scale-110"
                  />
                  <div className="relative w-full h-full rounded-full bg-blanc-surface border border-blanc-champagne/70 shadow-[0_8px_30px_rgba(197,168,128,0.12)] flex items-center justify-center text-blanc-gold transition-transform duration-500 hover:-translate-y-1 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6 md:[&_svg]:w-7 md:[&_svg]:h-7 lg:[&_svg]:w-8 lg:[&_svg]:h-8">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-sm sm:text-base lg:text-xl font-light text-blanc-text-primary tracking-wide mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blanc-text-muted mb-0 lg:mb-3">
                  — {item.subtitle}
                </p>

                {/* Description — hidden on mobile to save space */}
                <p className="hidden lg:block font-body text-sm leading-relaxed text-blanc-text-secondary font-light max-w-60">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
