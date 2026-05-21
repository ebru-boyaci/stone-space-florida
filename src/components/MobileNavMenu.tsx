import { MEGA_MENU_SECTIONS, MEGA_PROJECT_CARDS } from "@/config/megaMenu";
import type { NavLinkItem } from "@/config/site";
import { SITE_NAV_ITEMS, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/config/site";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";

type MobileNavMenuProps = {
  contactOpen?: boolean;
  onOpenContact?: () => void;
  onExitContact?: () => void;
  onNavigate: () => void;
};

function MobileNavLink({
  item,
  onNavigate,
  contactOpen,
  onOpenContact,
  onExitContact,
}: MobileNavMenuProps & { item: NavLinkItem }) {
  const isContact = item.id === "contact";
  const className =
    "block py-2 text-center text-lg font-medium text-white/90 transition-colors hover:text-white";

  const handleClick = (e: MouseEvent) => {
    if (isContact && (onOpenContact || onExitContact)) {
      e.preventDefault();
      if (contactOpen && onExitContact) onExitContact();
      else onOpenContact?.();
    }
    onNavigate();
  };

  if (item.internal) {
    return (
      <Link to={item.href} className={className} onClick={handleClick}>
        {item.label}
      </Link>
    );
  }

  const externalProps =
    item.href.startsWith("http") ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <a href={item.href} className={className} onClick={handleClick} {...externalProps}>
      {item.label}
    </a>
  );
}

export function MobileNavMenu({
  contactOpen,
  onOpenContact,
  onExitContact,
  onNavigate,
}: MobileNavMenuProps) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <nav className="mx-auto w-full max-w-md" aria-label="Mobile navigation">
      <ul className="flex flex-col border-b border-white/[0.06] pb-4">
        {SITE_NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <MobileNavLink
              item={item}
              contactOpen={contactOpen}
              onOpenContact={onOpenContact}
              onExitContact={onExitContact}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>

      {MEGA_MENU_SECTIONS.filter((s) => s.id !== "home" && s.id !== "about").map((section, si) => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            className={si === 0 ? "mt-4" : "mt-2 border-t border-white/[0.06] pt-2"}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-xs font-semibold tracking-[0.22em] text-[#b9a086] uppercase"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : section.id)}
            >
              {section.label}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-white/50"
                aria-hidden
              >
                ▾
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pb-4">
                    {section.id === "projects" ? (
                      <>
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <MobileNavLink
                              item={item}
                              contactOpen={contactOpen}
                              onOpenContact={onOpenContact}
                              onExitContact={onExitContact}
                              onNavigate={onNavigate}
                            />
                          </li>
                        ))}
                        {MEGA_PROJECT_CARDS.map((p) => (
                          <li key={p.slug}>
                            <Link
                              to={p.href}
                              className="block py-2 text-center text-base text-white/75 hover:text-white"
                              onClick={onNavigate}
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : section.id === "contact" ? (
                      <>
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <MobileNavLink
                              item={item}
                              contactOpen={contactOpen}
                              onOpenContact={onOpenContact}
                              onExitContact={onExitContact}
                              onNavigate={onNavigate}
                            />
                          </li>
                        ))}
                        <li>
                          <a
                            href={`tel:${SITE_PHONE_TEL}`}
                            className="mt-2 block py-2 text-center text-lg text-white/80"
                            onClick={onNavigate}
                          >
                            {SITE_PHONE_DISPLAY}
                          </a>
                        </li>
                      </>
                    ) : (
                      section.items.map((item) => (
                        <li key={item.id}>
                          <MobileNavLink
                            item={item}
                            contactOpen={contactOpen}
                            onOpenContact={onOpenContact}
                            onExitContact={onExitContact}
                            onNavigate={onNavigate}
                          />
                        </li>
                      ))
                    )}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
