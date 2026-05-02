/** Vite glob: path relative to this file (`src/data` → repo `assets`). */
const porcelainModules = import.meta.glob("../../assets/porcelain/*.{avif,jpg,jpeg,png,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

export type PorcelainCatalogItem = {
  slug: string;
  label: string;
  src: string;
};

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function toSlug(fileBaseName: string): string {
  return fileBaseName
    .replace(/\.[^.]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** assets/porcelain içindeki tüm yüzeyler (isim sıralı). */
export function getPorcelainCatalogItems(): PorcelainCatalogItem[] {
  return Object.entries(porcelainModules)
    .map(([path, mod]) => {
      const base = path.split("/").pop() ?? "";
      const slug = toSlug(base);
      return {
        slug,
        label: slugToLabel(slug),
        src: mod.default,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
}
