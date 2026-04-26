import { AnimatePresence, motion } from "motion/react";
import { HEADER_BAR_PADDING } from "@/config/layout";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/config/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

function ContactOverlayContent() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col px-6 pb-20 pt-10 sm:px-10 sm:pb-24 sm:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[15%] bg-[radial-gradient(ellipse_85%_60%_at_50%_100%,rgba(197,165,137,0.1),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-[min(98vw,80rem)] flex-1 flex-col justify-center pb-8 pt-4 sm:pb-12 sm:pt-8">
        <div className="relative grid w-full place-items-center justify-self-center">
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
            className="col-start-1 row-start-1 z-[1] mt-[clamp(5.5rem,16.5vw,10.5rem)] max-w-[min(94vw,64rem)] text-center font-hero-script text-[clamp(4.25rem,15.5vw,10.5rem)] lowercase leading-[0.82] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.6)] sm:mt-[clamp(6.75rem,18vw,12rem)] sm:text-[clamp(5.25rem,16.5vw,11.5rem)]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeOut }}
          >
            contact us now
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto mt-40 max-w-2xl text-center sm:mt-48"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.45, ease: easeOut }}
        >
          <p className="text-xl text-white/50 sm:text-2xl">
            Form or showroom details can go here. Call{" "}
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {SITE_PHONE_DISPLAY}
            </a>
            .
          </p>
        </motion.div>
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
          <div className={`flex min-h-[100dvh] flex-1 flex-col ${HEADER_BAR_PADDING}`}>
            <ContactOverlayContent key={mountKey} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
