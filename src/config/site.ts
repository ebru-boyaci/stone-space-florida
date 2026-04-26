/** Update phone and hrefs when content pages exist. */
export const SITE_PHONE_DISPLAY = "(904) 660-2994";
export const SITE_PHONE_TEL = "+19046602994";

export const SITE_EMAIL = "sales@stonespaces.com";
export const SITE_EMAIL_HREF = "mailto:sales@stonespaces.com";

export const SITE_ADDRESS_LINES = [
  "Showroom & design studio",
  "1234 Biscayne Boulevard, Suite 100",
  "Miami, FL 33132",
] as const;

export const SITE_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Miami%20FL";

/** Placeholder links — replace with real profiles. */
export const SITE_SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company" },
  { name: "Facebook", href: "https://www.facebook.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
] as const;

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#top", accent: false },
  { id: "about", label: "About Us", href: "#about", accent: false },
  { id: "products", label: "Products", href: "#products", accent: false },
  { id: "cabinets", label: "Cabinets", href: "#cabinets", accent: true },
  { id: "turnkey", label: "Turn Key Projects", href: "#turnkey", accent: false },
  { id: "services", label: "Services", href: "#services", accent: false },
  { id: "reference", label: "Reference", href: "#reference", accent: false },
  { id: "catalogue", label: "Catalogue", href: "#catalogue", accent: false },
  { id: "blog", label: "Blog", href: "#blog", accent: false },
  { id: "contact", label: "Contact Us", href: "#contact", accent: false },
] as const;
