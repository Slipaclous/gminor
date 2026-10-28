import { getDbProjects } from "@/lib/projects-service";
import { getSiteSettings } from "@/lib/settings-service";
import { projectShot } from "@/lib/project-shots";
import type { SearchEntry } from "@/lib/search";
import { Spotlight } from "./spotlight";

const PAGES: SearchEntry[] = [
  { id: "p-home", group: "Pages", title: "Accueil", href: "/", body: "Développeur web full-stack : sites, e-commerce et applications sur mesure." },
  { id: "p-projets", group: "Pages", title: "Réalisations", href: "/projets", keywords: "portfolio projets travaux études de cas" },
  { id: "p-services", group: "Pages", title: "Savoir-faire", href: "/#services", keywords: "services développement design e-commerce saas" },
  { id: "p-about", group: "Pages", title: "À propos", href: "/#a-propos", keywords: "gauthier minor qui stack" },
  { id: "p-faq", group: "Pages", title: "FAQ", href: "/faq", keywords: "questions réponses" },
  { id: "p-contact", group: "Pages", title: "Contact", href: "/contact", keywords: "email téléphone devis" },
];

/** Server side: builds the search index, then hands it to the client palette. */
export async function GlobalSearch() {
  const [projects, settings] = await Promise.all([getDbProjects(), getSiteSettings()]);
  const info = settings.contactInfo;

  const entries: SearchEntry[] = [
    ...PAGES,
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      group: "Projets" as const,
      title: p.title,
      subtitle: `${p.categoryLabel} — ${p.year}`,
      href: `/projets/${p.slug}`,
      image: projectShot(p),
      body: p.tagline,
      keywords: `${p.techStack.join(" ")} ${p.client ?? ""} ${p.description}`,
    })),
    ...settings.faqs.map((f, i) => ({
      id: `faq-${i}`,
      group: "FAQ" as const,
      title: f.question,
      href: `/faq#q-${i}`,
      body: f.answer,
    })),
    { id: "a-quest", group: "Actions", title: "Démarrer un projet", subtitle: "Questionnaire en 5 étapes", href: "/questionnaire", keywords: "devis questionnaire projet" },
    { id: "a-mail", group: "Actions", title: "Envoyer un email", subtitle: info.email, href: `mailto:${info.email}`, keywords: "mail contact" },
  ];

  return <Spotlight entries={entries} />;
}
