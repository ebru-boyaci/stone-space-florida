import { useEffect, useRef } from "react";

/**
 * Hero kolajı bittiğinde (`enabled`) çalışır: doküman scroll’una göre header üstten kayma.
 *
 * - Üst bantta (y küçük) header her zaman görünür — geri gelmeme sorunu.
 * - Yukarı delta eşiği düşük — trackpad’de yavaş kaydırmada da header döner.
 * - rAF ile kare başına tek okuma; tekrarlayan rAF isteği tek kuyrukta birleşir (duraksama azaltır).
 */
export function useDocumentNavScrollCollapse(enabled: boolean, setCollapsed: (v: boolean) => void) {
  const lastY = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const yInit = window.scrollY;
    lastY.current = yInit;
    setCollapsed(yInit > 140);

    let raf = 0;
    const flush = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < 112) {
        setCollapsed(false);
        return;
      }
      if (delta > 6) setCollapsed(true);
      else if (delta < -4) setCollapsed(false);
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [enabled, setCollapsed]);
}
