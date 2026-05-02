import { useState } from "react";

export type CatalogGalleryItem = {
  slug: string;
  label: string;
  src: string;
  /** `object-position` for `object-cover` (default: centered). */
  imageObjectClass?: string;
};

type ViewMode = "grid" | "rail";

function IconGrid({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden className={active ? "text-[#b9a086]" : "text-zinc-500"} fill="currentColor">
      <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />
    </svg>
  );
}

function IconHorizontalScroll({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden className={active ? "text-[#b9a086]" : "text-zinc-500"} fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round">
      <path d="M4 12h14M17 16l4-4-4-4" />
      <rect x="2" y="5" width="5" height="14" rx="1.2" opacity="0.85" />
      <rect x="8.25" y="5" width="5" height="14" rx="1.2" opacity="0.55" />
      <rect x="14.5" y="5" width="5" height="14" rx="1.2" opacity="0.35" />
    </svg>
  );
}

function Toggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div
      className="inline-flex rounded-full border border-white/[0.12] bg-black/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      role="radiogroup"
      aria-label="Catalog layout"
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === "grid"}
        title="Grid view"
        onClick={() => onChange("grid")}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#b9a086] sm:px-3.5 ${
          mode === "grid" ? "bg-[#b9a086]/22 text-[#e8dfc8]" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <IconGrid active={mode === "grid"} />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === "rail"}
        title="Swipe / horizontal scroll view"
        onClick={() => onChange("rail")}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#b9a086] sm:px-3.5 ${
          mode === "rail" ? "bg-[#b9a086]/22 text-[#e8dfc8]" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <IconHorizontalScroll active={mode === "rail"} />
        <span className="hidden sm:inline">Swipe</span>
      </button>
    </div>
  );
}

function ItemCard({ item }: { item: CatalogGalleryItem }) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#4a3f43] [transform-origin:bottom] scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

      <div className="relative z-10 aspect-[4/5] min-h-[220px] w-full shrink-0 overflow-hidden bg-[#242424] sm:min-h-0">
        <img
          src={item.src}
          alt={item.label}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${item.imageObjectClass ?? "object-center"}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
        />
      </div>
      <div className="relative z-10 shrink-0 border-t border-white/[0.06] px-5 py-4 transition-colors duration-500 sm:py-5">
        <h2 className="font-sans text-lg font-semibold tracking-tight text-white transition-colors duration-500 sm:text-xl">{item.label}</h2>
        <p className="mt-1 font-mono text-xs tracking-wide text-zinc-400 transition-colors duration-500 uppercase">{item.slug}</p>
      </div>
    </article>
  );
}

/** Quartz katalog için grid veya yatay kaydırmalı (mobil dostu) gösterim. */
export function CatalogItemsSection({ items }: { items: CatalogGalleryItem[] }) {
  const [mode, setMode] = useState<ViewMode>("grid");

  return (
    <div className="mt-10 sm:mt-12">
      <div className="mb-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end">
        <Toggle mode={mode} onChange={setMode} />
      </div>

      {mode === "grid" ? (
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((item) => (
            <li key={item.slug}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative">
          <p className="sr-only">Swipe horizontally to browse materials.</p>
          <ul
            className="-mx-5 flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto overscroll-x-contain px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Catalog items, horizontal scroll"
          >
            {items.map((item) => (
              <li
                key={item.slug}
                className="w-[min(92vw,26rem)] shrink-0 snap-start sm:w-[min(22rem,85vw)] md:w-[min(24rem,40vw)] lg:w-[min(26rem,32vw)]"
              >
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-zinc-500 sm:hidden" aria-hidden>
            ← Swipe to see more →
          </p>
        </div>
      )}
    </div>
  );
}
