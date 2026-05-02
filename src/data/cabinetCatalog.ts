/**
 * Cabinet catalog: images live in `assets/cabinets/{slug}.jpg` (vendored from the
 * supplier style guide). Ensure your dealership agreement covers use of these assets.
 *
 * @see https://shop.milestonecabinetry.com/products.html
 */
const cabinetImages = import.meta.glob<{ default: string }>("../../assets/cabinets/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

function cabinetSrcForSlug(slug: string): string {
  for (const [path, mod] of Object.entries(cabinetImages)) {
    if (
      path.endsWith(`/${slug}.jpg`) ||
      path.endsWith(`/${slug}.jpeg`) ||
      path.endsWith(`/${slug}.png`) ||
      path.endsWith(`/${slug}.webp`)
    ) {
      return mod.default;
    }
  }
  throw new Error(`cabinetCatalog: missing image for slug "${slug}"`);
}

export type CabinetCatalogItem = {
  slug: string;
  label: string;
  collection: string;
  src: string;
  supplierUrl: string;
};

const METADATA: Omit<CabinetCatalogItem, "src">[] = [
  {
    slug: "shaker-white",
    label: "Shaker White",
    collection: "Shaker style Essential Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/shaker-white.html",
  },
  {
    slug: "shaker-gray",
    label: "Shaker Gray",
    collection: "Shaker style Essential Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/shaker-gray.html",
  },
  {
    slug: "shaker-espresso",
    label: "Shaker Espresso",
    collection: "Shaker style Essential Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/shaker-espresso.html",
  },
  {
    slug: "navy-blue",
    label: "Navy Blue",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/navy-blue.html",
  },
  {
    slug: "iron-black",
    label: "Iron Black",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/iron-black.html",
  },
  {
    slug: "treasure-chest",
    label: "Treasure Chest",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/treasure-chest.html",
  },
  {
    slug: "aston-green",
    label: "Aston Green",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/aston-green.html",
  },
  {
    slug: "smokey-ash",
    label: "Smokey Ash",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/smokey-ash.html",
  },
  {
    slug: "luna-grey",
    label: "Luna Grey",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/luna-grey.html",
  },
  {
    slug: "rustic-wood",
    label: "Rustic Wood",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/rustic-wood.html",
  },
  {
    slug: "sage-breeze",
    label: "Sage Breeze",
    collection: "Shaker style Charm Collection",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/sage-breeze.html",
  },
  {
    slug: "slim-dove-white",
    label: "Slim Dove White",
    collection: "Slim Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/slim-dove-white.html",
  },
  {
    slug: "slim-white-oak",
    label: "Slim White Oak",
    collection: "Slim Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/slim-white-oak.html",
  },
  {
    slug: "slim-aston-green",
    label: "Slim Aston Green",
    collection: "Slim Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/slim-aston-green.html",
  },
  {
    slug: "slim-amber-oak",
    label: "Slim Amber Oak",
    collection: "Slim Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/slim-amber-oak.html",
  },
  {
    slug: "slim-iron-black",
    label: "Slim Iron Black",
    collection: "Slim Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/slim-iron-black.html",
  },
  {
    slug: "double-smokey-grey",
    label: "Double Smokey Grey",
    collection: "Double Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/double-smokey-grey.html",
  },
  {
    slug: "double-dove-white",
    label: "Double Dove White",
    collection: "Double Shaker style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/double-dove-white.html",
  },
  {
    slug: "charleston-white",
    label: "Charleston White",
    collection: "Classic Style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/charleston-white.html",
  },
  {
    slug: "aspen-white",
    label: "Aspen White",
    collection: "Classic Style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/aspen-white.html",
  },
  {
    slug: "aspen-charcoal-gray",
    label: "Aspen Charcoal Gray",
    collection: "Classic Style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/aspen-charcoal-gray.html",
  },
  {
    slug: "high-gloss-white",
    label: "High Gloss White",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/high-gloss-white.html",
  },
  {
    slug: "high-gloss-gray",
    label: "High Gloss Gray",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/high-gloss-grey.html",
  },
  {
    slug: "crystal-glass",
    label: "Crystal Glass",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/crystal-glass.html",
  },
  {
    slug: "midnight-glass",
    label: "Midnight Glass",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/midnight-glass.html",
  },
  {
    slug: "matte-black",
    label: "Matte Black",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/matte-black.html",
  },
  {
    slug: "matte-ivory",
    label: "Matte Ivory",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/matte-ivory.html",
  },
  {
    slug: "oak-blonde",
    label: "Oak Blonde",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/oak-blonde.html",
  },
  {
    slug: "oak-shade",
    label: "Oak Shade",
    collection: "Frameless European style",
    supplierUrl: "https://shop.milestonecabinetry.com/products/frameless-cabinets/oak-shade.html",
  },
  {
    slug: "floral-white",
    label: "Floral White",
    collection: "Shaker style — Builder Grade",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/floral-white.html",
  },
  {
    slug: "floral-espresso",
    label: "Floral Espresso",
    collection: "Shaker style — Builder Grade",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/floral-expresso.html",
  },
  {
    slug: "floral-gray",
    label: "Floral Gray",
    collection: "Shaker style — Builder Grade",
    supplierUrl: "https://shop.milestonecabinetry.com/products/framed-cabinets/floral-grey.html",
  },
];

/** Styles & collections from the supplier listing (order preserved). */
export function getCabinetCatalogItems(): CabinetCatalogItem[] {
  return METADATA.map((m) => ({
    ...m,
    src: cabinetSrcForSlug(m.slug),
  }));
}

/** For `CatalogItemsSection`: slug, label, src, and top-aligned crop (not vertically centered). */
export function getCabinetCatalogGalleryItems(): {
  slug: string;
  label: string;
  src: string;
  imageObjectClass: string;
}[] {
  return getCabinetCatalogItems().map(({ slug, label, src }) => ({
    slug,
    label,
    src,
    imageObjectClass: "object-top",
  }));
}
