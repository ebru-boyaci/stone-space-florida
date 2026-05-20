import { useScrollLock } from "@/hooks/useScrollLock";
import { useEffect } from "react";

type MaterialSwatchLightboxProps = {
  label: string;
  src: string;
  onClose: () => void;
};

export function MaterialSwatchLightbox({ label, src, onClose }: MaterialSwatchLightboxProps) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-swatch-title"
    >
      <button type="button" className="absolute inset-0 bg-black/88" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 flex max-h-[min(92dvh,56rem)] w-full max-w-[min(94vw,40rem)] flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between gap-3">
          <p id="material-swatch-title" className="text-base font-medium text-white sm:text-lg">
            {label}
          </p>
          <button
            type="button"
            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs uppercase tracking-wide text-zinc-200 transition-colors hover:bg-white/10"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <img
          src={src}
          alt={label}
          className="max-h-[min(78dvh,48rem)] w-auto max-w-full rounded-sm object-contain shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]"
        />
      </div>
    </div>
  );
}
