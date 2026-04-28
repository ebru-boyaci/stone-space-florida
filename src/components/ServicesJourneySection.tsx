import bg from "@assets/bg.png";
import kitchen3 from "@assets/kitchen3.jpg";
import kitchen4 from "@assets/kitchen4.jpg";
import kitchen6 from "@assets/kitchen6.jpg";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function ServicesJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Section ekrana girerken radius yüksek, section yerleşince düzleşsin.
    offset: ["start end", "start start"],
  });

  const edgeRaw = useTransform(scrollYProgress, [0, 0.7], [88, 0]);
  // Hızlı scroll’da her kare SVG path güncellenmesi main thread’i zorlar; yay ile ara değer yumuşatılır (jank/az).
  const edgeY = useSpring(edgeRaw, {
    stiffness: reduceMotion ? 9000 : 320,
    damping: reduceMotion ? 130 : 36,
    mass: reduceMotion ? 0.1 : 0.2,
  });
  // SVG yüksekliği -top ile aynı olmalı; aksi halde kavis ile içerik (img) arasında düz şerit kalır.
  const curvePath = useMotionTemplate`M0 ${edgeY} Q500 0 1000 ${edgeY} L1000 180 L0 180 Z`;

  return (
    <section
      ref={sectionRef}
      className="relative h-[190vh] overflow-visible bg-[#343434]"
      aria-label="Services background"
    >
      {/* Kavis iki component sınırında durur; içerik alanının içine girmez. */}
      <motion.svg
        className="pointer-events-none absolute left-0 -top-[180px] z-[30] w-full will-change-transform [transform:translateZ(0)]"
        viewBox="0 0 1000 180"
        preserveAspectRatio="none"
        style={{ height: 180 }}
        aria-hidden
      >
        <motion.path d={curvePath} fill="#343434" />
      </motion.svg>

      {/* Arka plan rengi: lazy img yüklenmeden önce siyah yerine dolgu (root bg-black sızmasın). */}
      <div className="relative h-full overflow-hidden bg-[#343434]">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#343434]/35" />

        <div className="relative z-10 mx-auto mt-[clamp(12rem,27vh,18rem)] flex w-full max-w-[min(94vw,58rem)] flex-col items-center px-6 text-center sm:px-10">
          <h2
            className="font-hero-script text-[clamp(4rem,10.5vw,8.8rem)] leading-[0.93] text-[#f2f0ec] [text-shadow:0_2px_26px_rgba(0,0,0,0.45)]"
            style={{ fontFamily: '"IBM Plex Sans", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300 }}
          >
            Discover our
            <br />
            services
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-[1.05rem] leading-[1.72] text-[#e3dfd8]/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] sm:text-[1.18rem]">
            From material selection to final detailing, we craft spaces that feel refined, functional,
            and uniquely yours.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-[clamp(18rem,34vh,28rem)] grid w-full max-w-[min(96vw,95rem)] grid-cols-1 gap-6 px-6 sm:px-10 lg:block lg:h-[76rem] lg:max-w-[94rem] lg:px-8">
          <article className="relative aspect-square overflow-hidden bg-[#2b2b2b] lg:absolute lg:left-0 lg:top-[3.5rem] lg:w-[45%] lg:-translate-x-[64%]">
            <img src={kitchen6} alt="" className="h-full w-full scale-[3.2] object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-black/38" />
            <div className="absolute left-5 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs text-white/80 lg:left-[42%]">
              1
            </div>
            <p className="absolute left-5 right-5 top-20 text-pretty text-[clamp(1.05rem,2.1vw,1.35rem)] font-medium leading-[1.32] text-white lg:left-[42%] lg:right-6">
              Whether it&apos;s a residential or commercial project, our talented designers will create customized interiors that reflect your style
            </p>
          </article>

          <article className="relative aspect-square overflow-hidden bg-[#2b2b2b] lg:absolute lg:left-1/2 lg:top-0 lg:w-[45%] lg:-translate-x-1/2">
            <img src={kitchen4} alt="" className="h-full w-full scale-[3.2] object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-black/42" />
            <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs text-white/80">
              2
            </div>
            <p className="absolute left-6 right-6 top-20 text-pretty text-[clamp(1.08rem,2vw,1.38rem)] font-medium leading-[1.32] text-white">
              Whether it&apos;s a residential or commercial project, our talented designers will create customized interiors that reflect your style
            </p>
          </article>

          <article className="relative aspect-square overflow-hidden bg-[#2b2b2b] lg:absolute lg:right-0 lg:top-[7rem] lg:w-[45%] lg:translate-x-[64%]">
            <img src={kitchen3} alt="" className="h-full w-full scale-[3.2] object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-black/38" />
            <div className="absolute left-5 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs text-white/80 lg:right-[42%] lg:left-auto">
              3
            </div>
            <p className="absolute left-5 right-5 top-20 text-pretty text-[clamp(1.05rem,2.1vw,1.35rem)] font-medium leading-[1.32] text-white lg:right-[42%] lg:left-6">
              Whether it&apos;s a residential or commercial project, our talented designers will create customized interiors that reflect your style
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
