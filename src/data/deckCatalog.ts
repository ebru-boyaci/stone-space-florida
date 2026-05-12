import type { CatalogGalleryItem } from "@/components/CatalogItemsSection";

const deckModules = import.meta.glob("../../assets/deck/*.{avif,jpg,jpeg,png,webp}", {
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

function toSlug(baseWithoutExt: string): string {
  return baseWithoutExt
    .trim()
    .toLowerCase()
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

/**
 * Dış / iç yüzey ve deck ile uyumlu malzemeler — `assets/deck/` (glob).
 * Örnek: `{slug}-example.*`, `{slug}-example-1.*`, …
 */
export function getDeckCatalogItems(): CatalogGalleryItem[] {
  const moduleByBase = new Map<string, string>();
  for (const [path, mod] of Object.entries(deckModules)) {
    moduleByBase.set(fileBase(path), mod.default);
  }

  const exampleBucket: ExampleBucket = new Map();
  for (const base of moduleByBase.keys()) {
    const m = base.match(/^(.+)-example(?:-(\d+))?$/i);
    if (!m) continue;
    const slug = toSlug(m[1]);
    const order = m[2] !== undefined ? parseInt(m[2], 10) : 0;
    const url = moduleByBase.get(base);
    if (url) addExample(exampleBucket, slug, order, url);
  }
  const examples = bucketToUrls(exampleBucket);

  const covers = new Map<string, string>();
  for (const base of moduleByBase.keys()) {
    if (/-example(?:-\d+)?$/i.test(base)) continue;
    const slug = toSlug(base);
    if (slug) covers.set(slug, moduleByBase.get(base)!);
  }

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
