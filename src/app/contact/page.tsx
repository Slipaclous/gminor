import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings-service";
import { ContactForm } from "@/components/contact/contact-form";
import { SplitText } from "@/components/motion/split-text";
import { PageHeader } from "@/components/layout/page-header";

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

  const details = [
    { label: "Email", value: info.email, href: `mailto:${info.email}` },
    info.phone && { label: "Téléphone", value: info.phone, href: `tel:${info.phone.replace(/\s/g, "")}` },
    { label: "Basé à", value: info.location },
    info.workingHours && { label: "Horaires", value: info.workingHours },
    info.calcomUrl && { label: "Visio", value: "Réserver un créneau ↗", href: info.calcomUrl },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <main className="flex-1 px-5 sm:px-10 pt-40 pb-32">
      <PageHeader
        title={
          <>
            <SplitText text="Bonjour" immediate />
            <span className="font-serif italic font-normal text-signal">
              <SplitText text="." immediate delay={0.3} />
            </span>
          </>
        }
        aside={<p>Une idée, une question, un projet à cadrer ? Je réponds personnellement sous 24h.</p>}
      />

      <div className="mt-20 grid lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-4 space-y-8">
          <dl className="space-y-5">
            {details.map((d) => (
              <div key={d.label} className="border-t border-line pt-3">
                <dt className="font-mono text-xs text-moss/80">{d.label}</dt>
                <dd className="mt-1 text-lg">
                  {d.href ? (
                    <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-signal transition-colors">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <Link href="/questionnaire" className="block border border-line p-6 hover:border-signal transition-colors group">
            <p className="font-mono text-xs text-paper-mute">Projet complet ?</p>
            <p className="mt-2 text-2xl font-serif italic group-hover:text-signal transition-colors">Le questionnaire en 5 étapes →</p>
          </Link>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm initialService={service} initialBudget={budget} />
        </div>
      </div>
    </main>
  );
}
