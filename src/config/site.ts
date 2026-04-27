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

/** Ana sayfa bölümleri eklenene kadar sadece Home + Contact */
export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#top", accent: false },
  { id: "contact", label: "Contact Us", href: "#contact", accent: false },
] as const;
