import logoWhite from "@assets/logo/white.PNG";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { NavLinkItem } from "@/config/site";
import { NAV_MENU_GROUPS, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/config/site";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";

const springHeader = { type: "spring" as const, stiffness: 300, damping: 42, mass: 0.58 };
const springPanel = { type: "spring" as const, stiffness: 400, damping: 32 };

type HeaderProps = {
  contactOpen?: boolean;
  /** App tek state: hero jesti + doküman scroll birleşik */
  navCollapsed: boolean;
  onOpenContact?: () => void;
  onExitContact?: () => void;
};

type NavItemClickProps = {
  item: NavLinkItem;
  contactOpen?: boolean;
  onOpenContact?: () => void;
  onExitContact?: () => void;
  onNavigate: () => void;
};

function navItemClassName(item: NavLinkItem, variant: "mega" | "mobile") {
  const base =
    item.accent
      ? variant === "mega"
        ? "text-base font-medium tracking-wide text-copper md:text-lg"
        : "py-2.5 text-center text-xl font-medium text-copper sm:text-2xl"
      : variant === "mega"
        ? "text-base font-medium tracking-wide text-white/85 transition-colors hover:text-white md:text-lg"
        : "py-2.5 text-center text-xl font-medium text-white/90 transition-colors hover:text-white sm:text-2xl";
  return base;
}

function NavMenuItem({
  item,
  variant,
  index,
  reduceMotion,
  contactOpen,
  onOpenContact,
  onExitContact,
  onNavigate,
}: NavItemClickProps & {
  variant: "mega" | "mobile";
  index: number;
  reduceMotion: boolean | null;
}) {
  const isContact = item.id === "contact";
  const className = navItemClassName(item, variant);

  const handleClick = (e: MouseEvent) => {
    if (isContact && (onOpenContact || onExitContact)) {
      e.preventDefault();
      if (contactOpen && onExitContact) onExitContact();
      else onOpenContact?.();
    }
    onNavigate();
  };

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: variant === "mega" ? 10 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      ...springPanel,
      delay: reduceMotion ? 0 : variant === "mega" ? index * 0.03 : 0.06 + index * 0.04,
    },
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

  return (
    <motion.a {...motionProps} href={item.href} className={className} onClick={handleClick}>
      {item.label}
    </motion.a>
  );
}

