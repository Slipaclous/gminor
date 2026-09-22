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
            className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-white border-[#18191f] shadow-card"
                : "bg-white border-[#e6e6df] hover:border-[#18191f]/40 shadow-xs"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <span className="text-xs font-mono font-bold text-emerald-700 mt-1">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#18191f] tracking-tight">
                  {faq.question}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0 mt-0.5">
                {isOpen ? <Minus className="w-4 h-4 text-[#18191f]" /> : <Plus className="w-4 h-4 text-[#555765]" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 text-sm sm:text-base text-[#555765] leading-relaxed pl-12 sm:pl-14 border-t border-[#e6e6df] animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
