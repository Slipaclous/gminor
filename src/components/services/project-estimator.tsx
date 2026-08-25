"use client";

import React, { useState } from "react";
import { EstimatorSettings, EstimatorOption } from "@/lib/settings-service";
import { submitContactForm } from "@/app/actions/contact";
import {
  ArrowUpRight,
  Calculator,
  Check,
  Clock,
  X,
  Send,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  Video,
  Sun,
  Sunset,
  Sparkles,
} from "lucide-react";

interface ProjectEstimatorProps {
  settings?: EstimatorSettings;
}

const DEFAULT_PROJECT_TYPES: EstimatorOption[] = [
  { id: "vitrine", name: "Site Vitrine & Entreprise", price: 2500, days: 14 },
  { id: "saas", name: "Application Web / SaaS", price: 6500, days: 30 },
  { id: "ecommerce", name: "Boutique E-Commerce", price: 4500, days: 21 },
  { id: "refonte", name: "Refonte & Modernisation", price: 2000, days: 10 },
];

const DEFAULT_ADDONS: EstimatorOption[] = [
  { id: "admin", name: "Espace Admin & Back-office sur-mesure", price: 800, days: 5 },
  { id: "seo", name: "Optimisation SEO & Vitesse Google (Score 98+)", price: 500, days: 3 },
  { id: "stripe", name: "Paiement en ligne / Abonnements (Stripe)", price: 900, days: 4 },
  { id: "cms", name: "Gestionnaire de contenus dynamique", price: 600, days: 3 },
];

const CONTACT_CHANNELS = [
  { id: "email", label: "Par Email", icon: Mail },
  { id: "phone", label: "Par Téléphone", icon: Phone },
  { id: "visio", label: "Visio (Google Meet)", icon: Video },
];

const AVAILABILITY_SLOTS = [
  { id: "morning", label: "Matin (9h - 12h)" },
  { id: "afternoon", label: "Après-midi (14h - 17h)" },
  { id: "evening", label: "Fin de journée (17h - 19h)" },
  { id: "asap", label: "Dès que possible" },
];

