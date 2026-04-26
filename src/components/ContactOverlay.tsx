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

function SocialIcon({ name }: { name: (typeof SITE_SOCIAL_LINKS)[number]["name"] }) {
  const className = "h-[1.1rem] w-[1.1rem] text-current";
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
      className="w-full border-t border-white/[0.1] pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20"
      aria-label="Location and contact details"
    >
      <div className="mx-auto grid w-full max-w-[min(100%,100rem)] grid-cols-1 items-stretch gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-0">
        <div className="flex min-w-0 flex-col gap-12 sm:gap-16 lg:border-r lg:border-copper/20 lg:pe-10 lg:pb-2 xl:pe-12">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-copper uppercase sm:text-sm">Office</p>
            <p className="mt-3 max-w-full text-2xl leading-snug font-medium tracking-tight text-white sm:text-3xl">
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
              className="mt-5 inline-flex items-center justify-center rounded-full bg-copper px-7 py-2.5 text-sm font-semibold tracking-wide text-zinc-950 transition-colors hover:bg-copper/90"
            >
              Show map
            </a>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-copper uppercase sm:text-sm">Call</p>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="mt-2 block w-fit text-lg text-copper transition-colors hover:text-copper/85 sm:text-xl"
            >
              {SITE_PHONE_DISPLAY}
            </a>
            <a
              href={SITE_EMAIL_HREF}
              className="mt-1 block w-fit text-lg text-copper transition-colors hover:text-copper/85 sm:text-xl"
            >
              {SITE_EMAIL}
            </a>
            <ul className="mt-5 flex flex-wrap items-center gap-3" aria-label="Social media">
              {SITE_SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-copper/35 text-copper/90 transition-colors hover:border-copper/60 hover:text-copper"
                    aria-label={s.name}
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="relative flex min-h-[min(50vh,26rem)] w-full min-w-0 items-center justify-center self-stretch overflow-hidden rounded-xl border border-dashed border-copper/25 bg-white/[0.02] lg:min-h-0 lg:pl-10 xl:pl-12"
          aria-hidden
        />
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
            className="col-start-1 row-start-1 z-[1] mt-[clamp(8.5rem,22.5vw,16rem)] max-w-[min(94vw,64rem)] text-center font-hero-script text-[clamp(4.25rem,15.5vw,10.5rem)] lowercase leading-[0.82] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.6)] sm:mt-[clamp(9.5rem,24.5vw,18rem)] sm:text-[clamp(5.25rem,16.5vw,11.5rem)]"
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
