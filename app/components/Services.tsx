"use client";

const services = [
  {
    category: "Party",
    title: "BIRTHDAY PARTY",
    subtitle: "생일파티",
    description:
      "아이부터 어른까지, 생애 가장 특별한 날을 완성하는 프라이빗 풍선 아치와 가랜드 연출.",
    tags: ["키즈 파티", "어른 생일", "서프라이즈"],
    color: "bg-blanc-blush-light",
    accent: "bg-blanc-blush",
  },
  {
    category: "Wedding",
    title: "WEDDING & DOL",
    subtitle: "웨딩 & 돌잔치",
    description:
      "인생의 가장 아름다운 순간을 위한 하이엔드 풍선 장식. 포토존부터 메인 무대까지 섬세한 터치.",
    tags: ["웨딩홀", "포토존", "돌상 세팅"],
    color: "bg-blanc-champagne/20",
    accent: "bg-blanc-champagne",
  },
  {
    category: "Baby",
    title: "BABY SHOWER",
    subtitle: "베이비샤워",
    description:
      "새 생명의 탄생을 축복하는 우아한 파스텔 무드. 젠더 리빌 파티를 위한 특별한 셋업.",
    tags: ["젠더 리빌", "임신 축하", "신생아 파티"],
    color: "bg-blanc-base",
    accent: "bg-blanc-sand/30",
  },
  {
    category: "Corporate",
    title: "CORPORATE EVENTS",
    subtitle: "기업 & 행사",
    description:
      "브랜드 아이덴티티를 돋보이게 하는 프로페셔널 공간 연출. 론칭 쇼, 팝업스토어, VIP 행사.",
    tags: ["론칭 파티", "팝업스토어", "사내 행사"],
    color: "bg-white",
    accent: "bg-blanc-gold/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-blanc-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-5">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary mb-6 tracking-tight">
            어떤 날이든, <span className="italic text-blanc-text-secondary">특별하게</span>
          </h2>
          <div className="divider-gold" />
          <p className="font-body text-sm md:text-base mt-8 max-w-xl mx-auto leading-relaxed text-blanc-text-secondary font-light">
            블랑벨루노는 모든 순간을 소중히 여깁니다.
            <br className="hidden sm:block" />
            작은 홈파티부터 대규모 브랜드 행사까지, 고객의 상상을 우아한 현실로 만들어드립니다.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 flex flex-col items-center">
          <p className="font-body text-xs text-blanc-text-muted mb-6 tracking-widest uppercase">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
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

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div
      className={`group relative overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1 border border-blanc-champagne/40 ${service.color}`}
    >
      {/* Decorative Background Accent */}
      <div
        className={`absolute top-0 right-0 w-28 h-28 rounded-bl-full ${service.accent} opacity-40 transform translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700 ease-out`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Category & Title */}
        <div className="mb-8">
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-blanc-gold block mb-3">
            {service.category}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-light text-blanc-text-primary tracking-wide mb-2">
            {service.title}
          </h3>
          <p className="font-body text-xs text-blanc-text-muted tracking-widest">
            — {service.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-sm leading-loose text-blanc-text-secondary font-light grow mb-8">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {service.tags.map((tag) => (
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
  );
}
