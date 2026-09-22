"use client";

import React, { useActionState, useState } from "react";
import { submitContactForm, ContactState } from "@/app/actions/contact";
import { ArrowUpRight, CheckCircle2, Send, Loader2, ShieldCheck, HelpCircle } from "lucide-react";
import { getRecaptchaToken } from "@/lib/use-recaptcha";

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

  const handleSubmit = async (formData: FormData) => {
    const token = await getRecaptchaToken("contact_form");
    if (token) {
      formData.append("g-recaptcha-response", token);
    }
    formAction(formData);
  };

  if (state?.success) {
    return (
      <div className="rounded-3xl bg-white border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#18191f] tracking-tight">
            Merci, votre message est bien envoyé !
          </h3>
          <p className="text-base sm:text-lg text-[#555765] max-w-lg mx-auto leading-relaxed">
            {state.message}
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm font-semibold text-[#18191f] hover:underline underline-offset-4 cursor-pointer"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-3xl bg-white border border-[#e6e6df] p-7 sm:p-10 space-y-8 shadow-sm transition-all duration-200"
    >
      {/* Top Form Header */}
      <div className="space-y-2 pb-5 border-b border-[#e6e6df]">
        <h2 className="text-xl sm:text-2xl font-bold text-[#18191f] tracking-tight">
          Votre projet en quelques lignes
        </h2>
        <p className="text-sm text-[#555765] leading-relaxed">
          Décrivez brièvement vos attentes. Plus vos précisions sont claires, plus mon retour et mon estimation seront précis.
        </p>
      </div>

      {state?.message && !state?.success && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {state.message}
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
          >
            Votre nom &amp; prénom *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Sophie Martin"
            className="w-full px-4 py-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
          >
            Email professionnel *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="sophie@entreprise.be"
            className="w-full px-4 py-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Row 2: Company & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2">
          <label
            htmlFor="company"
            className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
          >
            Société ou structure <span className="text-[#555765] font-normal">(facultatif)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Cabinet Martin, Boutique..."
            className="w-full px-4 py-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
          >
            Téléphone <span className="text-[#555765] font-normal">(facultatif)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0470 12 34 56"
            className="w-full px-4 py-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Row 3: Service Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold">
          Type de prestation recherchée
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((srv) => {
            const isSelected = selectedService === srv;
            return (
              <button
                key={srv}
                type="button"
                onClick={() => setSelectedService(srv)}
                className={`px-3.5 py-2 rounded-xl text-xs transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#18191f] text-white border-[#18191f] font-semibold shadow-xs"
                    : "bg-[#fafaf8] text-[#555765] border-[#e6e6df] hover:border-[#18191f]/40 hover:bg-white font-medium"
                }`}
              >
                {srv}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 4: Budget Selection */}
      <div className="space-y-2.5">
        <label
          htmlFor="budget-input"
          className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
        >
          Ordre de grandeur du budget <span className="text-[#555765] font-normal">(facultatif)</span>
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => setBudget("Je ne sais pas encore")}
            className={`px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              budget === "Je ne sais pas encore"
                ? "bg-[#18191f] text-white border-[#18191f] font-bold shadow-xs"
                : "bg-[#fafaf8] text-[#555765] hover:text-[#18191f] hover:bg-white border-[#e6e6df] font-medium"
            }`}
          >
            À définir ensemble
          </button>

          <span className="text-xs font-mono text-[#555765] uppercase text-center sm:text-left">
            ou
          </span>

          <input
            id="budget-input"
            type="text"
            value={budget === "Je ne sais pas encore" ? "" : budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Ex : 2 000 €, 4 500 €..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Row 5: Message */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs font-mono uppercase tracking-wider text-[#18191f] font-bold"
        >
          Détails de votre besoin ou objectifs *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Ex : Bonjour Gauthier, je souhaite refondre le site web de notre activité afin de moderniser notre image et acquérir de nouveaux clients..."
          className="w-full px-4 py-3 rounded-xl bg-[#fafaf8] border border-[#e6e6df] text-sm text-[#18191f] placeholder:text-[#555765]/40 focus:outline-none focus:border-[#18191f] focus:bg-white transition-all resize-y min-h-[120px] leading-relaxed shadow-2xs"
        />
        {state?.errors?.message && (
          <p className="text-xs text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Submit Button & Reassurance */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#18191f] hover:bg-[#2d2e38] disabled:opacity-50 transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi de votre demande en cours...</span>
            </>
          ) : (
            <>
              <span>Envoyer ma demande</span>
              <Send className="w-4 h-4 text-emerald-400" />
            </>
          )}
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs text-[#555765] text-center font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Réponse garantie sous 24h</span>
          </div>
          <span className="hidden sm:inline text-[#d5d5cc]">&bull;</span>
          <span>Devis 100% gratuit et sans engagement</span>
        </div>
      </div>
    </form>
  );
}
