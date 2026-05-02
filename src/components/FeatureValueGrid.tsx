import imgCabinet from "@assets/services/cabinet-installation.png";
import imgCountertops from "@assets/services/countertop-installation.png";
import imgKitchenDesign from "@assets/services/3D-kitchen-design.png";
import imgBathroom from "@assets/services/bathroom-renovation.png";
import imgDeck from "@assets/services/deck-installation.png";
import imgDrywall from "@assets/services/drywall-painting-service.png";
import imgFlooring from "@assets/services/flooring-installtion.png";
import imgTurnKey from "@assets/services/turn-key-projects.png";

type ServiceCard = {
  category: string;
  title: string;
  src: string;
  alt: string;
};

const SERVICES: ServiceCard[] = [
  {
    category: "Installation",
    title: "Countertops",
    src: imgCountertops,
    alt: "Countertop installation",
  },
  {
    category: "Design",
    title: "3D kitchen design",
    src: imgKitchenDesign,
    alt: "3D kitchen design",
  },
  {
    category: "Renovation",
    title: "Bathroom",
    src: imgBathroom,
    alt: "Bathroom renovation",
  },
  {
    category: "Projects",
    title: "Turn-key",
    src: imgTurnKey,
    alt: "Turn-key projects",
  },
  {
    category: "Cabinetry",
    title: "Cabinets",
    src: imgCabinet,
    alt: "Cabinet installation",
  },
  {
    category: "Outdoor",
    title: "Deck build",
    src: imgDeck,
    alt: "Deck installation",
  },
  {
    category: "Flooring",
    title: "Flooring",
    src: imgFlooring,
    alt: "Flooring installation",
  },
  {
    category: "Finishes",
    title: "Drywall & paint",
    src: imgDrywall,
    alt: "Drywall and painting service",
  },
];

const iconRing =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#a88d70]/85 text-[#8a6f52] sm:h-10 sm:w-10";

function IconCube() {
  return (
    <svg className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6L12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M4 7.6 12 12l8-4.4M12 12v8.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 21V6.2h10V21" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M5 21h14M10 9.2h2.2M10 13h2.2M10 16.7h2.2M14.8 9.2h1M14.8 13h1M14.8 16.7h1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function FeatureValueGrid() {
  return (
    <section
      className="relative bg-[#343434] px-5 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-8 md:px-10 md:pb-28"
      aria-label="Stone Spaces services"
    >
      <p className="sr-only">Swipe horizontally to browse all services.</p>
      <ul
        className="-mx-5 flex snap-x snap-mandatory touch-pan-x gap-6 overflow-x-auto overscroll-x-contain px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:gap-7 sm:px-8 md:-mx-10 md:gap-8 md:px-10 [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {SERVICES.map((item) => (
          <li
            key={item.title + item.category}
            className="w-[min(88vw,26rem)] shrink-0 snap-start sm:w-[min(78vw,28rem)] md:w-[min(72vw,30rem)]"
          >
            <article className="flex h-full min-h-[min(42rem,85vh)] flex-col rounded-none border border-black/[0.06] bg-[#f2efe8] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.35)] sm:min-h-[44rem] sm:p-8 md:min-h-[46rem] md:p-9">
              <div className="flex gap-2.5">
                <span className={iconRing} aria-hidden>
                  <IconCube />
                </span>
                <span className={iconRing} aria-hidden>
                  <IconBuilding />
                </span>
              </div>

              <div className="relative mt-7 flex min-h-0 flex-1 items-center justify-center py-8 sm:mt-8 sm:py-10 md:py-12">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[min(22rem,52vw)] w-full max-w-[min(100%,24rem)] object-contain object-center sm:max-h-[26rem] md:max-h-[30rem]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="mt-auto border-t border-black/[0.06] pt-6 text-left sm:pt-7">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-zinc-600 sm:text-[0.75rem]">
                  {item.category}
                </p>
                <h3 className="mt-2 font-sans text-[1.22rem] font-semibold leading-tight tracking-[-0.02em] text-zinc-950 sm:text-[1.38rem] md:text-[1.45rem]">
                  {item.title}
                </h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-xs text-zinc-500 sm:hidden" aria-hidden>
        ← Swipe for more →
      </p>
    </section>
  );
}
