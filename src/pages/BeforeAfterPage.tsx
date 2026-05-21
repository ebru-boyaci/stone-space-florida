import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import { HEADER_BAR_PADDING } from "@/config/layout";
import { BEFORE_AFTER_TRANSFORMATIONS } from "@/data/beforeAfter";
import { Link } from "react-router-dom";

export function BeforeAfterPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0c0c0c] pb-[max(6rem,env(safe-area-inset-bottom,0px))] text-zinc-100">
      <div className={`bg-[#5a5854] ${HEADER_BAR_PADDING}`} aria-hidden />

      <div className="project-page-shell flex flex-col">
        <header className="w-full border-b border-white/[0.08] pb-10 pt-6 sm:pb-12 sm:pt-8">
          <Link
            to="/"
            className="mb-6 inline-block text-base text-[#f2efe8]/75 underline decoration-[#f2efe8]/35 underline-offset-4 transition-colors hover:text-[#f2efe8] sm:mb-8 sm:text-lg"
          >
            ← Home
          </Link>
          <p className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base">
            Transformations
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-[-0.02em] text-white">
            Before &amp; after
          </h1>
          <p className="mt-5 max-w-4xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Drag the slider on each pair to see how we transform kitchens and living spaces—from
            existing conditions through to the finished install. More transformations are added as
            projects are completed.
          </p>
          <p className="mt-6 flex flex-wrap gap-4 text-sm sm:text-base">
            <Link
              to="/projects"
              className="text-[#b9a086] underline decoration-[#b9a086]/40 underline-offset-4 transition-colors hover:text-[#c9ae88]"
            >
              View completed projects →
            </Link>
          </p>
        </header>

        <div className="mt-12 space-y-20 sm:mt-14 sm:space-y-24 lg:space-y-28">
          {BEFORE_AFTER_TRANSFORMATIONS.map((item, index) => {
            const textFirst = index % 2 === 1;
            return (
              <article
                key={item.id}
                id={item.id}
                className="border-b border-white/[0.06] pb-20 last:border-b-0 last:pb-0 sm:pb-24"
              >
                <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
                  <div className={`min-w-0 ${textFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <BeforeAfterCompare beforeSrc={item.beforeSrc} afterSrc={item.afterSrc} />
                  </div>
                  <div className={`min-w-0 ${textFirst ? "lg:order-1" : "lg:order-2"}`}>
                    {item.location ? (
                      <p className="text-sm font-semibold tracking-[0.22em] text-[#b9a086] uppercase">
                        {item.location}
                      </p>
                    ) : null}
                    <h2 className="mt-2 font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-medium tracking-[-0.02em] text-white">
                      {item.title}
                    </h2>
                    <p className="mt-5 text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-14 border-t border-white/[0.08] pt-12 sm:mt-16">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-sand px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-sand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand sm:text-base"
          >
            Start your project
          </Link>
        </p>
      </div>
    </div>
  );
}
