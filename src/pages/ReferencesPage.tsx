import { HEADER_BAR_PADDING } from "@/config/layout";
import { REFERENCE_IMAGES, REFERENCE_INTRO } from "@/data/references";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ReferencesPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc, closeLightbox]);

  return (
    <div className="references-page min-h-screen min-h-[100dvh] bg-[#f2efe8] text-zinc-900">
      <div className={`service-detail-page__nav-band bg-[#5a5854] ${HEADER_BAR_PADDING}`} aria-hidden />

      <main className="references-page__main pb-[max(6rem,env(safe-area-inset-bottom,0px))]">
        <div className="service-page-shell py-8 sm:py-10 lg:py-12">
          <Link
            to="/"
            className="mb-6 inline-block text-base text-[#8a7358]/90 underline decoration-[#8a7358]/35 underline-offset-4 transition-colors hover:text-[#8a7358] sm:mb-8 sm:text-lg"
          >
            ← Home
          </Link>

          <header className="max-w-4xl border-b border-zinc-900/10 pb-10 sm:pb-12">
            <p className="text-sm font-semibold tracking-[0.28em] text-[#8a7358] uppercase sm:text-base">
              {REFERENCE_INTRO.kicker}
            </p>
            <h1 className="mt-2 font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-[-0.02em] text-zinc-900">
              {REFERENCE_INTRO.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-600 sm:text-xl">
              {REFERENCE_INTRO.lead}
            </p>
          </header>

          <ul className="mt-10 columns-1 [column-gap:1.25rem] sm:mt-12 sm:columns-2 sm:[column-gap:1.5rem] lg:columns-3">
            {REFERENCE_IMAGES.map((src, index) => (
              <li key={src} className="mb-4 break-inside-avoid sm:mb-5 sm:last:mb-0">
                <button
                  type="button"
                  className="group block w-full overflow-hidden rounded-sm border border-zinc-900/10 bg-[#ebe6dd] text-left shadow-[0_8px_28px_-16px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow] hover:border-[#8a7358]/35 hover:shadow-[0_12px_36px_-18px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a88d70]"
                  onClick={() => setLightboxSrc(src)}
                >
                  <img
                    src={src}
                    alt={`Stone Spaces reference project ${index + 1}`}
                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-12 border-t border-zinc-900/10 pt-10 sm:mt-14">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#a88d70] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#968061] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a88d70] sm:text-base"
            >
              Contact us
            </Link>
          </p>
        </div>
      </main>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Reference image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute right-4 top-[calc(8rem+env(safe-area-inset-top,0px))] rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-black/80 sm:right-8"
            onClick={closeLightbox}
          >
            Close
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[min(88dvh,1200px)] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}
