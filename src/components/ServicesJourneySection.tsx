import bg from "@assets/bg.png";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ServicesJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Section ekrana girerken radius yüksek, section yerleşince düzleşsin.
    offset: ["start end", "start start"],
  });

  const topCurve = useTransform(scrollYProgress, [0, 0.7], ["165% 280px", "0% 0px"]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative -mt-[56px] h-[190vh] overflow-hidden bg-black pt-[56px]"
      style={{ borderTopLeftRadius: topCurve, borderTopRightRadius: topCurve }}
      aria-label="Services background"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-x-0 top-36 bottom-0 h-[calc(100%-9rem)] w-full object-cover opacity-72 sm:top-44 sm:h-[calc(100%-11rem)] md:top-56 md:h-[calc(100%-14rem)]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-x-0 top-36 bottom-0 bg-black/34 sm:top-44 md:top-56" />
    </motion.section>
  );
}
