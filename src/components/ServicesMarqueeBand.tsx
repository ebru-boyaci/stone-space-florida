const LABEL = "Services";
/** Segment başına tekrar — marquee iki segment ile döngü için yeterli genişlik */
const REPEAT = 16;

function MarqueeSegment() {
  return (
    <div
      className="flex shrink-0 items-center pr-[0.38em] font-medium tracking-[-0.04em] text-white antialiased"
      style={{
        fontFamily: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
        fontSize: "clamp(2.85rem, 8.2vw, 6.75rem)",
        lineHeight: 1.05,
      }}
    >
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="inline-flex items-center gap-[0.42em] whitespace-nowrap">
          <span>{LABEL}</span>
          {i < REPEAT - 1 ? (
            <span className="select-none font-light text-white/38" aria-hidden>
              /
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/** Discover services (gri) ile kartlar arası: ince çizgiler + yatay Services marquee */
export function ServicesMarqueeBand() {
  return (
    <section
      className="relative overflow-hidden bg-[#343434] pt-6 sm:pt-8 md:pt-10"
      aria-labelledby="services-marquee-heading"
    >
      <h2 id="services-marquee-heading" className="sr-only">
        Services
      </h2>
      <div className="border-y border-white/[0.1]">
        <div className="relative flex items-center overflow-hidden pt-12 pb-9 sm:pt-14 sm:pb-10 md:pt-16 md:pb-11">
          <div className="marquee-x-track marquee-x-track--services flex w-max">
            <MarqueeSegment />
            <MarqueeSegment />
          </div>
        </div>
      </div>
    </section>
  );
}
