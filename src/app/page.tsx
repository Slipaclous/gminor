import React from "react";
import { getSiteSettings } from "@/lib/settings-service";
import { getDbProjects } from "@/lib/projects-service";
import { Hero } from "@/components/home/hero";
import { ComparisonSection } from "@/components/home/comparison-section";
import { MagazineShowcase } from "@/components/home/magazine-showcase";
import { PricingOffers } from "@/components/home/pricing-offers";
import { CollaborationJourney } from "@/components/home/collaboration-journey";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const allProjects = await getDbProjects();
  
  // Keep the exact user-demanded featured projects and ordering
  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 4);

  return (
    <main className="flex flex-col flex-1">
      {/* 1. Hero Éditorial Asymétrique & Incarnation Personnelle */}
      <Hero settings={settings.hero} />

      {/* 2. Le comparatif sans filtre "Agences traditionnelles vs Avec Gauthier" */}
      <ComparisonSection />

      {/* 3. Vitrine Réalisations Format Magazine (Solera, Rent a Book, VB Enghien, Villa Dolce) */}
      <MagazineShowcase
        projects={displayProjects}
        totalProjectsCount={allProjects.length}
      />

      {/* 4. Les 3 Formules Clés en Main PME avec Tarifs Forfaitaires Nets */}
      <PricingOffers />

      {/* 5. Le Déroulement du Projet en 4 Étapes Simples */}
      <CollaborationJourney />

      {/* 6. Bannière d'Action Finale avec Téléphone & Devis Gratuit 24h */}
      <CtaBanner />
    </main>
  );
}
