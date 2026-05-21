import { DARK_PAGE_SHELL } from "@/config/layout";
import type { ReactNode } from "react";

type CatalogPageLayoutProps = {
  kicker: string;
  title: string;
  lead: ReactNode;
  children: ReactNode;
};

export function CatalogPageLayout({ kicker, title, lead, children }: CatalogPageLayoutProps) {
  return (
    <div className={DARK_PAGE_SHELL}>
      <div className="project-page-shell flex flex-col py-8 sm:py-10 lg:py-12">
        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">
            {kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,2.85rem)] font-medium tracking-[-0.02em] text-white">
            {title}
          </h1>
          <div className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            {lead}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
