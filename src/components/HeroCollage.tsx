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
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { MutableRefObject, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

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
      "block h-auto w-auto max-w-[min(33vw,308px)] max-h-[min(96dvh,908px)] object-contain object-center sm:max-w-[min(31vw,324px)] sm:max-h-[min(100dvh,960px)]",
  },
  {
    src: hera,
    rest: { x: -0.3, y: -0.26 },
    corner: { x: -0.46, y: -0.36 },
    spreadEnd: 0.44,
    exitBoost: 0.88,
    fadeStart: 0.52,
    zClass: "z-[0]",
    imgClass:
      "block h-auto w-auto max-h-[min(26dvh,240px)] max-w-[min(70vw,624px)] object-contain object-center sm:max-h-[min(27.5dvh,260px)] sm:max-w-[min(66vw,672px)]",
  },
  {
    src: lora,
    rest: { x: -0.4, y: 0.02 },
    corner: { x: -0.56, y: 0.09 },
    spreadEnd: 0.52,
    exitBoost: 1.1,
    fadeStart: 0.6,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(44dvh,408px)] w-auto max-w-[min(55vw,472px)] object-contain object-center sm:max-h-[min(47dvh,444px)] sm:max-w-[min(54vw,536px)] lg:max-h-[min(50dvh,480px)] lg:max-w-[min(50vw,568px)]",
    wrapClass: "hidden md:block",
  },
  {
    src: mona,
    rest: { x: 0.4, y: -0.15 },
    corner: { x: 0.56, y: -0.2 },
    spreadEnd: 0.46,
    exitBoost: 0.92,
    fadeStart: 0.55,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(44dvh,408px)] w-auto max-w-[min(55vw,472px)] object-contain object-center sm:max-h-[min(47dvh,444px)] sm:max-w-[min(54vw,536px)] lg:max-h-[min(50dvh,480px)] lg:max-w-[min(50vw,568px)]",
  },
  {
    src: marte,
    rest: { x: -0.28, y: 0.31 },
    corner: { x: -0.64, y: 0.545 },
    spreadEnd: 0.47,
    exitBoost: 1.16,
    fadeStart: 0.53,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(48dvh,444px)] w-auto max-w-[min(46vw,416px)] object-contain object-center sm:max-h-[min(52dvh,496px)] sm:max-w-[min(49vw,500px)] lg:max-h-[min(54dvh,536px)] lg:max-w-[min(47vw,532px)]",
    wrapClass: "hidden lg:block",
  },
  {
    src: vera,
    rest: { x: 0.35, y: 0.23 },
    corner: { x: 0.55, y: 0.43 },
    spreadEnd: 0.54,
    exitBoost: 0.98,
    fadeStart: 0.63,
    zClass: "z-[2]",
    imgClass:
      "block h-auto max-h-[min(42dvh,372px)] w-auto max-w-[min(55vw,468px)] object-contain object-center sm:max-h-[min(46dvh,420px)] sm:max-w-[min(50vw,548px)] lg:max-h-[min(48dvh,464px)] lg:max-w-[min(52vw,620px)]",
  },
];

const WHEEL_SCALE = 0.00085;

/** Batched wheel → fewer motion updates (less jank). */
function useLockedHeroProgress(
  progress: MotionValue<number>,
  exitCompleteRef: MutableRefObject<boolean>,
  returningRef: MutableRefObject<boolean>,
  firstGesturePendingRef: MutableRefObject<boolean>,
  suppressWheelUntilRef: MutableRefObject<number>,
  onHeroFirstGesture?: () => void,
  onHeroUnlockDocument?: () => void,
) {
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion === true) {
      progress.set(1);
      exitCompleteRef.current = true;
      onHeroUnlockDocument?.();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    const bump = (delta: number) => {
      if (exitCompleteRef.current || returningRef.current) return;
      if (Date.now() < suppressWheelUntilRef.current) return;
      if (firstGesturePendingRef.current && progress.get() < 1e-5) {
        firstGesturePendingRef.current = false;
        onHeroFirstGesture?.();
        return;
      }
      const next = Math.min(1, Math.max(0, progress.get() + delta * WHEEL_SCALE));
      progress.set(next);
      if (next >= 1) {
        exitCompleteRef.current = true;
        onHeroUnlockDocument?.();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };

    const lock = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    lock();

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
  }, [
    progress,
    reduceMotion,
    exitCompleteRef,
    returningRef,
    firstGesturePendingRef,
    suppressWheelUntilRef,
    onHeroFirstGesture,
    onHeroUnlockDocument,
  ]);
}

