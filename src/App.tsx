import { ContactOverlay } from "@/components/ContactOverlay";
import { Header } from "@/components/Header";
import { HomeSections } from "@/pages/HomeSections";
import { CabinetsCatalogPage } from "@/pages/CabinetsCatalogPage";
import { PorcelainCatalogPage } from "@/pages/PorcelainCatalogPage";
import { QuartzCatalogPage } from "@/pages/QuartzCatalogPage";
import { TileCatalogPage } from "@/pages/TileCatalogPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { useDocumentNavScrollCollapse } from "@/hooks/useDocumentNavScrollCollapse";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  /** Tarayıcı geri/ileri ve SPA geçişlerinde eski scroll konumunu geri yükleme (önce altta “flash” sonra yukarı animasyon). */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  /** Route değişince anında en üstte başla. `html { scroll-behavior: smooth }` bazı motorlarda programatik scroll’u da yumuşatır; geçici olarak auto. */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }, [location.pathname]);

  const [contactOpen, setContactOpen] = useState(false);
  const [contactMountKey, setContactMountKey] = useState(0);
  const [homeEntranceKey, setHomeEntranceKey] = useState(0);
  const wasContactOpen = useRef(false);

  const [heroDocumentMode, setHeroDocumentMode] = useState(false);
  const [heroStripHidden, setHeroStripHidden] = useState(false);
  const [scrollCollapsed, setScrollCollapsed] = useState(false);

  const navCollapsed = isHome ? heroStripHidden || scrollCollapsed : scrollCollapsed;

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
            <main inert={contactOpen}>
              <HomeSections
                homeEntranceKey={homeEntranceKey}
                onHeroFirstGesture={onHeroFirstGesture}
                onHeroUnlockDocument={onHeroUnlockDocument}
                onHeroRest={onHeroRest}
              />
            </main>
          }
        />
        <Route
          path="/catalog/quartz"
          element={
            <main inert={contactOpen}>
              <QuartzCatalogPage />
            </main>
          }
        />
        <Route
          path="/catalog/porcelain"
          element={
            <main inert={contactOpen}>
              <PorcelainCatalogPage />
            </main>
          }
        />
        <Route
          path="/catalog/cabinets"
          element={
            <main inert={contactOpen}>
              <CabinetsCatalogPage />
            </main>
          }
        />
        <Route
          path="/catalog/tile"
          element={
            <main inert={contactOpen}>
              <TileCatalogPage />
            </main>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <main inert={contactOpen}>
              <ServiceDetailPage />
            </main>
          }
        />
      </Routes>

      <ContactOverlay open={contactOpen} mountKey={contactMountKey} />
    </div>
  );
}
