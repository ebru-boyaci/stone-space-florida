import { WebflowArrowIcon, webflowForwardFlip } from "@/components/WebflowArrowIcon";

import bg from "@assets/bg.png";
import serviceBg1 from "@assets/bg1.png";
import serviceBg2 from "@assets/bg2.png";
import serviceBg3 from "@assets/bg3.png";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";

const CARD_1_TITLE = "Quartz & premium surfaces";
const CARD_2_TITLE = "Our completed projects";
const CARD_3_TITLE = "Free consultation";

const CARD_NUM_CLASS =
  "flex size-[2.875rem] shrink-0 items-center justify-center rounded-full bg-white/[0.18] text-[0.9375rem] font-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[3px]";

type PitchAlign = "left" | "center" | "right";

const pitchTitle =
  "text-pretty font-sans text-[clamp(1.62rem,3.85vw,2.22rem)] font-medium leading-[1.16] tracking-[-0.028em] text-zinc-100/92 [text-shadow:0_2px_26px_rgba(0,0,0,0.55)]";

const ctaButton =
  "mt-5 inline-flex w-fit items-center gap-2.5 rounded-full bg-sand px-7 py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.42),0_0_0_1px_rgba(255,255,255,0.08)] transition-[background-color,transform,color,box-shadow] duration-300 hover:bg-sand-hover hover:shadow-[0_12px_36px_rgba(0,0,0,0.48)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white/40 sm:text-[0.875rem] sm:tracking-[0.15em]";

function ServiceCardPitch({
  alignment,
  title,
  href,
  ctaLabel,
  internal = false,
}: {
  alignment: PitchAlign;
  title: string;
  href: string;
  ctaLabel: string;
  internal?: boolean;
}) {
  const wrapper =
    alignment === "center"
      ? "items-center text-center"
      : alignment === "right"
        ? "items-end text-right"
        : "items-start text-left";
  const ctaAlign =
    alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : "";
  const ctaClassName = `${ctaButton} ${ctaAlign}`;
  const arrow = (
    <WebflowArrowIcon
      flip={webflowForwardFlip()}
      className="relative top-[0.06em] inline-block h-[0.85em] w-auto shrink-0 text-white/95 sm:h-[0.82em]"
    />
  );

  return (
    <div className={`flex max-w-[min(92vw,26rem)] flex-col gap-1 ${wrapper}`}>
      <h3 className={pitchTitle}>{title}</h3>
      {internal ? (
        <Link to={href} className={ctaClassName}>
          {ctaLabel}
          {arrow}
        </Link>
      ) : (
        <a href={href} className={ctaClassName}>
          {ctaLabel}
          {arrow}
        </a>
      )}
    </div>
  );
}

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
      className="relative min-h-[155vh] overflow-visible bg-[#343434] lg:min-h-0 lg:h-[165vh]"
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

        <div className="relative z-10 mx-auto mt-[clamp(4.75rem,10vh,8.5rem)] flex w-full max-w-[min(94vw,58rem)] flex-col items-center pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pb-2 text-center sm:px-10">
          <h2
            className="font-hero-script text-[clamp(4.5rem,11.1vw,10.15rem)] leading-[0.91] tracking-[-0.032em] text-[#f2f0ec] [text-shadow:0_2px_26px_rgba(0,0,0,0.45)]"
            style={{
              fontFamily: '"IBM Plex Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 300,
            }}
          >
            Discover our
            <br />
            services
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[1.02rem] leading-[1.65] text-[#e3dfd8]/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] sm:mt-6 sm:text-[1.08rem]">
            From material selection to final detailing, we craft spaces that feel refined, functional,
            and uniquely yours.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-[clamp(8rem,13vh,15rem)] grid w-full max-w-[min(96vw,95rem)] grid-cols-1 gap-5 pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:px-10 lg:mt-[clamp(8rem,11vh,12rem)] lg:block lg:h-[76rem] lg:max-w-[94rem] lg:px-8">
          <motion.article
            style={{ y: cardYL, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:left-0 lg:top-[4rem] lg:w-[42%] lg:-translate-x-[62%]"
          >
            <img
              src={serviceBg1}
              alt=""
              className="h-full w-full object-cover object-center [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/56" aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-center items-end p-5 sm:p-6 lg:pl-[28%] lg:pr-7 lg:py-8">
              <div className="flex w-full max-w-[min(92vw,28rem)] flex-col gap-[0.875rem] items-end text-right">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  1
                </div>
                <ServiceCardPitch
                  alignment="right"
                  title={CARD_1_TITLE}
                  href="/catalog/quartz"
                  ctaLabel="Explore catalog"
                  internal
                />
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYC, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:left-1/2 lg:top-[14rem] lg:w-[49%] lg:-translate-x-1/2"
          >
            <img
              src={serviceBg2}
              alt=""
              className="h-full w-full object-cover object-center [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 49vw"
            />
            <div className="absolute inset-0 bg-black/58" aria-hidden />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-6 lg:px-8">
              <div className="flex w-full max-w-[min(94vw,30rem)] flex-col gap-[0.875rem] items-center text-center">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  2
                </div>
                <ServiceCardPitch
                  alignment="center"
                  title={CARD_2_TITLE}
                  href="/projects"
                  ctaLabel="View projects"
                  internal
                />
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYR, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:right-0 lg:top-[26rem] lg:w-[42%] lg:translate-x-[62%]"
          >
            <img
              src={serviceBg3}
              alt=""
              className="h-full w-full object-cover object-center [transform:translateZ(0)]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 1024px) 92vw, 45vw"
            />
            <div className="absolute inset-0 bg-black/56" aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-6 lg:justify-center lg:pl-7 lg:pr-[30%] lg:pt-4">
              <div className="flex w-full max-w-[min(92vw,28rem)] flex-col gap-[0.875rem]">
                <div className={CARD_NUM_CLASS} aria-hidden>
                  3
                </div>
                <ServiceCardPitch
                  alignment="left"
                  title={CARD_3_TITLE}
                  href="#contact"
                  ctaLabel="Get in touch"
                />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
