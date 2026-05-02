import bgImage from "@assets/kitchen 5.jpg";
import imgCabinets from "@assets/services/cabinet-installation.png";
import imgDeck from "@assets/services/deck-installation.png";
import imgVinyl from "@assets/services/flooring-installtion.png";
import imgPorcelain from "@assets/quartz/delmar -porcelain.jpeg";
import coverQuartz from "@assets/kitchen1.jpg";
import imgTileFloor from "@assets/kitchen2.jpg";
import { ServiceScrollNavButton } from "@/components/ServiceScrollNavButton";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type ProductSpotlight = {
  id: string;
  label: string;
  styleLine?: string;
  title: string;
  description: string;
  image: string;
  to: string;
  linkAriaLabel: string;
};

const PRODUCTS: ProductSpotlight[] = [
  {
    id: "porcelain",
    label: "PORCELAIN",
    title: "Refined Porcelain Surfaces",
    description:
      "Durable, low-maintenance porcelain ideal for countertops, walls, and high-traffic areas with a polished, modern finish.",
    image: imgPorcelain,
    to: "/#contact",
    linkAriaLabel: "Porcelain surfaces — contact us",
  },
  {
    id: "quartz",
    label: "QUARTZ",
    title: "Discover the Elegance of Quartz",
    description:
      "Enhance your spaces with our premium quartz selection—perfect for countertops, backsplashes, and elegant interiors!",
    image: coverQuartz,
    to: "/catalog/quartz",
    linkAriaLabel: "Quartz surfaces — browse full catalog",
  },
  {
    id: "cabinets",
    label: "CABINETS",
    styleLine: "SHAKER / SLIM SHAKER / EUROPEAN CABINETS",
    title: "Cabinetry Built Around You",
    description:
      "From layout to finish, we deliver kitchens and baths with cabinetry tailored to your style and storage needs.",
    image: imgCabinets,
    to: "/#contact",
    linkAriaLabel: "Cabinets — contact us",
  },
  {
    id: "vinyl-flooring",
    label: "VINYL FLOORING",
    title: "Vinyl Flooring, Everyday Tough",
    description:
      "Water-resistant, comfortable underfoot vinyl—great for busy homes that need beauty without the upkeep.",
    image: imgVinyl,
    to: "/#contact",
    linkAriaLabel: "Vinyl flooring — contact us",
  },
  {
    id: "porcelain-tile-flooring",
    label: "PORCELAIN TILE FLOORING",
    title: "Porcelain Tile Underfoot",
    description:
      "Large-format and classic tile layouts that stand up to moisture and wear while elevating every room.",
    image: imgTileFloor,
    to: "/#contact",
    linkAriaLabel: "Porcelain tile flooring — contact us",
  },
  {
    id: "deck",
    label: "DECK",
    title: "Outdoor Living, Built to Last",
    description:
      "Decks designed for Florida weather—structural integrity, clean lines, and materials chosen to age gracefully.",
    image: imgDeck,
    to: "/#contact",
    linkAriaLabel: "Deck projects — contact us",
  },
];

export function ProductsSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  function scrollProducts(dir: -1 | 1) {
    const ul = listRef.current;
    if (!ul) return;
    const first = ul.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(ul).columnGap || getComputedStyle(ul).gap || "20") || 20;
    const step = first.getBoundingClientRect().width + gap;
    ul.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  /** Bölüm görünmeden önce büyük görseli prefetch (hızlı scroll’da siyah flaş azalır). */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const preload = () => {
      const hi = new Image();
      hi.decoding = "async";
      hi.src = bgImage;
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          preload();
          io.disconnect();
        }
      },
      { root: null, rootMargin: "520px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[140vh] items-start justify-center overflow-x-clip bg-[#171312] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-16 sm:min-h-[150vh] sm:px-10 sm:pb-24 sm:pt-20 md:pt-24 [contain:layout_paint]"
      aria-labelledby="products-spotlight-heading"
    >
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <div className="absolute inset-0 -z-10 bg-black/62" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_140%_95%_at_50%_35%,rgba(255,255,255,0.08),rgba(0,0,0,0.38))]" />

      <div className="relative z-10 w-full">
        <h2
          id="products-spotlight-heading"
          className="mx-auto mb-10 max-w-[min(95vw,74rem)] text-center font-sans text-[clamp(1.85rem,4.5vw,2.65rem)] font-semibold uppercase leading-tight tracking-[0.12em] text-white/95 sm:mb-12 md:mb-14"
        >
          Products
        </h2>
        <p className="sr-only">Swipe horizontally to browse all products.</p>
        <ul
          ref={listRef}
          role="list"
          className="-mx-6 flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto overscroll-x-contain pb-4 pl-10 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-padding-inline-start:2.5rem] sm:-mx-10 sm:gap-6 sm:pl-16 sm:pr-10 sm:[scroll-padding-inline-start:4rem] md:gap-7 md:pl-20 md:[scroll-padding-inline-start:5rem] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((p) => (
            <li
              key={p.id}
              className="w-[min(88vw,36rem)] max-w-[36rem] shrink-0 snap-start sm:w-[min(80vw,36rem)]"
            >
              <Link
                to={p.to}
                aria-label={p.linkAriaLabel}
                className="group block w-full rounded-[0.42rem] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#a88d70]"
              >
                <article className="relative flex min-h-[clamp(26rem,62vh,46rem)] flex-col overflow-hidden rounded-[0.4rem] border border-white/[0.1] bg-[#2f3137]/92 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.42)] sm:min-h-[clamp(37rem,71vh,49rem)] sm:p-7">
                  <div className="pointer-events-none absolute inset-0 -z-0 bg-[#4a3f43] [transform-origin:bottom] scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />

                  <div className="relative z-10 overflow-hidden border border-white/[0.06]">
                    <img
                      src={p.image}
                      alt=""
                      className="h-[18rem] w-full object-cover sm:h-[20.5rem]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="relative z-10 pt-5 sm:pt-6">
                    <h3 className="text-pretty font-sans text-[clamp(1.72rem,3.2vw,2.45rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-white">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-pretty text-[1rem] leading-[1.72] text-zinc-200 sm:text-[1.06rem]">
                      {p.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                    <div className="min-w-0">
                      <p className="font-sans text-[1.42rem] font-semibold uppercase leading-[1.12] tracking-[0.06em] text-white/92 sm:text-[1.6rem]">
                        {p.label}
                      </p>
                      {p.styleLine ? (
                        <p className="mt-2 font-sans text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.1em] text-zinc-400 sm:text-[0.7rem]">
                          {p.styleLine}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a88d70] text-white sm:h-13 sm:w-13"
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                        <path
                          d="M7 17 17 7M17 7h-6M17 7v6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs text-zinc-500 sm:hidden" aria-hidden>
          ← Swipe for more →
        </p>
        <div
          className="mt-10 flex flex-row justify-center gap-8 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:mt-14 sm:gap-12 md:mt-16 md:gap-14"
          dir="ltr"
        >
          <ServiceScrollNavButton
            direction="prev"
            ariaItem="product"
            onClick={() => scrollProducts(-1)}
          />
          <ServiceScrollNavButton
            direction="next"
            ariaItem="product"
            onClick={() => scrollProducts(1)}
          />
        </div>
      </div>
    </section>
  );
}
