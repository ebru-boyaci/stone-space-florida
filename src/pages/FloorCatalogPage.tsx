import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { CatalogPageLayout } from "@/components/CatalogPageLayout";
import { getServiceDetail } from "@/data/serviceDetails";
import { useMemo } from "react";
import { getFloorCatalogItems } from "@/data/floorCatalog";

export function FloorCatalogPage() {
  const items = useMemo(() => getFloorCatalogItems(), []);
  const copy = getServiceDetail("vinyl-flooring");

  return (
    <CatalogPageLayout
      kicker={copy?.kicker ?? "Catalog"}
      title={copy?.title ?? "Vinyl flooring"}
      lead={
        <>
          {copy?.paragraphs[0] ? <p>{copy.paragraphs[0]}</p> : null}
          {copy?.paragraphs[1] ? (
            <p className="mt-4 text-sm text-zinc-500 sm:text-base">{copy.paragraphs[1]}</p>
          ) : null}
          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Browse swatches below. Tap a floor to open a room or layout example; imagery reflects material character
            and may vary in person. Patterns and availability are confirmed when you order.
          </p>
        </>
      }
    >
      <CatalogItemsSection items={items} />
    </CatalogPageLayout>
  );
}
