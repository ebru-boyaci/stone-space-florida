import imgCountertops from "@assets/services/countertop-installation.png";
import imgKitchenDesign from "@assets/services/3D-kitchen-design.png";
import imgBathroom from "@assets/services/bathroom-renovation.png";
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
    title: "Countertop install",
    src: imgCountertops,
    alt: "Countertop installation service",
  },
  {
    category: "Design",
    title: "3D kitchen design",
    src: imgKitchenDesign,
    alt: "3D kitchen design visualization",
  },
  {
    category: "Renovation",
    title: "Bathroom refresh",
    src: imgBathroom,
    alt: "Bathroom renovation service",
  },
  {
    category: "Projects",
    title: "Turn-key delivery",
    src: imgTurnKey,
    alt: "Turn-key project coordination",
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
      className="relative z-[1] bg-[#262626] px-5 pb-20 pt-4 sm:px-8 sm:pb-24 sm:pt-5 md:px-10 md:pb-28"
      aria-label="Stone Spaces services"
    >
      <div className="mx-auto grid w-full max-w-[min(96vw,95rem)] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {SERVICES.map((item) => (
          <article
            key={item.title}
            className="flex min-h-[min(36rem,82vh)] flex-col rounded-[1.15rem] bg-[#f2efe8] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.35)] sm:min-h-[34rem] md:min-h-[36rem] sm:rounded-[1.25rem] sm:p-7"
          >
            <div className="flex gap-2.5">
              <span className={iconRing} aria-hidden>
                <IconCube />
              </span>
              <span className={iconRing} aria-hidden>
                <IconBuilding />
              </span>
            </div>

            <div className="relative mt-6 flex min-h-0 flex-1 items-center justify-center py-6 sm:mt-7 sm:py-8 md:py-10">
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-[min(18rem,48vw)] w-full max-w-[min(100%,18rem)] object-contain object-center sm:max-h-[20rem] md:max-h-[22rem]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mt-auto border-t border-black/[0.06] pt-5 text-left sm:pt-6">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-zinc-600 sm:text-[0.72rem]">
                {item.category}
              </p>
              <h3 className="mt-1.5 font-sans text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-zinc-950 sm:text-[1.28rem]">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
