"use client";

import React, { useState, useTransition } from "react";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { deleteContactMessage } from "@/app/actions/contact";

interface DeleteMessageButtonProps {
  messageId: string;
  senderName: string;
}

export function DeleteMessageButton({ messageId, senderName }: DeleteMessageButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteContactMessage(messageId);
      setShowConfirm(false);
    });
  };

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-1.5 animate-in fade-in-50 duration-150">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold font-mono transition-colors cursor-pointer shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <span>Confirmer</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      title={`Supprimer le message de ${senderName}`}
      className="p-1.5 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-all cursor-pointer shadow-sm hover:bg-red-950/30"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
