import { ProjectItem } from "@/data/projects";

// Captures récentes des sites en ligne, rangées dans public/images/projects/<slug>.jpg
const LIVE_SHOTS = new Set([
  "solera-platform",
  "rent-a-book",
  "vb-enghien",
  "villa-dolce",
  "marionnettes-saintes-en-fete",
  "jac-26",
  "mgevents",
  "focale-28",
  "garage-bosmans",
  "fifty-one-enghien",
  "jlp-podologue",
]);

export function projectShot(project: ProjectItem): string {
  return LIVE_SHOTS.has(project.slug) ? `/images/projects/${project.slug}.jpg` : project.imageUrl;
}
