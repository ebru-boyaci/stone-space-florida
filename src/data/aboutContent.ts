export type AboutQualityBlock = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const ABOUT_INTRO = {
  kicker: "Jacksonville, Florida",
  title: "About us",
  /** Full story — single block, paragraphs stacked in order */
  bodyParagraphs: [
    "We are a family-owned and operated business proudly located in Jacksonville, with a strong commitment to providing our customers with the finest quality stones. With over 60 different stone options to choose from, we offer a diverse selection that caters to a wide range of styles and preferences.",
    "Our collection features an exquisite variety of stones sourced from the finest quarries around the world, including Asia, Europe, and the Americas.",
    "We handpick each stone for its exceptional quality, durability, and unique beauty, ensuring that every piece is of the highest standard. Whether you are looking for timeless elegance, modern sophistication, or bold, one-of-a-kind designs, our stones are crafted to meet your specific needs.",
    "At our core, we are dedicated to providing unmatched quality and a personalized experience. We pride ourselves on offering exclusive designs that cannot be found anywhere else.",
    "Our expert team is always available to guide you in selecting the perfect stone for your project, whether it's for a residential or commercial space. With a passion for excellence and a deep understanding of the industry, we are here to help bring your vision to life.",
    "Explore our wide range of stones, and let us help you transform your space with the beauty and timeless appeal of natural stone.",
  ],
};

export const ABOUT_QUALITY = {
  title: "Quality guaranteed",
  lead: "We are committed to provide our customers with only the highest quality stones.",
  blocks: [
    {
      id: "sourcing",
      title: "Finest quarries",
      paragraphs: [
        "Each of our products is carefully selected and sourced from the finest quarries, ensuring that we offer stones of exceptional durability, aesthetics, and longevity.",
      ],
    },
    {
      id: "control",
      title: "Rigorous inspection",
      paragraphs: [
        "Every stone undergoes a series of rigorous quality control processes during production.",
        "We meticulously check the color, texture, and pattern consistency of our stones to ensure a perfect match for your project.",
      ],
    },
    {
      id: "protection",
      title: "Built to last",
      paragraphs: [
        "Additionally, our stones are treated with special protective processes to prevent fading, cracking, or color changes over time.",
        "We guarantee the quality of the stones we provide and offer full support to ensure flawless results for every project.",
      ],
    },
    {
      id: "support",
      title: "Your satisfaction",
      paragraphs: [
        "If you encounter any issues, we are dedicated to providing the best solution and ensuring your satisfaction.",
        "When you choose us, you are investing in durable, reliable, and beautiful stones that will stand the test of time.",
      ],
    },
  ] satisfies AboutQualityBlock[],
};
