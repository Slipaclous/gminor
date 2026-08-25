import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "emerald" | "outline" | "mono";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-zinc-800/80 text-zinc-300 border border-white/[0.08] hover:bg-zinc-800",
    emerald:
      "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    outline:
      "bg-transparent text-zinc-400 border border-zinc-700/60 hover:text-zinc-200",
    mono:
      "font-mono uppercase text-[10px] tracking-wider bg-zinc-900/90 text-zinc-300 border border-white/[0.1]",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs rounded-md",
    md: "px-3 py-1 text-xs rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
