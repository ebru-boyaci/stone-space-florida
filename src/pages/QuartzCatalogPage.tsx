import { CatalogItemsSection } from "@/components/CatalogItemsSection";
import { CatalogPageLayout } from "@/components/CatalogPageLayout";
import { useMemo } from "react";
import { getQuartzCatalogItems } from "@/data/quartzCatalog";

export function QuartzCatalogPage() {
  const items = useMemo(() => getQuartzCatalogItems(), []);

  return (
    <CatalogPageLayout
      kicker="Catalog"
      title="Quartz surfaces"
      lead={
        <p>
          Browse named varieties from our collection. Imagery reflects material character; slabs may vary in person.
        </p>
      }
    >
      <CatalogItemsSection items={items} />
    </CatalogPageLayout>
  );
}
