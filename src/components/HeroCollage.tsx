import fila from "@assets/fila.png";
import hera from "@assets/hera.png";
import lora from "@assets/lora.png";
import marte from "@assets/marte.png";
import mona from "@assets/mona.png";
import vera from "@assets/vera.jpg";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { MutableRefObject, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

export const HERO_EXIT_EVENT = "stone-hero-exit";

function emitHeroExit(p: number) {
  window.dispatchEvent(new CustomEvent(HERO_EXIT_EVENT, { detail: { p } }));
}

function easeOutCubic(t: number) {
  return 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;
}

function easeInCubic(t: number) {
  return Math.min(1, Math.max(0, t)) ** 3;
}

const TILES: {
  src: string;
  rest: { x: number; y: number };
  corner: { x: number; y: number };
  spreadEnd: number;
  exitBoost: number;
  fadeStart: number;
  /** Katman: merkez dikey + üstte sol şerit arkada, yan/altta önde */
  zClass: string;
  /** Görsel boyutu (referanstaki oranlar) */
  imgClass: string;
  wrapClass?: string;
}[] = [
  {
    src: fila,
    rest: { x: 0, y: -0.02 },
    corner: { x: -0.06, y: -0.48 },
    spreadEnd: 0.5,
    exitBoost: 1.06,
    fadeStart: 0.58,
    zClass: "z-[0]",
    imgClass:
      "block h-auto w-auto max-w-[min(27vw,252px)] max-h-[min(80dvh,756px)] object-contain object-center sm:max-w-[min(25vw,268px)] sm:max-h-[min(84dvh,800px)]",
  },
  {
    src: hera,
    rest: { x: -0.24, y: -0.26 },
    corner: { x: -0.4, y: -0.36 },
    spreadEnd: 0.44,
    exitBoost: 0.88,
    fadeStart: 0.52,
    zClass: "z-[0]",
    imgClass:
      "block h-auto w-auto max-h-[min(21dvh,200px)] max-w-[min(58vw,520px)] object-contain object-center sm:max-h-[min(22.5dvh,216px)] sm:max-w-[min(54vw,560px)]",
  },
  {
    src: lora,
    rest: { x: -0.34, y: 0.02 },
    corner: { x: -0.5, y: 0.09 },
    spreadEnd: 0.52,
    exitBoost: 1.1,
    fadeStart: 0.6,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(36dvh,336px)] w-auto max-w-[min(45vw,392px)] object-contain object-center sm:max-h-[min(39dvh,372px)] sm:max-w-[min(44vw,448px)] lg:max-h-[min(42dvh,400px)] lg:max-w-[min(42vw,472px)]",
    wrapClass: "hidden md:block",
  },
  {
    src: mona,
    rest: { x: 0.34, y: -0.15 },
    corner: { x: 0.5, y: -0.2 },
    spreadEnd: 0.46,
    exitBoost: 0.92,
    fadeStart: 0.55,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(36dvh,336px)] w-auto max-w-[min(45vw,392px)] object-contain object-center sm:max-h-[min(39dvh,372px)] sm:max-w-[min(44vw,448px)] lg:max-h-[min(42dvh,400px)] lg:max-w-[min(42vw,472px)]",
  },
  {
    src: marte,
    rest: { x: -0.22, y: 0.31 },
    corner: { x: -0.58, y: 0.545 },
    spreadEnd: 0.47,
    exitBoost: 1.16,
    fadeStart: 0.53,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(40dvh,372px)] w-auto max-w-[min(38vw,348px)] object-contain object-center sm:max-h-[min(44dvh,416px)] sm:max-w-[min(41vw,420px)] lg:max-h-[min(46dvh,448px)] lg:max-w-[min(39vw,444px)]",
    wrapClass: "hidden lg:block",
  },
  {
    src: vera,
    rest: { x: 0.29, y: 0.23 },
    corner: { x: 0.49, y: 0.43 },
    spreadEnd: 0.54,
    exitBoost: 0.98,
    fadeStart: 0.63,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(34dvh,308px)] w-auto max-w-[min(45vw,388px)] object-contain object-center sm:max-h-[min(38dvh,348px)] sm:max-w-[min(42vw,460px)] lg:max-h-[min(40dvh,384px)] lg:max-w-[min(44vw,516px)]",
  },
];

const WHEEL_SCALE = 0.00085;

