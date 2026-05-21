import { MEGA_MENU_SECTIONS, MEGA_PROJECT_CARDS } from "@/config/megaMenu";
import type { NavLinkItem } from "@/config/site";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/config/site";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";

const springPanel = { type: "spring" as const, stiffness: 400, damping: 32 };

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

  return (
    <a href={item.href} className={className} onClick={handleClick}>
      {item.label}
    </a>
  );
}

export function MobileNavMenu(props: MobileNavMenuProps) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <nav className="mx-auto w-full max-w-md" aria-label="Mobile navigation">
      {MEGA_MENU_SECTIONS.map((section, si) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className={si === 0 ? "" : "mt-2 border-t border-white/[0.06] pt-2"}>
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
                            <MobileNavLink item={item} {...props} />
                          </li>
                        ))}
                        {MEGA_PROJECT_CARDS.map((p) => (
                          <li key={p.slug}>
                            <Link
                              to={p.href}
                              className="block py-2 text-center text-base text-white/75 hover:text-white"
                              onClick={props.onNavigate}
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : section.id === "contact" ? (
                      <li>
                        <MobileNavLink item={section.items[0]} {...props} />
                        <a
                          href={`tel:${SITE_PHONE_TEL}`}
                          className="mt-2 block py-2 text-center text-lg text-white/80"
                          onClick={props.onNavigate}
                        >
                          {SITE_PHONE_DISPLAY}
                        </a>
                      </li>
                    ) : (
                      section.items.map((item) => (
                        <li key={item.id}>
                          <MobileNavLink item={item} {...props} />
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
