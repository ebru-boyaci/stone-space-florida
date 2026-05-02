import { useEffect, useRef } from "react";

/**
 * Hero kolajı bittiğinde (`enabled`) çalışır: doküman scroll’una göre header üstten kayma.
 *
 * - Aşağı kaydırırken header gizlenir.
 * - Yukarı kaydırmak başlığı geri getirmez; yalnızca sayfa üstüne yaklaşınca (scrollY küçük) tekrar görünür.
 * - Üst bölgede (topZone) header her zaman görünür.
 * - rAF ile kare başına tek okuma.
 */
export function useDocumentNavScrollCollapse(enabled: boolean, setCollapsed: (v: boolean) => void) {
  const lastY = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const topZonePx = 200;
    const yInit = window.scrollY;
    lastY.current = yInit;
    setCollapsed(yInit > topZonePx);

    let raf = 0;
    const flush = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < topZonePx) {
        setCollapsed(false);
        return;
      }
      if (delta > 6) setCollapsed(true);
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
