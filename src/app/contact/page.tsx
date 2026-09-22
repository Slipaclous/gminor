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
    <main className="flex-1 py-14 sm:py-20 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18191f] font-sans leading-[1.12]">
            Parlons de votre projet.
          </h1>
          <p className="text-base sm:text-lg text-[#555765] leading-relaxed font-normal">
            Partagez vos ambitions, vos contraintes ou vos questions. Je vous réponds personnellement sous 24h avec des pistes concrètes et transparentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Coordinates & Studio Craft Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="rounded-3xl bg-white border border-[#e6e6df] p-6 sm:p-8 space-y-6 shadow-sm">
              
              <div className="flex items-center justify-between pb-5 border-b border-[#e6e6df]">
                <div>
                  <h2 className="text-lg font-bold text-[#18191f]">
                    Contact direct
                  </h2>
                  <p className="text-xs text-[#555765]">
                    Disponible pour échanger de vive voix ou par écrit
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{info.availabilityText || "Disponible"}</span>
                </span>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#555765] block font-mono">
                      Email
                    </span>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <a
                        href={`mailto:${info.email}`}
                        className="font-semibold text-sm text-[#18191f] hover:text-emerald-700 transition-colors truncate"
                      >
                        {info.email}
                      </a>
                      <CopyEmailButton email={info.email} label="Copier" />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                {info.phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-[#555765] block font-mono">
                        Téléphone direct
                      </span>
                      <a
                        href={`tel:${info.phone.replace(/\s+/g, "")}`}
                        className="font-semibold text-sm text-[#18191f] hover:text-emerald-700 transition-colors mt-0.5 inline-block"
                      >
                        {info.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#555765] block font-mono">
                      Localisation &amp; Déplacements
                    </span>
                    <span className="font-semibold text-sm text-[#18191f] block mt-0.5">
                      {info.location}
                    </span>
                    <span className="text-xs text-[#555765] block mt-0.5 leading-relaxed">
                      Bruxelles, Wallonie &amp; Nord de la France (déplacements sur site ou visioconférence).
                    </span>
                  </div>
                </div>

                {/* Clock / Working hours */}
                {info.workingHours && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#fafaf8] border border-[#e6e6df] flex items-center justify-center text-[#18191f] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-[#555765] block font-mono">
                        Horaires d&apos;ouverture
                      </span>
                      <span className="text-xs font-semibold text-[#18191f] block mt-0.5">
                        {info.workingHours}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cal.com Direct Appointment */}
              {info.calcomUrl && (
                <div className="pt-2">
                  <a
                    href={info.calcomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#fafaf8] hover:bg-[#f2f2eb] border border-[#e6e6df] hover:border-[#18191f]/30 text-xs font-semibold text-[#18191f] transition-all cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Réserver 20 min d&apos;échange en visio</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#555765]" />
                  </a>
                </div>
              )}

              {/* Social links */}
              <div className="pt-4 border-t border-[#e6e6df] flex items-center justify-between">
                <span className="text-xs text-[#555765] font-mono">Profils &amp; Réseaux :</span>
                <div className="flex items-center gap-2">
                  {info.linkedinUrl && (
                    <a
                      href={info.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#fafaf8] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
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
                      className="p-2 rounded-xl bg-[#fafaf8] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
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
                      className="p-2 rounded-xl bg-[#fafaf8] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
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
                      className="p-2 rounded-xl bg-[#fafaf8] border border-[#e6e6df] hover:border-[#18191f]/30 text-[#555765] hover:text-[#18191f] transition-colors"
                      title="X (Twitter)"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Commitments Card */}
            <div className="rounded-3xl bg-[#f4f4f0]/70 border border-[#e6e6df] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold">
                Ce à quoi vous pouvez vous attendre
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    title: "Réponse garantie sous 24h ouvrées",
                    desc: "Analyse préliminaire de votre demande sans relance inutile.",
                  },
                  {
                    title: "Devis clair, détaillé et sans engagement",
                    desc: "Tarifs fermes et phasage transparent dès le départ.",
                  },
                  {
                    title: "Un interlocuteur unique dédié",
                    desc: "De la conception au déploiement, nous échangeons en direct.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-[#18191f] block font-semibold">{item.title}</strong>
                      <span className="text-[#555765] leading-relaxed">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Quote & Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm initialService={service} initialBudget={budget} />
          </div>
        </div>
      </div>
    </main>
  );
}
