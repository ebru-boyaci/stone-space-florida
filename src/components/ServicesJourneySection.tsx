import bg from "@assets/bg.png";
import kitchen3 from "@assets/kitchen3.jpg";
import kitchen4 from "@assets/kitchen4.jpg";
import kitchen6 from "@assets/kitchen6.jpg";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useMemo, useRef } from "react";

const cardBody =
  "Whether it's a residential or commercial project, our talented designers will create customized interiors that reflect your style";

const CARD_TEXT_CLASS =
  "max-w-[20rem] text-pretty text-[1.375rem] font-normal leading-[1.52] tracking-[-0.02em] text-white sm:text-[1.4375rem]";
const CARD_NUM_CLASS =
  "flex size-[2.875rem] shrink-0 items-center justify-center rounded-full border border-white/65 text-[0.9375rem] font-normal text-white";

/** Kavis `d` güncellemesini hafif kısaltır (yarım birim adımla daha az string üretimi). */
const CURVE_PATH_STATIC =
  "M0 0 Q500 0 1000 0 L1000 180 L0 180 Z";

export function ServicesJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Tek useScroll: iki ayrı offset ile çift scroll dinleyicisi + çift layout maliyetini kaldırır.
   * Kavis + kart parallax aynı progress’ten türetilir (offset: start end → end start).
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /**
   * Eski curveProgress (start start) daha “erken” bitiyordu; unified progress’in ilk bandına map’liyoruz.
   * useSpring KALDIRILDI: her karede yay integrasyonu + path morph birleşince ana thread’i boğuyordu.
   */
  const curveDrive = useTransform(scrollYProgress, [0, 0.3], [0, 1], { clamp: true });
  const edgeRaw = useTransform(curveDrive, [0, 0.82], [88, 0], { clamp: true });
  const edgeRounded = useTransform(edgeRaw, (v) => Math.round(v * 2) / 2);

  const curvePath = useMotionTemplate`M0 ${edgeRounded} Q500 0 1000 ${edgeRounded} L1000 180 L0 180 Z`;

  const yLeftRange = useMemo<[number, number]>(
    () => (reduceMotion ? [0, 0] : [36, -12]),
    [reduceMotion],
  );
  const yCenterRange = useMemo<[number, number]>(
    () => (reduceMotion ? [0, 0] : [20, -32]),
    [reduceMotion],
  );
  const yRightRange = useMemo<[number, number]>(
    () => (reduceMotion ? [0, 0] : [-28, 24]),
    [reduceMotion],
  );

  const cardYL = useTransform(scrollYProgress, [0.12, 0.88], yLeftRange);
  const cardYC = useTransform(scrollYProgress, [0.12, 0.88], yCenterRange);
  const cardYR = useTransform(scrollYProgress, [0.12, 0.88], yRightRange);

  return (
    <section
      ref={sectionRef}
      className="relative h-[190vh] overflow-visible bg-[#343434]"
      aria-label="Services background"
    >
      {/* path morph sadece reduceMotion kapalıyken — aksi sabit SVG ( sıfır layout thrash ). */}
      {reduceMotion ? (
        <svg
          className="pointer-events-none absolute left-0 -top-[180px] z-[30] w-full"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          style={{ height: 180 }}
          aria-hidden
        >
          <path d={CURVE_PATH_STATIC} fill="#343434" />
        </svg>
      ) : (
        <motion.svg
          className="pointer-events-none absolute left-0 -top-[180px] z-[30] w-full [transform:translateZ(0)]"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          style={{ height: 180 }}
          aria-hidden
        >
          <motion.path d={curvePath} fill="#343434" />
        </motion.svg>
      )}

      <div className="relative h-full overflow-hidden bg-[#343434]">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#343434]/35" />

        <div className="relative z-10 mx-auto mt-[clamp(7rem,14vh,11rem)] flex w-full max-w-[min(94vw,58rem)] flex-col items-center px-6 text-center sm:px-10">
          <h2
            className="font-hero-script text-[clamp(4rem,10.5vw,8.8rem)] leading-[0.93] text-[#f2f0ec] [text-shadow:0_2px_26px_rgba(0,0,0,0.45)]"
            style={{
              fontFamily: '"IBM Plex Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 300,
            }}
          >
            Discover our
            <br />
            services
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-[1.05rem] leading-[1.72] text-[#e3dfd8]/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] sm:text-[1.18rem]">
            From material selection to final detailing, we craft spaces that feel refined, functional,
            and uniquely yours.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-[clamp(6rem,12vh,10rem)] grid w-full max-w-[min(96vw,95rem)] grid-cols-1 gap-6 px-6 sm:px-10 lg:mt-[clamp(5rem,9vh,8.5rem)] lg:block lg:h-[90rem] lg:max-w-[94rem] lg:px-8">
          <motion.article
            style={{ y: cardYL, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:left-0 lg:top-0 lg:w-[42%] lg:-translate-x-[62%]"
          >
            <img
              src={kitchen6}
              alt=""
              className="h-full w-full scale-[2.65] object-cover [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/38" />
            <div className="absolute inset-0 flex flex-col justify-center items-end p-5 sm:p-6 lg:pl-[28%] lg:pr-7 lg:py-8">
              <div className="flex w-full max-w-[20rem] flex-col gap-[0.875rem] items-end text-right">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  1
                </div>
                <p className={CARD_TEXT_CLASS}>{cardBody}</p>
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYC, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:left-1/2 lg:top-[9rem] lg:w-[49%] lg:-translate-x-1/2"
          >
            <img
              src={kitchen4}
              alt=""
              className="h-full w-full scale-[2.65] object-cover [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 49vw"
            />
            <div className="absolute inset-0 bg-black/42" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-6 lg:px-8">
              <div className="flex max-w-[20rem] flex-col gap-[0.875rem] items-center text-center">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  2
                </div>
                <p className={CARD_TEXT_CLASS}>{cardBody}</p>
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYR, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:right-0 lg:top-[22rem] lg:w-[42%] lg:translate-x-[62%]"
          >
            <img
              src={kitchen3}
              alt=""
              className="h-full w-full scale-[2.65] object-cover [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/38" />
            <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-6 lg:justify-center lg:pl-7 lg:pr-[30%] lg:pt-4">
              <div className="flex w-full max-w-[20rem] flex-col gap-[0.875rem]">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  3
                </div>
                <p className={CARD_TEXT_CLASS}>{cardBody}</p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
