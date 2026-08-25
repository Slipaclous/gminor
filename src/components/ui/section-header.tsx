import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400 font-semibold",
            align === "center" && "justify-center"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
