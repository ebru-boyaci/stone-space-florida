const pebblesModules = import.meta.glob("../../assets/pebbles/*.avif", {
  eager: true,
}) as Record<string, { default: string }>;

export type PebblesCatalogItem = {
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

let cached: PebblesCatalogItem[] | undefined;

/** assets/pebbles içindeki tüm yüzeyler (isim sıralı). */
export function getPebblesCatalogItems(): PebblesCatalogItem[] {
  if (cached) return cached;
  cached = Object.entries(pebblesModules)
    .map(([path, mod]) => {
      const base = path.split("/").pop() ?? "";
      const slug = base.replace(/\.[^.]+$/, "");
      return {
        slug,
        label: slugToLabel(slug),
        src: mod.default,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
  return cached;
}
