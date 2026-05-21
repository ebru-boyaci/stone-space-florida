import { useCallback, useRef, useState, type PointerEvent } from "react";

type BeforeAfterCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(rect.right, Math.max(rect.left, clientX));
    const pct = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className={`before-after-compare relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={beforeSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
        decoding="async"
      />
      <img
        src={afterSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
        decoding="async"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.45)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg backdrop-blur-sm sm:size-12"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <svg className="size-5 sm:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm sm:left-4 sm:top-4 sm:text-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-[#b9a086]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:right-4 sm:top-4 sm:text-sm">
        {afterLabel}
      </span>

      <label className="sr-only">Drag to compare before and after</label>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="before-after-compare__range absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Compare before and after"
      />
    </div>
  );
}
