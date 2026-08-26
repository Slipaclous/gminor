"use client";

import React, { useTransition } from "react";
import { reorderProjectAction } from "@/app/actions/projects";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";

interface ProjectReorderButtonsProps {
  id: string;
  order: number;
  isFirst: boolean;
  isLast: boolean;
}

export function ProjectReorderButtons({
  id,
  order,
  isFirst,
  isLast,
}: ProjectReorderButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleMove = (direction: "up" | "down") => {
    startTransition(async () => {
      await reorderProjectAction(id, direction);
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="w-6 text-center text-xs font-mono font-bold text-zinc-400">
        #{order}
      </span>

      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          disabled={isFirst || isPending}
          onClick={() => handleMove("up")}
          className="p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
          title="Monter d'une position"
        >
          {isPending ? (
            <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
          ) : (
            <ArrowUp className="w-3 h-3" />
          )}
        </button>

        <button
          type="button"
          disabled={isLast || isPending}
          onClick={() => handleMove("down")}
          className="p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
          title="Descendre d'une position"
        >
          <ArrowDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
