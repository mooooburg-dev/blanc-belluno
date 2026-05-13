export default function InstagramFeedSkeleton({ handle }: { handle: string }) {
  const displayHandle = handle || "blancbelluno";
  return (
    <section id="instagram" className="section-padding bg-blanc-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
            Follow Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary tracking-tight mb-5">
            인스타그램에서{" "}
            <span className="text-blanc-text-secondary">만나요</span>
          </h2>
          <div className="divider-gold" />
          <p className="font-body text-sm md:text-base mt-5 text-blanc-text-secondary font-light">
            매일 업데이트되는 블랑벨루노의 작업물을 가장 먼저 확인하세요.
          </p>
        </div>

        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-blanc-champagne">
            <span className="font-body text-xs tracking-[0.15em] text-blanc-text-primary uppercase">
              @{displayHandle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-blanc-champagne/20 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
