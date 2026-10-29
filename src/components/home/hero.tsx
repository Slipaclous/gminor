"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "../motion/split-text";
import { Marquee } from "../motion/marquee";
import { LivingField } from "../motion/living-field";
import { useWeightFollow } from "../motion/use-weight-follow";

interface HeroProps {
  available: boolean;
  intro: string;
}

const NAME = "Gauthier Minor";

export function Hero({ available, intro }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  useWeightFollow(titleRef, { min: 500, max: 850 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Explicit clamped mappings: fade out over the first 60% of the hero, never back in.
  const y = useTransform(scrollYProgress, (v) => `${Math.min(1, Math.max(0, v)) * 15}%`);
  const opacity = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, 1 - v / 0.6)));

  return (
    <section
      ref={ref}
      className="relative min-h-svh flex flex-col overflow-hidden"
    >
      <LivingField className="absolute inset-0 w-full h-full" />
      <motion.div style={reduceMotion ? undefined : { y, opacity }} className="relative z-10 flex-1 flex flex-col justify-end px-5 sm:px-10 pb-10 pt-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <h1 ref={titleRef} className="leading-[0.86] tracking-[-0.055em] font-medium text-[18vw] sm:text-[15vw] lg:text-[12vw]">
            <span className="block">
              <SplitText text="Code" immediate delay={0.2} />
            </span>
            <span className="flex items-baseline gap-[2vw]">
              <span className="font-serif italic font-normal tracking-[-0.03em] text-signal">
                <SplitText text="&" immediate delay={0.45} />
              </span>
              <SplitText text="design." immediate delay={0.5} />
            </span>
          </h1>
          <motion.div
            className="lg:mb-[1.2vw] lg:w-[30vw] lg:max-w-md shrink-0 flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg sm:text-xl leading-snug text-paper-dim">
              {intro.split(NAME).map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-paper">{NAME}</span>}
                  {part}
                </React.Fragment>
              ))}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-line">
              <span className="flex items-center gap-2 text-sm text-paper-dim">
                <span className={`w-2 h-2 rounded-full ${available ? "bg-moss animate-pulse" : "bg-paper-mute"}`} />
                {available ? "Disponible pour nouveaux projets" : "Agenda complet"}
              </span>
              <Link href="/contact" className="inline-flex items-center gap-2 border-b border-paper pb-0.5 text-sm hover:text-signal hover:border-signal transition-colors">
                Démarrer un projet →
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Marquee
        className="relative z-20 bg-ink border-y border-line py-4 text-2xl sm:text-3xl font-serif italic"
        items={["Next.js", "Sites sur mesure", "Applications SaaS", "E-commerce", "UI / UX design", "Motion & interactions"]}
        duration={40}
      />
    </section>
  );
}
