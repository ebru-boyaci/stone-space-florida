import type { DeckShowcaseBlock } from "@/data/deckShowcase";

export function DeckShowcaseSection({ blocks }: { blocks: DeckShowcaseBlock[] }) {
  if (!blocks.length) {
    return (
      <p className="mt-12 text-center text-base text-zinc-500 sm:text-lg">
        Project photography will appear here soon.
      </p>
    );
  }

  return (
    <div className="mt-12 space-y-20 sm:mt-14 sm:space-y-24 lg:space-y-28">
      {blocks.map((block, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <article
            key={block.id}
            className="border-b border-white/[0.06] pb-20 last:border-b-0 last:pb-0 sm:pb-24 lg:pb-28"
            aria-labelledby={`${block.id}-heading`}
          >
            <div className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-20">
              <div className={`min-w-0 lg:row-start-1 ${imageFirst ? "lg:col-start-1" : "lg:col-start-2"}`}>
                <figure className="inline-block w-full max-w-full rounded-sm border border-white/[0.08] bg-zinc-900/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]">
                  <img
                    src={block.image}
                    alt={block.heading}
                    className="block h-auto w-full max-w-full"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </figure>
              </div>
              <div
                className={`flex min-w-0 flex-col justify-center lg:row-start-1 lg:py-4 ${
                  imageFirst ? "lg:col-start-2" : "lg:col-start-1"
                }`}
              >
                <h2
                  id={`${block.id}-heading`}
                  className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white"
                >
                  {block.heading}
                </h2>
                <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-zinc-400 sm:mt-6 sm:text-xl sm:leading-relaxed lg:max-w-[36rem]">
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
