import imgAstonGreen from "@assets/cabinets/aston-green.jpg";
import imgNavyBlue from "@assets/cabinets/navy-blue.jpg";
import imgOakShade from "@assets/cabinets/oak-shade.jpg";
import imgShakerWhite from "@assets/cabinets/shaker-white.jpg";
import imgCrystalLuxor from "@assets/porcelain/crystal-luxor.jpg";
import imgCalacattaPanda from "@assets/quartz/calacatta-panda.avif";
import imgSylviaGold from "@assets/quartz/calacatta-sylvia-gold.avif";
import imgTajMahal from "@assets/quartz/taj-mahal.avif";

export type MaterialSwatch = {
  label: string;
  image: string;
  catalogHref?: string;
};

type SwatchEntry = {
  image: string;
  catalogHref?: string;
};

/** Display names used on projects → catalog swatch assets */
const SWATCH_BY_KEY: Record<string, SwatchEntry> = {
  "sylvia gold": { image: imgSylviaGold, catalogHref: "/catalog/quartz" },
  "taj mahal": { image: imgTajMahal, catalogHref: "/catalog/quartz" },
  "calacatta panda": { image: imgCalacattaPanda, catalogHref: "/catalog/quartz" },
  panda: { image: imgCalacattaPanda, catalogHref: "/catalog/quartz" },
  "crystal luxor": { image: imgCrystalLuxor, catalogHref: "/catalog/porcelain" },
  "white shaker": { image: imgShakerWhite, catalogHref: "/catalog/cabinets" },
  "green shaker": { image: imgAstonGreen, catalogHref: "/catalog/cabinets" },
  "navy blue": { image: imgNavyBlue, catalogHref: "/catalog/cabinets" },
  "wood grain base": { image: imgOakShade, catalogHref: "/catalog/cabinets" },
};

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** "White Shaker · Navy Blue" → individual swatches when mapped */
export function resolveMaterialSwatches(materialName: string): MaterialSwatch[] {
  const parts = materialName
    .split(/·|,/)
    .map((p) => p.trim())
    .filter(Boolean);

  const swatches: MaterialSwatch[] = [];

  for (const part of parts) {
    const entry = SWATCH_BY_KEY[normalizeKey(part)];
    if (entry) {
      swatches.push({ label: part, image: entry.image, catalogHref: entry.catalogHref });
    }
  }

  if (swatches.length === 0) {
    const single = SWATCH_BY_KEY[normalizeKey(materialName)];
    if (single) {
      swatches.push({
        label: materialName,
        image: single.image,
        catalogHref: single.catalogHref,
      });
    }
  }

  return swatches;
}
