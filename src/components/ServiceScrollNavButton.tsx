import { WebflowArrowIcon, webflowNavFlip } from "@/components/WebflowArrowIcon";

export function ServiceScrollNavButton({
  direction,
  onClick,
  ariaItem = "service",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  /** Singular noun for aria-label, e.g. "service" or "product". */
  ariaItem?: string;
}) {
  const label = direction === "prev" ? `Previous ${ariaItem}` : `Next ${ariaItem}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative inline-flex size-28 shrink-0 items-center justify-center rounded-full text-[#a88d70] outline-none transition-colors hover:text-[#c4a882] focus-visible:ring-2 focus-visible:ring-[#a88d70]/45 sm:size-32 md:size-36"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-[#a88d70]/22"
      />
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute inset-0 size-full text-[#a88d70] group-hover:text-[#c4a882]"
        aria-hidden
      >
        <g transform="rotate(-90 18 18)">
          <circle
            cx={18}
            cy={18}
            r={16.5}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            pathLength={1}
            strokeDasharray={1}
            className="transition-[stroke-dashoffset] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:group-hover:[stroke-dashoffset:0] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
          />
        </g>
      </svg>
      <WebflowArrowIcon
        flip={webflowNavFlip(direction)}
        className="relative z-10 h-[6px] w-[27px] max-w-[55%] text-white group-hover:text-white sm:h-[7px] sm:w-[31px] md:h-[8px] md:w-[36px]"
      />
    </button>
  );
}
