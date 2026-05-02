const LABEL = "Services";
/** Segment başına tekrar — marquee iki segment ile döngü için yeterli genişlik */
const REPEAT = 16;

function MarqueeSegment() {
  return (
    <div
      className="flex shrink-0 items-center gap-x-[0.45em] pr-[0.38em] font-extralight tracking-[-0.01em] text-white antialiased"
      style={{
        fontFamily: '"Manrope", system-ui, sans-serif',
        fontSize: "clamp(3.5rem, 10vw, 8.25rem)",
        fontWeight: 200,
        lineHeight: 1.2,
      }}
    >
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="inline-flex items-center gap-[0.58em] whitespace-nowrap">
          <span>{LABEL}</span>
          {i < REPEAT - 1 ? (
            <span className="select-none font-extralight text-white" aria-hidden>
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
