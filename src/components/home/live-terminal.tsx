"use client";

import React, { useEffect, useState } from "react";

type Line = { kind: "cmd" | "out" | "ok" | "metric"; text: string; pause?: number };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "npx create-next-app@latest client-site" },
  { kind: "ok", text: "Projet créé — Next.js · TypeScript · Tailwind", pause: 500 },
  { kind: "cmd", text: "git commit -m \"feat: maquette intégrée au pixel\"" },
  { kind: "out", text: "[main 4f2c9a1] 38 files changed", pause: 400 },
  { kind: "cmd", text: "git push origin main" },
  { kind: "out", text: "Build en cours…", pause: 900 },
  { kind: "ok", text: "Build terminé en 4.2s", pause: 300 },
  { kind: "ok", text: "Déployé en production", pause: 600 },
  { kind: "cmd", text: "npx lighthouse https://client-site.be" },
  { kind: "metric", text: "Performance 100 · Accessibilité 100 · SEO 100", pause: 3500 },
];

const TYPE_SPEED = 32;

/** Fake shell that types a deploy session, then loops. */
export function LiveTerminal() {
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setDone(SCRIPT), 0);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      await wait(1200);
      while (!cancelled) {
        setDone([]);
        for (const line of SCRIPT) {
          if (cancelled) return;
          if (line.kind === "cmd") {
            for (let i = 1; i <= line.text.length; i++) {
              if (cancelled) return;
              setTyping(line.text.slice(0, i));
              await wait(TYPE_SPEED + Math.random() * 40);
            }
            await wait(250);
            setTyping("");
          }
          setDone((d) => [...d, line]);
          await wait(line.pause ?? 200);
        }
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="w-full max-w-md rounded-lg border border-line bg-ink-2/90 backdrop-blur shadow-2xl shadow-black/40 font-mono text-[12px] leading-relaxed"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-paper-mute/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper-mute/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper-mute/50" />
        <span className="ml-3 text-paper-mute">gauthier@gminor ~ zsh</span>
      </div>
      <div className="h-64 overflow-hidden px-4 py-3 flex flex-col justify-end">
        {done.map((line, i) => (
          <p key={i} className={lineClass(line.kind)}>
            {prefix(line.kind)}
            {line.text}
          </p>
        ))}
        <p className="text-paper">
          <span className="text-signal">❯ </span>
          {typing}
          <span className="caret-blink">▋</span>
        </p>
      </div>
    </div>
  );
}

function prefix(kind: Line["kind"]) {
  if (kind === "cmd") return <span className="text-signal">❯ </span>;
  if (kind === "ok") return <span className="text-signal">✓ </span>;
  return null;
}

function lineClass(kind: Line["kind"]) {
  if (kind === "cmd") return "text-paper";
  if (kind === "metric") return "text-paper mt-1 px-2 py-1 -mx-2 rounded bg-signal/15";
  return "text-paper-dim";
}
