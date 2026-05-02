import imgA from "@assets/hera.png";
import imgB from "@assets/mona.png";
import imgC from "@assets/vera.jpg";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useLayoutEffect, useRef } from "react";

const COPY =
  "We bring you the best quality stones from around the world, so you can transform your kitchen into a thing of beauty. With more than 60 different stones, and options from Asia, Europe and America—we have the perfect stones for any style and budget.";

const IMAGES = [imgA, imgB, imgC] as const;

export function ScrollGallery() {
  /** Sadece yatay galeri şeridi — scroll animasyonu bu bölüme bağlı; üstteki metin normal sayfa akışında. */
  const gallerySectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef({ start: 0, end: 0 });
  const reduceMotion = useReducedMotion();

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const slides = track.querySelectorAll<HTMLElement>("[data-gallery-slide]");
    if (slides.length < 3) return;

    const [first, , third] = slides;
    const vw = wrap.clientWidth;
    if (vw <= 0) return;

    const firstCenter = first.offsetLeft + first.offsetWidth / 2;
    const thirdCenter = third.offsetLeft + third.offsetWidth / 2;

    rangeRef.current = {
      start: -firstCenter,
      end: vw - thirdCenter,
    };
  }, []);

  useLayoutEffect(() => {
    let rafId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure());
    };

    scheduleMeasure();
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ro = new ResizeObserver(() => scheduleMeasure());
    ro.observe(wrap);

    const onResize = () => scheduleMeasure();
    window.addEventListener("resize", onResize);

    const imgs = trackRef.current?.querySelectorAll("img");
    const onImg = () => scheduleMeasure();
    imgs?.forEach((img) => img.addEventListener("load", onImg));

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      imgs?.forEach((img) => img.removeEventListener("load", onImg));
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: gallerySectionRef,
    offset: ["start start", "end end"],
  });

  /** Scroll örneklemesi bazen frame başına sıçrar; hafif spring ile yatay kaydırma daha akıcı (reduceMotion’da kapalı). */
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 42,
    mass: 0.12,
    restDelta: 0.0005,
  });

  const progressForTrack = reduceMotion ? scrollYProgress : easedProgress;

  const xPx = useTransform(progressForTrack, (p) => {
    const { start, end } = rangeRef.current;
    if (reduceMotion) return start;
    return start + p * (end - start);
  });

  return (
    <>
      <section
        id="approach"
        className="relative scroll-mt-40 mt-[clamp(5.5rem,14vw,14rem)] mb-[clamp(5.5rem,14vw,14rem)] bg-black pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:mt-[clamp(7rem,16vw,17rem)] sm:mb-[clamp(7rem,16vw,17rem)] sm:pl-10 sm:pr-10 md:mt-[clamp(8.5rem,18vw,20rem)] md:mb-[clamp(8.5rem,18vw,20rem)] lg:mt-[clamp(10rem,20vw,24rem)] lg:mb-[clamp(10rem,20vw,24rem)]"
      >
        <div className="mx-auto flex min-h-[min(32vh,420px)] w-full max-w-6xl flex-col justify-center py-[clamp(2rem,7vw,5.5rem)]">
          <p className="relative z-30 text-balance text-center font-contact-display text-[clamp(1.15rem,3.85vw,2.25rem)] font-normal leading-[1.5] tracking-normal text-contact-display antialiased sm:leading-[1.48] [text-shadow:0_2px_32px_rgba(0,0,0,0.75)]">
            {COPY}
          </p>
        </div>
      </section>

      <section
        ref={gallerySectionRef}
        className="relative z-0 bg-black pb-12 sm:pb-16 md:pb-20"
      >
        <div className="relative min-h-[320vh]">
          <div className="sticky top-0 flex h-[100dvh] max-h-[100dvh] w-full min-h-0 flex-col overflow-x-clip bg-black">
            <div
              ref={wrapRef}
              className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-clip pl-[max(0.5rem,env(safe-area-inset-left,0px))] pr-[max(0.5rem,env(safe-area-inset-right,0px))] pb-6 pt-10 sm:pb-8 sm:pl-2 sm:pr-2 sm:pt-14 md:pb-10 md:pt-16"
            >
              <motion.div
                ref={trackRef}
                className="flex min-h-[min(42vh,480px)] w-max flex-1 transform-gpu flex-row items-stretch gap-4 will-change-transform pl-[2.5vw] pr-[2.5vw] sm:gap-7 sm:pl-[3vw] sm:pr-[3vw] md:gap-9"
                style={{ x: xPx }}
              >
                {IMAGES.map((src, i) => (
                  <div
                    key={i}
                    data-gallery-slide
                    className="relative h-full min-h-0 w-[min(94vw,1580px)] shrink-0 overflow-hidden border border-white/[0.1] md:w-[min(92vw,1580px)]"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full min-h-0 w-full object-cover"
                      draggable={false}
                      decoding="async"
                    />
                  </div>
                ))}
              </motion.div>

              <div
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/92 via-black/58 to-transparent sm:from-black/88 sm:via-black/50"
                aria-hidden
              />

              <div className="pointer-events-none absolute inset-0 z-[35] flex flex-col items-center justify-center px-6 text-center sm:px-10">
                <h2 className="max-w-[min(96vw,56rem)] font-contact-display text-[clamp(3rem,9.5vw,5.75rem)] font-normal lowercase leading-[0.88] tracking-[-0.055em] text-white antialiased [text-shadow:0_4px_56px_rgba(0,0,0,0.65),0_2px_20px_rgba(0,0,0,0.5)] sm:text-[clamp(3.65rem,10.5vw,6.6rem)] md:text-[clamp(4rem,10vw,7.25rem)]">
                  <span className="block">beautifully crafted</span>
                  <span className="mt-[0.35em] block text-[clamp(2.1rem,6.75vw,4.25rem)] sm:text-[clamp(2.55rem,7.25vw,5rem)] md:text-[clamp(2.85rem,6.75vw,5.5rem)]">
                    designed to last
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
