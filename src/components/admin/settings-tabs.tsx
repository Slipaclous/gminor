"use client";

import React, { useState, useActionState } from "react";
import {
  saveHeroSettingsAction,
  saveExpertiseSettingsAction,
  saveAboutSettingsAction,
  saveFaqSettingsAction,
  saveContactInfoSettingsAction,
  SettingsFormState,
} from "@/app/actions/settings";
import { SiteSettings, FaqItem, ExpertiseItem, HeroMetric } from "@/lib/settings-service";
import {
  Save,
  Loader2,
  Sparkles,
  Layers,
  User,
  HelpCircle,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface SettingsTabsProps {
  initialSettings: SiteSettings;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white";
const labelClass = "block text-xs font-mono uppercase tracking-wider text-zinc-300";

function Panel({
  title,
  description,
  state,
  children,
}: {
  title: string;
  description: string;
  state: SettingsFormState | null;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>
        {state?.success && (
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Enregistré</span>
          </span>
        )}
      </div>
      {state?.error && (
        <p className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">{state.error}</p>
      )}
      {children}
    </div>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <div className="pt-4 flex justify-end">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        <span>Enregistrer les modifications</span>
      </button>
    </div>
  );
}

export function SettingsTabs({ initialSettings }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "expertise" | "about" | "faq" | "contact">("hero");

  const [heroState, heroFormAction, isHeroPending] = useActionState<SettingsFormState | null, FormData>(
    saveHeroSettingsAction,
    null
  );
  const [expertiseState, expertiseFormAction, isExpertisePending] = useActionState<SettingsFormState | null, FormData>(
    saveExpertiseSettingsAction,
    null
  );
  const [aboutState, aboutFormAction, isAboutPending] = useActionState<SettingsFormState | null, FormData>(
    saveAboutSettingsAction,
    null
  );

  // FAQ form state
  const [faqState, faqFormAction, isFaqPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(saveFaqSettingsAction, null);

  // Contact info form state
  const [contactState, contactFormAction, isContactPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(saveContactInfoSettingsAction, null);

  // Hero metrics (up to 4, shown in the "À propos" section)
  const [metrics, setMetrics] = useState<HeroMetric[]>(initialSettings.hero.metrics);
  const updateMetric = (index: number, field: keyof HeroMetric, value: string) =>
    setMetrics((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));

  // Expertise list
  const [expertise, setExpertise] = useState<ExpertiseItem[]>(initialSettings.expertise);
  const updateExpertise = (index: number, patch: Partial<ExpertiseItem>) =>
    setExpertise((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const moveExpertise = (index: number, delta: number) =>
    setExpertise((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  // Dynamic FAQ list state
  const [faqsList, setFaqsList] = useState<FaqItem[]>(initialSettings.faqs);

  const addFaqItem = () => {
    setFaqsList((prev) => [
      ...prev,
      {
        question: "Nouvelle question fréquente",
        answer: "Réponse détaillée...",
      },
    ]);
  };

  const removeFaqItem = (index: number) => {
    setFaqsList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFaqItem = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqsList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const TABS = [
    { id: "hero", label: "Accueil & Hero", icon: Sparkles },
    { id: "expertise", label: "Savoir-faire", icon: Layers },
    { id: "about", label: "À propos", icon: User },
    { id: "faq", label: "FAQ & Questions", icon: HelpCircle },
    { id: "contact", label: "Coordonnées & Réseaux", icon: Mail },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Top Tab Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0d0d10] border border-white/[0.08] w-fit shadow-md">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Hero */}
      {activeTab === "hero" && (
        <form action={heroFormAction} className="space-y-8 max-w-4xl">
          <input type="hidden" name="metricsJson" value={JSON.stringify(metrics)} />
          <Panel title="Accueil & Hero" description="Disponibilité, texte d'introduction, terminal animé et chiffres clés" state={heroState}>
            <label className="flex items-center gap-3 text-sm text-white cursor-pointer">
              <input type="checkbox" name="available" defaultChecked={initialSettings.hero.available} className="w-4 h-4 accent-white" />
              Afficher « Disponible pour nouveaux projets »
            </label>

            <div className="space-y-2">
              <label htmlFor="intro" className={labelClass}>Texte d&apos;introduction *</label>
              <textarea id="intro" name="intro" rows={3} required defaultValue={initialSettings.hero.intro} className={inputClass} />
              <p className="text-[11px] text-zinc-500">« Gauthier Minor » est automatiquement mis en évidence.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="terminal" className={labelClass}>Script du terminal *</label>
              <textarea
                id="terminal"
                name="terminal"
                rows={11}
                required
                defaultValue={initialSettings.hero.terminal.join("\n")}
                className={`${inputClass} font-mono text-xs leading-relaxed`}
              />
              <p className="text-[11px] text-zinc-500 font-mono">
                Une ligne par entrée · « $ » commande tapée · « ✓ » succès · « ★ » résultat mis en avant · sinon sortie simple
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className={labelClass}>Chiffres clés (section À propos, 4 max)</span>
                {metrics.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setMetrics((prev) => [...prev, { value: "", label: "" }])}
                    className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ajouter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                    <div className="flex gap-2">
                      <input
                        value={m.value}
                        onChange={(e) => updateMetric(i, "value", e.target.value)}
                        placeholder="< 0.4s"
                        aria-label={`Valeur ${i + 1}`}
                        className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setMetrics((prev) => prev.filter((_, j) => j !== i))}
                        className="p-2 text-zinc-500 hover:text-red-400"
                        aria-label="Supprimer ce chiffre"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      value={m.label}
                      onChange={(e) => updateMetric(i, "label", e.target.value)}
                      placeholder="Temps de chargement moyen"
                      aria-label={`Libellé ${i + 1}`}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <SubmitButton pending={isHeroPending} />
          </Panel>
        </form>
      )}

      {/* Tab: Expertise */}
      {activeTab === "expertise" && (
        <form action={expertiseFormAction} className="space-y-8 max-w-4xl">
          <input type="hidden" name="expertiseJson" value={JSON.stringify(expertise)} />
          <Panel title="Savoir-faire" description="Les lignes de la section savoir-faire de l'accueil, dans l'ordre d'affichage" state={expertiseState}>
            <div className="space-y-4">
              {expertise.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-black border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500 w-6">0{i + 1}</span>
                    <input
                      value={item.title}
                      onChange={(e) => updateExpertise(i, { title: e.target.value })}
                      placeholder="Titre"
                      aria-label={`Titre ${i + 1}`}
                      className={`${inputClass} font-semibold`}
                    />
                    <button type="button" onClick={() => moveExpertise(i, -1)} disabled={i === 0} className="p-2 text-zinc-400 hover:text-white disabled:opacity-20" aria-label="Monter">↑</button>
                    <button type="button" onClick={() => moveExpertise(i, 1)} disabled={i === expertise.length - 1} className="p-2 text-zinc-400 hover:text-white disabled:opacity-20" aria-label="Descendre">↓</button>
                    <button
                      type="button"
                      onClick={() => setExpertise((prev) => prev.filter((_, j) => j !== i))}
                      className="p-2 text-zinc-500 hover:text-red-400"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={item.text}
                    onChange={(e) => updateExpertise(i, { text: e.target.value })}
                    rows={2}
                    placeholder="Description"
                    aria-label={`Description ${i + 1}`}
                    className={inputClass}
                  />
                  <input
                    value={item.tags.join(", ")}
                    onChange={(e) => updateExpertise(i, { tags: e.target.value.split(",") })}
                    placeholder="Tags séparés par des virgules"
                    aria-label={`Tags ${i + 1}`}
                    className={`${inputClass} font-mono text-xs`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setExpertise((prev) => [...prev, { title: "", text: "", tags: [] }])}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-white/20 text-sm text-zinc-300 hover:text-white hover:border-white/40"
              >
                <Plus className="w-4 h-4" /> Ajouter un savoir-faire
              </button>
            </div>
            <SubmitButton pending={isExpertisePending} />
          </Panel>
        </form>
      )}

      {/* Tab: About */}
      {activeTab === "about" && (
        <form action={aboutFormAction} className="space-y-8 max-w-4xl">
          <Panel title="À propos" description="Titre, présentation et stack affichés sur l'accueil" state={aboutState}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="about-title" className={labelClass}>Titre *</label>
                <input id="about-title" name="title" required defaultValue={initialSettings.about.title} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="about-accent" className={labelClass}>Suite du titre (italique)</label>
                <input id="about-accent" name="titleAccent" defaultValue={initialSettings.about.titleAccent} className={inputClass} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="about-paragraphs" className={labelClass}>Présentation</label>
              <textarea
                id="about-paragraphs"
                name="paragraphs"
                rows={8}
                defaultValue={initialSettings.about.paragraphs.join("\n\n")}
                className={inputClass}
              />
              <p className="text-[11px] text-zinc-500">Séparez les paragraphes par une ligne vide.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="about-stack" className={labelClass}>Stack quotidienne</label>
              <input id="about-stack" name="stack" defaultValue={initialSettings.about.stack.join(", ")} className={`${inputClass} font-mono text-xs`} />
              <p className="text-[11px] text-zinc-500">Technologies séparées par des virgules.</p>
            </div>
            <SubmitButton pending={isAboutPending} />
          </Panel>
        </form>
      )}

      {/* Tab 5: FAQ Settings */}
      {activeTab === "faq" && (
        <form action={faqFormAction} className="space-y-8 max-w-4xl">
          <input
            type="hidden"
            name="faqsJson"
            value={JSON.stringify(faqsList)}
          />

          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Questions Fréquentes (FAQ)</h2>
                <p className="text-xs text-zinc-400">
                  Ajoutez, réorganisez ou supprimez vos questions et réponses
                </p>
              </div>
              <div className="flex items-center gap-3">
                {faqState?.success && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enregistré</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={addFaqItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une question</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {faqsList.map((faq: FaqItem, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-black border border-white/[0.08] space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                      Question #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaqItem(idx)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 rounded-md transition-colors cursor-pointer"
                      title="Supprimer cette question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                    placeholder="La question..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white font-semibold"
                  />

                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                    placeholder="La réponse détaillée..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300 leading-relaxed"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isFaqPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isFaqPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer la FAQ</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 6: Contact Info Settings */}
      {activeTab === "contact" && (
        <form action={contactFormAction} className="space-y-8 max-w-4xl">
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Coordonnées &amp; Réseaux Sociaux</h2>
                <p className="text-xs text-zinc-400">
                  Personnalisez vos moyens de contact directs, vos profils de réseaux sociaux et vos statuts de disponibilité affichés sur tout le site.
                </p>
              </div>
              {contactState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            {/* Section 1: Coordonnées Directes */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                01. Coordonnées directes
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Email de contact public *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={initialSettings.contactInfo.email}
                    placeholder="contact@gauthierminor.com"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Téléphone direct (facultatif)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={initialSettings.contactInfo.phone || ""}
                    placeholder="+32 470 00 00 00"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Localisation / Zone d&apos;intervention
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={initialSettings.contactInfo.location}
                    placeholder="Belgique (Bruxelles / Enghien / Wallonie) • Remote"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Horaires de contact / Disponibilité
                  </label>
                  <input
                    name="workingHours"
                    type="text"
                    defaultValue={initialSettings.contactInfo.workingHours || ""}
                    placeholder="Du lundi au vendredi • 9h00 - 18h30"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Réseaux Sociaux & Liens */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                02. Réseaux Sociaux &amp; Liens Externes
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Lien LinkedIn
                  </label>
                  <input
                    name="linkedinUrl"
                    type="url"
                    defaultValue={initialSettings.contactInfo.linkedinUrl}
                    placeholder="https://linkedin.com/in/gauthier-minor"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Lien GitHub
                  </label>
                  <input
                    name="githubUrl"
                    type="url"
                    defaultValue={initialSettings.contactInfo.githubUrl}
                    placeholder="https://github.com/Slipaclous"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Lien X (Twitter)
                  </label>
                  <input
                    name="twitterUrl"
                    type="url"
                    defaultValue={initialSettings.contactInfo.twitterUrl || ""}
                    placeholder="https://x.com/votre_pseudo"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Lien Instagram
                  </label>
                  <input
                    name="instagramUrl"
                    type="url"
                    defaultValue={initialSettings.contactInfo.instagramUrl || ""}
                    placeholder="https://instagram.com/votre_profil"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Lien de prise de RDV (Cal.com recommandé : intégré au site sur /rendez-vous)
                </label>
                <input
                  name="calcomUrl"
                  type="url"
                  defaultValue={initialSettings.contactInfo.calcomUrl || ""}
                  placeholder="https://cal.com/votre-nom/30min"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Section 3: Statut de Disponibilité */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                03. Statut &amp; Disponibilité
              </span>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Badge de statut public (affiché dans le header &amp; page contact)
                </label>
                <input
                  name="availabilityText"
                  type="text"
                  defaultValue={initialSettings.contactInfo.availabilityText}
                  placeholder="Disponible immédiatement pour nouveaux projets"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isContactPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-400 hover:bg-emerald-300 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isContactPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer les coordonnées</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
