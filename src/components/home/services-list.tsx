import React from "react";
import type { ExpertiseItem } from "@/lib/settings-service";
import { SplitText } from "../motion/split-text";


export function ServicesList({ items }: { items: ExpertiseItem[] }) {

  return (
    <section id="services" className="relative px-5 sm:px-10 py-20 sm:py-32">
      <div className="mb-12 sm:mb-20">
        <h2 className="text-[10vw] sm:text-[6vw] leading-[0.92] tracking-[-0.05em] font-medium">
          <SplitText text="Du premier croquis" by="word" />{" "}
          <span className="font-serif italic font-normal text-paper-dim">
            <SplitText text="à la mise en ligne." by="word" delay={0.2} />
          </span>
        </h2>
      </div>

      <ul className="border-t border-line">
        {items.map((service, i) => (
          <li
            key={service.title}
            className="group border-b border-line py-8 sm:py-10 grid lg:grid-cols-12 gap-4 items-baseline transition-colors duration-500 hover:bg-paper hover:text-ink sm:px-4 sm:-mx-4"
          >
            <span className="lg:col-span-1 font-mono text-xs text-moss group-hover:text-ink/60 transition-colors">0{i + 1}</span>
            <h3 className="lg:col-span-6 text-4xl sm:text-5xl xl:text-6xl tracking-[-0.04em] font-medium transition-transform duration-700 ease-expo group-hover:translate-x-4 group-hover:font-serif group-hover:italic">
              {service.title}
            </h3>
            <div className="lg:col-span-5 space-y-3 max-w-xl">
              <p className="opacity-75 leading-relaxed">{service.text}</p>
              <p className="font-mono text-xs text-moss group-hover:text-ink/60 transition-colors">{service.tags.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}
