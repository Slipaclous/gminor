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
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Tarifs du Simulateur de Devis</h2>
                <p className="text-xs text-zinc-400">
                  Définissez les prix de base et délais calculés pour chaque type de projet et option
                </p>
              </div>
              {estimatorState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

            {/* Types de projets */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                Types de projets principaux
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {initialSettings.estimator.projectTypes.map((type: EstimatorOption) => (
                  <div
                    key={type.id}
                    className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-3"
                  >
                    <span className="text-xs font-bold text-white font-mono uppercase">
                      {type.id}
                    </span>
                    <input
                      name={`type_${type.id}_name`}
                      type="text"
                      defaultValue={type.name}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 block">
                          Prix (€)
                        </label>
                        <input
                          name={`type_${type.id}_price`}
                          type="number"
                          defaultValue={type.price}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 block">
                          Jours estimés
                        </label>
                        <input
                          name={`type_${type.id}_days`}
                          type="number"
                          defaultValue={type.days}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Options additionnelles */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                Options additionnelles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {initialSettings.estimator.addons.map((addon: EstimatorOption) => (
                  <div
                    key={addon.id}
                    className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-3"
                  >
                    <span className="text-xs font-bold text-white font-mono uppercase">
                      {addon.id}
                    </span>
                    <input
                      name={`addon_${addon.id}_name`}
                      type="text"
                      defaultValue={addon.name}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 block">
                          Prix (€)
                        </label>
                        <input
                          name={`addon_${addon.id}_price`}
                          type="number"
                          defaultValue={addon.price}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 block">
                          Jours estimés
                        </label>
                        <input
                          name={`addon_${addon.id}_days`}
                          type="number"
                          defaultValue={addon.days}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.1] text-xs text-white font-mono"
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
          <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Coordonnées &amp; Réseaux Sociaux</h2>
                <p className="text-xs text-zinc-400">
                  Modifiez votre email public, statut de disponibilité et liens de réseaux
                </p>
              </div>
              {contactState?.success && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistré</span>
                </span>
              )}
            </div>

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
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Localisation
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={initialSettings.contactInfo.location}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Lien GitHub
                </label>
                <input
                  name="githubUrl"
                  type="url"
                  defaultValue={initialSettings.contactInfo.githubUrl}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Lien LinkedIn
                </label>
                <input
                  name="linkedinUrl"
                  type="url"
                  defaultValue={initialSettings.contactInfo.linkedinUrl}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Texte de disponibilité
              </label>
              <input
                name="availabilityText"
                type="text"
                defaultValue={initialSettings.contactInfo.availabilityText}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.1] text-sm text-white"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isContactPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-md disabled:opacity-50"
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
