import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings-service";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Clock, CheckCircle2, Phone, Calendar, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from "@/components/ui/icons";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

export const metadata: Metadata = {
  title: "Contact & Devis Gratuit — Gauthier Minor",
  description:
    "Discutons de votre projet de site internet ou d'application web. Devis gratuit et réponse garantie sous 24h ouvrées.",
};

interface ContactPageProps {
  searchParams: Promise<{
    service?: string;
    budget?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service, budget } = await searchParams;
  const settings = await getSiteSettings();
  const info = settings.contactInfo;

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Reassurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#555765] block font-semibold">
                {"// CONTACT & ESTIMATION"}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-tight">
                Discutons de votre projet en direct.
              </h1>
              <p className="text-base sm:text-lg text-[#555765] leading-relaxed font-normal">
                Partagez-moi vos objectifs, vos contraintes et vos délais. Je vous réponds sous 24 heures pour vous orienter vers la solution la plus adaptée.
              </p>
            </div>

            {/* Direct Coordinates Card */}
            <div className="rounded-2xl bg-white border border-[#e6e6df] p-6 space-y-5 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-[#555765]">
                <div className="w-9 h-9 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] text-[#555765] block uppercase font-mono">
                    Email direct
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`mailto:${info.email}`}
                      className="font-bold text-[#18191f] hover:text-emerald-700 hover:underline text-sm transition-colors"
                    >
                      {info.email}
                    </a>
                    <CopyEmailButton email={info.email} label="Copier" />
                  </div>
                </div>
              </div>

              {info.phone && (
                <div className="flex items-center gap-3 text-sm text-[#555765]">
                  <div className="w-9 h-9 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#555765] block uppercase font-mono">
                      Téléphone
                    </span>
                    <a
                      href={`tel:${info.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-[#18191f] hover:text-emerald-700 hover:underline text-sm transition-colors"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-[#555765]">
                <div className="w-9 h-9 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] text-[#555765] block uppercase font-mono">
                    Localisation
                  </span>
                  <span className="font-bold text-[#18191f] text-sm">
                    {info.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#555765]">
                <div className="w-9 h-9 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] text-[#555765] block uppercase font-mono">
                    Disponibilité {info.workingHours ? `• ${info.workingHours}` : ""}
                  </span>
                  <span className="font-semibold text-[#18191f] text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <span>{info.availabilityText}</span>
                  </span>
                </div>
              </div>

              {info.calcomUrl && (
                <div className="pt-3 border-t border-[#e6e6df]">
                  <a
                    href={info.calcomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#f4f4f0] hover:bg-[#eaeae2] border border-[#e6e6df] text-xs font-semibold text-[#18191f] transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Réserver un créneau d&apos;échange en direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#555765]" />
                  </a>
                </div>
              )}

              {/* Social Links Row */}
              <div className="pt-3 border-t border-[#e6e6df] flex items-center gap-2">
                <span className="text-xs text-[#555765] font-mono mr-1">Réseaux :</span>
                {info.linkedinUrl && (
                  <a
                    href={info.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {info.githubUrl && (
                  <a
                    href={info.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {info.instagramUrl && (
                  <a
                    href={info.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {info.twitterUrl && (
                  <a
                    href={info.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#f4f4f0] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
                    title="X (Twitter)"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Regional Coverage & Mobility Card */}
            <div className="rounded-2xl bg-white border border-[#e6e6df] p-5 sm:p-6 space-y-3 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{"// ANCRAGE LOCAL & DÉPLACEMENTS"}</span>
              </span>
              <p className="text-xs sm:text-sm text-[#555765] leading-relaxed">
                Basé à <strong className="text-[#18191f]">Enghien (7850, Hainaut)</strong>, je me déplace pour des réunions de cadrage et ateliers à <strong className="text-[#18191f]">Bruxelles, Mons, Ath, Tournai, Nivelles, Braine-le-Comte, Soignies, Tubize, Lille</strong> et collabore à distance avec des clients dans toute la Belgique et en Europe.
              </p>
            </div>

            {/* Commitments list */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                Mes engagements :
              </span>
              <ul className="space-y-2.5">
                {[
                  "Réponse garantie et détaillée sous 24h ouvrées",
                  "Devis gratuit, transparent et sans aucun engagement",
                  "Possibilité d'échange en visio ou rendez-vous physique",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm initialService={service} initialBudget={budget} />
          </div>
        </div>
      </div>
    </main>
  );
}
