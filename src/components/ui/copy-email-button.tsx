"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  label?: string;
}

export function CopyEmailButton({
  email,
  className = "",
  label,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur copie presse-papier", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copier l'adresse email dans le presse-papier"
      className={`group/copy relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/[0.1] hover:border-emerald-400/50 text-[11px] font-mono text-zinc-300 hover:text-white transition-all cursor-pointer select-none active:scale-95 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
          <span className="text-emerald-400 font-semibold">Email copié !</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover/copy:text-emerald-400 transition-colors" />
          <span>{label || email}</span>
        </>
      )}
    </button>
  );
}
