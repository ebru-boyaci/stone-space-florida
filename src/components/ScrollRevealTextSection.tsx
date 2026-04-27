import moodBg from "@assets/stone.png";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Arka plan: `stone.png` + vignette. */
const bgImage = moodBg;

const LINE_PRIMARY = "Where light meets stone,";
const LINE_REVEAL = "space finds its calm.";

export function ScrollRevealTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const reveal = useTransform(scrollYProgress, [0.08, 0.45, 0.72], [0, 1, 1]);

  const line2Opacity = useTransform(reveal, (t) => 0.12 + t * 0.88);
  const line1Opacity = useTransform(reveal, (t) => 0.88 + t * 0.12);

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="relative min-h-[220vh]">
        <div className="sticky top-0 flex h-[min(100dvh,1080px)] max-h-[100dvh] w-full items-center justify-center overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.42] saturate-[0.72] contrast-[1.06] sm:brightness-[0.46]"
            aria-hidden
            decoding="async"
          />

          {/* Vinyet + koyu kenar — metin için kontrast */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_42%,transparent_25%,rgba(0,0,0,0.78)_78%,#000_100%)]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[min(96vw,48rem)] px-6 text-center sm:max-w-[min(92vw,52rem)] sm:px-10">
            <h2 className="font-contact-display text-[clamp(1.85rem,5.8vw,3.15rem)] font-normal leading-[1.12] tracking-[-0.04em] sm:leading-[1.1]">
              {reduceMotion ? (
                <>
                  <span className="block text-white">{LINE_PRIMARY}</span>
                  <span className="mt-4 block text-white">{LINE_REVEAL}</span>
                </>
              ) : (
                <>
                  <motion.span className="block text-white" style={{ opacity: line1Opacity }}>
                    {LINE_PRIMARY}
                  </motion.span>
                  <motion.span className="mt-4 block text-white" style={{ opacity: line2Opacity }}>
                    {LINE_REVEAL}
                  </motion.span>
                </>
              )}
            </h2>
          </div>

          {/* Alt bölüm geçişine yumuşak kenar (referansa yakın) */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
