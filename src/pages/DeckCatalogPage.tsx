import { DeckShowcaseSection } from "@/components/DeckShowcaseSection";
import { DECK_SHOWCASE_BLOCKS } from "@/data/deckShowcase";
import { getServiceDetail } from "@/data/serviceDetails";
import { Link } from "react-router-dom";

export function DeckCatalogPage() {
  const copy = getServiceDetail("deck");

  return (
    <div className="min-h-screen bg-[#0c0c0c] pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-[calc(12.5rem+env(safe-area-inset-top,0px))] text-zinc-100">
      <div className="mx-auto flex w-full max-w-[min(96vw,80rem)] flex-col pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:px-8 lg:px-10">
        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">{copy?.kicker ?? "Outdoor & interior"}</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,2.85rem)] font-medium tracking-[-0.02em] text-white">
            {copy?.title ?? "Decks"}
          </h1>
          {(copy?.paragraphs ?? []).map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "mt-3 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]"
                  : "mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]"
              }
            >
              {p}
            </p>
          ))}
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem]">
            Below is a walkthrough of how we approach deck and cladding work—each block pairs photography with context.
            Photos are representative; your layout, materials, and code requirements are confirmed during planning.
          </p>
          <p className="mt-6">
            <Link
              to="/services/deck"
              className="text-sm text-zinc-400 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-zinc-200"
            >
              Deck services overview
            </Link>
          </p>
        </header>

        <DeckShowcaseSection blocks={DECK_SHOWCASE_BLOCKS} />
      </div>
    </div>
  );
}
