import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";

const SITEMAP = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Réalisations" },
  { href: "/questionnaire", label: "Questionnaire projet" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const settings = await getSiteSettings();
  const info = settings.contactInfo;
  const socials = [
    { href: info.linkedinUrl, label: "LinkedIn" },
    { href: info.githubUrl, label: "GitHub" },
    { href: info.instagramUrl, label: "Instagram" },
    { href: info.twitterUrl, label: "X / Twitter" },
  ].filter((s) => s.href);

  return (
    <footer className="relative bg-ink-2 text-paper overflow-hidden">
      <div className="px-5 sm:px-10 pt-20 pb-8 grid grid-cols-2 md:grid-cols-12 gap-10 text-sm">
        <div className="col-span-2 md:col-span-5 space-y-4">
          <p className="text-3xl sm:text-4xl leading-[1.05] tracking-[-0.03em] font-medium max-w-md">
            Du code solide, des interfaces soignées.
          </p>
          <a href={`mailto:${info.email}`} className="inline-block text-paper-dim hover:text-signal transition-colors underline underline-offset-4 decoration-line">
            {info.email}
          </a>
        </div>
        <div className="md:col-span-2 md:col-start-8 space-y-3">
          <p className="font-mono text-xs text-moss">Plan</p>
          {SITEMAP.map((l) => (
            <Link key={l.href} href={l.href} className="block hover:text-signal transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="md:col-span-2 space-y-3">
          <p className="font-mono text-xs text-moss">Réseaux</p>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block hover:text-signal transition-colors">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div aria-hidden className="px-3 pb-[5vw] select-none pointer-events-none">
        <p className="text-[24.5vw] leading-[0.78] font-semibold tracking-[-0.075em] whitespace-nowrap">
          gminor<span className="caret-blink text-signal">_</span>
        </p>
      </div>

      <div className="px-5 sm:px-10 py-6 flex flex-wrap justify-between gap-4 text-xs font-mono text-paper-mute border-t border-line">
        <span>© {new Date().getFullYear()} Gauthier Minor — {info.location}</span>
        <span>Next.js · TypeScript · hébergé sur Vercel</span>
      </div>
    </footer>
  );
}
