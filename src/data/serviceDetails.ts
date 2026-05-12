export type ServiceDetail = {
  kicker: string;
  title: string;
  paragraphs: string[];
};

const DETAILS: Record<string, ServiceDetail> = {
  "vinyl-flooring": {
    kicker: "Flooring",
    title: "Vinyl flooring",
    paragraphs: [
      "Vinyl flooring is a durable, water-resistant solution designed to replicate the look of natural wood or stone. It is scratch-resistant, easy to maintain, and comfortable underfoot, making it ideal for kitchens, bathrooms, and high-traffic areas. With a wide range of styles and quick installation options, vinyl flooring offers a practical and stylish choice for any space.",
      "We offer thickness options of 5.5mm, 6mm, 7mm, 8mm, and 10mm to suit different needs and budgets.",
    ],
  },
  "porcelain-tile": {
    kicker: "Flooring",
    title: "Porcelain tile",
    paragraphs: [
      "Porcelain tile is a high-density, durable flooring option ideal for both residential and commercial spaces. It is water-resistant, scratch-resistant, and highly durable, making it perfect for kitchens, bathrooms, and high-traffic areas. With a wide range of finishes and styles, it offers a clean, modern appearance with low maintenance and long-lasting performance.",
      "Available sizes: 12×24, 24×24, 24×48, and 48×48.",
    ],
  },
  "turnkey-projects": {
    kicker: "Projects",
    title: "Turnkey projects",
    paragraphs: [
      "Turnkey projects mean we handle everything—from design to final installation. We manage kitchens, bathrooms, flooring, cabinetry, countertops, and full home renovations, all under one roof. With our in-house team and wide material selection, we deliver a smooth, fast, and stress-free remodeling experience—just hand us the key 🔑 and we take care of the rest.",
    ],
  },
  "3d-design-layout": {
    kicker: "Design",
    title: "3D design & layout",
    paragraphs: [
      "3D Design & Layout allows you to visualize your space before the project begins. We create detailed 3D renderings and layouts based on your measurements and preferences, helping you see cabinet placement, colors, materials, and overall flow. This ensures a clear vision, better planning, and a smooth, accurate installation process.",
    ],
  },
  deck: {
    kicker: "Outdoor & interior",
    title: "Decks",
    paragraphs: [
      "Decks can be used for both exterior and interior applications, offering a versatile and modern design solution. They are suitable for floors and wall applications, creating a seamless and stylish look throughout the space. Ideal for poolside areas, decks are durable, slip-resistant, and built to withstand moisture and outdoor conditions while maintaining a clean, high-end appearance.",
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return DETAILS[slug];
}
