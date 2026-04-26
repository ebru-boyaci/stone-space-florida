import mapImage from "@assets/map.png";
import { AnimatePresence, motion } from "motion/react";
import { HEADER_BAR_PADDING, MIN_H_FIRST_SCREEN } from "@/config/layout";
import {
  SITE_ADDRESS_LINES,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_MAP_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_SOCIAL_LINKS,
} from "@/config/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Contact sol sütun, accent #b89a7a */
const contactLabelClass =
  "text-[1.15rem] font-medium uppercase leading-none tracking-[0.2em] text-[#b89a7a] sm:text-[1.25rem] sm:leading-tight sm:tracking-[0.22em]";

const showMapButtonClass =
  "mt-7 inline-flex items-center justify-center rounded-full bg-[#b89a7a] px-10 py-4 text-base font-semibold tracking-[0.15em] text-zinc-950 uppercase transition hover:opacity-90 sm:mt-9 sm:px-12 sm:py-5";

const addressTextClass =
  "mt-6 max-w-2xl text-pretty text-[min(3.375rem,8.5vw)] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:mt-7 sm:leading-[1.08] sm:text-[3.5rem] lg:text-[3.9rem] xl:text-[3.95rem]";

const bodyValueWhite = "text-2xl font-medium leading-snug text-white sm:text-[1.9rem] sm:leading-[1.3]";

const bodyValueEmailClass =
  "text-2xl font-medium leading-snug text-[#b89a7a] sm:text-[1.9rem] sm:leading-[1.3] transition hover:opacity-80";

function SocialIcon({ name }: { name: (typeof SITE_SOCIAL_LINKS)[number]["name"] }) {
  const className = "h-10 w-10 text-current sm:h-12 sm:w-12";
  switch (name) {
    case "LinkedIn":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 1.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 1.5a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2zm4.1-1.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8" />
        </svg>
      );
    default:
      return null;
  }
}

function ContactDetails() {
  return (
    <section
      className="w-full border-t border-white/[0.1] pt-20 pb-20 font-sans sm:pt-28 sm:pb-24 lg:pt-32"
      aria-label="Location and contact details"
    >
      <div className="mx-auto grid w-full max-w-[min(100%,100rem)] grid-cols-1 items-stretch gap-16 sm:gap-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.22fr)] lg:items-center lg:gap-0">
        <div className="flex min-w-0 flex-col justify-center gap-[7.5rem] pt-[4.5rem] sm:gap-36 sm:pt-[5.6rem] lg:gap-36 lg:border-r lg:border-[#b89a7a]/15 lg:pt-0 lg:pb-0 lg:pe-8 xl:pe-12">
          <div>
            <p className={contactLabelClass}>Office</p>
            <p className={addressTextClass}>
              {SITE_ADDRESS_LINES[0]}
              <br />
              {SITE_ADDRESS_LINES[1]}
              <br />
              {SITE_ADDRESS_LINES[2]}
            </p>
            <a
              href={SITE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={showMapButtonClass}
            >
              Show map
            </a>
          </div>

          <div>
            <p>
              <span className={contactLabelClass}>Phone</span>
            </p>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className={`mt-4 block w-fit sm:mt-5 ${bodyValueWhite}`}
            >
              {SITE_PHONE_DISPLAY}
            </a>
            <p className="mt-10 sm:mt-12">
              <span className={contactLabelClass}>Mail</span>
            </p>
            <a
              href={SITE_EMAIL_HREF}
              className={`mt-4 block w-fit sm:mt-5 ${bodyValueEmailClass} underline-offset-3 hover:underline`}
            >
              {SITE_EMAIL}
            </a>
            <ul className="mt-10 flex flex-wrap items-center gap-6 sm:mt-12 sm:gap-8" aria-label="Social media">
              {SITE_SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-18 w-18 items-center justify-center rounded-full border border-[#b89a7a]/50 text-white transition hover:border-[#b89a7a] sm:h-20 sm:w-20"
                    aria-label={s.name}
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="relative m-0 flex min-h-[min(88vh,36rem)] w-full min-w-0 flex-1 flex-col self-stretch overflow-visible p-0 sm:min-h-[min(90vh,44rem)] lg:min-h-0 lg:h-full">
          <img
            src={mapImage}
            alt="Map to 6000 Powers Avenue, Jacksonville, Florida"
            className="h-full w-full min-h-0 min-w-0 grow object-contain object-center"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function ContactOverlayContent() {
  return (
    <div className="relative z-0 flex min-h-0 flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-0 -z-10 min-h-full bg-[radial-gradient(ellipse_85%_50%_at_50%_0%,rgba(197,165,137,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className={`relative z-[1] flex w-full max-w-full flex-1 flex-col items-center ${MIN_H_FIRST_SCREEN} justify-center px-6 sm:px-10`}>
        <div className="relative grid w-full max-w-[min(98vw,80rem)] place-items-center">
          <motion.h2
            id="contact-heading"
            className="col-start-1 row-start-1 max-w-[min(96vw,96rem)] text-center font-hero-serif text-[clamp(6.25rem,20vw,18rem)] font-medium lowercase leading-[0.88] tracking-[-0.03em] text-hero-serif [text-shadow:0_4px_48px_rgba(0,0,0,0.5)] sm:text-[clamp(8rem,21.5vw,19.5rem)] lg:text-[clamp(8.25rem,18vw,20.5rem)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: easeOut }}
          >
            get info
          </motion.h2>
          <motion.p
            className="col-start-1 row-start-1 z-[1] mt-[clamp(9.75rem,25vw,18.5rem)] max-w-[min(94vw,64rem)] text-center font-hero-script text-[clamp(4.25rem,15.5vw,10.5rem)] lowercase leading-[0.82] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.6)] sm:mt-[clamp(11rem,27vw,21.5rem)] sm:text-[clamp(5.25rem,16.5vw,11.5rem)]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeOut }}
          >
            contact us now
          </motion.p>
        </div>
      </div>

      <div className="relative z-[1] w-full max-w-full shrink-0 px-4 sm:px-8 lg:px-10 xl:px-14">
        <ContactDetails />
      </div>
    </div>
  );
}

export function ContactOverlay({ open, mountKey }: { open: boolean; mountKey: number }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-shell"
          id="contact"
          role="region"
          aria-label="Contact"
          aria-labelledby="contact-heading"
          className="fixed inset-0 z-[40] flex min-h-0 flex-col overflow-y-auto bg-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: easeOut }}
        >
          <div className={`flex min-h-0 flex-1 flex-col ${HEADER_BAR_PADDING}`}>
            <ContactOverlayContent key={mountKey} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
