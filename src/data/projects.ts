import coverTajMahal from "@assets/projects/Kitchen1/hero-white-shaker-taj-mahal.jpeg";
import coverTajMahalIsland from "@assets/projects/TajMahalKitchen/kitchen-island-waterfall-taj-mahal.jpeg";
import imgTajMahalRangeWall from "@assets/projects/TajMahalKitchen/kitchen-range-wall-taj-mahal.jpeg";
import coverKitchen3Wide from "@assets/projects/TajMahalKitchen/kitchen-wide-taj-mahal.jpeg";
import imgKitchen3WideIsland from "@assets/projects/TajMahalKitchen/kitchen-wide-island-view.jpeg";
import imgKitchen3IslandPortrait from "@assets/projects/TajMahalKitchen/kitchen-island-portrait.jpeg";
import imgKitchen3FarmhouseSink from "@assets/projects/TajMahalKitchen/kitchen-farmhouse-sink.jpeg";
import imgKitchen3IslandWaterfall from "@assets/projects/TajMahalKitchen/kitchen-island-waterfall-portrait.jpeg";
import imgKitchen3GlassPantry from "@assets/projects/TajMahalKitchen/kitchen-glass-pantry-wall.jpeg";
import imgKitchen3IslandWood from "@assets/projects/TajMahalKitchen/kitchen-island-wood-base.jpeg";
import coverPandaHero from "@assets/projects/PandaWhiteKitchen/hero-panda-white-island-waterfall.jpeg";
import imgPandaWide from "@assets/projects/PandaWhiteKitchen/kitchen-island-panda-white-wide.jpeg";
import coverPalmCoast from "@assets/projects/PalmCoast1/hero-kitchen-navy-island.jpeg";
import imgKitchenWide from "@assets/projects/PalmCoast1/kitchen-wide-white-shaker.jpeg";
import imgKitchenRangeHood from "@assets/projects/PalmCoast1/kitchen-range-hood-navy.jpeg";
import imgRangeHoodDetail from "@assets/projects/PalmCoast1/range-hood-backsplash-detail.jpeg";
import imgLaundryGreen from "@assets/projects/PalmCoast1/laundry-green-shaker.jpeg";
import videoKitchenWalkthrough from "@assets/projects/PalmCoast1/kitchen-walkthrough.mp4";

export type ProjectMaterial = {
  category: string;
  name: string;
};

export type ProjectGalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** Landscape photos span full row; portrait uses half-width on larger screens */
  orientation?: "landscape" | "portrait";
};

export type ProjectVideoOrientation = "portrait" | "landscape";

export type Project = {
  slug: string;
  title: string;
  location: string;
  kicker: string;
  summary: string;
  coverImage: string;
  video?: string;
  /** Optional hint; auto-detected from video dimensions when omitted */
  videoOrientation?: ProjectVideoOrientation;
  materials: ProjectMaterial[];
  paragraphs: string[];
  gallery: ProjectGalleryItem[];
};