/** Sıralı gelişler arası (daha seyrek → daha “tek tek”) */
const TILE_STAGGER_SEC = 0.118;
/** Yuvarlak maskenin tam açılması — yavaş */
const TILE_REVEAL_DURATION = 0.95;

function CollageTile({
  src,
  rest,
  corner,
  spreadEnd,
  exitBoost,
  fadeStart,
  progress,
  layoutUnit,
  zClass,
  imgClass,
  wrapClass = "",
  tileIndex,
  entranceCycle,
}: {
  src: string;
  rest: { x: number; y: number };
  corner: { x: number; y: number };
  spreadEnd: number;
  exitBoost: number;
  fadeStart: number;
  progress: MotionValue<number>;
  layoutUnit: MotionValue<number>;
  zClass: string;
  imgClass: string;
  wrapClass?: string;
  /** Sıralı giriş gecikmesi (0 … N-1) */
  tileIndex: number;
  /** Artınca (ilk yükleme 0, contact dönüşü 1…) bu tile girişi yeniden oynar */
  entranceCycle: number;
}) {
  const reduceMotion = useReducedMotion();
  const tileReveal = useMotionValue(reduceMotion === true ? 1 : 0);
  /** Hafif zoom — asıl efekt clip-path dikdörtgeni */
  const tileScale = useTransform(tileReveal, (r) => 0.86 + 0.14 * r);
  /** Ortadan büyüyen dikdörtgen: `inset` her kareden eşit daralır → merkeze küçük rect, sonra tam alan */
  const tileRectClip = useTransform(tileReveal, (r) => {
    if (r >= 1) return "inset(0%)";
    const p = (1 - r) * 50;
    const q = Math.max(0, p);
    return `inset(${q}% ${q}% ${q}% ${q}%)`;
  });

  useLayoutEffect(() => {
    if (reduceMotion === true) {
      tileReveal.set(1);
      return;
    }
    tileReveal.set(0);
  }, [entranceCycle, reduceMotion, tileReveal]);

  useEffect(() => {
    if (reduceMotion === true) return;
    const ctrl = animate(tileReveal, 1, {
      duration: TILE_REVEAL_DURATION,
      delay: tileIndex * TILE_STAGGER_SEC,
      ease: [0.26, 0.08, 0.12, 1],
    });
    return () => ctrl.stop();
  }, [entranceCycle, tileIndex, reduceMotion, tileReveal]);

  const xPx = useTransform([progress, layoutUnit], (vals) => {
    const [t, u] = vals as [number, number];
    const rx = rest.x * u;
    const cx = corner.x * u;
    if (t <= spreadEnd) {
      const k = t / spreadEnd;
      return rx + (cx - rx) * k;
    }
    const k = (t - spreadEnd) / (1 - spreadEnd);
    const dir = cx - rx;
    return cx + dir * exitBoost * k;
  });

  const yPx = useTransform([progress, layoutUnit], (vals) => {
    const [t, u] = vals as [number, number];
    const ry = rest.y * u;
    const cy = corner.y * u;
    if (t <= spreadEnd) {
      const k = t / spreadEnd;
      return ry + (cy - ry) * k;
    }
    const k = (t - spreadEnd) / (1 - spreadEnd);
    const dir = cy - ry;
    return cy + dir * exitBoost * k;
  });

  const opacity = useTransform([progress, tileReveal], (vals) => {
    const [t, tr] = vals as [number, number];
    const po =
      t < fadeStart ? 1 : Math.max(0, 1 - easeInCubic((t - fadeStart) / (1 - fadeStart)));
    return po * tr;
  });

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 ${zClass} -translate-x-1/2 -translate-y-1/2 ${wrapClass}`}
    >
      <motion.div
        className="pointer-events-none transform-gpu will-change-[transform,opacity,clip-path]"
        style={{
          x: xPx,
          y: yPx,
          opacity,
          scale: tileScale,
          clipPath: tileRectClip,
        }}
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

export function HeroWithCollage({
  children,
  homeEntranceKey = 0,
  onHeroFirstGesture,
  onHeroUnlockDocument,
  onHeroRest,
}: {
  children: ReactNode;
  /** Contact’tan dönüş vb. ana sayfa girişinde artırılır → kolaj sıfırlanır ve görseller stagger ile gelir */
  homeEntranceKey?: number;
  onHeroFirstGesture?: () => void;
  onHeroUnlockDocument?: () => void;
  /** Kolaj tekrar “dinlenme”da (progress→0): App scroll/hader fazını sıfırlar */
  onHeroRest?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const exitCompleteRef = useRef(false);
  const returningRef = useRef(false);
  const venturedRef = useRef(false);
  const layoutUnit = useMotionValue(
    typeof window !== "undefined" ? Math.min(window.innerWidth, window.innerHeight) : 512,
  );
  /** false = ilk jest tükendi, kolaj progress’i artıyor */
  const firstGesturePendingRef = useRef(true);
  /** Hero reset / scroll-dönüş sonrası momentum wheel’in ilk jest sayılmaması için */
  const suppressHeroWheelUntilRef = useRef(0);

  const smoothProgress = useSpring(progress, {
    stiffness: 260,
    damping: 46,
    mass: 0.38,
    restDelta: 0.002,
    restSpeed: 0.015,
  });

  const homeResetAnim = useRef<ReturnType<typeof animate> | null>(null);

  useLockedHeroProgress(
    progress,
    exitCompleteRef,
    returningRef,
    firstGesturePendingRef,
    suppressHeroWheelUntilRef,
    onHeroFirstGesture,
    onHeroUnlockDocument,
  );

  useLayoutEffect(() => {
    if (homeEntranceKey === 0) return;
    homeResetAnim.current?.stop();
  }, [homeEntranceKey]);

  useEffect(() => {
    if (homeEntranceKey === 0 || reduceMotion === true) return;

    exitCompleteRef.current = false;
    venturedRef.current = false;
    returningRef.current = false;
    suppressHeroWheelUntilRef.current = Date.now() + 520;
    firstGesturePendingRef.current = true;
    onHeroRest?.();

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    homeResetAnim.current?.stop();
    homeResetAnim.current = animate(progress, 0, {
      duration: 0.14,
      ease: [0.33, 1, 0.36, 1],
    });

    return () => {
      homeResetAnim.current?.stop();
    };
  }, [homeEntranceKey, reduceMotion, progress, onHeroRest]);

  useLayoutEffect(() => {
    const sync = () => {
      layoutUnit.set(Math.min(window.innerWidth, window.innerHeight));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [layoutUnit]);

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
            suppressHeroWheelUntilRef.current = Date.now() + 520;
            /** Scroll ile hero’ya dönüşte “landing” ilk jestini tekrarlama — yoksa üstte kalan wheel header’ı tekrar gizler */
            firstGesturePendingRef.current = false;
            onHeroRest?.();
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
        className="pointer-events-none absolute inset-0 z-0 isolate overflow-hidden"
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
            layoutUnit={layoutUnit}
            zClass={tile.zClass}
            imgClass={tile.imgClass}
            wrapClass={tile.wrapClass}
            tileIndex={i}
            entranceCycle={homeEntranceKey}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-black/[0.26]"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_92%_68%_at_50%_42%,rgba(0,0,0,0.48),rgba(0,0,0,0.24)_44%,rgba(0,0,0,0.38)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex -translate-y-5 flex-col items-center sm:-translate-y-7 lg:-translate-y-8">
        {children}
      </div>
    </section>
  );
}
