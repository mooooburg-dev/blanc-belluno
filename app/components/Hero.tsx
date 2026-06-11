'use client';

interface BalloonProps {
  x: string;
  y: string;
  size: number;
  color: string;
  opacity: number;
  anim: number;
  duration: number;
  delay: number;
  idx: number;
}

const BALLOONS: Omit<BalloonProps, 'idx'>[] = [
  // 상단 영역
  { x: '6%', y: '8%', size: 90, color: '#F4E7EB', opacity: 0.6, anim: 1, duration: 7, delay: 0 },
  { x: '52%', y: '2%', size: 48, color: '#E8D5C8', opacity: 0.4, anim: 3, duration: 6.5, delay: 3.5 },
  { x: '78%', y: '5%', size: 72, color: '#EBD4DB', opacity: 0.5, anim: 2, duration: 8, delay: 1.2 },
  // 중단 좌우
  { x: '1%', y: '40%', size: 58, color: '#DCCCBE', opacity: 0.4, anim: 2, duration: 9, delay: 0.8 },
  { x: '88%', y: '22%', size: 52, color: '#F2EBE1', opacity: 0.5, anim: 3, duration: 6.5, delay: 2.5 },
  { x: '90%', y: '52%', size: 68, color: '#F4E7EB', opacity: 0.35, anim: 1, duration: 7.5, delay: 3 },
  // 하단 영역
  { x: '14%', y: '68%', size: 54, color: '#EBD4DB', opacity: 0.45, anim: 3, duration: 8.5, delay: 1.5 },
  { x: '72%', y: '72%', size: 62, color: '#F2EBE1', opacity: 0.4, anim: 2, duration: 7, delay: 2 },
];

function Balloon({ x, y, size, color, opacity, anim, duration, delay, idx }: BalloonProps) {
  const gradId = `bl-hl-${idx}`;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size * 1.55,
        animation: `balloonFloat${anim} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 100 155" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id={gradId} cx="38%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* 풍선 몸체 */}
        <ellipse cx="50" cy="50" rx="44" ry="50" fill={color} opacity={opacity} />
        {/* 하이라이트 반사 */}
        <ellipse cx="50" cy="50" rx="44" ry="50" fill={`url(#${gradId})`} opacity={opacity} />
        {/* 매듭 */}
        <path d="M46 99 L50 106 L54 99 Z" fill={color} opacity={opacity} />
        {/* 실 */}
        <path
          d="M50 106 C48 120 53 135 49 155"
          stroke={color}
          strokeWidth="1"
          opacity={opacity * 0.5}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-blanc-base via-blanc-blush-light/30 to-blanc-base"
    >
      {/* 떠다니는 풍선 일러스트 */}
      <div className="absolute inset-0" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <Balloon key={i} {...b} idx={i} />
        ))}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 text-center px-6 pt-20 pb-12 md:pt-24 md:pb-16 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div
          className="mb-8 opacity-0 animate-fade-up flex items-center justify-center gap-4"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="w-8 h-px bg-blanc-gold/40" />
          <span className="font-display text-[11px] md:text-xs tracking-[0.3em] uppercase text-blanc-gold">
            Premium Event Styling
          </span>
          <div className="w-8 h-px bg-blanc-gold/40" />
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 tracking-tight text-blanc-text-primary whitespace-nowrap">
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Blanc{' '}
            <span className="text-blanc-text-secondary/80">Belluno</span>
          </div>
        </h1>

        {/* 설명 텍스트 */}
        <div
          className="max-w-md mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="font-body text-base md:text-lg font-light tracking-wide text-blanc-text-secondary leading-relaxed">
            섬세하고 고급스러운 감각으로
            <br /> 당신의 특별한 날을 완성합니다.
          </p>
          <div className="flex justify-center items-center gap-x-4 text-[11px] md:text-xs tracking-[0.15em] text-blanc-text-muted mt-8 whitespace-nowrap">
            <span>WEDDING</span>
            <span className="w-1 h-1 rounded-full bg-blanc-sand shrink-0" />
            <span>BABY SHOWER</span>
            <span className="w-1 h-1 rounded-full bg-blanc-sand shrink-0" />
            <span>PARTY & EVENT</span>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <button
            onClick={() => handleScroll('#gallery')}
            className="btn-primary w-full sm:w-auto min-w-[180px]"
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-outline w-full sm:w-auto min-w-[180px]"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
}
