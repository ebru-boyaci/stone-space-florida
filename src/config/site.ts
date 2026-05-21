/** Update phone and hrefs when content pages exist. */
export const SITE_PHONE_DISPLAY = "(904) 660-2994";
export const SITE_PHONE_TEL = "+19046602994";

export const SITE_EMAIL = "sales@stonespaces.com";
export const SITE_EMAIL_HREF = "mailto:sales@stonespaces.com";

export const SITE_ADDRESS_LINES = [
  "6000 Powers Avenue",
  "Jacksonville, Florida",
  "32217",
] as const;

/** Opens Google Maps at the showroom address */
export const SITE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=6000+Powers+Avenue%2C+Jacksonville%2C+FL+32217";

/** Placeholder links — replace with real profiles. */
export const SITE_SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company" },
  { name: "Facebook", href: "https://www.facebook.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
] as const;

export type NavLinkItem = {
  id: string;
  label: string;
  href: string;
  accent?: boolean;
  /** In-app route — use React Router instead of full page reload */
  internal?: boolean;
};

export type NavMenuGroup = {
  id: string;
  label: string;
  items: NavLinkItem[];
};

/** Site section — home, about */
export const SITE_NAV_ITEMS: NavLinkItem[] = [
  { id: "home", label: "Home", href: "/", internal: true },
  { id: "about", label: "About us", href: "/about", internal: true },
];

export const NAV_MENU_GROUPS: NavMenuGroup[] = [
  {
    id: "catalog",
    label: "Materials & catalog",
    items: [
      { id: "porcelain", label: "Porcelain slabs", href: "/catalog/porcelain", internal: true },
      { id: "quartz", label: "Quartz", href: "/catalog/quartz", internal: true },
      { id: "cabinets", label: "Cabinets", href: "/catalog/cabinets", internal: true },
      { id: "porcelain-tile", label: "Porcelain tile", href: "/catalog/tile", internal: true },
      { id: "vinyl-flooring", label: "Vinyl flooring", href: "/catalog/floor", internal: true },
      { id: "deck", label: "Decks", href: "/catalog/deck", internal: true },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { id: "3d-design", label: "3D design & layout", href: "/services/3d-design-layout", internal: true },
      { id: "bathroom", label: "Bathroom renovation", href: "/services/bathroom", internal: true },
      { id: "turnkey", label: "Turnkey projects", href: "/services/turnkey-projects", internal: true },
      { id: "countertops", label: "Countertops", href: "/services/countertops", internal: true },
      { id: "cabinets-service", label: "Cabinets", href: "/services/cabinets", internal: true },
      { id: "deck-services", label: "Deck build", href: "/services/deck", internal: true },
      { id: "flooring-service", label: "Flooring", href: "/services/flooring", internal: true },
      { id: "drywall", label: "Drywall & paint", href: "/services/drywall-painting", internal: true },
      { id: "vinyl-service", label: "Vinyl flooring", href: "/services/vinyl-flooring", internal: true },
      { id: "tile-service", label: "Porcelain tile", href: "/services/porcelain-tile", internal: true },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    items: [
      { id: "projects-all", label: "All projects", href: "/projects", internal: true },
      { id: "navy-gold-kitchen", label: "Navy & Gold Kitchen", href: "/projects/navy-gold-kitchen", internal: true },
      { id: "taj-mahal-kitchen", label: "Taj Mahal Kitchen", href: "/projects/taj-mahal-kitchen", internal: true },
      {
        id: "taj-mahal-waterfall-kitchen",
        label: "Taj Mahal Waterfall Kitchen",
        href: "/projects/taj-mahal-waterfall-kitchen",
        internal: true,
      },
      {
        id: "panda-white-kitchen",
        label: "Panda White Kitchen",
        href: "/projects/panda-white-kitchen",
        internal: true,
      },
    ],
  },
];

/** Flat list for simple maps (mobile + legacy) */
export const NAV_LINKS: NavLinkItem[] = [
  ...SITE_NAV_ITEMS,
  ...NAV_MENU_GROUPS.flatMap((g) => g.items),
  { id: "contact", label: "Contact Us", href: "#contact" },
];
