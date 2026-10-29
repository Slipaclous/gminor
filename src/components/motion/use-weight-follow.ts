"use client";

import { useEffect, type RefObject } from "react";

/**
 * Variable-font proximity effect: every `[data-char]` inside `ref` gains
 * weight as the pointer gets closer. Fine pointers only, reduced motion respected.
 */
export function useWeightFollow(ref: RefObject<HTMLElement | null>, { min = 400, max = 800, radius = 260 } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-char]"));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const paint = () => {
      frame = 0;
      for (const el of chars) {
        let w = min;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          w = min + (max - min) * Math.max(0, 1 - d / radius);
        }
        el.style.fontVariationSettings = `"wght" ${Math.round(w)}`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      chars.forEach((el) => (el.style.fontVariationSettings = ""));
    };
  }, [ref, min, max, radius]);
}
