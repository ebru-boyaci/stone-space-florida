import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { CatalogPageLayout } from "@/components/CatalogPageLayout";
import { useMemo } from "react";
import { getPorcelainCatalogItems } from "@/data/porcelainCatalog";

export function PorcelainCatalogPage() {
  const items = useMemo(() => getPorcelainCatalogItems(), []);

  return (
    <CatalogPageLayout
      kicker="Surfaces"
      title="Porcelain slabs"
      lead={
        <>
          <p>
            Porcelain slabs are a sleek, durable surface option ideal for countertops, walls, and modern spaces. Made
            from high-density materials, they are heat-resistant, scratch-resistant, and non-porous, so they won&apos;t
            stain or require sealing. With their clean, seamless look and low maintenance, porcelain slabs are perfect
            for both indoor and outdoor applications.
          </p>
          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Browse named varieties below. Imagery reflects material character; slabs may vary in person.
          </p>
        </>
      }
    >
      <CatalogItemsSection items={items} />
    </CatalogPageLayout>
  );
}
