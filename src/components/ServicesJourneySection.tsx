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

const CABINET_TITLE = "Transform Your Kitchen with Cabinets";
const CABINET_BODY =
  "Kitchen cabinets are the ideal choice for creating a stylish, functional kitchen tailored to your space. Whether you're remodeling your current kitchen or building a new one, our cabinet line provides flexibility and versatility to fit your exact needs.";

/** Kart 2 — ücretsiz danışmanlık / iletişim */
const CONSULT_HEADLINE = "Contact us & unlock your complimentary stone consultation";
const CONSULT_PARAGRAPHS = [
  "Finding the right stone should feel exciting, not overwhelming. Reach out and we’ll open with a free, no-pressure consult: we listen, narrow the field, and point you toward surfaces that balance beauty, wear, and budget.",
  "From rare natural slabs to refined engineered options, we curate materials that elevate homes and commercial spaces alike—so you walk away with clarity, confidence, and something worth showing off.",
] as const;

/** Kart 3 — ücretsiz danışmanlık hizmeti */
const FREE_CONSULT_TITLE = "Free Consultation Service";
const FREE_CONSULT_LEAD = "Take the first step toward the space you've been dreaming of — with us beside you.";
const FREE_CONSULT_PARAGRAPHS = [
  "Our team starts with your story: how you move through a room, how light hits a counter, what “finished” really means for your project. Then we translate that into stone directions that feel tailored — not picked from a generic menu.",
  "You get candid guidance on material performance, tonal pairings, and scope — so timelines and budgets stay honest. Reach out today: the consultation is on us; the payoff is knowing your next move before you swipe a credit card.",
] as const;

const CARD_NUM_CLASS =
  "flex size-[2.875rem] shrink-0 items-center justify-center rounded-full bg-white/[0.18] text-[0.9375rem] font-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[3px]";

type PitchAlign = "left" | "center" | "right";

const pitchTitle =
  "text-pretty font-sans text-[clamp(1.34rem,3.35vw,1.78rem)] font-semibold leading-[1.16] tracking-[-0.02em] text-zinc-50 [text-shadow:0_2px_28px_rgba(0,0,0,0.62),0_1px_0_rgba(0,0,0,0.2)]";
const pitchLead =
  "max-w-[25rem] text-pretty font-sans text-[1.02rem] font-medium italic leading-[1.5] tracking-[0.01em] text-[#ece6dc]/95 sm:text-[1.085rem] [text-shadow:0_1px_20px_rgba(0,0,0,0.52)]";
const pitchBody =
  "max-w-[25rem] text-pretty font-sans font-normal text-[1.035rem] leading-[1.66] tracking-[0.01em] text-zinc-100/95 sm:text-[1.11rem] sm:leading-[1.6] [text-shadow:0_1px_22px_rgba(0,0,0,0.55)]";

function ServiceCardPitch({
  alignment,
  title,
  lead,
  paragraphs,
  ctaLabel,
}: {
  alignment: PitchAlign;
  title: string;
  lead?: string;
  paragraphs: readonly string[];
  ctaLabel?: string;
}) {
  const wrapper =
    alignment === "center"
      ? "items-center text-center"
      : alignment === "right"
        ? "items-end text-right"
        : "items-start text-left";
  const ctaAlign =
    alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : "";

  const label = ctaLabel ?? "Contact us";

  return (
    <div className={`flex max-w-[min(94vw,28rem)] flex-col gap-3.5 sm:gap-[1.15rem] ${wrapper}`}>
      <h3 className={pitchTitle}>{title}</h3>
      {lead ? <p className={pitchLead}>{lead}</p> : null}
      <div className={`flex flex-col gap-3.5 ${alignment === "center" ? "items-center" : ""}`}>
        {paragraphs.map((block, i) => (
          <p key={i} className={pitchBody}>
            {block}
          </p>
        ))}
      </div>
      <a
        href="#contact"
        className={`mt-0.5 inline-flex w-fit items-center gap-2 rounded-md bg-black/[0.54] px-6 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#ece6dc] shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-[3px] transition-[background-color,color,transform] duration-300 hover:bg-[#b9a086]/38 hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#b9a086] sm:text-[0.875rem] ${ctaAlign}`}
      >
        {label}
        <span aria-hidden className="text-[1.05em] font-light opacity-95">
          →
        </span>
      </a>
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
                  title={CABINET_TITLE}
                  paragraphs={[CABINET_BODY]}
                  ctaLabel="Read more"
                />
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYC, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:left-1/2 lg:top-[9rem] lg:w-[49%] lg:-translate-x-1/2"
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
                  title={CONSULT_HEADLINE}
                  paragraphs={CONSULT_PARAGRAPHS}
                  ctaLabel="Book free consultation"
                />
              </div>
            </div>
          </motion.article>

          <motion.article
            style={{ y: cardYR, willChange: "transform" }}
            className="relative aspect-square overflow-hidden bg-[#2b2b2b] [transform:translateZ(0)] lg:absolute lg:right-0 lg:top-[22rem] lg:w-[42%] lg:translate-x-[62%]"
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
                  title={FREE_CONSULT_TITLE}
                  lead={FREE_CONSULT_LEAD}
                  paragraphs={FREE_CONSULT_PARAGRAPHS}
                  ctaLabel="Get started"
                />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
