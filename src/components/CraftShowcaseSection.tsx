import kitchen1 from "@assets/kitchen1.jpg";
import kitchen2 from "@assets/kitchen2.jpg";
import kitchen3 from "@assets/kitchen3.jpg";
import kitchen4 from "@assets/kitchen4.jpg";
import kitchen5 from "@assets/kitchen 5.jpg";
import kitchen6 from "@assets/kitchen6.jpg";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const COPY_LINES = [
  "Precision Design",
  "Reliable Expertise",
  "Creative Solutions",
  "Global Sourcing",
  "Premium Surfaces",
  "Lasting Quality",
  "Trusted Guidance",
] as const;

const TICKER_DURATION_S = 11.8;

type Tile = {
  src: string;
  cls: string;
  driftX: [number, number];
  driftY: [number, number];
  imgCls?: string;
};

const TILES: readonly Tile[] = [
  { src: kitchen1, cls: "left-[-1%] top-[12%] w-[29vw] max-w-[19rem] aspect-[1.65/1]", driftX: [-12, 10], driftY: [10, -12] },
  { src: kitchen2, cls: "left-[40%] top-[4.5%] w-[24vw] max-w-[16rem] aspect-[1.55/1]", driftX: [9, -10], driftY: [8, -8] },
  {
    src: kitchen3,
    cls: "left-[44%] top-[75%] w-[17vw] max-w-[11rem] aspect-[1/1]",
    driftX: [-8, 9],
    driftY: [12, -10],
    imgCls: "scale-[1.65]",
  },
  { src: kitchen4, cls: "left-[-2%] top-[45%] w-[20vw] max-w-[13rem] aspect-[1/1]", driftX: [8, -9], driftY: [10, -12] },
  { src: kitchen5, cls: "right-[-1%] top-[16%] w-[26vw] max-w-[17rem] aspect-[1.58/1]", driftX: [-10, 12], driftY: [9, -10] },
  {
    src: kitchen6,
    cls: "right-[-2%] top-[59%] w-[21vw] max-w-[13.5rem] aspect-[1/1]",
    driftX: [11, -11],
    driftY: [10, -12],
    imgCls: "scale-[1.8]",
  },
] as const;

/** Scroll ile drift: tek useTransform / döşeme (yay yok = scroll bitince ekstra kare yok). */
function ScrollTile({ tile, progress }: { tile: Tile; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], tile.driftX);
  const y = useTransform(progress, [0, 1], tile.driftY);

  return (
    <motion.figure
      className={`absolute z-20 overflow-hidden [transform:translateZ(0)] [backface-visibility:hidden] ${tile.cls}`}
      style={{ x, y }}
    >
      <img
        src={tile.src}
        alt=""
        className={`h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden] ${tile.imgCls ?? ""}`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 40vw, 18rem"
      />
    </motion.figure>
  );
}

function TickerStatic() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {COPY_LINES.map((line) => (
        <p
          key={line}
          className="h-[92px] whitespace-nowrap text-white"
          style={{ fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function TickerAnimated() {
  const phaseStep = TICKER_DURATION_S / COPY_LINES.length;

  return (
    <div
      className="craft-ticker-track flex flex-col text-center"
      style={{ fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {COPY_LINES.map((line, i) => (
        <p
          key={`a-${line}`}
          className="craft-ticker-line h-[92px] whitespace-nowrap text-white"
          style={{
            animationDelay: `${-i * phaseStep}s`,
          }}
        >
          {line}
        </p>
      ))}
      {COPY_LINES.map((line, i) => (
        <p
          key={`b-${line}`}
          className="craft-ticker-line h-[92px] whitespace-nowrap text-white"
          style={{
            animationDelay: `${-i * phaseStep}s`,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function CraftShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /** useSpring kaldırıldı — scroll ile birebir, süzülme nedeniyle ekstra frame yok */
  const clusterY = useTransform(scrollYProgress, [0, 1], [-14, 28]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#a88667] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
      aria-label="Stone Spaces craft showcase"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_115%_88%_at_50%_45%,rgba(255,255,255,0.05),rgba(0,0,0,0.08))]"
        aria-hidden
      />

      <motion.div className="relative mx-auto h-[clamp(42rem,82vh,58rem)] w-full max-w-[min(97vw,88rem)]" style={{ y: clusterY }}>
        {TILES.map((tile) => (
          <ScrollTile key={tile.src + tile.cls} tile={tile} progress={scrollYProgress} />
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative h-[clamp(20rem,36vh,25rem)] overflow-hidden text-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
            <div className="text-[clamp(2.45rem,8.2vw,5.3rem)] font-light leading-[1.03] tracking-[-0.028em]">
              {reduceMotion ? <TickerStatic /> : <TickerAnimated />}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
