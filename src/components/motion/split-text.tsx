"use client";

import { motion, type Variants } from "framer-motion";
import { clsx } from "clsx";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  by?: "char" | "word";
}

const part: Variants = {
  hidden: { y: "110%", rotate: 6 },
  show: (d: number) => ({ y: "0%", rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

/**
 * Masked line reveal, split per character or per word.
 * The whole block observes the viewport once, so every part animates
 * even when it sits near a screen edge or inside a translated track.
 */
export function SplitText({ text, className, delay = 0, immediate = false, by = "char" }: SplitTextProps) {
  const words = text.split(" ");
  const step = by === "char" ? 0.025 : 0.06;
  let index = 0;

  return (
    <motion.span
      className={clsx("inline-block", className)}
      aria-label={text}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.3 } })}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          {(by === "char" ? word.split("") : [word]).map((p, c) => (
            <motion.span key={c} data-char className="inline-block will-change-transform" variants={part} custom={delay + index++ * step}>
              {p}
            </motion.span>
          ))}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
