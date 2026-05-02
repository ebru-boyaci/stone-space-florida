import { useRef, useState } from "react";
import { motion } from "motion/react";

import { ServiceScrollNavButton } from "@/components/ServiceScrollNavButton";
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
    category: "Installation",
    title: "Countertops",
    src: imgCountertops,
    alt: "Countertop installation",
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
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/14 text-zinc-950 sm:h-10 sm:w-10";

function IconCube() {
  return (
    <svg className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 21V6.2h10V21" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M5 21h14M10 9.2h2.2M10 13h2.2M10 16.7h2.2M14.8 9.2h1M14.8 13h1M14.8 16.7h1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 19 L17 7M17 7H10M17 7V14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCardItem({ item }: { item: ServiceCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li className="w-[min(88vw,26.5rem)] shrink-0 snap-start sm:w-[min(80vw,29rem)] md:w-[min(74vw,31rem)]">
      <article
        className="flex h-full min-h-[min(19rem,46vh)] flex-col rounded-none border border-black/[0.06] bg-[#f2efe8] p-3.5 sm:min-h-[21rem] sm:p-4 md:min-h-[23rem] md:p-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex gap-2">
          <span className={iconRing} aria-hidden>
            <IconCube />
          </span>
          <span className={iconRing} aria-hidden>
            <IconBuilding />
          </span>
        </div>

        <div className="relative mt-2 flex min-h-0 flex-1 items-center justify-center overflow-hidden py-1 sm:mt-3 sm:py-1.5 md:py-2">
          <img
            src={item.src}
            alt={item.alt}
            className="relative z-0 h-auto w-full max-w-none object-contain object-center [max-height:min(37rem,66vw)] sm:[max-height:min(41rem,55vh)] md:[max-height:min(45rem,51vh)]"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" aria-hidden>
            <motion.div
              className="flex h-[6rem] w-[6rem] items-center justify-center rounded-full bg-[#a88d70] shadow-xl sm:h-[6.75rem] sm:w-[6.75rem] md:h-[7.5rem] md:w-[7.5rem]"
              initial={false}
              animate={{
                scale: hovered ? 1 : 0.06,
                opacity: hovered ? 1 : 0,
              }}
              transition={{
                scale: {
                  duration: 0.78,
                  ease: [0.22, 1, 0.45, 1],
                },
                opacity: hovered
                  ? { duration: 0.3, delay: 0.12, ease: "easeOut" }
                  : { duration: 0.42, delay: 0.52, ease: "easeOut" },
              }}
              style={{ transformOrigin: "center" }}
            >
              <motion.div
                className="flex items-center justify-center"
                initial={false}
                animate={{
                  x: hovered ? 0 : 24,
                  y: hovered ? 0 : -24,
                  scale: hovered ? 1 : 0.12,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{
                  duration: hovered ? 0.62 : 0.26,
                  delay: hovered ? 0.22 : 0,
                  ease: [0.2, 0.85, 0.25, 1],
                }}
              >
                <IconArrowUpRight className="h-8 w-8 text-white sm:h-9 sm:w-9 md:h-10 md:w-10" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="mt-auto border-t border-black/[0.06] pt-2.5 text-left sm:pt-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:text-[0.75rem]">
            {item.category}
          </p>
          <h3 className="mt-1.5 font-sans text-[1.48rem] font-bold leading-tight tracking-[-0.02em] text-zinc-950 sm:mt-2 sm:text-[1.66rem] md:text-[1.78rem]">
            {item.title}
          </h3>
        </div>
      </article>
    </li>
  );
}

export function FeatureValueGrid() {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollServices(dir: -1 | 1) {
    const ul = listRef.current;
    if (!ul) return;
    const first = ul.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(ul).columnGap || getComputedStyle(ul).gap || "20") || 20;
    const step = first.getBoundingClientRect().width + gap;
    ul.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section
      className="relative overflow-x-clip bg-[#343434] px-5 pb-32 pt-6 sm:px-8 sm:pb-40 sm:pt-8 md:px-10 md:pb-48"
      aria-label="Stone Spaces services"
    >
      <p className="sr-only">Swipe horizontally to browse all services.</p>
      <ul
        ref={listRef}
        className="-mx-5 flex snap-x snap-mandatory touch-pan-x gap-5 overflow-x-auto overscroll-x-contain bg-[#343434] pb-4 pl-12 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-padding-inline-start:3rem] sm:-mx-8 sm:gap-6 sm:pl-16 sm:pr-8 sm:[scroll-padding-inline-start:4rem] md:-mx-10 md:gap-7 md:pl-20 md:pr-10 md:[scroll-padding-inline-start:5rem] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {SERVICES.map((item) => (
          <ServiceCardItem key={item.title + item.category} item={item} />
        ))}
      </ul>
      <p className="mt-3 text-center text-xs text-zinc-500 sm:hidden" aria-hidden>
        ← Swipe for more →
      </p>
      <div
        className="mt-10 flex flex-row justify-center gap-8 pb-4 sm:mt-14 sm:gap-12 md:mt-16 md:gap-14"
        dir="ltr"
      >
        <ServiceScrollNavButton direction="prev" onClick={() => scrollServices(-1)} />
        <ServiceScrollNavButton direction="next" onClick={() => scrollServices(1)} />
      </div>
    </section>
  );
}
