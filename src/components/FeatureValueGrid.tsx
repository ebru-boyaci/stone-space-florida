type ValueItem = {
  title: string;
  description: string;
  icon: "slab" | "globe" | "badge" | "chat";
};

const VALUES: ValueItem[] = [
  {
    icon: "slab",
    title: "Wide Product Range",
    description: "Over 60 premium surfaces selected for modern, classic, and transitional spaces.",
  },
  {
    icon: "globe",
    title: "Global Sourcing",
    description: "Curated stones from Asia, Europe, and the Americas with consistent quality control.",
  },
  {
    icon: "badge",
    title: "Durability & Quality",
    description: "Long-lasting materials that protect performance while elevating visual character.",
  },
  {
    icon: "chat",
    title: "Clear Guidance",
    description: "Transparent pricing, practical advice, and fast support from first selection to install.",
  },
];

function FeatureIcon({ icon }: { icon: ValueItem["icon"] }) {
  const iconClass = "h-8 w-8 text-[#b79a7b] sm:h-9 sm:w-9";

  if (icon === "slab") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 7.5h16M6.2 4.5h11.6a1 1 0 0 1 1 1v4H5.2v-4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.45" />
        <path d="M9 10v9M15 10v9" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "globe") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.45" />
        <path d="M3.9 12h16.2M12 3.8c2.4 2.3 2.4 14.1 0 16.4M12 3.8c-2.4 2.3-2.4 14.1 0 16.4" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }

  if (icon === "badge") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 4.2l1.7 1.2 2.1-.2 1.1 1.8 1.9.9-.1 2.1 1.3 1.6-1.3 1.6.1 2.1-1.9.9-1.1 1.8-2.1-.2-1.7 1.2-1.7-1.2-2.1.2-1.1-1.8-1.9-.9.1-2.1-1.3-1.6 1.3-1.6-.1-2.1 1.9-.9 1.1-1.8 2.1.2L12 4.2z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9.2 12.4l1.9 1.9 3.7-4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.75" y="5.25" width="16.5" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.45" />
      <path d="M8.2 10.7h.01M12 10.7h.01M15.8 10.7h.01" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M9.1 16.8l-2.6 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function FeatureValueGrid() {
  return (
    <section
      className="relative flex min-h-[clamp(42rem,82vh,58rem)] items-center bg-black px-6 py-18 sm:px-10 sm:py-24 md:py-28"
      aria-label="Stone Spaces values"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_60%_90%_at_50%_0%,rgba(183,154,123,0.18),rgba(0,0,0,0)_72%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-[min(96vw,95rem)] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {VALUES.map((item) => (
          <article
            key={item.title}
            className="group rounded-[1.35rem] border border-white/[0.14] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.42)] transition duration-500 hover:-translate-y-1 hover:border-[#b79a7b]/45 sm:p-8"
          >
            <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#b79a7b]/45 bg-[#b79a7b]/8">
              <FeatureIcon icon={item.icon} />
            </div>
            <h3 className="font-contact-display text-[1.32rem] font-medium leading-[1.22] tracking-[-0.01em] text-white sm:text-[1.42rem]">
              {item.title}
            </h3>
            <p className="mt-4 text-pretty text-[1.01rem] leading-[1.72] text-zinc-300 sm:text-[1.06rem] sm:leading-[1.74]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
