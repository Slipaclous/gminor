"use client";

import React, { useTransition } from "react";
import { deleteProjectAction } from "@/app/actions/projects";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteProjectButtonProps {
  id: string;
  title: string;
}

export function DeleteProjectButton({ id, title }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le projet "${title}" ?`)) {
      startTransition(async () => {
        await deleteProjectAction(id);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50 cursor-pointer"
      title="Supprimer ce projet"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-red-400" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
