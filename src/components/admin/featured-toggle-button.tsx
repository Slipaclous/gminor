"use client";

import React, { useTransition } from "react";
import { toggleFeaturedAction } from "@/app/actions/projects";
import { Star, Loader2 } from "lucide-react";

interface FeaturedToggleButtonProps {
  id: string;
  featured: boolean;
}

export function FeaturedToggleButton({
  id,
  featured,
}: FeaturedToggleButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleFeaturedAction(id, featured);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
        featured
          ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60"
          : "bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white"
      }`}
      title={featured ? "Retirer de la page d'accueil" : "Mettre à la une sur l'accueil"}
    >
      {isPending ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Star className={`w-3 h-3 ${featured ? "fill-emerald-400" : ""}`} />
      )}
      <span>{featured ? "À la une" : "Standard"}</span>
    </button>
  );
}
