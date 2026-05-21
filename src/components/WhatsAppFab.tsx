import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE_WHATSAPP_HREF } from "@/config/site";
import { motion, useReducedMotion } from "motion/react";

export function WhatsAppFab() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={SITE_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed z-[38] flex items-center gap-2.5 rounded-full border border-[#b89a7a]/45 bg-[#1a1816]/80 py-2.5 ps-3 pe-4 text-[#e8d4bc] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors hover:border-[#b89a7a]/75 hover:bg-[#252220]/90 hover:text-white sm:gap-3 sm:py-3 sm:ps-3.5 sm:pe-5"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 28, delay: 0.6 }}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#b89a7a]/20 sm:size-12">
        <WhatsAppIcon className="size-6 sm:size-7" />
      </span>
      <span className="hidden pr-0.5 text-xs font-semibold tracking-[0.14em] text-white uppercase min-[380px]:inline sm:text-sm sm:tracking-[0.16em]">
        Contact us
      </span>
    </motion.a>
  );
}
