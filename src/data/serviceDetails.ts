import img3dDesign from "@assets/services/3D-kitchen-design.png";
import imgBathroom from "@assets/services/bathroom-renovation.png";
import imgCabinet from "@assets/services/cabinet-installation.png";
import imgCountertops from "@assets/services/countertop-installation.png";
import imgDeck from "@assets/services/deck-installation.png";
import imgDrywall from "@assets/services/drywall-painting-service.png";
import imgFlooring from "@assets/services/flooring-installtion.png";
import imgTurnKey from "@assets/services/turn-key-projects.png";

export type ServiceDetail = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  coverImage: string;
  paragraphs: string[];
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "3d-design-layout",
    kicker: "Design",
    title: "3D kitchen design",
    summary:
      "Visualize cabinetry, surfaces, and layout before installation with detailed 3D renderings tailored to your measurements.",
    coverImage: img3dDesign,
    paragraphs: [
      "3D design and layout lets you see your kitchen or bath before work begins. We build accurate models from your dimensions so you can review cabinet runs, island placement, materials, and traffic flow with confidence.",
      "Revisions are faster on screen than on site—color, hardware, and stone choices are tested in the model so installation day matches what you approved.",
    ],
  },
  {
    slug: "bathroom",
    kicker: "Renovation",
    title: "Bathroom renovation",
    summary:
      "Full bathroom refreshes with coordinated tile, vanities, fixtures, and waterproofing for a clean, durable finish.",
    coverImage: imgBathroom,
    paragraphs: [
      "We handle bathroom renovations end to end: demolition, waterproofing, tile, vanities, plumbing coordination, and final trim.",
      "Whether you are updating a powder room or a primary bath, materials are selected for moisture, ease of care, and a cohesive look with the rest of your home.",
    ],
  },
  {
    slug: "turnkey-projects",
    kicker: "Projects",
    title: "Turn-key projects",
    summary:
      "One team from design through install—kitchens, baths, flooring, cabinetry, and countertops managed under a single plan.",
    coverImage: imgTurnKey,
    paragraphs: [
      "Turn-key projects mean we handle everything from design to final installation. We manage kitchens, bathrooms, flooring, cabinetry, countertops, and full home renovations, all under one roof.",
      "With our in-house team and wide material selection, we deliver a smooth, fast, and stress-free remodeling experience—you hand us the key and we take care of the rest.",
    ],
  },
  {
    slug: "countertops",
    kicker: "Installation",
    title: "Countertops",
    summary:
      "Quartz and porcelain surfaces templated, fabricated, and installed with precise edges, seams, and sink cutouts.",
    coverImage: imgCountertops,
    paragraphs: [
      "Countertop installation covers templating, fabrication, and fitting for quartz, porcelain, and stone-look slabs. We coordinate sink and cooktop cutouts, waterfall edges, and backsplash transitions.",
      "Our installers work to tight seams and level runs so your tops feel solid, look continuous, and stand up to daily use.",
    ],
  },
  {
    slug: "cabinets",
    kicker: "Cabinetry",
    title: "Cabinets",
    summary:
      "Shaker and contemporary cabinet lines installed level, plumb, and aligned with your stone and appliance schedule.",
    coverImage: imgCabinet,
    paragraphs: [
      "Cabinet installation includes base and wall boxes, fillers, panels, and hardware alignment. We set boxes true before counters land so doors and drawers operate cleanly.",
      "From white shaker to wood-grain bases and painted finishes, we match your design plan and coordinate with countertop and appliance trades.",
    ],
  },
  {
    slug: "deck",
    kicker: "Outdoor",
    title: "Deck build",
    summary:
      "Exterior decks and cladding built for Florida sun, rain, and humidity—with structure, rails, and finishes planned together.",
    coverImage: imgDeck,
    paragraphs: [
      "Decks extend living space with frames, decking, and rails specified for load, drainage, and exposure. We also carry cladding and accent walls that read as architecture, not add-ons.",
      "Finishes are chosen for barefoot traffic, splash zones, and the look you want next to stone, porcelain, or cabinetry indoors.",
    ],
  },
  {
    slug: "flooring",
    kicker: "Flooring",
    title: "Flooring",
    summary:
      "Vinyl, tile, and coordinated transitions installed flat, waterproof where needed, and aligned with existing trim.",
    coverImage: imgFlooring,
    paragraphs: [
      "Flooring installation spans luxury vinyl, porcelain tile, and prep work so subfloors are ready. We plan transitions at doorways, kitchens, and baths to avoid height jumps.",
      "Product choice depends on room use—we help you balance comfort, water resistance, and the wood or stone look you want.",
    ],
  },
  {
    slug: "drywall-painting",
    kicker: "Finishes",
    title: "Drywall & paint",
    summary:
      "Patch, skim, and paint after renovation work so walls are flush, clean, and ready for hardware and trim.",
    coverImage: imgDrywall,
    paragraphs: [
      "Drywall and painting close the loop after structural or layout changes. We repair boards, blend texture, and apply finish coats that match the rest of your space.",
      "Scheduling aligns with cabinet and floor trades so touch-ups happen once, not in repeated return visits.",
    ],
  },
  {
    slug: "vinyl-flooring",
    kicker: "Flooring",
    title: "Vinyl flooring",
    summary:
      "Water-resistant vinyl plank in multiple thicknesses—comfortable underfoot and quick to install in busy rooms.",
    coverImage: imgFlooring,
    paragraphs: [
      "Vinyl flooring is a durable, water-resistant solution designed to replicate the look of natural wood or stone. It is scratch-resistant, easy to maintain, and comfortable underfoot, making it ideal for kitchens, bathrooms, and high-traffic areas.",
      "We offer thickness options of 5.5mm, 6mm, 7mm, 8mm, and 10mm to suit different needs and budgets.",
    ],
  },
  {
    slug: "porcelain-tile",
    kicker: "Flooring",
    title: "Porcelain tile",
    summary:
      "Dense porcelain tile for kitchens, baths, and entries—large formats, clean grout lines, and long-wearing surfaces.",
    coverImage: imgFlooring,
    paragraphs: [
      "Porcelain tile is a high-density, durable flooring option ideal for both residential and commercial spaces. It is water-resistant, scratch-resistant, and highly durable, making it perfect for kitchens, bathrooms, and high-traffic areas.",
      "Available sizes: 12×24, 24×24, 24×48, and 48×48.",
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
