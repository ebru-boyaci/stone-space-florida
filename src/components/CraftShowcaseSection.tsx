import kitchen1 from "@assets/craft/kitchen1.jpg";
import kitchen2 from "@assets/craft/kitchen2.jpg";
import kitchen3 from "@assets/craft/kitchen3.jpg";
import kitchen4 from "@assets/craft/kitchen4.jpg";
import kitchen5 from "@assets/craft/kitchen5.jpg";
import kitchen6 from "@assets/craft/kitchen6.jpg";
import { useEffect, useRef, useState, type RefObject } from "react";

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
  imgCls?: string;
  /** İlk birkaç karo — tarayıcı önceliği */
  priority?: boolean;
};

const TILES: readonly Tile[] = [
  {
    src: kitchen1,
    cls: "left-[-1%] top-[12%] w-[29vw] max-w-[19rem] aspect-[1.65/1]",
    priority: true,
  },
  {
    src: kitchen2,
    cls: "left-[40%] top-[4.5%] w-[24vw] max-w-[16rem] aspect-[1.55/1]",
    priority: true,
  },
  {
    src: kitchen3,
    cls: "left-[44%] top-[75%] w-[17vw] max-w-[11rem] aspect-[1/1]",
    imgCls: "scale-[1.65]",
    priority: true,
  },
  { src: kitchen4, cls: "left-[-2%] top-[45%] w-[20vw] max-w-[13rem] aspect-[1/1]" },
  { src: kitchen5, cls: "right-[-1%] top-[16%] w-[26vw] max-w-[17rem] aspect-[1.58/1]" },
  {
    src: kitchen6,
    cls: "right-[-2%] top-[59%] w-[21vw] max-w-[13.5rem] aspect-[1/1]",
    imgCls: "scale-[1.8]",
  },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Bölüm viewport’a yaklaşınca erken tetikle — görseller scroll’da paralel insin. */
function useSectionNear(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 35% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return near;
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
  const reduceMotion = usePrefersReducedMotion();
  const near = useSectionNear(sectionRef);
  const loadImages = near || reduceMotion;

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#a88667] pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 ${
        loadImages ? "craft-showcase--visible" : ""
      }`}
      aria-label="Stone Spaces craft showcase"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_115%_88%_at_50%_45%,rgba(255,255,255,0.05),rgba(0,0,0,0.08))]"
        aria-hidden
      />

      <div className="relative mx-auto h-[clamp(42rem,82vh,58rem)] w-full max-w-[min(97vw,88rem)]">
        {TILES.map((tile, index) => (
          <figure key={tile.src + tile.cls} className={`craft-tile absolute z-20 overflow-hidden ${tile.cls}`}>
            {loadImages ? (
              <img
                src={tile.src}
                alt=""
                className={`h-full w-full object-cover ${tile.imgCls ?? ""}`}
                loading={tile.priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={tile.priority ? "high" : "auto"}
                sizes="(max-width: 768px) 40vw, 18rem"
              />
            ) : (
              <span className="absolute inset-0 bg-black/10" aria-hidden />
            )}
          </figure>
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative h-[clamp(20rem,36vh,25rem)] w-full max-w-[min(92vw,48rem)] overflow-hidden text-center">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[20%] bg-gradient-to-b from-[#a88667] to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[20%] bg-gradient-to-t from-[#a88667] to-transparent"
              aria-hidden
            />
            <div className="text-[clamp(2.45rem,8.2vw,5.3rem)] font-light leading-[1.03] tracking-[-0.028em]">
              {reduceMotion ? <TickerStatic /> : <TickerAnimated />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