/** Batched wheel → fewer motion updates (less jank). */
function useLockedHeroProgress(
  progress: MotionValue<number>,
  exitCompleteRef: MutableRefObject<boolean>,
  returningRef: MutableRefObject<boolean>,
) {
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion === true) {
      progress.set(1);
      exitCompleteRef.current = true;
      emitHeroExit(1);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    const bump = (delta: number) => {
      if (exitCompleteRef.current || returningRef.current) return;
      const next = Math.min(1, Math.max(0, progress.get() + delta * WHEEL_SCALE));
      progress.set(next);
      if (next >= 1) {
        exitCompleteRef.current = true;
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };

    const lock = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    lock();
    emitHeroExit(0);

    let wheelAccum = 0;
    let rafId = 0;
    const flushWheel = () => {
      rafId = 0;
      const d = wheelAccum;
      wheelAccum = 0;
      if (d !== 0) bump(d);
    };

    const onWheel = (e: WheelEvent) => {
      if (returningRef.current) {
        e.preventDefault();
        return;
      }
      if (exitCompleteRef.current) return;
      e.preventDefault();
      wheelAccum += e.deltaY;
      if (!rafId) rafId = requestAnimationFrame(flushWheel);
    };

    let lastTouchY = 0;
    let touchAccum = 0;
    let touchRaf = 0;
    const flushTouch = () => {
      touchRaf = 0;
      const d = touchAccum;
      touchAccum = 0;
      if (d !== 0) bump(d);
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (returningRef.current) {
        e.preventDefault();
        return;
      }
      if (exitCompleteRef.current) return;
      const t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      const y = t.clientY;
      touchAccum += lastTouchY - y;
      lastTouchY = y;
      if (!touchRaf) touchRaf = requestAnimationFrame(flushTouch);
    };

    const onKey = (e: KeyboardEvent) => {
      if (exitCompleteRef.current || returningRef.current) return;
      if (e.key === " " || e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault();
        bump(e.key === " " ? 90 : 140);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (touchRaf) cancelAnimationFrame(touchRaf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      if (!exitCompleteRef.current) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [progress, reduceMotion, exitCompleteRef, returningRef]);
}

function CollageTile({
  src,
  rest,
  corner,
  spreadEnd,
  exitBoost,
  fadeStart,
  progress,
  zClass,
  imgClass,
  wrapClass = "",
}: {
  src: string;
  rest: { x: number; y: number };
  corner: { x: number; y: number };
  spreadEnd: number;
  exitBoost: number;
  fadeStart: number;
  progress: MotionValue<number>;
  zClass: string;
  imgClass: string;
  wrapClass?: string;
}) {
  const xPx = useTransform(progress, (t) => {
    const u = Math.min(window.innerWidth, window.innerHeight);
    const rx = rest.x * u;
    const cx = corner.x * u;
    if (t <= spreadEnd) {
      const k = easeOutCubic(t / spreadEnd);
      return rx + (cx - rx) * k;
    }
    const k = easeInCubic((t - spreadEnd) / (1 - spreadEnd));
    const dir = cx - rx;
    return cx + dir * exitBoost * k;
  });

  const yPx = useTransform(progress, (t) => {
    const u = Math.min(window.innerWidth, window.innerHeight);
    const ry = rest.y * u;
    const cy = corner.y * u;
    if (t <= spreadEnd) {
      const k = easeOutCubic(t / spreadEnd);
      return ry + (cy - ry) * k;
    }
    const k = easeInCubic((t - spreadEnd) / (1 - spreadEnd));
    const dir = cy - ry;
    return cy + dir * exitBoost * k;
  });

  const opacity = useTransform(progress, (t) => {
    if (t < fadeStart) return 1;
    return Math.max(0, 1 - easeInCubic((t - fadeStart) / (1 - fadeStart)));
  });

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 ${zClass} -translate-x-1/2 -translate-y-1/2 ${wrapClass}`}
    >
      <motion.div
        className="pointer-events-none transform-gpu will-change-[transform,opacity]"
        style={{ x: xPx, y: yPx, opacity }}
      >
        <div className="overflow-hidden border border-white/[0.1] shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
          <img
            src={src}
            alt=""
            className={imgClass}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function HeroWithCollage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const exitCompleteRef = useRef(false);
  const returningRef = useRef(false);
  const venturedRef = useRef(false);

  const smoothProgress = useSpring(progress, {
    stiffness: 210,
    damping: 32,
    mass: 0.38,
  });

  useLockedHeroProgress(progress, exitCompleteRef, returningRef);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    emitHeroExit(v);
  });

  useEffect(() => {
    const onScroll = () => {
      if (returningRef.current) return;
      const y = window.scrollY;
      if (y > 200) venturedRef.current = true;
      if (!exitCompleteRef.current || !venturedRef.current) return;
      if (y < 56 && progress.get() > 0.05) {
        returningRef.current = true;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        animate(progress, 0, {
          duration: 0.82,
          ease: "easeOut",
          onComplete: () => {
            exitCompleteRef.current = false;
            venturedRef.current = false;
            returningRef.current = false;
            progress.set(0);
            emitHeroExit(0);
          },
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-36 pb-20 sm:pt-40 lg:pt-48 lg:pb-24"
      aria-label="Intro"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden brightness-[0.72] contrast-[0.98]"
        aria-hidden
      >
        {TILES.map((tile, i) => (
          <CollageTile
            key={i}
            src={tile.src}
            rest={tile.rest}
            corner={tile.corner}
            spreadEnd={tile.spreadEnd}
            exitBoost={tile.exitBoost}
            fadeStart={tile.fadeStart}
            progress={smoothProgress}
            zClass={tile.zClass}
            imgClass={tile.imgClass}
            wrapClass={tile.wrapClass}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_92%_68%_at_50%_42%,rgba(0,0,0,0.52),rgba(0,0,0,0.26)_44%,rgba(0,0,0,0.4)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex -translate-y-5 flex-col items-center sm:-translate-y-7 lg:-translate-y-8">
        {children}
      </div>
    </section>
  );
}
