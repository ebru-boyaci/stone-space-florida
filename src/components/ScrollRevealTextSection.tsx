import moodBg from "@assets/stone.png";
import type { MotionValue } from "motion/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { memo, useRef } from "react";

/** Arka plan: `stone.png` + üstten alta gradient kararma + vignette. */
const bgImage = moodBg;

const LINE_PRIMARY = "Nature's";
const LINE_REVEAL = "Finest Stones, Elevating Your Space!";

const LINE_PRIMARY_WORDS = LINE_PRIMARY.trim().split(/\s+/).filter(Boolean);
const LINE_REVEAL_WORDS = LINE_REVEAL.trim().split(/\s+/).filter(Boolean);
const TOTAL_WORDS = LINE_PRIMARY_WORDS.length + LINE_REVEAL_WORDS.length;

/** Scroll (0–1) içinde kelime reveal aralığı — harf başına değil kelime başına = çok daha az Motion aboneliği. */
const REVEAL_SCROLL_START = 0.05;
const REVEAL_SCROLL_END = 0.52;

function wordFadeRange(index: number, total: number): [number, number] {
  if (total <= 0) return [REVEAL_SCROLL_START, REVEAL_SCROLL_END];
  const span = REVEAL_SCROLL_END - REVEAL_SCROLL_START;
  const slice = span / total;
  const overlap = slice * 0.38;
  const start = REVEAL_SCROLL_START + index * slice - overlap;
  const end = REVEAL_SCROLL_START + (index + 1) * slice;
  return [Math.max(REVEAL_SCROLL_START - 0.02, start), Math.min(REVEAL_SCROLL_END + 0.02, end)];
}

const ScrollWord = memo(function ScrollWord({
  word,
  index,
  total,
  scrollYProgress,
  className,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  const [from, to] = wordFadeRange(index, total);
  const whiteOpacity = useTransform(scrollYProgress, [from, to], [0, 1], { clamp: true });

  return (
    <span className={`relative inline-block align-baseline whitespace-nowrap ${className ?? ""}`}>
      <span className="text-zinc-700" aria-hidden="true">
        {word}
      </span>
      <motion.span className="absolute left-0 top-0 text-white" style={{ opacity: whiteOpacity }}>
        {word}
      </motion.span>
    </span>
  );
});

function AnimatedWordLine({
  words,
  baseWordIndex,
  totalWords,
  scrollYProgress,
  lineKey,
}: {
  words: string[];
  baseWordIndex: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
  lineKey: string;
}) {
  return (
    <>
      {words.map((word, wi) => (
        <span key={`${lineKey}-w-${wi}`} className="inline-block">
          {wi > 0 ? <span className="inline-block w-[0.3em] sm:w-[0.35em]" aria-hidden /> : null}
          <ScrollWord
            word={word}
            index={baseWordIndex + wi}
            total={totalWords}
            scrollYProgress={scrollYProgress}
          />
        </span>
      ))}
    </>
  );
}

export function ScrollRevealTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="relative min-h-[150vh]">
        <div className="sticky top-0 flex h-[min(100dvh,1080px)] max-h-[100dvh] w-full items-center justify-center overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.46] saturate-[0.74] contrast-[1.05] sm:brightness-[0.5]"
            aria-hidden
            decoding="async"
            fetchPriority="high"
          />

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.72)_18%,rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0)_100%)]"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_48%,transparent_35%,rgba(0,0,0,0.38)_88%,rgba(0,0,0,0.55)_100%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-[min(92vw,82rem)] pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] text-center sm:max-w-[min(90vw,88rem)] sm:px-10">
            <h2 className="font-contact-display text-[clamp(2.35rem,8.5vw,6.75rem)] font-normal leading-[1.14] tracking-[-0.04em] sm:text-[clamp(4.4rem,10.4vw,7.5rem)] sm:leading-[1.08] md:text-[clamp(4.85rem,9.75vw,8.2rem)]">
              {reduceMotion ? (
                <>
                  <span className="block text-white">{LINE_PRIMARY}</span>
                  <span className="mt-5 block text-white sm:mt-6">{LINE_REVEAL}</span>
                </>
              ) : (
                <>
                  <span className="block">
                    <AnimatedWordLine
                      words={LINE_PRIMARY_WORDS}
                      baseWordIndex={0}
                      totalWords={TOTAL_WORDS}
                      scrollYProgress={scrollYProgress}
                      lineKey="p"
                    />
                  </span>
                  <span className="mt-5 block sm:mt-6">
                    <AnimatedWordLine
                      words={LINE_REVEAL_WORDS}
                      baseWordIndex={LINE_PRIMARY_WORDS.length}
                      totalWords={TOTAL_WORDS}
                      scrollYProgress={scrollYProgress}
                      lineKey="r"
                    />
                  </span>
                </>
              )}
            </h2>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
