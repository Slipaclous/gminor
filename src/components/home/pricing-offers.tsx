"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function PricingOffers() {
  const packages = [
    {
      badge: "Formule Recommandée",
      title: "Site Vitrine & Professionnel",
      price: "1 500 €",
      period: "À partir de • Forfait clé en main",
      description:
        "Idéal pour artisans, cabinets libéraux, consultants et commerçants voulant asseoir leur crédibilité et attirer des demandes de devis qualifiées.",
      features: [
        "Design sur-mesure responsive (mobile, tablette, écran)",
        "Score Google 100/100 (< 0.4s de chargement)",
        "Référencement naturel local (SEO Google Maps)",
        "Formulaire de contact intelligent sécurisé",
        "Espace d'administration simple pour vos textes & photos",
        "Hébergement rapide & Nom de domaine configurés",
        "Formation & Support technique 30 jours inclus",
      ],
      ctaText: "Lancer mon site vitrine",
      popular: true,
    },
    {
      badge: "Vente en ligne",
      title: "Boutique E-Commerce Réactive",
      price: "3 200 €",
      period: "À partir de • Forfait clé en main",
      description:
        "Pour les commerçants et marques souhaitant vendre leurs produits 24h/24 avec un parcours d'achat ultra-fluide et sans friction d'abandon de panier.",
      features: [
        "Catalogue produits & gestion des variantes / stocks",
        "Paiement sécurisé par carte & Bancontact (Stripe)",
        "Calcul automatique des frais de port (Mondial Relay, Bpost...)",
        "Espace client, facturation PDF & suivi des commandes",
        "Optimisation de vitesse pour un panier validé en 3 clics",
        "Tableau de bord des ventes et export comptable",
        "Accompagnement & Garantie de démarrage",
      ],
      ctaText: "Créer ma boutique en ligne",
      popular: false,
    },
    {
      badge: "Processus & Métier",
      title: "Outil Web & Automatisation",
      price: "Sur devis",
      period: "À partir de 3 500 €",
      description:
        "Pour les entreprises ayant un besoin spécifique : tunnel d'inscription, espace adhérents, portail client, automatisation de devis ou de factures.",
      features: [
        "Analyse de vos processus métiers & cahier des charges",
        "Base de données relationnelle sécurisée et évolutive",
        "Espaces utilisateurs séparés avec rôles & permissions",
        "Génération automatique de PDF, signatures ou Webhooks",
        "Interconnexion avec vos outils existants (API, CRM)",
        "Code source propriétaire sans redevance d'éditeur",
        "Maintenance préventive & évolutions sur-mesure",
      ],
      ctaText: "Étudier mon projet métier",
      popular: false,
    },
  ];

  return (
    <section className="py-24 border-b border-[#e6e6df] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18191f] leading-tight">
            Des formules adaptées à votre étape de croissance.
          </h2>
          <p className="text-sm sm:text-base text-[#555765] leading-relaxed">
            Pas d&apos;abonnements trompeurs sur 48 mois. Un tarif forfaitaire clair, des livrables garantis et vous restez propriétaire de votre outil.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between space-y-8 transition-all duration-300 ${
                pkg.popular
                  ? "bg-[#18191f] text-white shadow-2xl scale-[1.02] border-2 border-[#18191f]"
                  : "bg-[#fafaf8] text-[#18191f] border border-[#e6e6df] shadow-card hover:shadow-lg"
              }`}
            >
              <div className="space-y-6">
                {/* Badge & Title */}
                <div className="space-y-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold ${
                      pkg.popular
                        ? "bg-emerald-400 text-black"
                        : "bg-white text-emerald-800 border border-[#e6e6df]"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <h3
                    className={`text-2xl font-bold tracking-tight ${
                      pkg.popular ? "text-white" : "text-[#18191f]"
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      pkg.popular ? "text-zinc-300" : "text-[#555765]"
                    }`}
                  >
                    {pkg.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-current/10 space-y-1">
                  <span
                    className={`text-xs font-mono block ${
                      pkg.popular ? "text-zinc-400" : "text-[#555765]"
                    }`}
                  >
                    {pkg.price === "Sur devis" ? "Sur cahier des charges" : "À partir de"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                      {pkg.price}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono block ${
                      pkg.popular ? "text-zinc-400" : "text-[#555765]"
                    }`}
                  >
                    {pkg.period}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-3 pt-2">
                  <span
                    className={`text-xs font-mono uppercase tracking-wider font-bold block ${
                      pkg.popular ? "text-zinc-300" : "text-[#18191f]"
                    }`}
                  >
                    Ce qui est compris :
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                          pkg.popular ? "text-zinc-200" : "text-[#555765]"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.popular ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-current/10">
                <Link
                  href={`/contact?service=${encodeURIComponent(pkg.title)}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                    pkg.popular
                      ? "bg-white hover:bg-zinc-100 text-[#18191f]"
                      : "bg-[#18191f] hover:bg-[#2d2e38] text-white"
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 ${
                      pkg.popular ? "text-[#18191f]" : "text-emerald-400"
                    }`}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom inquiry note */}
        <div className="text-center text-xs text-[#555765] font-mono">
          Besoin d&apos;un devis spécifique ou d&apos;un aménagement particulier ?{" "}
          <Link href="/contact" className="text-[#18191f] underline font-bold hover:text-emerald-700">
            Contactez-moi directement pour une réponse sous 24h.
          </Link>
        </div>

      </div>
    </section>
  );
}
