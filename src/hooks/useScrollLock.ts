import { useEffect } from "react";

/**
 * Arka plan kaydırmayı kapatır. Birden fazla modal/menü aynı anda açıksa (App iletişim +
 * Header menü + katalog lightbox) tek tek `overflow` geri yükleme birbirini bozmasın diye
 * modül genelinde ref-count kullanılır.
 */
let lockDepth = 0;
let frozenScrollY = 0;
let snapshot: {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
} | null = null;

function applyDocumentLock() {
  const scrollY = window.scrollY;
  const html = document.documentElement;
  const body = document.body;

  frozenScrollY = scrollY;
  snapshot = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
  };

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

function releaseDocumentLockIfIdle() {
  if (lockDepth > 0 || !snapshot) return;

  const html = document.documentElement;
  const body = document.body;
  const s = snapshot;
  snapshot = null;

  html.style.overflow = s.htmlOverflow;
  body.style.overflow = s.bodyOverflow;
  body.style.position = s.bodyPosition;
  body.style.top = s.bodyTop;
  body.style.left = s.bodyLeft;
  body.style.right = s.bodyRight;
  body.style.width = s.bodyWidth;
  window.scrollTo(0, frozenScrollY);
}

/** Route değişiminde kalan `position:fixed` / kilidi sıfırla (ref-count ile bileşenler senkron kalmazsa). */
export function forceReleaseDocumentScrollLock() {
  lockDepth = 0;
  snapshot = null;
  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockDepth === 0) {
      applyDocumentLock();
    }
    lockDepth += 1;

    return () => {
      lockDepth = Math.max(0, lockDepth - 1);
      releaseDocumentLockIfIdle();
    };
  }, [locked]);
}
