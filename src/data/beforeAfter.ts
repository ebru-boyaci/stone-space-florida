import before1 from "@assets/beforeafter/before1.avif";
import after1 from "@assets/beforeafter/after1.avif";
import before2 from "@assets/beforeafter/before2.avif";
import after2 from "@assets/beforeafter/after2.avif";

export type BeforeAfterTransformation = {
  id: string;
  title: string;
  location?: string;
  summary: string;
  beforeSrc: string;
  afterSrc: string;
};

export const BEFORE_AFTER_TRANSFORMATIONS: BeforeAfterTransformation[] = [
  {
    id: "transformation-1",
    title: "Kitchen transformation",
    location: "Jacksonville area",
    summary:
      "Full refresh with new surfaces, cabinetry coordination, and a brighter, more functional layout.",
    beforeSrc: before1,
    afterSrc: after1,
  },
  {
    id: "transformation-2",
    title: "Space transformation",
    location: "Florida",
    summary:
      "Before-and-after documentation of a completed renovation—materials, install, and finished detail.",
    beforeSrc: before2,
    afterSrc: after2,
  },
];
