"use client";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-blanc-base"
    >
      {/* Abstract Elegant Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blanc-blush opacity-40 blur-[80px] orb-shape"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blanc-champagne opacity-40 blur-[100px] orb-shape"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
        <div
          className="absolute top-[20%] right-[15%] w-[30vw] h-[30vw] bg-blanc-rose opacity-30 blur-[60px] orb-shape"
          style={{ animationDuration: "15s", animationDelay: "2s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pt-24 pb-16">
        {/* Eyebrow */}
        <div
          className="mb-8 opacity-0 animate-fade-up flex items-center justify-center gap-4"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-8 h-px bg-blanc-gold/40" />
          <span className="font-display text-[11px] md:text-xs tracking-[0.3em] uppercase text-blanc-gold">
            Premium Event Styling
          </span>
          <div className="w-8 h-px bg-blanc-gold/40" />
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 tracking-tight text-blanc-text-primary">
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Blanc{" "}
            <span className="italic text-blanc-text-secondary/80">Belluno</span>
          </div>
        </h1>

        {/* Description Text */}
        <div
          className="max-w-md mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="font-body text-base md:text-lg font-light tracking-wide text-blanc-text-secondary leading-relaxed">
            섬세하고 고급스러운 감각으로
            <br className="hidden sm:block" /> 당신의 특별한 날을 완성합니다.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] md:text-xs tracking-[0.15em] text-blanc-text-muted mt-8">
            <span>WEDDING</span>
            <span className="w-1 h-1 rounded-full bg-blanc-sand" />
            <span>BABY SHOWER</span>
            <span className="w-1 h-1 rounded-full bg-blanc-sand" />
            <span>PARTY & EVENT</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={() => handleScroll("#gallery")}
            className="btn-primary w-full sm:w-auto min-w-[180px]"
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => handleScroll("#contact")}
            className="btn-outline w-full sm:w-auto min-w-[180px]"
          >
            CONTACT US
          </button>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-up"
        style={{ animationDelay: "1s" }}
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-blanc-text-muted">
          Discover
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden bg-blanc-champagne">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-blanc-gold"
            style={{
              animation:
                "scrollDown 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
