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
    <main className="flex-1 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Reassurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                // CONTACT &amp; ESTIMATION
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
                Discutons de votre projet en direct.
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                Partagez-moi vos objectifs, vos contraintes et vos délais. Je vous réponds sous 24 heures pour vous orienter vers la solution la plus adaptée.
              </p>
            </div>

            {/* Direct Coordinates Card */}
            <div className="rounded-2xl bg-[#0d0d10] border border-white/[0.08] p-6 space-y-5">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                    Email direct
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`mailto:${info.email}`}
                      className="font-bold text-white hover:text-emerald-400 hover:underline text-sm transition-colors"
                    >
                      {info.email}
                    </a>
                    <CopyEmailButton email={info.email} label="Copier" />
                  </div>
                </div>
              </div>

              {info.phone && (
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                      Téléphone
                    </span>
                    <a
                      href={`tel:${info.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-white hover:text-emerald-400 hover:underline text-sm transition-colors"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                    Localisation
                  </span>
                  <span className="font-bold text-white text-sm">
                    {info.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                    Disponibilité {info.workingHours ? `• ${info.workingHours}` : ""}
                  </span>
                  <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{info.availabilityText}</span>
                  </span>
                </div>
              </div>

              {info.calcomUrl && (
                <div className="pt-3 border-t border-white/[0.08]">
                  <a
                    href={info.calcomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Réserver un créneau d&apos;échange en direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              )}

              {/* Social Links Row */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono mr-1">Réseaux :</span>
                {info.linkedinUrl && (
                  <a
                    href={info.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] text-zinc-400 hover:text-white transition-colors"
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
                    className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] text-zinc-400 hover:text-white transition-colors"
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
                    className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] text-zinc-400 hover:text-white transition-colors"
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
                    className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] hover:border-white/[0.2] text-zinc-400 hover:text-white transition-colors"
                    title="X (Twitter)"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Commitments list */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                Mes engagements :
              </span>
              <ul className="space-y-2.5">
                {[
                  "Réponse garantie et détaillée sous 24h ouvrées",
                  "Devis gratuit et sans aucun engagement",
                  "Conseil bienveillant et transparent sur les choix techniques",
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
