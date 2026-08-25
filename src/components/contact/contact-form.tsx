"use client";

import React, { useActionState, useState } from "react";
import { submitContactForm, ContactState } from "@/app/actions/contact";
import { ArrowUpRight, CheckCircle2, Send, Loader2, ShieldCheck } from "lucide-react";

interface ContactFormProps {
  initialService?: string;
  initialBudget?: string;
}

const SERVICE_OPTIONS = [
  "Création de site internet",
  "Application Web ou SaaS",
  "Refonte de site existant",
  "Audit de vitesse & Référencement",
  "Autre projet",
];

const BUDGET_OPTIONS = [
  "Moins de 3 000 €",
  "3 000 € à 6 000 €",
  "6 000 € à 12 000 €",
  "Plus de 12 000 €",
  "Je ne sais pas encore",
];

export function ContactForm({ initialService, initialBudget }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(
    submitContactForm,
    null
  );

  const [selectedService, setSelectedService] = useState(
    initialService || SERVICE_OPTIONS[0]
  );
  const [selectedBudget, setSelectedBudget] = useState(
    initialBudget || BUDGET_OPTIONS[1]
  );

  if (state?.success) {
    return (
      <div className="rounded-3xl bg-[#13141c] border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Merci, votre message est bien envoyé !
          </h3>
          <p className="text-base sm:text-lg text-zinc-200 max-w-lg mx-auto leading-relaxed">
            {state.message}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm font-semibold text-[#e89268] hover:underline underline-offset-4 cursor-pointer"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-3xl bg-[#13141c] border border-white/[0.1] p-6 sm:p-10 space-y-8 shadow-2xl"
    >
      <div className="space-y-2 pb-2 border-b border-white/[0.08]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Décrivez votre projet
        </h2>
        <p className="text-base text-zinc-300 leading-relaxed">
          Remplissez simplement ce formulaire. Vous recevrez une réponse personnalisée et un devis gratuit sous 24h.
        </p>
      </div>

      {state?.errors && state.message && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">
          {state.message}
        </div>
      )}

      {/* Row 1: Nom & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2.5">
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-semibold text-zinc-100"
          >
            Votre nom et prénom <span className="text-[#c96442]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ex : Sophie Martin"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-400">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2.5">
          <label
            htmlFor="email"
            className="block text-sm sm:text-base font-semibold text-zinc-100"
          >
            Votre adresse email <span className="text-[#c96442]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Ex : sophie.martin@gmail.com"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-400">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Row 2: Entreprise */}
      <div className="space-y-2.5">
        <label
          htmlFor="company"
          className="block text-sm sm:text-base font-semibold text-zinc-100"
        >
          Entreprise, commerce ou activité{" "}
          <span className="text-xs font-normal text-zinc-400">(facultatif)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Ex : Restaurant Le Comptoir, Cabinet Martin, Startup XYZ..."
          className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
        />
      </div>

      {/* Row 3: Service Selection */}
      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-semibold text-zinc-100">
          Quel est votre type de projet ?
        </label>
        <input type="hidden" name="service" value={selectedService} />
        <div className="flex flex-wrap gap-2.5">
          {SERVICE_OPTIONS.map((svc) => {
            const isSelected = selectedService === svc;
            return (
              <button
                key={svc}
                type="button"
                onClick={() => setSelectedService(svc)}
                className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer ${isSelected
                    ? "bg-[#c96442] text-white font-bold shadow-md ring-1 ring-[#e89268]"
                    : "bg-[#0b0c10] text-zinc-200 hover:text-white hover:bg-zinc-800 border border-white/[0.1]"
                  }`}
              >
                {svc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 4: Budget Range */}
      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-semibold text-zinc-100">
          Budget estimé pour ce projet
        </label>
        <input type="hidden" name="budget" value={selectedBudget} />
        <div className="flex flex-wrap gap-2.5">
          {BUDGET_OPTIONS.map((b) => {
            const isSelected = selectedBudget === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBudget(b)}
                className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer ${isSelected
                    ? "bg-white text-zinc-950 font-bold shadow-md ring-2 ring-white"
                    : "bg-[#0b0c10] text-zinc-200 hover:text-white hover:bg-zinc-800 border border-white/[0.1]"
                  }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 5: Message */}
      <div className="space-y-2.5">
        <label
          htmlFor="message"
          className="block text-sm sm:text-base font-semibold text-zinc-100"
        >
          Quelques mots sur votre projet ou vos objectifs{" "}
          <span className="text-[#c96442]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Ex : Bonjour Gauthier, je souhaite créer un nouveau site vitrine pour mon entreprise avec environ 4 ou 5 pages, une galerie photo et une page de contact..."
          className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all resize-y min-h-[130px] font-sans leading-relaxed"
        />
        {state?.errors?.message && (
          <p className="text-sm text-red-400">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-base sm:text-lg font-bold text-white bg-[#c96442] hover:bg-[#b55738] disabled:opacity-50 transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-xl shadow-[#c96442]/20"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Envoi de votre message en cours...</span>
            </>
          ) : (
            <>
              <span>Envoyer ma demande (Gratuit & sans engagement)</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs sm:text-sm text-zinc-400 text-center flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Vos coordonnées restent confidentielles. Réponse sous 24h ouvrées.</span>
        </p>
      </div>
    </form>
  );
}