export function ProjectEstimator({ settings }: ProjectEstimatorProps) {
  const projectTypes = settings?.projectTypes || DEFAULT_PROJECT_TYPES;
  const addons = settings?.addons || DEFAULT_ADDONS;

  const [selectedType, setSelectedType] = useState<EstimatorOption>(projectTypes[0] || DEFAULT_PROJECT_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["admin", "seo"]);

  // Booking / Preferences Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [selectedAvailability, setSelectedAvailability] = useState("afternoon");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [availabilityDetails, setAvailabilityDetails] = useState("");

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedAddonsList = addons.filter((a) => selectedAddons.includes(a.id));
  const addonsTotal = selectedAddonsList.reduce((acc, curr) => acc + curr.price, 0);

  const daysTotal =
    (selectedType?.days || 14) +
    selectedAddonsList.reduce((acc, curr) => acc + curr.days, 0);

  const totalPrice = (selectedType?.price || 2500) + addonsTotal;
  const weeksTotal = Math.ceil(daysTotal / 7);

  const channelLabel =
    CONTACT_CHANNELS.find((c) => c.id === selectedChannel)?.label || "Email";
  const slotLabel =
    AVAILABILITY_SLOTS.find((s) => s.id === selectedAvailability)?.label || "Après-midi";

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("company", company);
    formData.append("service", selectedType?.name || "Projet");
    formData.append("budget", `~ ${totalPrice.toLocaleString("fr-FR")} € (${weeksTotal} sem.)`);
    formData.append(
      "message",
      `[DEMANDE DE PROJET & DEVIS DU SIMULATEUR]\n` +
      `• Projet : ${selectedType?.name}\n` +
      `• Options incluses : ${selectedAddonsList.map((a) => a.name).join(", ") || "Formule de base"}\n` +
      `• Budget estimé : ~ ${totalPrice.toLocaleString("fr-FR")} €\n` +
      `• Délai indicatif : ${weeksTotal} à ${weeksTotal + 1} semaines\n\n` +
      `[PRÉFÉRENCES DE CONTACT & DISPONIBILITÉS DU PROSPECT]\n` +
      `• Canal préféré : ${channelLabel}\n` +
      `• Créneau privilégié : ${slotLabel}\n` +
      `• Téléphone : ${phone || "Non renseigné"}\n` +
      `• Précisions & Disponibilités : ${availabilityDetails || "Aucune précision complémentaire"}`
    );

    try {
      await submitContactForm(null, formData);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.1] p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              <Calculator className="w-4 h-4 text-white" />
              <span>Simulateur de Devis &amp; Délais</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Estimez votre budget en direct
            </h3>
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            Transparence tarifaire intégrale
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Options Selection */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                01. Type de projet principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-zinc-800 border-white text-white shadow-sm"
                          : "bg-black border-white/[0.08] text-zinc-300 hover:border-white/[0.2]"
                      }`}
                    >
                      <div className="font-semibold text-sm">{type.name}</div>
                      <span className="text-xs text-zinc-400 font-mono">
                        Dès {type.price.toLocaleString("fr-FR")} €
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Addons */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                02. Options &amp; Fonctionnalités souhaitées
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? "bg-zinc-800/90 border-white/60 text-white"
                          : "bg-black border-white/[0.08] text-zinc-300 hover:border-white/[0.2]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold">{addon.name}</div>
                        <div className="text-[11px] text-zinc-400 font-mono">
                          +{addon.price} €
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? "bg-white border-white text-black"
                            : "border-white/[0.2]"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.1] p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">
                Budget estimatif indicatif
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                ~ {totalPrice.toLocaleString("fr-FR")} €
              </div>
              <span className="text-[11px] text-zinc-400 block">
                Prix clé en main (code source &amp; déploiement inclus)
              </span>
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Délai moyen de livraison :</span>
                </span>
                <span className="font-bold text-white font-mono">
                  {weeksTotal} à {weeksTotal + 1} semaines
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span>Garantie support incluse :</span>
                <span className="font-bold text-emerald-400 font-mono">30 jours</span>
              </div>
            </div>

            {/* In-Place Request / Preferences Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setIsModalOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <span>Valider ce devis &amp; mes disponibilités</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Preferences & Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d0d10] border border-white/[0.15] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Votre demande et vos préférences ont été transmises !
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Merci {name}. J&apos;ai bien reçu votre configuration pour le projet <strong>{selectedType?.name}</strong> (~{totalPrice.toLocaleString("fr-FR")} €). Je vous recontacte sous 24h par <strong>{channelLabel.toLowerCase()}</strong> en tenant compte de votre créneau (<strong>{slotLabel}</strong>).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-white/[0.1] text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Devis &amp; Préférences de Contact</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Validez votre devis &amp; vos disponibilités
                  </h3>
                </div>

                {/* Recap Box */}
                <div className="p-4 rounded-2xl bg-black border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 font-mono block">Configuration retenue :</span>
                    <span className="font-bold text-white text-sm">{selectedType?.name}</span>
                    <span className="text-zinc-400 block text-[11px]">
                      {selectedAddonsList.map((a) => a.name).join(" • ") || "Options de base"}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-zinc-500 font-mono block">Budget estimé :</span>
                    <span className="font-bold text-white text-sm font-mono">~ {totalPrice.toLocaleString("fr-FR")} €</span>
                    <span className="text-zinc-400 block text-[11px] font-mono">{weeksTotal} à {weeksTotal + 1} sem.</span>
                  </div>
                </div>

                {/* Preferred Contact Channel */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    1. Comment préférez-vous être recontacté ?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CONTACT_CHANNELS.map((ch) => {
                      const Icon = ch.icon;
                      const isSelected = selectedChannel === ch.id;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setSelectedChannel(ch.id)}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-white text-black border-white font-bold shadow-sm"
                              : "bg-black text-zinc-300 border-white/[0.08] hover:border-white/[0.2]"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{ch.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Availability Slot */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    2. Vos plages horaires préférées :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AVAILABILITY_SLOTS.map((slot) => {
                      const isSelected = selectedAvailability === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedAvailability(slot.id)}
                          className={`py-2 px-2 rounded-xl text-xs text-center font-mono transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-zinc-800 text-white border-white font-bold shadow-sm"
                              : "bg-black text-zinc-400 border-white/[0.08] hover:border-white/[0.2]"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* User Info Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Votre nom et prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sophie Martin"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Votre email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sophie@entreprise.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Entreprise / Activité
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Cabinet Martin, SaaS XYZ..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Téléphone {selectedChannel === "phone" ? "*" : "(facultatif)"}
                    </label>
                    <input
                      type="tel"
                      required={selectedChannel === "phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Specific days / details textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Précisions sur vos disponibilités ou votre projet (facultatif)
                  </label>
                  <textarea
                    rows={2}
                    value={availabilityDetails}
                    onChange={(e) => setAvailabilityDetails(e.target.value)}
                    placeholder="Ex : Disponible plutôt les mardis et jeudis après-midi, projet à lancer d'ici le mois prochain..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Envoi de votre demande...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmettre mon devis &amp; mes préférences</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center font-mono">
                    Devis gratuit et sans engagement • Réponse garantie sous 24h ouvrées
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