export function Header({
  contactOpen = false,
  navCollapsed,
  onOpenContact,
  onExitContact,
}: HeaderProps) {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, []);

  useEffect(() => {
    if (navCollapsed) setMegaOpen(false);
  }, [navCollapsed]);

  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  useScrollLock(menuOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  const headerY = reduceMotion || contactOpen ? 0 : navCollapsed ? "-120%" : 0;

  let megaIndex = 0;

  return (
    <>
      <motion.header
        className={
          contactOpen
            ? "fixed inset-x-0 top-0 z-50 max-w-[100vw] overflow-x-clip border-b border-white/[0.08] bg-[#0a0a0a] pt-[env(safe-area-inset-top,0px)]"
            : "fixed inset-x-0 top-0 z-50 max-w-[100vw] overflow-x-clip border-b border-white/[0.06] bg-transparent pt-[env(safe-area-inset-top,0px)]"
        }
        initial={false}
        animate={{ y: headerY }}
        transition={springHeader}
        style={{ willChange: "transform" }}
      >
        <div className="relative mx-auto flex h-32 w-full max-w-full items-stretch px-2 sm:h-36 sm:px-3 lg:h-40 lg:px-5 xl:px-6">
          <div className="flex min-w-0 flex-1 basis-0 items-center justify-start gap-2 sm:gap-3 lg:gap-6">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-md px-2 py-2 text-base font-semibold tracking-[0.12em] text-white/95 uppercase transition-colors hover:text-white lg:inline-flex lg:px-3 lg:text-[1.0625rem] lg:tracking-[0.14em]"
              aria-expanded={megaOpen}
              aria-controls="desktop-mega"
              onClick={() => {
                setMegaOpen((v) => !v);
                setMenuOpen(false);
              }}
            >
              MENU
              <motion.span
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex"
                aria-hidden
              >
                <ChevronDown className="size-[1.125rem] opacity-80 lg:size-5" />
              </motion.span>
            </button>

            <button
              type="button"
              className="flex size-12 items-center justify-center rounded-md text-white lg:hidden"
              aria-label="Open menu"
              onClick={() => {
                setMenuOpen(true);
                setMegaOpen(false);
              }}
            >
              <MenuIcon className="size-7" />
            </button>
          </div>

          <Link
            to="/"
            className="pointer-events-auto absolute inset-y-0 left-1/2 z-10 flex min-w-0 -translate-x-1/2 items-center justify-center px-2"
            onClick={(e) => {
              closeAll();
              if (contactOpen && onExitContact) {
                e.preventDefault();
                onExitContact();
              }
            }}
          >
            <motion.img
              src={logoWhite}
              alt="Stone Spaces"
              className="h-24 w-auto max-w-[min(58vw,18rem)] select-none object-contain object-center sm:h-28 sm:max-w-[min(52vw,24rem)] lg:h-32 lg:max-w-[min(46vw,32rem)]"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
          </Link>

          <div className="flex min-w-0 flex-1 basis-0 items-center justify-end gap-2 sm:gap-3 lg:gap-6">
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="hidden whitespace-nowrap text-base font-medium tracking-wide text-white/90 transition-colors hover:text-white sm:inline md:text-lg lg:text-xl"
            >
              {SITE_PHONE_DISPLAY}
            </a>
            <motion.a
              href="#contact"
              className="shrink-0 rounded-full bg-sand px-4 py-2.5 text-sm font-semibold tracking-[0.1em] text-white uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.06)] sm:px-6 sm:py-3 sm:text-base sm:tracking-[0.12em] lg:px-8 lg:py-3.5 lg:text-lg"
              whileHover={reduceMotion ? undefined : { scale: 1.03, backgroundColor: "var(--color-sand-hover)" }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              onClick={(e) => {
                if (onOpenContact || onExitContact) {
                  e.preventDefault();
                  if (contactOpen && onExitContact) onExitContact();
                  else onOpenContact?.();
                }
                closeAll();
              }}
            >
              Contact
            </motion.a>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="desktop-mega"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="hidden overflow-hidden border-t border-white/[0.06] bg-black/80 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto w-full max-w-full px-2 py-10 sm:px-3 lg:px-5 xl:px-6">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
                  <div>
                    <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#b9a086] uppercase">Site</p>
                    <ul className="space-y-3">
                      <li>
                        <NavMenuItem
                          item={{ id: "home", label: "Home", href: "/", internal: true }}
                          variant="mega"
                          index={megaIndex++}
                          reduceMotion={reduceMotion}
                          contactOpen={contactOpen}
                          onOpenContact={onOpenContact}
                          onExitContact={onExitContact}
                          onNavigate={() => setMegaOpen(false)}
                        />
                      </li>
                    </ul>
                  </div>

                  {NAV_MENU_GROUPS.map((group) => (
                    <div key={group.id}>
                      <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#b9a086] uppercase">{group.label}</p>
                      <ul className="space-y-3">
                        {group.items.map((item) => (
                          <li key={item.id}>
                            <NavMenuItem
                              item={item}
                              variant="mega"
                              index={megaIndex++}
                              reduceMotion={reduceMotion}
                              contactOpen={contactOpen}
                              onOpenContact={onOpenContact}
                              onExitContact={onExitContact}
                              onNavigate={() => setMegaOpen(false)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div>
                    <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#b9a086] uppercase">Get in touch</p>
                    <NavMenuItem
                      item={{ id: "contact", label: "Contact Us", href: "#contact" }}
                      variant="mega"
                      index={megaIndex++}
                      reduceMotion={reduceMotion}
                      contactOpen={contactOpen}
                      onOpenContact={onOpenContact}
                      onExitContact={onExitContact}
                      onNavigate={() => setMegaOpen(false)}
                    />
                    <a
                      href={`tel:${SITE_PHONE_TEL}`}
                      className="mt-4 block text-base font-medium tracking-wide text-white/70 transition-colors hover:text-white md:text-lg"
                      onClick={() => setMegaOpen(false)}
                    >
                      {SITE_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-black lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-end px-4 py-4">
              <button
                type="button"
                className="flex size-11 items-center justify-center rounded-md text-white"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <CloseIcon className="size-6" />
              </button>
            </div>

            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 py-4"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto w-full max-w-md">
                <NavMenuItem
                  item={{ id: "home", label: "Home", href: "/", internal: true }}
                  variant="mobile"
                  index={0}
                  reduceMotion={reduceMotion}
                  contactOpen={contactOpen}
                  onOpenContact={onOpenContact}
                  onExitContact={onExitContact}
                  onNavigate={() => setMenuOpen(false)}
                />

                {NAV_MENU_GROUPS.map((group, gi) => (
                  <div key={group.id} className={gi === 0 ? "mt-8" : "mt-10"}>
                    <p className="mb-3 text-center text-xs font-semibold tracking-[0.22em] text-[#b9a086] uppercase">
                      {group.label}
                    </p>
                    <ul className="flex flex-col items-center gap-0">
                      {group.items.map((item, i) => (
                        <li key={item.id} className="w-full">
                          <NavMenuItem
                            item={item}
                            variant="mobile"
                            index={1 + gi * 10 + i}
                            reduceMotion={reduceMotion}
                            contactOpen={contactOpen}
                            onOpenContact={onOpenContact}
                            onExitContact={onExitContact}
                            onNavigate={() => setMenuOpen(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="mt-10">
                  <NavMenuItem
                    item={{ id: "contact", label: "Contact Us", href: "#contact" }}
                    variant="mobile"
                    index={99}
                    reduceMotion={reduceMotion}
                    contactOpen={contactOpen}
                    onOpenContact={onOpenContact}
                    onExitContact={onExitContact}
                    onNavigate={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </nav>

            <motion.div
              className="shrink-0 border-t border-white/[0.08] px-6 py-8 text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPanel, delay: reduceMotion ? 0 : 0.35 }}
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-white/45 uppercase">Call us</p>
              <a href={`tel:${SITE_PHONE_TEL}`} className="mt-3 block text-xl font-medium text-white sm:text-2xl">
                {SITE_PHONE_DISPLAY}
              </a>
              <motion.a
                href="#contact"
                className="mt-6 inline-flex min-w-[12rem] items-center justify-center rounded-full bg-sand px-8 py-4 text-sm font-semibold tracking-[0.14em] text-white uppercase sm:text-base"
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={(e) => {
                  if (onOpenContact || onExitContact) {
                    e.preventDefault();
                    if (contactOpen && onExitContact) onExitContact();
                    else onOpenContact?.();
                  }
                  setMenuOpen(false);
                }}
              >
                Get in touch
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
