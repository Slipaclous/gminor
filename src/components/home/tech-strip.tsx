import React from "react";
import {
  Code2,
  Server,
  ShoppingBag,
  Database,
  Layers,
  Cpu,
  Workflow,
  ShieldCheck,
} from "lucide-react";

const SKILL_DOMAINS = [
  {
    title: "Frontend & UI Moderne",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Twig / HTML5"],
    icon: Layers,
    description: "Interfaces réactives, vitesse d'affichage & ergonomie mobile-first",
  },
  {
    title: "Backend & Frameworks",
    skills: ["PHP 8", "Symfony", "Node.js", "APIs REST", "Architecture MVC"],
    icon: Server,
    description: "Logique serveur robuste, gestion des flux et automatisation",
  },
  {
    title: "E-Commerce & CMS",
    skills: ["PrestaShop (v1.6 ➔ v9)", "Drupal", "WordPress", "Headless"],
    icon: ShoppingBag,
    description: "Boutiques en ligne à fort trafic, refontes & migrations critiques",
  },
  {
    title: "Bases de Données & Infra",
    skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Docker", "Git / cPanel"],
    icon: Database,
    description: "Modélisation relationnelle, requêtes optimisées & déploiement",
  },
];

export function TechStrip() {
  return (
    <section className="border-b border-white/[0.08] bg-[#070709] py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
              // MAÎTRISE TECHNIQUE MULTI-STACK
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Une expertise polyvalente adaptée à votre environnement technique
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-white/[0.08] px-3 py-1.5 rounded-lg w-fit">
            Du sur-mesure moderne aux architectures d&apos;entreprise
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className="rounded-2xl bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.22] p-5 space-y-4 transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {domain.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-black border border-white/[0.08]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
