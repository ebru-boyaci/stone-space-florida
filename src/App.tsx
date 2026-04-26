import { ContactOverlay } from "@/components/ContactOverlay";
import { Header } from "@/components/Header";
import { HeroWithCollage } from "@/components/HeroCollage";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMountKey, setContactMountKey] = useState(0);

  const openContact = useCallback(() => {
    setContactOpen(true);
    setContactMountKey((k) => k + 1);
    const path = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", `${path}#contact`);
  }, []);

  const closeContact = useCallback(() => {
    setContactOpen(false);
    const path = window.location.pathname + window.location.search;
    if (window.location.hash === "#contact") {
      window.history.replaceState(null, "", path);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setContactOpen(true);
      setContactMountKey((k) => k + 1);
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      setContactOpen(window.location.hash === "#contact");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, closeContact]);

  return (
    <div id="top" className="min-h-screen bg-black text-zinc-100">
      <Header
        contactOpen={contactOpen}
        onOpenContact={openContact}
        onExitContact={closeContact}
      />

      <main>
        <HeroWithCollage>
          <p className="-mt-2 mb-8 max-w-2xl text-center text-xs font-medium tracking-[0.38em] text-white/40 uppercase sm:-mt-3 sm:mb-10 sm:text-sm">
            Stone Spaces · Florida
          </p>
          <h1 className="relative mx-auto mt-0 grid w-full max-w-[min(98vw,96rem)] place-items-center px-1 sm:mt-1">
            <span className="col-start-1 row-start-1 max-w-full -translate-y-1 text-center font-hero-serif text-[clamp(5rem,20.5vw,13.25rem)] font-medium leading-[0.9] tracking-[-0.03em] text-hero-serif [text-shadow:0_4px_48px_rgba(0,0,0,0.55)] sm:-translate-y-2">
              Surfaces
            </span>
            <span className="col-start-1 row-start-1 z-[2] mt-[clamp(6.25rem,17.5vw,11rem)] ml-[clamp(-0.25rem,-1.5vw,0.75rem)] max-w-[min(96vw,64rem)] text-center font-hero-script text-[clamp(4.1rem,16.25vw,9.75rem)] leading-[0.85] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              refined
            </span>
          </h1>
        </HeroWithCollage>

        <section id="about" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">About Us</h2>
          <p className="mt-4 max-w-2xl text-white/55">
            Placeholder section—replace with Stone Spaces story, team, and showroom details.
          </p>
        </section>

        <section id="products" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="mt-4 max-w-2xl text-white/55">Surfaces, slabs, and finishes will live here.</p>
        </section>

        <section id="cabinets" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-copper">Cabinets</h2>
          <p className="mt-4 max-w-2xl text-white/55">Custom cabinetry for kitchens and baths.</p>
        </section>

        <section id="turnkey" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Turn Key Projects</h2>
          <p className="mt-4 max-w-2xl text-white/55">End-to-end project stories and timelines.</p>
        </section>

        <section id="services" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
          <p className="mt-4 max-w-2xl text-white/55">Design, fabrication, install, and care.</p>
        </section>

        <section id="reference" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Reference</h2>
          <p className="mt-4 max-w-2xl text-white/55">Selected installations and partners.</p>
        </section>

        <section id="catalogue" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Catalogue</h2>
          <p className="mt-4 max-w-2xl text-white/55">Downloadable or browsable product catalogue.</p>
        </section>

        <section id="blog" className="scroll-mt-40 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Blog</h2>
          <p className="mt-4 max-w-2xl text-white/55">Ideas, trends, and project spotlights.</p>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Stone Spaces. All rights reserved.
      </footer>

      <ContactOverlay open={contactOpen} mountKey={contactMountKey} />
    </div>
  );
}
