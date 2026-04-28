import { ContactOverlay } from "@/components/ContactOverlay";
import { CraftShowcaseSection } from "@/components/CraftShowcaseSection";
import { Header } from "@/components/Header";
import { FeatureValueGrid } from "@/components/FeatureValueGrid";
import { HeroWithCollage } from "@/components/HeroCollage";
import { QuartzSpotlightSection } from "@/components/QuartzSpotlightSection";
import { ScrollGallery } from "@/components/ScrollGallery";
import { ScrollRevealTextSection } from "@/components/ScrollRevealTextSection";
import { StoneSpacesMarquee } from "@/components/StoneSpacesMarquee";
import { useDocumentNavScrollCollapse } from "@/hooks/useDocumentNavScrollCollapse";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useCallback, useEffect, useRef, useState } from "react";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMountKey, setContactMountKey] = useState(0);
  const [homeEntranceKey, setHomeEntranceKey] = useState(0);
  const wasContactOpen = useRef(false);

  /** Kolaj bitti → sayfa scroll’u header’ı kontrol eder. Hero fazında false. */
  const [heroDocumentMode, setHeroDocumentMode] = useState(false);
  /** İlk tekerlek: sadece header kaybolur; doküman scroll ile karışmasın diye ayrı bayrak */
  const [heroStripHidden, setHeroStripHidden] = useState(false);
  /** Hero bittikten sonra window scroll ile */
  const [scrollCollapsed, setScrollCollapsed] = useState(false);

  const navCollapsed = heroStripHidden || scrollCollapsed;

  const onHeroFirstGesture = useCallback(() => setHeroStripHidden(true), []);
  const onHeroUnlockDocument = useCallback(() => {
    setHeroDocumentMode(true);
    setHeroStripHidden(false);
  }, []);
  const onHeroRest = useCallback(() => {
    setHeroDocumentMode(false);
    setHeroStripHidden(false);
    setScrollCollapsed(false);
  }, []);

  useDocumentNavScrollCollapse(heroDocumentMode, setScrollCollapsed);

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

  useScrollLock(contactOpen);

  useEffect(() => {
    if (wasContactOpen.current && !contactOpen) {
      setHomeEntranceKey((k) => k + 1);
    }
    wasContactOpen.current = contactOpen;
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
    <div id="top" className="min-h-screen overflow-x-clip bg-black text-zinc-100">
      <Header
        contactOpen={contactOpen}
        navCollapsed={navCollapsed}
        onOpenContact={openContact}
        onExitContact={closeContact}
      />

      <main inert={contactOpen}>
        <HeroWithCollage
          homeEntranceKey={homeEntranceKey}
          onHeroFirstGesture={onHeroFirstGesture}
          onHeroUnlockDocument={onHeroUnlockDocument}
          onHeroRest={onHeroRest}
        >
          <p className="-mt-2 mb-8 max-w-2xl text-center text-base font-medium tracking-[0.38em] text-white/40 uppercase sm:-mt-3 sm:mb-10 sm:text-lg">
            Stone Spaces · Florida
          </p>
          <h1 className="relative mx-auto mt-0 grid w-full max-w-[min(98vw,96rem)] place-items-center px-1 sm:mt-1">
            <span className="col-start-1 row-start-1 max-w-full -translate-y-1 text-center font-hero-serif text-[clamp(6.45rem,26.5vw,17.25rem)] font-medium leading-[0.9] tracking-[-0.03em] text-hero-serif [text-shadow:0_4px_48px_rgba(0,0,0,0.55)] sm:-translate-y-2">
              Surfaces
            </span>
            <span className="col-start-1 row-start-1 z-[2] mt-[clamp(9.25rem,23.5vw,15.5rem)] ml-[clamp(-0.25rem,-1.5vw,0.75rem)] max-w-[min(96vw,64rem)] text-center font-hero-script text-[clamp(5.45rem,20.5vw,13rem)] leading-[0.85] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              refined
            </span>
          </h1>
        </HeroWithCollage>

        <ScrollGallery />
        <ScrollRevealTextSection />
        <StoneSpacesMarquee />
        <FeatureValueGrid />
        <CraftShowcaseSection />
        <QuartzSpotlightSection />
      </main>

      <ContactOverlay open={contactOpen} mountKey={contactMountKey} />
    </div>
  );
}
