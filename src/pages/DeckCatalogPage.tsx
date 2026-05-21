import { DeckShowcaseSection } from "@/components/DeckShowcaseSection";
import { DARK_PAGE_SHELL } from "@/config/layout";
import { DECK_SHOWCASE_BLOCKS } from "@/data/deckShowcase";
import { getServiceDetail } from "@/data/serviceDetails";
import { Link } from "react-router-dom";

export function DeckCatalogPage() {
  const copy = getServiceDetail("deck");

  return (
    <div className={DARK_PAGE_SHELL}>
      <div className="project-page-shell flex max-w-[min(98vw,88rem)] flex-col py-8 sm:py-10 lg:py-12">
        <header className="w-full border-b border-white/[0.08] pb-10 sm:pb-12">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">{copy?.kicker ?? "Outdoor & interior"}</p>
          <h1 className="mt-2 font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium tracking-[-0.02em] text-white">
            {copy?.title ?? "Decks"}
          </h1>
          <div className="mt-4 w-full max-w-none space-y-4 text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
            {(copy?.paragraphs ?? []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="text-base text-zinc-500 sm:text-lg">
              Below is a walkthrough of how we approach deck and cladding work—each block pairs photography with context.
              Photos are representative; your layout, materials, and code requirements are confirmed during planning.
            </p>
          </div>
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
