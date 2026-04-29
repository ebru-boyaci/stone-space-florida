import bgImage from "@assets/kitchen 5.jpg";
import coverA from "@assets/kitchen1.jpg";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function QuartzSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /** Bölüm görünmeden önce büyük görseli prefetch (hızlı scroll’da siyah flaş azalır). */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const preload = () => {
      const hi = new Image();
      hi.decoding = "async";
      hi.src = bgImage;
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          preload();
          io.disconnect();
        }
      },
      { root: null, rootMargin: "520px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[140vh] items-center overflow-hidden bg-[#171312] px-6 py-20 sm:min-h-[150vh] sm:px-10 sm:py-24 [contain:layout_paint]"
      aria-label="Quartz spotlight"
    >
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <div className="absolute inset-0 -z-10 bg-black/62" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_140%_95%_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0.38))]" />

      <div className="mx-auto flex w-full max-w-[min(95vw,74rem)] justify-center">
        <Link
          to="/catalog/quartz"
          aria-label="Quartz surfaces — browse full catalog"
          className="group block w-full max-w-[min(95vw,36rem)] rounded-[0.42rem] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#a88d70]"
        >
          <article className="relative flex min-h-[clamp(35rem,68vh,46rem)] flex-col overflow-hidden rounded-[0.4rem] border border-white/[0.1] bg-[#2f3137]/92 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.42)] sm:min-h-[clamp(37rem,71vh,49rem)] sm:p-7">
            <div className="pointer-events-none absolute inset-0 -z-0 bg-[#4a3f43] [transform-origin:bottom] scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

            <div className="relative z-10 overflow-hidden border border-white/[0.06]">
              <img
                src={coverA}
                alt=""
                className="h-[18rem] w-full object-cover sm:h-[20.5rem]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="relative z-10 pt-5 sm:pt-6">
              <h3 className="text-pretty font-sans text-[clamp(1.72rem,3.2vw,2.45rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-white">
                Discover the Elegance of Quartz
              </h3>
              <p className="mt-5 text-pretty text-[1rem] leading-[1.72] text-zinc-200 sm:text-[1.06rem]">
                Enhance your spaces with our premium quartz selection—perfect for countertops, backsplashes, and elegant interiors!
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/[0.08] pt-6">
              <p className="font-sans text-[1.42rem] font-semibold uppercase leading-[1.12] tracking-[0.06em] text-white/92 sm:text-[1.6rem]">Quartz</p>
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a88d70] text-white sm:h-13 sm:w-13"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M7 17 17 7M17 7h-6M17 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
