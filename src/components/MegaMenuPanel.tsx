import {
  MEGA_MENU_DEFAULT_SECTION,
  MEGA_MENU_SECTIONS,
  MEGA_PROJECT_CARDS,
  type MegaMenuSection,
} from "@/config/megaMenu";
import type { NavLinkItem } from "@/config/site";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/config/site";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";

const springPanel = { type: "spring" as const, stiffness: 400, damping: 32 };

type MegaMenuPanelProps = {
  contactOpen?: boolean;
  onOpenContact?: () => void;
  onExitContact?: () => void;
  onNavigate: () => void;
};

function MegaLink({
  item,
  index,
  reduceMotion,
  contactOpen,
  onOpenContact,
  onExitContact,
  onNavigate,
}: {
  item: NavLinkItem;
  index: number;
  reduceMotion: boolean | null;
} & MegaMenuPanelProps) {
  const isContact = item.id === "contact";
  const className = item.accent
    ? "text-base font-medium text-[#c9a882] transition-colors hover:text-[#dfc9a8] md:text-lg"
    : "text-base font-medium text-white/75 transition-colors hover:text-white md:text-lg";

  const handleClick = (e: MouseEvent) => {
    if (isContact && (onOpenContact || onExitContact)) {
      e.preventDefault();
      if (contactOpen && onExitContact) onExitContact();
      else onOpenContact?.();
    }
    onNavigate();
  };

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springPanel, delay: reduceMotion ? 0 : index * 0.025 },
  };

  if (item.internal) {
    return (
      <motion.div {...motionProps}>
        <Link to={item.href} className={className} onClick={handleClick}>
          {item.label}
        </Link>
      </motion.div>
    );
  }

  const externalProps =
    item.href.startsWith("http") ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <motion.a {...motionProps} href={item.href} className={className} onClick={handleClick} {...externalProps}>
      {item.label}
    </motion.a>
  );
}

function ProjectsMegaContent(props: MegaMenuPanelProps & { section: MegaMenuSection; reduceMotion: boolean | null }) {
  const { section, reduceMotion, ...linkProps } = props;
  let index = 0;

  return (
    <div className="w-full">
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
        {section.items.map((item) => (
          <li key={item.id}>
            <MegaLink item={item} index={index++} reduceMotion={reduceMotion} {...linkProps} />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-xs font-semibold tracking-[0.2em] text-white/35 uppercase sm:text-sm">
        Featured kitchens
      </p>
      <ul className="mx-auto mt-4 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {MEGA_PROJECT_CARDS.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPanel, delay: reduceMotion ? 0 : 0.08 + i * 0.05 }}
          >
            <Link
              to={project.href}
              className="group relative block aspect-[5/3] overflow-hidden rounded-sm bg-zinc-900"
              onClick={linkProps.onNavigate}
            >
              <img
                src={project.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity group-hover:from-black/90" />
              <span className="absolute inset-x-0 bottom-0 px-3 py-2.5 text-xs font-medium leading-snug text-white/95 sm:text-sm">
                {project.title}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function PageMegaContent({
  item,
  reduceMotion,
  ...linkProps
}: { item: NavLinkItem; reduceMotion: boolean | null } & MegaMenuPanelProps) {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springPanel}
      >
        <Link
          to={item.href}
          className="inline-flex min-w-[12rem] items-center justify-center rounded-full border border-[#c9a882]/40 bg-[#c9a882]/10 px-8 py-3.5 text-base font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:border-[#c9a882]/70 hover:bg-[#c9a882]/20 md:text-lg"
          onClick={linkProps.onNavigate}
        >
          Go to {item.label}
        </Link>
      </motion.div>
    </div>
  );
}

function SectionPanel({
  section,
  reduceMotion,
  ...linkProps
}: { section: MegaMenuSection; reduceMotion: boolean | null } & MegaMenuPanelProps) {
  if (section.id === "projects") {
    return <ProjectsMegaContent section={section} reduceMotion={reduceMotion} {...linkProps} />;
  }

  if (section.id === "home" || section.id === "about") {
    return <PageMegaContent item={section.items[0]} reduceMotion={reduceMotion} {...linkProps} />;
  }

  if (section.id === "contact") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <MegaLink
          item={section.items[0]}
          index={0}
          reduceMotion={reduceMotion}
          {...linkProps}
        />
        <motion.a
          href={`tel:${SITE_PHONE_TEL}`}
          className="text-2xl font-medium tracking-tight text-white/90 transition-colors hover:text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPanel, delay: 0.06 }}
          onClick={linkProps.onNavigate}
        >
          {SITE_PHONE_DISPLAY}
        </motion.a>
        <motion.p
          className="text-sm leading-relaxed text-white/45"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Jacksonville showroom — call or send a message for layout, materials, and install timelines.
        </motion.p>
      </div>
    );
  }

  let index = 0;
  return (
    <ul className="mx-auto grid max-w-3xl justify-items-center gap-x-12 gap-y-3 sm:grid-cols-2">
      {section.items.map((item) => (
        <li key={item.id} className="text-center">
          <MegaLink item={item} index={index++} reduceMotion={reduceMotion} {...linkProps} />
        </li>
      ))}
    </ul>
  );
}

export function MegaMenuPanel(props: MegaMenuPanelProps) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(MEGA_MENU_DEFAULT_SECTION);
  const active = MEGA_MENU_SECTIONS.find((s) => s.id === activeId) ?? MEGA_MENU_SECTIONS[0];

  return (
    <div className="flex flex-col">
      <nav
        className="border-b border-white/[0.08] pb-5"
        aria-label="Menu sections"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8 lg:gap-x-10">
          {MEGA_MENU_SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  className={`relative px-2 py-2.5 text-sm font-semibold tracking-[0.16em] uppercase transition-colors sm:px-3 sm:py-3 sm:text-base sm:tracking-[0.18em] ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/75"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => setActiveId(section.id)}
                  onFocus={() => setActiveId(section.id)}
                  onClick={() => setActiveId(section.id)}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="mega-section-indicator"
                      className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[#c9a882] sm:inset-x-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-h-[min(20rem,40vh)] pb-2 pt-8 sm:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="flex flex-col items-center text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold tracking-[0.22em] text-[#b9a086] uppercase sm:text-base">
              {active.label}
            </p>
            <p className="mt-2 max-w-xl text-base text-white/45 sm:text-lg">{active.description}</p>
            <div className="mt-8 w-full">
              <SectionPanel section={active} reduceMotion={reduceMotion} {...props} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
