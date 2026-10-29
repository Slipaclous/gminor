import React from "react";
import type { ExpertiseItem } from "@/lib/settings-service";
import { SplitText } from "../motion/split-text";


export function ServicesList({ items }: { items: ExpertiseItem[] }) {

  return (
    <section id="services" className="relative px-5 sm:px-10 py-32">
      <div className="mb-20 grid lg:grid-cols-12 gap-10 items-end">
        <h2 className="lg:col-span-8 text-[10vw] sm:text-[6vw] leading-[0.92] tracking-[-0.05em] font-medium">
          <SplitText text="Du premier croquis" by="word" />{" "}
          <span className="font-serif italic font-normal text-paper-dim">
            <SplitText text="à la mise en ligne." by="word" delay={0.2} />
          </span>
        </h2>
        <p className="lg:col-span-4 lg:pb-[0.8vw] text-lg text-paper-dim leading-relaxed">
          Je prends le projet en entier : la stratégie, l&apos;interface et tout le code, sans sous-traitance ni
          intermédiaire.
        </p>
      </div>

      <ul className="border-t border-line">
        {items.map((service, i) => (
          <li
            key={service.title}
            className="group border-b border-line py-8 sm:py-10 grid md:grid-cols-12 gap-4 items-baseline transition-colors duration-500 hover:bg-paper hover:text-ink px-2 sm:px-4 -mx-2 sm:-mx-4"
          >
            <span className="md:col-span-1 font-mono text-xs text-moss group-hover:text-ink/60 transition-colors">0{i + 1}</span>
            <h3 className="md:col-span-6 text-4xl sm:text-6xl tracking-[-0.04em] font-medium transition-transform duration-700 ease-expo group-hover:translate-x-4 group-hover:font-serif group-hover:italic">
              {service.title}
            </h3>
            <div className="md:col-span-5 space-y-3">
              <p className="opacity-75 leading-relaxed">{service.text}</p>
              <p className="font-mono text-xs text-moss group-hover:text-ink/60 transition-colors">{service.tags.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}
