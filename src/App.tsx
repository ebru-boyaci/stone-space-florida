import { ContactOverlay } from "@/components/ContactOverlay";
import { Header } from "@/components/Header";
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

  /** Route değişince scroll konumu; önceki sayfadan kalan body kilidi / #contact iletişimini temizle (katalogda scroll kilitlenmesi). */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;

    if (routePathRef.current !== null && routePathRef.current !== location.pathname) {
      setContactOpen(false);
      if (window.location.hash === "#contact") {
        window.history.replaceState(null, "", `${location.pathname}${location.search}`);
      }
      forceReleaseDocumentScrollLock();
    }
    routePathRef.current = location.pathname;
  }, [location.pathname]);

  const navCollapsed = isHome ? heroStripHidden || scrollCollapsed : scrollCollapsed;

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
          path="/catalog/floor"
          element={
            <main inert={contactOpen}>
              <FloorCatalogPage />
            </main>
          }
        />
        <Route
          path="/catalog/deck"
          element={
            <main inert={contactOpen}>
              <DeckCatalogPage />
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
        <Route
          path="/about"
          element={
            <main inert={contactOpen}>
              <AboutPage />
            </main>
          }
        />
        <Route
          path="/before-after"
          element={
            <main inert={contactOpen}>
              <BeforeAfterPage />
            </main>
          }
        />
        <Route path="/referance" element={<Navigate to="/references" replace />} />
        <Route
          path="/references"
          element={
            <main inert={contactOpen}>
              <ReferencesPage />
            </main>
          }
        />
        <Route
          path="/projects"
          element={
            <main inert={contactOpen}>
              <ProjectsPage />
            </main>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <main inert={contactOpen}>
              <ProjectDetailPage />
            </main>
          }
        />
      </Routes>

      <ContactOverlay open={contactOpen} mountKey={contactMountKey} />
    </div>
  );
}
