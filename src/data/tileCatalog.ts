import type { CatalogGalleryItem } from "@/components/CatalogItemsSection";

const tileModules = import.meta.glob("../../assets/tile/*.{jpg,jpeg,png,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function fileBase(path: string): string {
  return (path.split("/").pop() ?? "").replace(/\.[^.]+$/i, "");
}

/**
 * Swatch + örnek (desteklenen dosya adları):
 * - `{slug}-tile.*` + `{slug}-tile-example.*`
 * - `{slug}.*` + `{slug}-example.*`
 * - `{slug}.*` yalnız (örnek yok) — örnek tıklaması olmaz
 * - İsteğe bağlı alias: kısa örnek slug → swatch slug (aşağıdaki `exampleSlugAliases`)
 */
export function getTileCatalogGalleryItems(): CatalogGalleryItem[] {
  const moduleByBase = new Map<string, string>();
  for (const [path, mod] of Object.entries(tileModules)) {
    moduleByBase.set(fileBase(path), mod.default);
  }

  const covers = new Map<string, string>();
  const examples = new Map<string, string>();

  for (const base of moduleByBase.keys()) {
    if (base.endsWith("-tile-example")) {
      const slug = base.slice(0, -"-tile-example".length);
      if (slug) examples.set(slug, moduleByBase.get(base)!);
    } else if (base.endsWith("-example") && !base.endsWith("-tile-example")) {
      const slug = base.slice(0, -"-example".length);
      if (slug) examples.set(slug, moduleByBase.get(base)!);
    }
  }

  for (const base of moduleByBase.keys()) {
    if (base.includes("example")) continue;
    if (/-tile$/i.test(base)) {
      const slug = base.replace(/-tile$/i, "");
      if (slug) covers.set(slug, moduleByBase.get(base)!);
    } else if (!/-tile$/i.test(base) && moduleByBase.has(`${base}-example`)) {
      covers.set(base, moduleByBase.get(base)!);
    } else if (!/-tile$/i.test(base)) {
      covers.set(base, moduleByBase.get(base)!);
    }
  }

  /** Örnek dosya adı swatch slug’ından kısaysa (örn. `pulpis-prime-light-gray-example` → matte swatch). */
  const exampleSlugAliases: Record<string, string> = {
    "pulpis-prime-light-gray": "pulpis-prime-light-gray-matte",
  };
  for (const [fromSlug, toSlug] of Object.entries(exampleSlugAliases)) {
    const url = examples.get(fromSlug);
    if (url && covers.has(toSlug)) {
      examples.set(toSlug, url);
      examples.delete(fromSlug);
    }
  }

  return [...covers.entries()]
    .map(([slug, src]) => {
      const ex = examples.get(slug);
      const item: CatalogGalleryItem = {
        slug,
        label: slugToLabel(slug),
        src,
      };
      if (ex) item.exampleSrc = ex;
      return item;
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
}
