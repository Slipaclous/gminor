"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Custom cursor. Any element with `data-cursor="Label"` grows the cursor
 * and shows the label; links and buttons get a smaller hover state.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(!!target?.closest("a, button, input, textarea, select, label"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hovering ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-blend flex items-center justify-center"
      >
        {label && (
          <span className="text-[11px] font-medium tracking-wide text-ink">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
