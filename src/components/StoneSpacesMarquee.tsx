import kitchenVideo from "@assets/kitchen.mp4";

const ITEM = "Stone Spaces";
const REPEAT = 18;

function MarqueeSegment() {
  return (
    <div
      className="flex shrink-0 items-center gap-[0.42em] pr-[0.42em] font-light text-[#989898] antialiased"
      style={{
        fontFamily:
          '"IBM Plex Sans", "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif',
        letterSpacing: "-0.042em",
        fontSize: "clamp(4.5rem, calc((100dvh / 6) * 1.8), 18.75rem)",
        lineHeight: 1.02,
      }}
    >
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="inline-flex items-center gap-[0.5em] whitespace-nowrap">
          <span>{ITEM}</span>
          {i < REPEAT - 1 ? (
            <span className="select-none text-[#6e6e6e]" aria-hidden>
              ·
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/** Gri şerit: üstte oval kemer (önceki blokla yumuşak birleşim), marquee, alt blok + çizgi; sonra beyaz üzerinde video. */
export function StoneSpacesMarquee() {
  const curveY = "clamp(64px, 12vw, 120px)";

  return (
    <>
      <section
        className="relative z-[3] overflow-hidden bg-[#2b2b2b]"
        style={{
          marginTop: `calc(-1 * ${curveY})`,
          paddingTop: curveY,
          borderTopLeftRadius: `120% ${curveY}`,
          borderTopRightRadius: `120% ${curveY}`,
        }}
        aria-label="Stone Spaces"
      >
        <div className="relative z-[2] flex min-h-[clamp(28rem,44dvh,56rem)] items-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="marquee-x-track">
            <MarqueeSegment />
            <MarqueeSegment />
          </div>
        </div>

        <div className="relative z-[2] border-b border-[#e8e8e8]/45 pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pt-20 pb-[max(5rem,env(safe-area-inset-bottom,0px))] sm:px-10 sm:pt-24 sm:pb-24 md:pt-28 md:pb-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-12 text-center sm:gap-14 md:gap-16">
            <a
              href="#top"
              className="group inline-flex h-28 w-28 items-center justify-center rounded-full bg-[#a88d70] text-white shadow-[0_12px_50px_rgba(0,0,0,0.4)] transition-[background-color,box-shadow,transform] duration-500 ease-out hover:bg-black hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b] sm:h-36 sm:w-36 md:h-40 md:w-40"
              aria-label="Back to top"
            >
              <svg
                className="h-10 w-10 transition-[transform] duration-500 ease-out group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  className="transition-[stroke-width] duration-500 ease-out [stroke-width:1.08] group-hover:[stroke-width:1.22]"
                  d="M7 17 17 7M17 7h-6M17 7v6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="text-balance text-lg font-normal leading-[1.65] text-white/95 sm:text-xl sm:leading-[1.7] md:text-2xl md:leading-[1.6]">
              Experience the quality and feel of natural stone in your home—surfaces chosen to work
              with your life, your light, and the way you use the room.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-white" aria-label="Showroom">
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
