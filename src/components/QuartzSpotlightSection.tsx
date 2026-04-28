import bgImage from "@assets/kitchen 5.jpg";
import coverA from "@assets/kitchen1.jpg";
import coverB from "@assets/kitchen2.jpg";

const CARDS = [
  {
    image: coverA,
    title: "Quartz",
    subtitle: "Discover the Elegance of Quartz",
    body: "Enhance your spaces with our premium quartz selection—perfect for countertops, backsplashes, and elegant interiors!",
  },
  {
    image: coverB,
    title: "Pebbles",
    subtitle: "Discover the Beauty of Pebbles",
    body: "Transform your garden, patio, or driveway with our premium landscaping pebbles.",
  },
] as const;

export function QuartzSpotlightSection() {
  return (
    <section
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-black px-6 py-20 sm:px-10 sm:py-24"
      aria-label="Quartz spotlight"
    >
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-black/62" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_140%_95%_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0.38))]" />

      <div className="mx-auto grid w-full max-w-[min(95vw,74rem)] grid-cols-1 gap-8 lg:grid-cols-2">
        {CARDS.map((card, i) => (
          <article
            key={i}
            className="flex min-h-[clamp(41rem,76vh,52rem)] flex-col rounded-[0.4rem] border border-white/[0.1] bg-[#2f3137]/92 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.42)] sm:min-h-[clamp(43rem,79vh,56rem)] sm:p-7"
          >
            <div className="overflow-hidden border border-white/[0.06]">
              <img src={card.image} alt="" className="h-[21rem] w-full object-cover sm:h-[24rem]" loading="lazy" decoding="async" />
            </div>

            <div className="pt-5 sm:pt-6">
              <p className="font-sans text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.01em] text-white sm:text-[1.78rem]">
                {card.title}
              </p>
              <h3 className="mt-2 text-pretty font-sans text-[clamp(2.1rem,4.1vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                {card.subtitle}
              </h3>
              <p className="mt-5 text-pretty text-[1.06rem] leading-[1.78] text-zinc-200 sm:text-[1.15rem]">
                {card.body}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-6">
              <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#a88d70] text-white sm:h-14 sm:w-14">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path d="M7 17 17 7M17 7h-6M17 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm tracking-wide text-white/65">Stone Spaces</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
