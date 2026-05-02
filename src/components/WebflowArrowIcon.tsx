/**
 * Webflow `Arrow.svg` (662fa828…) — tek kaynak.
 * `WEBFLOW_ARROW_POINTS_RIGHT`: ham SVG’nin sağa mı sola mı baktığı (nav flip mantığı).
 */
export const WEBFLOW_ARROW_POINTS_RIGHT = false;

export function WebflowArrowIcon({
  className,
  flip,
}: {
  className?: string;
  flip: boolean;
}) {
  return (
    <svg
      viewBox="0 0 36 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        transformOrigin: "center",
      }}
    >
      <path
        d="M0.902584 3.41988C0.707321 3.61515 0.707321 3.93173 0.902584 4.12699L4.08456 7.30897C4.27983 7.50423 4.59641 7.50423 4.79167 7.30897C4.98693 7.11371 4.98693 6.79713 4.79167 6.60186L1.96325 3.77344L4.79167 0.94501C4.98693 0.749748 4.98693 0.433166 4.79167 0.237904C4.59641 0.0426414 4.27983 0.0426414 4.08456 0.237904L0.902584 3.41988ZM35.1973 3.27344L1.25614 3.27344V4.27344L35.1973 4.27344V3.27344Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Servis önceki / sonraki butonları için flip. */
export function webflowNavFlip(direction: "prev" | "next"): boolean {
  return WEBFLOW_ARROW_POINTS_RIGHT ? direction === "prev" : direction === "next";
}

/** CTA “ileri” oku (sağa). */
export function webflowForwardFlip(): boolean {
  return !WEBFLOW_ARROW_POINTS_RIGHT;
}