export const PROJECTS: Project[] = [
  {
    slug: "navy-gold-kitchen",
    title: "Navy & Gold Kitchen",
    location: "Palm Coast, Florida",
    kicker: "Turnkey kitchen & laundry",
    summary:
      "A full kitchen and laundry refresh with Sylvia Gold quartz, Crystal Luxor porcelain flooring, and three shaker cabinet finishes—white, navy, and green.",
    coverImage: coverPalmCoast,
    video: videoKitchenWalkthrough,
    videoOrientation: "portrait",
    materials: [
      { category: "Quartz", name: "Sylvia Gold" },
      { category: "Porcelain", name: "Crystal Luxor" },
      {
        category: "Cabinets",
        name: "White Shaker · Green Shaker · Navy Blue",
      },
    ],
    paragraphs: [
      "This navy-and-gold kitchen pairs a statement island with a coordinated laundry room under one material palette. Sylvia Gold quartz runs across the island—with a waterfall edge—the perimeter counters, and a full-height backsplash behind the range.",
      "Cabinetry mixes three shaker finishes: crisp white along the main run and glass-front uppers, deep navy on the island base and custom range hood, and sage green in the laundry. Crystal Luxor porcelain tile flooring ties the spaces together with a wood-look grain that handles Florida humidity and daily traffic.",
      "Gold-toned hardware, pot filler, and pendant lighting warm the white-and-navy composition without overpowering the stone veining.",
    ],
    gallery: [
      {
        id: "hero-kitchen",
        src: coverPalmCoast,
        alt: "Navy and gold kitchen — navy island with Sylvia Gold quartz waterfall and white shaker perimeter cabinets",
        caption: "Kitchen — navy island, white shaker perimeter, Sylvia Gold quartz",
      },
      {
        id: "kitchen-wide",
        src: imgKitchenWide,
        alt: "Wide view of navy and gold kitchen with white shaker cabinets and Sylvia Gold island countertop",
        caption: "Kitchen — wide view, white shaker & Sylvia Gold island",
      },
      {
        id: "kitchen-range",
        src: imgKitchenRangeHood,
        alt: "Kitchen with navy range hood, Sylvia Gold backsplash, and navy island cabinets",
        caption: "Kitchen — navy range hood & full-height Sylvia Gold backsplash",
      },
      {
        id: "range-detail",
        src: imgRangeHoodDetail,
        alt: "Close-up of navy shaker range hood with Sylvia Gold quartz backsplash and white shaker cabinets",
        caption: "Range wall — navy hood, Sylvia Gold slab, white shaker",
      },
      {
        id: "laundry",
        src: imgLaundryGreen,
        alt: "Laundry room with green shaker cabinets and quartz countertop",
        caption: "Laundry — green shaker cabinets",
      },
    ],
  },
  {
    slug: "taj-mahal-kitchen",
    title: "Taj Mahal Kitchen",
    location: "Florida",
    kicker: "Kitchen renovation",
    summary:
      "White shaker cabinetry with Taj Mahal quartz countertops and a full-height slab backsplash—warm veining, brushed-gold hardware, and a clean monochromatic palette.",
    coverImage: coverTajMahal,
    materials: [
      { category: "Quartz", name: "Taj Mahal" },
      { category: "Cabinets", name: "White Shaker" },
    ],
    paragraphs: [
      "Crisp white shaker cabinets run floor to ceiling with crown molding and glass-front uppers, paired with long brushed-gold pulls for a refined, contemporary line.",
      "Taj Mahal quartz carries from the countertops up the full backsplash behind the cooktop and range hood, so the warm veining reads as one continuous surface.",
      "A white chimney hood and black cooktop keep the palette tight—stone and cabinetry stay the focus without competing finishes.",
    ],
    gallery: [
      {
        id: "range-hood-wall",
        src: coverTajMahal,
        alt: "White shaker kitchen with Taj Mahal quartz countertops and full-height backsplash",
        caption: "Range wall — white shaker & Taj Mahal slab",
        orientation: "portrait",
      },
    ],
  },
  {
    slug: "taj-mahal-waterfall-kitchen",
    title: "Taj Mahal Waterfall Kitchen",
    location: "Florida",
    kicker: "Kitchen renovation",
    summary:
      "Taj Mahal quartz with a waterfall island, white shaker uppers, and warm wood-grain base cabinets—farmhouse sink, glass pantry, and hammered bronze pendants.",
    coverImage: coverTajMahalIsland,
    materials: [
      { category: "Quartz", name: "Taj Mahal" },
      { category: "Cabinets", name: "White Shaker · Wood grain base" },
    ],
    paragraphs: [
      "White shaker cabinets with glass-front uppers anchor the wall run, while wood-grain drawer bases and an island base add warmth and horizontal texture to the room.",
      "Taj Mahal quartz tops the perimeter counters and wraps the island in a waterfall edge; a white farmhouse sink, wine cooler, and bar seating complete the work zone.",
      "Hammered dome pendants, a glass-front pantry wall, and full-height slab behind the range tie the open plan together with one coordinated stone run.",
    ],
    gallery: [
      {
        id: "wide-main",
        src: coverKitchen3Wide,
        alt: "Wide view of Taj Mahal kitchen with waterfall island and dome pendant lights",
        caption: "Kitchen — wide view, Taj Mahal island & pendants",
        orientation: "landscape",
      },
      {
        id: "wide-island",
        src: imgKitchen3WideIsland,
        alt: "Taj Mahal kitchen with island seating, wood bases, and stainless appliances",
        caption: "Kitchen — island & dining area",
        orientation: "landscape",
      },
      {
        id: "island-waterfall",
        src: coverTajMahalIsland,
        alt: "Kitchen island with Taj Mahal quartz waterfall edge, wood base, and white shaker uppers",
        caption: "Island — Taj Mahal waterfall & wood-grain base",
        orientation: "portrait",
      },
      {
        id: "range-wall",
        src: imgTajMahalRangeWall,
        alt: "Range wall with Taj Mahal quartz backsplash, white shaker uppers, and wood drawer bases",
        caption: "Range — full-height Taj Mahal backsplash",
        orientation: "portrait",
      },
      {
        id: "island-portrait",
        src: imgKitchen3IslandPortrait,
        alt: "Taj Mahal waterfall island with wood base and bar stools",
        caption: "Island — waterfall edge & seating",
        orientation: "portrait",
      },
      {
        id: "farmhouse-sink",
        src: imgKitchen3FarmhouseSink,
        alt: "Wood island with white farmhouse sink and gold faucet",
        caption: "Island — farmhouse sink & gold faucet",
        orientation: "portrait",
      },
      {
        id: "island-waterfall-detail",
        src: imgKitchen3IslandWaterfall,
        alt: "Close view of Taj Mahal waterfall island with gold pot filler beyond",
        caption: "Island — Taj Mahal waterfall detail",
        orientation: "portrait",
      },
      {
        id: "glass-pantry",
        src: imgKitchen3GlassPantry,
        alt: "Glass-front pantry wall with Taj Mahal backsplash and under-cabinet lighting",
        caption: "Pantry — glass uppers & Taj Mahal backsplash",
        orientation: "portrait",
      },
      {
        id: "island-wood",
        src: imgKitchen3IslandWood,
        alt: "Wood-base island with farmhouse sink and smart stainless refrigerator",
        caption: "Island — wood cabinetry & appliances",
        orientation: "portrait",
      },
    ],
  },
  {
    slug: "panda-white-kitchen",
    title: "Panda White Kitchen",
    location: "Florida",
    kicker: "Kitchen renovation",
    summary:
      "Calacatta Panda quartz on a waterfall island—bold black veining on a bright white field with charcoal shaker cabinetry.",
    coverImage: coverPandaHero,
    materials: [{ category: "Quartz", name: "Panda" }],
    paragraphs: [
      "This island centers on Calacatta Panda quartz: a crisp white surface with dramatic black movement that reads from the countertop through a full waterfall edge to the floor.",
      "Charcoal shaker bases ground the stone and pick up the veining, while the rectangular sink cutout and clean slab lines keep the install tailored for the open plan beyond.",
      "With protective flooring still down and cabinetry going in around the island, the photos document the stone layout before final appliances and trim—a clear look at the panda slab run in place.",
    ],
    gallery: [
      {
        id: "island-waterfall",
        src: coverPandaHero,
        alt: "Calacatta Panda quartz kitchen island with black veining and waterfall edge on charcoal shaker cabinets",
        caption: "Island — Calacatta Panda waterfall & charcoal shaker",
        orientation: "landscape",
      },
      {
        id: "island-wide",
        src: imgPandaWide,
        alt: "Wide view of Calacatta Panda waterfall island during kitchen installation",
        caption: "Kitchen — Calacatta Panda island, wide view",
        orientation: "landscape",
      },
    ],
  },
];

/** Eski slug → güncel proje */
export const PROJECT_SLUG_REDIRECTS: Record<string, string> = {
  "farmhouse-taj-mahal-kitchen": "taj-mahal-waterfall-kitchen",
};

export function getProject(slug: string): Project | undefined {
  const resolved = PROJECT_SLUG_REDIRECTS[slug] ?? slug;
  return PROJECTS.find((p) => p.slug === resolved);
}
