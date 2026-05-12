import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { useMemo } from "react";
import { getTileCatalogGalleryItems } from "@/data/tileCatalog";

export function TileCatalogPage() {
  const items = useMemo(() => getTileCatalogGalleryItems(), []);

  return (
    <div className="min-h-screen bg-[#0c0c0c] pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-[calc(12.5rem+env(safe-area-inset-top,0px))] text-zinc-100">
      <div className="mx-auto flex w-full max-w-[min(96vw,80rem)] flex-col pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:px-8 lg:px-10">
        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">Catalog</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,2.85rem)] font-medium tracking-[-0.02em] text-white">
            Porcelain tile
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]">
            Swatches below; tap a tile to open a layout example. Availability and sizes are confirmed when you order.
          </p>
        </header>

        <CatalogItemsSection items={items} />
      </div>
    </div>
  );
}
