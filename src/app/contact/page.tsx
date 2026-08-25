import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings-service";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

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
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                    Email direct
                  </span>
                  <a
                    href={`mailto:${info.email}`}
                    className="font-bold text-white hover:underline text-sm"
                  >
                    {info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4" />
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
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-mono">
                    Disponibilité
                  </span>
                  <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{info.availabilityText}</span>
                  </span>
                </div>
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
