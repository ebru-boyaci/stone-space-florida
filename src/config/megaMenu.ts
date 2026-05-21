import { PROJECTS } from "@/data/projects";
import type { NavLinkItem } from "@/config/site";
import { NAV_MENU_GROUPS, SITE_NAV_ITEMS } from "@/config/site";

export type MegaMenuSection = {
  id: string;
  label: string;
  description: string;
  items: NavLinkItem[];
};

export type MegaMenuProjectCard = {
  slug: string;
  title: string;
  href: string;
  image: string;
};

const home = SITE_NAV_ITEMS.find((i) => i.id === "home")!;
const about = SITE_NAV_ITEMS.find((i) => i.id === "about")!;
const catalog = NAV_MENU_GROUPS.find((g) => g.id === "catalog")!;
const services = NAV_MENU_GROUPS.find((g) => g.id === "services")!;
const projects = NAV_MENU_GROUPS.find((g) => g.id === "projects")!;

export const MEGA_PROJECT_CARDS: MegaMenuProjectCard[] = PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  href: `/projects/${p.slug}`,
  image: p.coverImage,
}));

/** Desktop mega menu — one section visible at a time */
export const MEGA_MENU_SECTIONS: MegaMenuSection[] = [
  {
    id: "home",
    label: "Home",
    description: "Start on the homepage — hero, services & contact",
    items: [home],
  },
  {
    id: "about",
    label: "About us",
    description: "Our story, quality guarantee & Jacksonville showroom",
    items: [about],
  },
  {
    id: catalog.id,
    label: "Materials",
    description: "Slabs, tile, flooring & outdoor",
    items: catalog.items,
  },
  {
    id: services.id,
    label: "Services",
    description: "Design through installation",
    items: services.items,
  },
  {
    id: projects.id,
    label: "Projects",
    description: "Portfolio, references & kitchens",
    items: projects.items,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Showroom visits & estimates",
    items: [{ id: "contact", label: "Contact us", href: "#contact" }],
  },
];

export const MEGA_MENU_DEFAULT_SECTION = "catalog";
