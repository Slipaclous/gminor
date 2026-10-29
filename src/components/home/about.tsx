import React from "react";
import type { AboutSettings } from "@/lib/settings-service";
import { Reveal } from "../motion/reveal";
import { SplitText } from "../motion/split-text";


interface AboutProps {
  metrics: { value: string; label: string }[];
  about: AboutSettings;
}

export function About({ metrics, about }: AboutProps) {
  return (
    <section id="a-propos" className="px-5 sm:px-10 py-32 border-t border-line">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-12">
        <div className="lg:col-span-7 flex flex-col justify-between gap-16">
          <h2 className="text-[11vw] sm:text-[6vw] leading-[0.92] tracking-[-0.05em] font-medium">
            <SplitText text={about.title} by="word" />{" "}
            <span className="font-serif italic font-normal text-paper-dim">
              <SplitText text={about.titleAccent} by="word" delay={0.2} />
            </span>
          </h2>

          <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-8">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block text-5xl sm:text-6xl tracking-[-0.04em] font-medium">{m.value}</span>
                  <span className="mt-2 block font-mono text-xs text-moss/80">{m.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-12">
          <div className="space-y-6 text-lg text-paper-dim leading-relaxed">
            {about.paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="pt-6 border-t border-line">
            <p className="font-mono text-xs text-moss mb-4">Stack quotidienne</p>
            <ul className="flex flex-wrap gap-2">
              {about.stack.map((tech) => (
                <li key={tech} className="px-3 py-1.5 rounded-full border border-line text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
