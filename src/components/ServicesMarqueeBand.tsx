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

/** Üst: section pt (çizginin üstü). Şerit içi: altta daha fazla pb (metnin altı). Section pb: kartlardan önce. */
export function ServicesMarqueeBand() {
  return (
    <section
      className="relative overflow-hidden bg-[#343434] pb-10 pt-[7rem] sm:pb-12 sm:pt-36 md:pb-14 md:pt-[11rem]"
      aria-labelledby="services-marquee-heading"
    >
      <h2 id="services-marquee-heading" className="sr-only">
        Services
      </h2>
      <div className="border-y border-white/[0.1]">
        <div className="relative flex items-center overflow-hidden pt-9 pb-16 sm:pt-10 sm:pb-[4.5rem] md:pt-11 md:pb-20">
          <div className="marquee-x-track marquee-x-track--services flex w-max">
            <MarqueeSegment />
            <MarqueeSegment />
          </div>
        </div>
      </div>
    </section>
  );
}
