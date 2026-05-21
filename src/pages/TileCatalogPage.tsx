import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { CatalogPageLayout } from "@/components/CatalogPageLayout";
import { getServiceDetail } from "@/data/serviceDetails";
import { useMemo } from "react";
import { getTileCatalogGalleryItems } from "@/data/tileCatalog";

export function TileCatalogPage() {
  const items = useMemo(() => getTileCatalogGalleryItems(), []);
  const copy = getServiceDetail("porcelain-tile");

  return (
    <CatalogPageLayout
      kicker={copy?.kicker ?? "Catalog"}
      title={copy?.title ?? "Porcelain tile"}
      lead={
        <>
          {copy?.paragraphs[0] ? <p>{copy.paragraphs[0]}</p> : null}
          {copy?.paragraphs[1] ? (
            <p className="mt-4 text-sm text-zinc-500 sm:text-base">{copy.paragraphs[1]}</p>
          ) : null}
          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Browse swatches below. Tap a tile to open a layout example; imagery reflects material character and tiles
            may vary in person. Availability and sizes are confirmed when you order.
          </p>
        </>
      }
    >
      <CatalogItemsSection items={items} />
    </CatalogPageLayout>
  );
}
