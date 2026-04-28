import kitchenVideo from "@assets/kitchen.mp4";

const ITEM = "Stone Spaces";
const REPEAT = 18;

function MarqueeSegment() {
  return (
    <div
      className="flex shrink-0 items-center gap-6 pr-6 font-contact-display font-light uppercase tracking-[0.22em] text-[#888888] sm:gap-10 sm:pr-10 sm:tracking-[0.24em] md:gap-12 md:pr-12"
      style={{
        fontSize: "clamp(0.9rem, calc((100dvh / 6) * 0.36), 3.75rem)",
        lineHeight: 1.05,
      }}
    >
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="inline-flex items-center gap-6 whitespace-nowrap sm:gap-10">
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

/** Üst: ~1/6 viewport yüksekliğinde kömür gri şerit + yavaş marquee. Alt: mutfak videosu. */
export function StoneSpacesMarquee() {
  return (
    <>
      <section
        className="relative flex min-h-[calc(100dvh/6)] items-center overflow-hidden bg-[#3b3b3b] py-2 sm:py-3"
        aria-label="Stone Spaces"
      >
        <div className="marquee-x-track">
          <MarqueeSegment />
          <MarqueeSegment />
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-black" aria-label="Showroom">
        <video
          className="block w-full object-cover [max-height:min(92svh,56rem)]"
          src={kitchenVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </section>
    </>
  );
}
