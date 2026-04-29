/** Vite glob: path relative to this file (`src/data` → repo `assets`). */
const quartzModules = import.meta.glob("../../assets/quartz/*.{avif,jpg,jpeg,png,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

export type QuartzCatalogItem = {
  /** Dosya kökü, örn. `calacatta-alba` */
  slug: string;
  /** Gösterim etiketi, örn. `Calacatta Alba` */
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

let cached: QuartzCatalogItem[] | undefined;

/** assets/quartz içindeki tüm yüzeyler (isim sıralı). */
export function getQuartzCatalogItems(): QuartzCatalogItem[] {
  if (cached) return cached;
  cached = Object.entries(quartzModules)
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
  return cached;
}
