"use client";

import React, { useActionState, useState } from "react";
import { submitContactForm, ContactState } from "@/app/actions/contact";
import { ArrowUpRight, CheckCircle2, Send, Loader2, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

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

export function ContactForm({ initialService, initialBudget }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(
    submitContactForm,
    null
  );

  const [selectedService, setSelectedService] = useState(
    initialService || SERVICE_OPTIONS[0]
  );
  const [budget, setBudget] = useState(initialBudget || "Je ne sais pas encore");

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
      {/* Top Form Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            Disponible pour nouveaux projets
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Parlons de votre projet
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Remplissez ce formulaire et je vous réponds sous 24h ouvrées avec une première approche technique.
        </p>
      </div>

      {state?.message && !state?.success && (
        <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/50 text-red-200 text-sm">
          {state.message}
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
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
            placeholder="ex: Jean Dupont"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-400">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
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
            placeholder="ex: jean@entreprise.com"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-400">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Row 2: Company */}
      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block text-sm sm:text-base font-semibold text-zinc-100"
        >
          Entreprise, marque ou nom du projet{" "}
          <span className="text-xs font-normal text-zinc-400 font-mono">
            (facultatif)
          </span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="ex: Acme Corp, Mon Startup..."
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
                className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer ${
                  isSelected
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

      {/* Row 4: Budget (Bouton 'Je ne sais pas encore' OU Champ de saisie) */}
      <div className="space-y-2.5">
        <label
          htmlFor="budget-input"
          className="block text-sm sm:text-base font-semibold text-zinc-100"
        >
          Budget envisagé{" "}
          <span className="text-xs font-normal text-zinc-400 font-mono">
            (facultatif)
          </span>
        </label>

        {/* Hidden input passed to server action */}
        <input type="hidden" name="budget" value={budget} />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => setBudget("Je ne sais pas encore")}
            className={`px-4 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              budget === "Je ne sais pas encore"
                ? "bg-white text-black border-white shadow-md font-bold"
                : "bg-[#0b0c10] text-zinc-300 hover:text-white hover:bg-zinc-800 border-white/[0.12]"
            }`}
          >
            Je ne sais pas encore
          </button>

          <span className="text-xs font-mono text-zinc-500 uppercase text-center sm:text-left">
            ou
          </span>

          <input
            id="budget-input"
            type="text"
            value={budget === "Je ne sais pas encore" ? "" : budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Saisissez votre budget (ex: 2 500 €, 5 000 €...)"
            className="flex-1 px-4 py-3.5 rounded-xl bg-[#0b0c10] border border-white/[0.12] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#c96442] focus:ring-1 focus:ring-[#c96442] transition-all font-sans"
          />
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
              <span>Envoyer ma demande de projet</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs text-zinc-400 text-center font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Réponse garantie sous 24h</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">&bull;</span>
          <span>Devis gratuit et sans engagement</span>
        </div>
      </div>
    </form>
  );
}
