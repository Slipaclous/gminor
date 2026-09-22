import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { Logo } from "./logo";
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from "../ui/icons";
import { CopyEmailButton } from "../ui/copy-email-button";

export async function Footer() {
  const settings = await getSiteSettings();
  const info = settings.contactInfo;

  return (
    <footer className="border-t border-[#e6e6df] bg-white text-[#555765] py-16 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-[#555765] text-xs sm:text-sm max-w-sm leading-relaxed">
              Création de sites internet sur-mesure ultra-rapides, boutiques e-commerce PrestaShop et outils métier pour indépendants et PME. Basé à Enghien et actif partout en Belgique.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {info.githubUrl && (
                <a
                  href={info.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#fafaf8] border border-[#e6e6df] hover:border-[#d5d5cc] flex items-center justify-center text-[#555765] hover:text-[#18191f] transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-[#fafaf8] border border-[#e6e6df] hover:border-[#d5d5cc] flex items-center justify-center text-[#555765] hover:text-[#18191f] transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-[#fafaf8] border border-[#e6e6df] hover:border-[#d5d5cc] flex items-center justify-center text-[#555765] hover:text-[#18191f] transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-[#fafaf8] border border-[#e6e6df] hover:border-[#d5d5cc] flex items-center justify-center text-[#555765] hover:text-[#18191f] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#18191f] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projets" className="hover:text-[#18191f] transition-colors">
                  Réalisations &amp; Études de cas
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#18191f] transition-colors">
                  Services &amp; Tarifs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#18191f] transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#18191f] transition-colors">
                  Demande de devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Direct Coordinates */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold block">
              Contact Direct
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#7c7e8c]">Localisation :</span>{" "}
                <span className="text-[#18191f] font-medium">{info.location}</span>
              </li>
              <li className="flex items-center gap-2 flex-wrap">
                <span className="text-[#7c7e8c]">Contact :</span>{" "}
                <a
                  href={`mailto:${info.email}`}
                  className="text-[#18191f] font-medium hover:underline"
                >
                  {info.email}
                </a>
                <CopyEmailButton email={info.email} label="Copier" />
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fafaf8] border border-[#e6e6df] text-[11px] font-mono text-[#555765] hover:text-[#18191f] hover:border-[#d5d5cc] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Accès Back-Office Admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#e6e6df] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7c7e8c] font-mono">
          <div>
            © {new Date().getFullYear()} Gauthier Minor. Tous droits réservés.
          </div>
          <div>
            Hébergé en Europe &bull; 100% sans tracking intrusif.
          </div>
        </div>
      </div>
    </footer>
  );
}
