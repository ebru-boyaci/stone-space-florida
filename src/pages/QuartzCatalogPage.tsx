import { useMemo } from "react";
import { getQuartzCatalogItems } from "@/data/quartzCatalog";

export function QuartzCatalogPage() {
  const items = useMemo(() => getQuartzCatalogItems(), []);

  return (
    <div className="min-h-screen bg-[#0c0c0c] pb-24 pt-[calc(10rem+env(safe-area-inset-top))] text-zinc-100">
      <div className="mx-auto flex w-full max-w-[min(96vw,80rem)] flex-col px-5 sm:px-8 lg:px-10">
        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">Catalog</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,2.85rem)] font-medium tracking-[-0.02em] text-white">
            Quartz surfaces
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]">
            Browse named varieties from our collection. Imagery reflects material character; slabs may vary in person.
          </p>
        </header>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((item) => (
            <li key={item.slug}>
              <article className="group relative flex flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-0 z-0 bg-[#4a3f43] [transform-origin:bottom] scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

                <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[#242424]">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                  />
                </div>
                <div className="relative z-10 border-t border-white/[0.06] px-5 py-4 transition-colors duration-500 sm:py-5">
                  <h2 className="font-sans text-lg font-semibold tracking-tight text-white transition-colors duration-500 sm:text-xl">{item.label}</h2>
                  <p className="mt-1 font-mono text-xs tracking-wide text-zinc-400 transition-colors duration-500 uppercase">{item.slug}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
