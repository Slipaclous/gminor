"use client";

import React, { useState, useActionState } from "react";
import {
  saveHeroSettingsAction,
  savePillarsSettingsAction,
  saveServicesSettingsAction,
  saveEstimatorSettingsAction,
  saveFaqSettingsAction,
  saveContactInfoSettingsAction,
  SettingsFormState,
} from "@/app/actions/settings";
import {
  SiteSettings,
  FaqItem,
  PillarItem,
  ServiceItem,
  EstimatorOption,
} from "@/lib/settings-service";
import {
  Save,
  Loader2,
  Sparkles,
  Layers,
  Globe,
  Calculator,
  HelpCircle,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface SettingsTabsProps {
  initialSettings: SiteSettings;
}

export function SettingsTabs({ initialSettings }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "hero" | "pillars" | "services" | "estimator" | "faq" | "contact"
  >("hero");

  // Hero form state
  const [heroState, heroFormAction, isHeroPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(saveHeroSettingsAction, null);

  // Pillars form state
  const [pillarsState, pillarsFormAction, isPillarsPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(savePillarsSettingsAction, null);

  // Services form state
  const [servicesState, servicesFormAction, isServicesPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(saveServicesSettingsAction, null);

  // Estimator form state
  const [estimatorState, estimatorFormAction, isEstimatorPending] = useActionState<
    SettingsFormState | null,
    FormData
  >(saveEstimatorSettingsAction, null);

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

  // Dynamic Estimator state
  const [projectTypesList, setProjectTypesList] = useState<EstimatorOption[]>(
    initialSettings.estimator?.projectTypes || []
  );
  const [addonsList, setAddonsList] = useState<EstimatorOption[]>(
    initialSettings.estimator?.addons || []
  );

  const addProjectTypeItem = () => {
    setProjectTypesList((prev) => [
      ...prev,
      {
        id: `type_${Date.now()}`,
        name: "Nouveau type de projet",
        price: 3000,
        days: 14,
      },
    ]);
  };

  const removeProjectTypeItem = (index: number) => {
    if (projectTypesList.length <= 1) {
      alert("Vous devez conserver au moins un type de projet.");
      return;
    }
    setProjectTypesList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProjectTypeItem = (
    index: number,
    field: "name" | "price" | "days",
    value: string | number
  ) => {
    setProjectTypesList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addAddonItem = () => {
    setAddonsList((prev) => [
      ...prev,
      {
        id: `addon_${Date.now()}`,
        name: "Nouvelle option / fonctionnalité",
        price: 500,
        days: 3,
      },
    ]);
  };

  const removeAddonItem = (index: number) => {
    setAddonsList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAddonItem = (
    index: number,
    field: "name" | "price" | "days",
    value: string | number
  ) => {
    setAddonsList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const TABS = [
    { id: "hero", label: "Hero & Accueil", icon: Sparkles },
    { id: "pillars", label: "Piliers d'Ingénierie", icon: Layers },
    { id: "services", label: "Services & Livrables", icon: Globe },
    { id: "estimator", label: "Simulateur de Devis", icon: Calculator },
    { id: "faq", label: "FAQ & Questions", icon: HelpCircle },
    { id: "contact", label: "Coordonnées & Réseaux", icon: Mail },
  ];

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
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* Tab 1: Hero Settings */}
      {activeTab === "hero" && (
        <form action={heroFormAction} className="space-y-8 max-w-4xl">
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Hero &amp; En-tête</h2>
                <p className="text-xs text-zinc-400">
                  Personnalisez le titre principal, l&apos;accroche et vos métriques de confiance
                </p>
              </div>
              {heroState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Badge du haut de page
              </label>
              <input
                name="badge"
                type="text"
                defaultValue={initialSettings.hero.badge}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Titre principal (H1) *
              </label>
              <input
                name="title"
                type="text"
                required
                defaultValue={initialSettings.hero.title}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Sous-titre / Description d&apos;impact *
              </label>
              <textarea
                name="subtitle"
                rows={3}
                required
                defaultValue={initialSettings.hero.subtitle}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white font-sans"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                3 Métriques Chiffrées du Hero
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    Métrique 1 (Vitesse)
                  </label>
                  <input
                    name="metric1Val"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[0]?.value || "< 0.4s"}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
                  />
                  <input
                    name="metric1Label"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[0]?.label || "Temps de chargement moyen"}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    Métrique 2 (Score Google)
                  </label>
                  <input
                    name="metric2Val"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[1]?.value || "100%"}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
                  />
                  <input
                    name="metric2Label"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[1]?.label || "Score de performance Google"}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    Métrique 3 (Expérience)
                  </label>
                  <input
                    name="metric3Val"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[2]?.value || "5+ ans"}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
                  />
                  <input
                    name="metric3Label"
                    type="text"
                    defaultValue={initialSettings.hero.metrics[2]?.label || "Expérience Full-Stack"}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-zinc-300"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isHeroPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isHeroPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Pillars Settings */}
      {activeTab === "pillars" && (
        <form action={pillarsFormAction} className="space-y-8 max-w-4xl">
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">4 Piliers d&apos;Ingénierie</h2>
                <p className="text-xs text-zinc-400">
                  Modifiez les 4 blocs de méthode et de valeur affichés sur la page d&apos;accueil
                </p>
              </div>
              {pillarsState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            <div className="space-y-8">
              {initialSettings.pillars.map((pillar: PillarItem) => (
                <div
                  key={pillar.id}
                  className="p-6 rounded-2xl bg-black border border-white/[0.08] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Pilier 0{pillar.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 block">
                        Titre du pilier
                      </label>
                      <input
                        name={`pillar_${pillar.id}_title`}
                        type="text"
                        defaultValue={pillar.title}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 block">
                        Sous-titre / Accroche
                      </label>
                      <input
                        name={`pillar_${pillar.id}_tagline`}
                        type="text"
                        defaultValue={pillar.tagline}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      Description détaillée
                    </label>
                    <textarea
                      name={`pillar_${pillar.id}_description`}
                      rows={2}
                      defaultValue={pillar.description}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      Points de contrôle (1 par ligne)
                    </label>
                    <textarea
                      name={`pillar_${pillar.id}_points`}
                      rows={3}
                      defaultValue={pillar.points.join("\n")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isPillarsPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isPillarsPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer les piliers</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Services Settings */}
      {activeTab === "services" && (
        <form action={servicesFormAction} className="space-y-8 max-w-4xl">
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Offres &amp; Forfaits</h2>
                <p className="text-xs text-zinc-400">
                  Modifiez les 3 forfaits de la page Services ainsi que leurs livrables et délais
                </p>
              </div>
              {servicesState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            <div className="space-y-8">
              {initialSettings.services.map((service: ServiceItem, idx: number) => (
                <div
                  key={service.id}
                  className="p-6 rounded-2xl bg-black border border-white/[0.08] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Offre {idx + 1} : {service.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 block">
                        Badge / Catégorie
                      </label>
                      <input
                        name={`srv_${idx + 1}_badge`}
                        type="text"
                        defaultValue={service.badge}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 block">
                        Titre de l&apos;offre
                      </label>
                      <input
                        name={`srv_${idx + 1}_title`}
                        type="text"
                        defaultValue={service.title}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400 block">
                        Délai moyen
                      </label>
                      <input
                        name={`srv_${idx + 1}_deliveryTime`}
                        type="text"
                        defaultValue={service.deliveryTime}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      Accroche / Description
                    </label>
                    <input
                      name={`srv_${idx + 1}_tagline`}
                      type="text"
                      defaultValue={service.tagline}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      Livrables inclus (1 par ligne)
                    </label>
                    <textarea
                      name={`srv_${idx + 1}_features`}
                      rows={5}
                      defaultValue={service.features.join("\n")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isServicesPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isServicesPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer les services</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 4: Estimator Settings */}
      {activeTab === "estimator" && (
        <form action={estimatorFormAction} className="space-y-8 max-w-4xl">
          <input
            type="hidden"
            name="projectTypesJson"
            value={JSON.stringify(projectTypesList)}
          />
          <input
            type="hidden"
            name="addonsJson"
            value={JSON.stringify(addonsList)}
          />

          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Tarifs du Simulateur de Devis</h2>
                <p className="text-xs text-zinc-400">
                  Ajoutez, modifiez ou supprimez les types de projets principaux et les options additionnelles calculées en direct.
                </p>
              </div>
              {estimatorState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            {/* Section 1: Types de projets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Types de projets principaux ({projectTypesList.length})
                </span>
                <button
                  type="button"
                  onClick={addProjectTypeItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ajouter un type de projet</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypesList.map((type, idx) => (
                  <div
                    key={type.id || idx}
                    className="p-5 rounded-2xl bg-black border border-white/[0.08] space-y-3 relative group hover:border-white/[0.2] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                        Projet 0{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProjectTypeItem(idx)}
                        className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Supprimer ce type de projet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 block">
                        Nom affiché au client
                      </label>
                      <input
                        type="text"
                        value={type.name}
                        onChange={(e) => updateProjectTypeItem(idx, "name", e.target.value)}
                        placeholder="ex: Site Vitrine & Entreprise"
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 block">
                          Prix de base (€)
                        </label>
                        <input
                          type="number"
                          value={type.price}
                          onChange={(e) => updateProjectTypeItem(idx, "price", Number(e.target.value))}
                          placeholder="2500"
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 block">
                          Délai moyen (jours)
                        </label>
                        <input
                          type="number"
                          value={type.days}
                          onChange={(e) => updateProjectTypeItem(idx, "days", Number(e.target.value))}
                          placeholder="14"
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Options additionnelles */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Options &amp; Fonctionnalités au choix ({addonsList.length})
                </span>
                <button
                  type="button"
                  onClick={addAddonItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ajouter une option</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addonsList.map((addon, idx) => (
                  <div
                    key={addon.id || idx}
                    className="p-5 rounded-2xl bg-black border border-white/[0.08] space-y-3 relative group hover:border-white/[0.2] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase">
                        Option 0{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAddonItem(idx)}
                        className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Supprimer cette option"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 block">
                        Nom de l&apos;option
                      </label>
                      <input
                        type="text"
                        value={addon.name}
                        onChange={(e) => updateAddonItem(idx, "name", e.target.value)}
                        placeholder="ex: Espace Admin & Back-office sur-mesure"
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 block">
                          Prix additionnel (€)
                        </label>
                        <input
                          type="number"
                          value={addon.price}
                          onChange={(e) => updateAddonItem(idx, "price", Number(e.target.value))}
                          placeholder="800"
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 block">
                          Délai ajouté (jours)
                        </label>
                        <input
                          type="number"
                          value={addon.days}
                          onChange={(e) => updateAddonItem(idx, "days", Number(e.target.value))}
                          placeholder="5"
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isEstimatorPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isEstimatorPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Enregistrer le simulateur</span>
              </button>
            </div>
          </div>
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
                  Lien de prise de RDV direct (Cal.com / Google Meet / Calendly)
                </label>
                <input
                  name="calcomUrl"
                  type="url"
                  defaultValue={initialSettings.contactInfo.calcomUrl || ""}
                  placeholder="https://cal.com/gauthier-minor ou https://meet.google.com/..."
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
