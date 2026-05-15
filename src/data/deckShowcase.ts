import deck1 from "@assets/deck/deck1.jpeg";
import deck2 from "@assets/deck/deck2.jpeg";
import deck3 from "@assets/deck/deck3.jpeg";
import deck4 from "@assets/deck/deck4.jpeg";
import deck5 from "@assets/deck/deck5.jpeg";
import deck6 from "@assets/deck/deck6.jpeg";

export type DeckShowcaseBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  image: string;
};

/**
 * Deck “catalog” — curated project photography with copy (not slab-style product cards).
 * Add/reorder images under `assets/deck/` and update this list to match filenames.
 */
export const DECK_SHOWCASE_BLOCKS: DeckShowcaseBlock[] = [
  {
    id: "deck-1",
    heading: "Outdoor living, built for Florida",
    paragraphs: [
      "Decks extend usable living space with clean sight lines and materials chosen for sun, rain, and humidity.",
      "We plan structure, drainage, and finishes together so the result feels intentional—not an afterthought bolted onto the home.",
    ],
    image: deck1,
  },
  {
    id: "deck-2",
    heading: "Structure you do not have to second-guess",
    paragraphs: [
      "Posts, beams, and connections are specified for load and exposure; visible boards sit on top of a sound frame.",
      "That discipline shows up in level surfaces, consistent gaps, and details that stay tight over seasons of heat and moisture.",
    ],
    image: deck2,
  },
  {
    id: "deck-3",
    heading: "Rails, transitions, and edges",
    paragraphs: [
      "Guardrails, steps, and deck-to-house transitions are where safety and code meet design—we treat them as part of the composition.",
      "Finish options range from minimal cable or glass to traditional pickets, matched to your architecture and local requirements.",
    ],
    image: deck3,
  },
  {
    id: "deck-4",
    heading: "Poolside and wet zones",
    paragraphs: [
      "Areas near water need surfaces and fasteners that tolerate splash, chemistry, and barefoot traffic.",
      "We select boards and trims rated for the environment, with detailing that sheds water instead of trapping it.",
    ],
    image: deck4,
  },
  {
    id: "deck-5",
    heading: "Interior and feature walls",
    paragraphs: [
      "The same cladding logic applies indoors: accent walls, niches, and transitions that read as architecture, not decoration.",
      "Grain direction, joint rhythm, and lighting are coordinated so the wall reads calm from every angle in the room.",
    ],
    image: deck5,
  },
  {
    id: "deck-6",
    heading: "Coordinated with the rest of your build",
    paragraphs: [
      "Deck and cladding work often sits alongside stone, porcelain, or cabinetry—we align profiles and colors early in the plan.",
      "When you are ready, we walk options in person so finishes on the deck feel continuous with kitchens, baths, and outdoor rooms.",
    ],
    image: deck6,
  },
];
