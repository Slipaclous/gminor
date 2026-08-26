import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { Logo } from "./logo";
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from "../ui/icons";

export async function Footer() {
  const settings = await getSiteSettings();
  const info = settings.contactInfo;

  return (
    <footer className="border-t border-white/[0.08] bg-black text-zinc-400 py-16 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Ingénieur Full-Stack &amp; UI Architect. Création de sites internet d&apos;exception et d&apos;applications SaaS scalables (Next.js, Prisma, PostgreSQL).
            </p>
            <div className="flex items-center gap-3 pt-2">
              {info.githubUrl && (
                <a
                  href={info.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {info.linkedinUrl && (
                <a
                  href={info.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {info.instagramUrl && (
                <a
                  href={info.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {info.twitterUrl && (
                <a
                  href={info.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projets" className="hover:text-white transition-colors">
                  Réalisations &amp; Études de cas
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services &amp; Tarifs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Demande de devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Direct Coordinates */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Espace Professionnel
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-zinc-400">Localisation :</span>{" "}
                <span className="text-zinc-200">{info.location}</span>
              </li>
              <li>
                <span className="text-zinc-400">Contact :</span>{" "}
                <a
                  href={`mailto:${info.email}`}
                  className="text-zinc-200 hover:text-white underline"
                >
                  {info.email}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.08] text-[11px] font-mono text-zinc-300 hover:text-white hover:border-white/[0.2] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Accès Back-Office Admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div>
            © {new Date().getFullYear()} Gauthier Minor. Tous droits réservés.
          </div>
          <div>
            Construit avec Next.js 16, Prisma 7 &amp; PostgreSQL.
          </div>
        </div>
      </div>
    </footer>
  );
}
