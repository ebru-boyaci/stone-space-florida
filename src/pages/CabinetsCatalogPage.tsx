import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { CatalogPageLayout } from "@/components/CatalogPageLayout";
import { useMemo } from "react";
import { getCabinetCatalogGalleryItems } from "@/data/cabinetCatalog";

export function CabinetsCatalogPage() {
  const items = useMemo(() => getCabinetCatalogGalleryItems(), []);

  return (
    <CatalogPageLayout
      kicker="Catalog"
      title="Cabinet styles & collections"
      lead={
        <p>
          Browse door styles and finishes we can source for your project. Photos follow our supplier&apos;s public
          style guide; exact slabs and availability are confirmed when you order.
        </p>
      }
    >
      <CatalogItemsSection items={items} />
    </CatalogPageLayout>
  );
}
