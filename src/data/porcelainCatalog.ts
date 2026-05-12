import type { CatalogGalleryItem } from "@/components/CatalogItemsSection";

/** Vite glob: path relative to this file (`src/data` → repo `assets`). */
const porcelainModules = import.meta.glob("../../assets/porcelain/*.{avif,jpg,jpeg,png,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

/** Dosya adı slug’ı ile vitrin etiketi farklı olsun istenen levha isimleri. */
const SLUG_LABEL_OVERRIDES: Partial<Record<string, string>> = {
  "eagan-brown": "Aegean Brown",
};

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
 * Levha swatch’ları — `assets/porcelain/` içindeki her swatch dosyası bir karttır (glob).
 * Örnek yoksa kartta sadece swatch görünür; örnek varsa “Tap to view example”.
 * Örnek dosya adları:
 * - `{slug}-example.*` (tek)
 * - `{slug}-example-1.*`, `-2.*`, … (sırayla birleştirilir, lightbox’ta kaydırılır)
 */
export function getPorcelainCatalogItems(): CatalogGalleryItem[] {
  const moduleByBase = new Map<string, string>();
  for (const [path, mod] of Object.entries(porcelainModules)) {
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
        label: SLUG_LABEL_OVERRIDES[slug] ?? slugToLabel(slug),
        src,
      };
      if (exs?.length) item.exampleSrcs = exs;
      return item;
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
}
