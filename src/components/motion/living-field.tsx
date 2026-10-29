"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";

/**
 * Soft light field behind the hero: blurred gradient blobs that drift on
 * their own and lean towards the pointer. Pure CSS, theme-aware through
 * the color tokens, no GPU context to lose.
 */
export function LivingField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: 0.7, y: 0.35 };
    const pos = { ...target };
    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      el.style.setProperty("--fx", `${(pos.x * 100).toFixed(2)}%`);
      el.style.setProperty("--fy", `${(pos.y * 100).toFixed(2)}%`);
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={clsx("living-field pointer-events-none overflow-hidden", className)}>
      <span className="living-blob living-blob--signal" />
      <span className="living-blob living-blob--moss" />
      <span className="living-blob living-blob--pointer" />
    </div>
  );
}
