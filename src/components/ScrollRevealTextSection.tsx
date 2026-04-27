import moodBg from "@assets/stone.png";
import type { MotionValue } from "motion/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { memo, useRef } from "react";

/** Arka plan: `stone.png` + üstten alta gradient kararma + vignette. */
const bgImage = moodBg;

const LINE_PRIMARY = "Nature's";
const LINE_REVEAL = "Finest Stones, Elevating Your Space!";

/** Scroll'un hangi aralığında tüm harf dizisi boyanıyor (0–1 global progress). */
const LETTER_SCROLL_START = 0.07;
const LETTER_SCROLL_END = 0.78;

function letterFadeRange(index: number, total: number): [number, number] {
  if (total <= 0) return [LETTER_SCROLL_START, LETTER_SCROLL_END];
  const span = LETTER_SCROLL_END - LETTER_SCROLL_START;
  const slice = span / total;
  const overlap = slice * 0.42;
  const start = LETTER_SCROLL_START + index * slice - overlap;
  const end = LETTER_SCROLL_START + (index + 1) * slice;
  return [Math.max(LETTER_SCROLL_START - 0.02, start), Math.min(LETTER_SCROLL_END + 0.02, end)];
}

const ScrollLetter = memo(function ScrollLetter({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [from, to] = letterFadeRange(index, total);
  const whiteOpacity = useTransform(scrollYProgress, [from, to], [0, 1], { clamp: true });

  const display = char === " " ? "\u00A0" : char;

  return (
    <span className="relative inline-block align-baseline">
      <span className="text-zinc-700" aria-hidden="true">
        {display}
      </span>
      <motion.span className="absolute left-0 top-0 text-white" style={{ opacity: whiteOpacity }}>
        {display}
      </motion.span>
    </span>
  );
});

function AnimatedWordsLine({
  line,
  baseCharIndex,
  totalChars,
  scrollYProgress,
  lineKey,
}: {
  line: string;
  baseCharIndex: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
  lineKey: string;
}) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  let idx = baseCharIndex;

  return (
    <>
      {words.map((word, wi) => (
        <span key={`${lineKey}-tok-${wi}`} className="inline-block max-w-full align-baseline">
          {wi > 0 ? (
            <ScrollLetter
              key={`${lineKey}-sp-${wi}`}
              char=" "
              index={idx++}
              total={totalChars}
              scrollYProgress={scrollYProgress}
            />
          ) : null}
          <span className="inline-block whitespace-nowrap align-baseline">
            {[...word].map((char, ci) => (
              <ScrollLetter
                key={`${lineKey}-ch-${wi}-${ci}`}
                char={char}
                index={idx++}
                total={totalChars}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </span>
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

  const totalCharCount = LINE_PRIMARY.length + LINE_REVEAL.length;

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="relative min-h-[260vh]">
        <div className="sticky top-0 flex h-[min(100dvh,1080px)] max-h-[100dvh] w-full items-center justify-center overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.46] saturate-[0.74] contrast-[1.05] sm:brightness-[0.5]"
            aria-hidden
            decoding="async"
          />

          {/* Üst koyu → alta doğru görünürlük artar */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.72)_18%,rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0)_100%)]"
            aria-hidden
          />

          {/* Hafif yan köşe kararması */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_48%,transparent_35%,rgba(0,0,0,0.38)_88%,rgba(0,0,0,0.55)_100%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-[min(92vw,82rem)] px-6 text-center sm:max-w-[min(90vw,88rem)] sm:px-10">
            <h2 className="font-contact-display text-[clamp(3.95rem,11.5vw,6.75rem)] font-normal leading-[1.1] tracking-[-0.04em] sm:text-[clamp(4.4rem,10.4vw,7.5rem)] sm:leading-[1.08] md:text-[clamp(4.85rem,9.75vw,8.2rem)]">
              {reduceMotion ? (
                <>
                  <span className="block text-white">{LINE_PRIMARY}</span>
                  <span className="mt-5 block text-white sm:mt-6">{LINE_REVEAL}</span>
                </>
              ) : (
                <>
                  <span className="block">
                    <AnimatedWordsLine
                      line={LINE_PRIMARY}
                      baseCharIndex={0}
                      totalChars={totalCharCount}
                      scrollYProgress={scrollYProgress}
                      lineKey="p"
                    />
                  </span>
                  <span className="mt-5 block sm:mt-6">
                    <AnimatedWordsLine
                      line={LINE_REVEAL}
                      baseCharIndex={LINE_PRIMARY.length}
                      totalChars={totalCharCount}
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
