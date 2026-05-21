import { ABOUT_INTRO, ABOUT_QUALITY } from "@/data/aboutContent";
import { HEADER_BAR_PADDING } from "@/config/layout";
import imgQuartzAlba from "@assets/quartz/calacatta-alba.avif";
import imgQuartzPanda from "@assets/quartz/calacatta-panda.avif";
import imgQuartzTaj from "@assets/quartz/taj-mahal.avif";
import imgHeroKitchen from "@assets/projects/PalmCoast1/hero-kitchen-navy-island.jpeg";
import imgKitchenWide from "@assets/projects/PalmCoast1/kitchen-wide-white-shaker.jpeg";
import imgKitchenRange from "@assets/projects/PalmCoast1/kitchen-range-hood-navy.jpeg";
import imgRangeDetail from "@assets/projects/PalmCoast1/range-hood-backsplash-detail.jpeg";
import imgTajWide from "@assets/projects/TajMahalKitchen/kitchen-wide-taj-mahal.jpeg";
import imgTajIsland from "@assets/projects/TajMahalKitchen/kitchen-island-waterfall-taj-mahal.jpeg";
import { Link } from "react-router-dom";

const bodyTextLight =
  "text-pretty text-lg leading-relaxed text-zinc-700 sm:text-xl sm:leading-relaxed";

type QualityCheckerCell =
  | { kind: "image"; src: string; alt: string }
  | { kind: "text"; paragraphs: string[] };

function AboutQualityCheckerCell({ cell }: { cell: QualityCheckerCell }) {
  if (cell.kind === "image") {
    return (
      <div className="about-quality-checker__image relative aspect-square min-h-[14rem] w-full sm:min-h-[16rem] lg:min-h-[18rem]">
        <img
          src={cell.src}
          alt={cell.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="about-quality-checker__text flex aspect-square min-h-[14rem] w-full items-center justify-center sm:min-h-[16rem] lg:min-h-[18rem]">
      <div className="max-w-[22rem] space-y-4 px-5 py-6 text-center sm:px-6 sm:py-8">
        {cell.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-pretty text-[0.9375rem] leading-[1.55] text-zinc-900 sm:text-base sm:leading-[1.6]"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function AboutImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-sm bg-zinc-900/40 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-cover object-center"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

export function AboutPage() {
  const qualityCheckerboard: QualityCheckerCell[] = [
    {
      kind: "image",
      src: imgRangeDetail,
      alt: "Quartz backsplash and range wall detail",
    },
    {
      kind: "text",
      paragraphs: [ABOUT_QUALITY.lead, ...ABOUT_QUALITY.blocks[0].paragraphs],
    },
    {
      kind: "image",
      src: imgTajIsland,
      alt: "Taj Mahal quartz waterfall island",
    },
    {
      kind: "text",
      paragraphs: ABOUT_QUALITY.blocks[1].paragraphs,
    },
    {
      kind: "text",
      paragraphs: ABOUT_QUALITY.blocks[2].paragraphs,
    },
    {
      kind: "image",
      src: imgKitchenRange,
      alt: "Kitchen with quartz countertops and range hood",
    },
    {
      kind: "text",
      paragraphs: ABOUT_QUALITY.blocks[3].paragraphs,
    },
    {
      kind: "image",
      src: imgKitchenWide,
      alt: "Wide view of completed stone kitchen",
    },
  ];

  const stoneGrid = [
    { src: imgQuartzPanda, alt: "Calacatta Panda quartz slab" },
    { src: imgQuartzTaj, alt: "Taj Mahal quartz surface" },
    { src: imgQuartzAlba, alt: "Calacatta Alba quartz slab" },
  ];

  return (
    <div className="about-page min-h-screen min-h-[100dvh] bg-[#0c0c0c] text-zinc-100">
      <div
        className={`service-detail-page__nav-band bg-[#5a5854] ${HEADER_BAR_PADDING}`}
        aria-hidden
      />

      <header className="relative min-h-[min(52vh,28rem)] overflow-hidden sm:min-h-[min(58vh,32rem)]">
        <img
          src={imgHeroKitchen}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#0c0c0c]" aria-hidden />
        <div className="project-page-shell relative flex min-h-[inherit] flex-col justify-end pb-10 pt-16 sm:pb-14 sm:pt-20">
          <p className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base">
            {ABOUT_INTRO.kicker}
          </p>
          <h1 className="mt-2 max-w-4xl font-serif text-[clamp(2.75rem,6vw,4.25rem)] font-medium tracking-[-0.02em] text-white">
            {ABOUT_INTRO.title}
          </h1>
        </div>
      </header>

      <section className="bg-[#f2efe8] text-zinc-900">
        <div className="project-page-shell py-12 sm:py-16 lg:py-20">
          <div className="about-intro-layout lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <div className="about-intro-copy min-w-0 space-y-6">
              {ABOUT_INTRO.bodyParagraphs.map((p, i) => (
                <p key={i} className={bodyTextLight}>
                  {p}
                </p>
              ))}
            </div>

            <AboutImage
              src={imgTajWide}
              alt="Taj Mahal quartz kitchen with waterfall island"
              className="mt-10 aspect-[4/3] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.35)] sm:mt-12 lg:mt-0 lg:justify-self-end"
            />
          </div>

          <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:gap-8">
            {stoneGrid.map((item) => (
              <AboutImage
                key={item.alt}
                src={item.src}
                alt={item.alt}
                className="aspect-[3/4] min-h-[12rem] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.25)] sm:min-h-[16rem] lg:min-h-[20rem]"
              />
            ))}
          </div>

          <p className="mt-12">
            <Link
              to="/catalog/quartz"
              className="inline-flex items-center gap-2 rounded-full bg-[#a88d70] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#968061] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a88d70] sm:text-base"
            >
              Explore our stones
            </Link>
          </p>
        </div>
      </section>

      <section className="about-quality-section border-t border-zinc-900/10 bg-[#f2efe8] text-zinc-900">
        <div className="project-page-shell py-12 text-center sm:py-14 lg:py-16">
          <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-[0.06em] text-zinc-900">
            {ABOUT_QUALITY.title}
          </h2>
        </div>

        <div className="about-quality-checker grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {qualityCheckerboard.map((cell, index) => (
            <AboutQualityCheckerCell key={index} cell={cell} />
          ))}
        </div>

        <div className="project-page-shell flex flex-wrap justify-center gap-4 py-12 sm:py-14 lg:py-16">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#a88d70] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#968061] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a88d70] sm:text-base"
          >
            Get in touch
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-800 transition-colors hover:border-zinc-900/35 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900/30 sm:text-base"
          >
            View projects
          </Link>
        </div>
      </section>
    </div>
  );
}
