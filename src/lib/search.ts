export interface SearchEntry {
  id: string;
  group: "Pages" | "Projets" | "FAQ" | "Actions";
  title: string;
  subtitle?: string;
  href: string;
  image?: string;
  body?: string;
  keywords?: string;
}

/** Lowercase, strip accents and collapse spaces so "réalisation" matches "realisation". */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every query word must appear; title matches rank first. */
export function searchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0) return entries.filter((e) => e.group !== "FAQ");

  return entries
    .map((entry) => {
      const title = normalize(entry.title);
      const haystack = normalize(`${entry.title} ${entry.subtitle ?? ""} ${entry.keywords ?? ""} ${entry.body ?? ""}`);
      if (!words.every((w) => haystack.includes(w))) return null;
      let score = 0;
      for (const w of words) {
        if (title.startsWith(w)) score += 3;
        else if (title.includes(w)) score += 2;
        else score += 1;
      }
      return { entry, score };
    })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry);
}
