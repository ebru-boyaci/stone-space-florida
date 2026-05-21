import { ContactOverlay } from "@/components/ContactOverlay";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { HomeSections } from "@/pages/HomeSections";
import { CabinetsCatalogPage } from "@/pages/CabinetsCatalogPage";
import { PorcelainCatalogPage } from "@/pages/PorcelainCatalogPage";
import { QuartzCatalogPage } from "@/pages/QuartzCatalogPage";
import { TileCatalogPage } from "@/pages/TileCatalogPage";
import { FloorCatalogPage } from "@/pages/FloorCatalogPage";
import { DeckCatalogPage } from "@/pages/DeckCatalogPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { BeforeAfterPage } from "@/pages/BeforeAfterPage";
import { ReferencesPage } from "@/pages/ReferencesPage";
import { useDocumentNavScrollCollapse } from "@/hooks/useDocumentNavScrollCollapse";
import { forceReleaseDocumentScrollLock, useScrollLock } from "@/hooks/useScrollLock";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const routePathRef = useRef<string | null>(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contactMountKey, setContactMountKey] = useState(0);
  const [homeEntranceKey, setHomeEntranceKey] = useState(0);
  const wasContactOpen = useRef(false);

  const [heroDocumentMode, setHeroDocumentMode] = useState(false);
  const [heroStripHidden, setHeroStripHidden] = useState(false);
  const [scrollCollapsed, setScrollCollapsed] = useState(false);

  const navCollapsed = isHome ? heroStripHidden || scrollCollapsed : scrollCollapsed;

  useLayoutEffect(() => {
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;

    if (routePathRef.current !== null && routePathRef.current !== location.pathname) {
      if (window.location.hash === "#contact") {
        setContactOpen(true);
        setContactMountKey((k) => k + 1);
      } else {
        setContactOpen(false);
      }
      forceReleaseDocumentScrollLock();
    }
    routePathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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

  useDocumentNavScrollCollapse(isHome ? heroDocumentMode : true, setScrollCollapsed);

  useEffect(() => {
    if (!isHome) {
      setHeroStripHidden(false);
      setHeroDocumentMode(false);
    }
  }, [isHome]);

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

  const mainInert = contactOpen;

  return (
    <div id="top" className="min-h-screen min-h-[100dvh] overflow-x-clip bg-black text-zinc-100">
      <Header
        contactOpen={contactOpen}
        navCollapsed={navCollapsed}
        onOpenContact={openContact}
        onExitContact={closeContact}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main inert={mainInert}>
              <HomeSections
                homeEntranceKey={homeEntranceKey}
                onHeroFirstGesture={onHeroFirstGesture}
                onHeroUnlockDocument={onHeroUnlockDocument}
                onHeroRest={onHeroRest}
              />
            </main>
          }
        />
        <Route path="/catalog/quartz" element={<main inert={mainInert}><QuartzCatalogPage /></main>} />
        <Route path="/catalog/porcelain" element={<main inert={mainInert}><PorcelainCatalogPage /></main>} />
        <Route path="/catalog/cabinets" element={<main inert={mainInert}><CabinetsCatalogPage /></main>} />
        <Route path="/catalog/tile" element={<main inert={mainInert}><TileCatalogPage /></main>} />
        <Route path="/catalog/floor" element={<main inert={mainInert}><FloorCatalogPage /></main>} />
        <Route path="/catalog/deck" element={<main inert={mainInert}><DeckCatalogPage /></main>} />
        <Route path="/services/:slug" element={<main inert={mainInert}><ServiceDetailPage /></main>} />
        <Route path="/about" element={<main inert={mainInert}><AboutPage /></main>} />
        <Route path="/before-after" element={<main inert={mainInert}><BeforeAfterPage /></main>} />
        <Route path="/referance" element={<Navigate to="/references" replace />} />
        <Route path="/references" element={<main inert={mainInert}><ReferencesPage /></main>} />
        <Route path="/projects" element={<main inert={mainInert}><ProjectsPage /></main>} />
        <Route path="/projects/:slug" element={<main inert={mainInert}><ProjectDetailPage /></main>} />
      </Routes>

      <ContactOverlay open={contactOpen} mountKey={contactMountKey} />

      {isHome ? <WhatsAppFab /> : null}
    </div>
  );
}
