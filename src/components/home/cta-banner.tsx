import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { SplitText } from "../motion/split-text";
import { CopyEmailRow, CtaRowInner } from "./copy-email-row";

export async function CtaBanner() {
  const settings = await getSiteSettings();
  const { email } = settings.contactInfo;
  const available = settings.hero.available;

  return (
    <section className="px-5 sm:px-10 py-28 sm:py-36 border-t border-line">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-end">
        <div className="lg:col-span-7">
          <h2 className="text-[16vw] sm:text-[12vw] lg:text-[8.5vw] leading-[0.86] tracking-[-0.06em] font-medium">
            <SplitText text="Parlons" />
            <br />
            <span className="font-serif italic font-normal">
              <SplitText text="de vous." delay={0.15} />
            </span>
          </h2>
          <p className="mt-10 flex items-center gap-2 text-paper-dim">
            <span className={`w-2 h-2 rounded-full ${available ? "bg-moss animate-pulse" : "bg-paper-mute"}`} />
            {available ? "Disponible pour de nouveaux projets — réponse sous 24h" : "Agenda complet — réponse sous 24h"}
          </p>
        </div>

        <div className="lg:col-span-5">
          <Link href="/questionnaire" className="group block">
            <CtaRowInner index="01" title="Démarrer un projet" note="2 min" />
          </Link>
          <Link href="/contact" className="group block">
            <CtaRowInner index="02" title="Poser une question" note="Contact" />
          </Link>
          <CopyEmailRow email={email} index="03" />
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
