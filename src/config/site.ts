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
      { id: "turnkey", label: "Turnkey projects", href: "/services/turnkey-projects", internal: true },
      { id: "deck-services", label: "Deck services", href: "/services/deck", internal: true },
      { id: "vinyl-service", label: "Vinyl flooring", href: "/services/vinyl-flooring", internal: true },
      { id: "tile-service", label: "Porcelain tile", href: "/services/porcelain-tile", internal: true },
    ],
  },
];

/** Flat list for simple maps (mobile + legacy) */
export const NAV_LINKS: NavLinkItem[] = [
  { id: "home", label: "Home", href: "/", internal: true },
  ...NAV_MENU_GROUPS.flatMap((g) => g.items),
  { id: "contact", label: "Contact Us", href: "#contact" },
];
