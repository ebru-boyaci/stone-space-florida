import type { DeckShowcaseBlock } from "@/data/deckShowcase";

export function DeckShowcaseSection({ blocks }: { blocks: DeckShowcaseBlock[] }) {
  if (!blocks.length) {
    return (
      <p className="mt-12 text-center text-sm text-zinc-500">
        Project photography will appear here soon.
      </p>
    );
  }

  return (
    <div className="mt-10 space-y-16 sm:mt-12 sm:space-y-20 lg:space-y-24">
      {blocks.map((block, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <article
            key={block.id}
            className="border-b border-white/[0.06] pb-16 last:border-b-0 last:pb-0 sm:pb-20 lg:pb-24"
            aria-labelledby={`${block.id}-heading`}
          >
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
              <div
                className={`min-w-0 lg:row-start-1 ${
                  imageFirst ? "lg:col-start-1" : "lg:col-start-2"
                }`}
              >
                <div className="overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]">
                  <img
                    src={block.image}
                    alt={block.heading}
                    className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </div>
              <div
                className={`min-w-0 lg:row-start-1 lg:py-2 ${
                  imageFirst ? "lg:col-start-2" : "lg:col-start-1"
                }`}
              >
                <h2
                  id={`${block.id}-heading`}
                  className="font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium tracking-[-0.02em] text-white"
                >
                  {block.heading}
                </h2>
                <div className="mt-4 space-y-3 text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]">
                  {block.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
