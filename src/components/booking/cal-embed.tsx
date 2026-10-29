"use client";

import { useState } from "react";
import { useTheme } from "../layout/theme-toggle";

/**
 * Cal.com booking page embedded inline (free plan). Follows the site theme
 * and the signal accent; the iframe reloads when the theme changes.
 */
export function CalEmbed({ url }: { url: string }) {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  const src = new URL(url);
  src.searchParams.set("embed", "true");
  src.searchParams.set("theme", theme);
  src.searchParams.set("layout", "month_view");
  src.searchParams.set("brandColor", theme === "dark" ? "#8ea6ff" : "#3550d4");

  return (
    <div className="relative min-h-[1150px] sm:min-h-[720px] border border-line bg-ink-2 overflow-hidden">
      {!loaded && (
        <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-paper-mute">
          Chargement du calendrier…
        </p>
      )}
      <iframe
        key={theme}
        src={src.toString()}
        title="Réserver un rendez-vous"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`relative w-full h-[1150px] sm:h-[720px] transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
