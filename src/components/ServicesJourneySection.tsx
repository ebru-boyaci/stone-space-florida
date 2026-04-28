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

  const topCurve = useTransform(scrollYProgress, [0, 0.7], ["140% 190px", "0% 0px"]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative -mt-[190px] h-[160vh] overflow-hidden bg-black pt-[190px]"
      style={{ borderTopLeftRadius: topCurve, borderTopRightRadius: topCurve }}
      aria-label="Services background"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-72"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/34" />
    </motion.section>
  );
}
