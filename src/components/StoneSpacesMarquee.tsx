const ITEM = "Stone Spaces";
const REPEAT = 18;

function MarqueeSegment() {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8 font-contact-display text-[clamp(1.25rem,3.2vw,2rem)] font-light uppercase tracking-[0.22em] text-[#888888] sm:gap-12 sm:pr-12 sm:tracking-[0.24em] md:gap-14 md:pr-14"
    >
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="inline-flex items-center gap-8 whitespace-nowrap sm:gap-12">
          <span>{ITEM}</span>
          {i < REPEAT - 1 ? (
            <span className="select-none text-[#666666]" aria-hidden>
              ·
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/** Görseldeki gibi kömür gri zemin + yatay akan tipografi. */
export function StoneSpacesMarquee() {
  return (
    <section
      className="relative overflow-hidden bg-[#3b3b3b] py-9 sm:py-11 md:py-12"
      aria-label="Stone Spaces"
    >
      <div className="marquee-x-track">
        <MarqueeSegment />
        <MarqueeSegment />
      </div>
    </section>
  );
}
