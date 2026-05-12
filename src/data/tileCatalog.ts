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

type ExampleBucket = Map<string, { order: number; url: string }[]>;

function addExample(bucket: ExampleBucket, slug: string, order: number, url: string) {
  const arr = bucket.get(slug) ?? [];
  arr.push({ order, url });
  bucket.set(slug, arr);
}

function bucketToUrls(bucket: ExampleBucket): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const [slug, arr] of bucket) {
    arr.sort((a, b) => a.order - b.order || a.url.localeCompare(b.url));
    out.set(
      slug,
      arr.map((x) => x.url),
    );
  }
  return out;
}

/** `{slug}-tile-example` veya `{slug}-tile-example-2` → cover slug `slug` */
function matchTileExampleBase(base: string): { slug: string; order: number } | null {
  const tm = base.match(/^(.+)-tile-example(?:-(\d+))?$/i);
  if (!tm) return null;
  return { slug: tm[1], order: tm[2] !== undefined ? parseInt(tm[2], 10) : 0 };
}

/** `{slug}-example` / `{slug}-example-3` — `-tile-example` ile çakışmasın */
function matchPlainExampleBase(base: string): { slug: string; order: number } | null {
  if (base.includes("-tile-example")) return null;
  const em = base.match(/^(.+)-example(?:-(\d+))?$/i);
  if (!em) return null;
  return { slug: em[1], order: em[2] !== undefined ? parseInt(em[2], 10) : 0 };
}

/**
 * Swatch + örnek (desteklenen dosya adları):
 * - `{slug}-tile.*` + `{slug}-tile-example.*` veya `{slug}-tile-example-1.*`, …
 * - `{slug}.*` + `{slug}-example.*` / `{slug}-example-2.*`, …
 * - `{slug}.*` yalnız (örnek yok)
 * - İsteğe bağlı alias: kısa örnek slug → swatch slug (aşağıdaki `exampleSlugAliases`)
 */
export function getTileCatalogGalleryItems(): CatalogGalleryItem[] {
  const moduleByBase = new Map<string, string>();
  for (const [path, mod] of Object.entries(tileModules)) {
    moduleByBase.set(fileBase(path), mod.default);
  }

  const exampleBucket: ExampleBucket = new Map();
  for (const base of moduleByBase.keys()) {
    const hit = matchTileExampleBase(base) ?? matchPlainExampleBase(base);
    if (!hit) continue;
    const url = moduleByBase.get(base);
    if (url) addExample(exampleBucket, hit.slug, hit.order, url);
  }

  const covers = new Map<string, string>();

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
    const arr = exampleBucket.get(fromSlug);
    if (arr?.length && covers.has(toSlug)) {
      const dest = exampleBucket.get(toSlug) ?? [];
      exampleBucket.set(toSlug, [...dest, ...arr]);
      exampleBucket.delete(fromSlug);
    }
  }

  const examples = bucketToUrls(exampleBucket);

  return [...covers.entries()]
    .map(([slug, src]) => {
      const exs = examples.get(slug);
      const item: CatalogGalleryItem = {
        slug,
        label: slugToLabel(slug),
        src,
      };
      if (exs?.length) item.exampleSrcs = exs;
      return item;
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
}
