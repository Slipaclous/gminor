"use client";

import React, { useState } from "react";

export function CopyEmailRow({ email, index }: { email: string; index: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="group w-full text-left">
      <CtaRowInner index={index} title={email} note={copied ? "Copié ✓" : "Copier l'adresse"} />
    </button>
  );
}

export function CtaRowInner({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <span className="relative flex items-baseline gap-5 border-t border-line py-6 sm:py-7 px-1 overflow-hidden">
      <span className="absolute inset-0 bg-paper origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100" />
      <span className="relative font-mono text-xs text-moss group-hover:text-ink/60 transition-colors">{index}</span>
      <span className="relative flex-1 min-w-0 truncate text-2xl sm:text-3xl tracking-[-0.03em] font-medium transition-colors group-hover:text-ink">
        {title}
      </span>
      <span className="relative shrink-0 text-sm text-paper-dim transition-colors group-hover:text-ink">
        <span className={note.endsWith("✓") ? "text-moss group-hover:text-ink" : ""}>{note}</span> <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
      </span>
    </span>
  );
}
