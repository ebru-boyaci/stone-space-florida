import kitchen1 from "@assets/kitchen1.jpg";
import kitchen2 from "@assets/kitchen2.jpg";
import kitchen3 from "@assets/kitchen3.jpg";
import kitchen4 from "@assets/kitchen4.jpg";
import kitchen5 from "@assets/kitchen 5.jpg";
import kitchen6 from "@assets/kitchen6.jpg";
import { motion, useScroll, useSpring, useTime, useTransform, type MotionValue } from "motion/react";
import { useMemo, useRef } from "react";

const COPY_LINES = [
  "Precision Design",
  "Reliable Expertise",
  "Creative Solutions",
  "Global Sourcing",
  "Premium Surfaces",
  "Lasting Quality",
  "Trusted Guidance",
] as const;

type Tile = {
  src: string;
  cls: string;
  driftX: [number, number];
  driftY: [number, number];
  imgCls?: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

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

function ScrollTile({ tile, progress }: { tile: Tile; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], tile.driftX);
  const y = useTransform(progress, [0, 1], tile.driftY);
  // Subpixel jitter (moire/shimmer) azaltmak için hareketi piksel ızgarasına sabitle.
  const xSnapped = useTransform(x, (v) => Math.round(v));
  const ySnapped = useTransform(y, (v) => Math.round(v));

  return (
    <motion.figure
      className={`absolute z-20 overflow-hidden [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform ${tile.cls}`}
      style={{ x: xSnapped, y: ySnapped }}
    >
      <img
        src={tile.src}
        alt=""
        className={`h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden] ${tile.imgCls ?? ""}`}
        loading="lazy"
        decoding="async"
      />
    </motion.figure>
  );
}

function TickerLine({
  line,
  index,
  tickerY,
  lineStep,
  loopHeight,
}: {
  line: string;
  index: number;
  tickerY: MotionValue<number>;
  lineStep: number;
  loopHeight: number;
}) {
  /**
   * Merkez bandına yaklaşırken beyazlaşır, merkezden uzaklaşıp yukarı kayarken tekrar solar.
   * Böylece "aşağıdan ortaya beyazlaşma, yukarıda eski tona dönme" akışı oluşur.
   */
  const opacity = useTransform(tickerY, (y) => {
    const focusY = lineStep * 2.45;
    const raw = index * lineStep + y;
    const wrapped = ((raw % loopHeight) + loopHeight) % loopHeight;
    const distance = Math.min(Math.abs(wrapped - focusY), loopHeight - Math.abs(wrapped - focusY));
    const whiten = clamp01(1 - distance / (lineStep * 1.55));
    return 0.28 + whiten * 0.72;
  });

  return (
    <motion.p className="h-[92px] whitespace-nowrap text-white" style={{ opacity }}>
      {line}
    </motion.p>
  );
}

export function CraftShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const time = useTime();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const softProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  // Referanstaki gibi sadece scroll ile hareket: grup hafif aşağı inerken yatayda küçük sapmalar alır.
  const clusterY = useTransform(softProgress, [0, 1], [-14, 28]);
  // Metin scroll'dan bağımsız sürekli döner (yatay silindir / X ekseni hissi).
  const LINE_STEP = 92;
  const LOOP_HEIGHT = COPY_LINES.length * LINE_STEP;
  const tickerY = useTransform(time, (t) => -((t * 0.055) % LOOP_HEIGHT));
  const tickerLines = useMemo(() => [...COPY_LINES, ...COPY_LINES, ...COPY_LINES], []);

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
          <ScrollTile key={tile.src + tile.cls} tile={tile} progress={softProgress} />
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative h-[clamp(20rem,36vh,25rem)] overflow-hidden text-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
            <motion.div
              className="text-[clamp(2.45rem,8.2vw,5.3rem)] font-light leading-[1.03] tracking-[-0.028em]"
              style={{
                y: tickerY,
                fontFamily: "\"Inter\", \"Helvetica Neue\", Helvetica, Arial, sans-serif",
              }}
            >
              {tickerLines.map((line, i) => (
                <TickerLine
                  key={`${line}-${i}`}
                  line={line}
                  index={i}
                  tickerY={tickerY}
                  lineStep={LINE_STEP}
                  loopHeight={LOOP_HEIGHT}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
