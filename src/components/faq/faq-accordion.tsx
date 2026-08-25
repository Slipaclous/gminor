"use client";

import React, { useState } from "react";
import { FaqItem } from "@/lib/settings-service";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-[#0d0d10] border-white/[0.22] shadow-xl"
                : "bg-[#070709] border-white/[0.08] hover:border-white/[0.16]"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <span className="text-xs font-mono font-bold text-zinc-500 mt-1">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {faq.question}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 text-sm sm:text-base text-zinc-300 leading-relaxed pl-12 sm:pl-14 border-t border-white/[0.04] animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
