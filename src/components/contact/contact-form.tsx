"use client";

import React, { useActionState, useState } from "react";
import { submitContactForm, ContactState } from "@/app/actions/contact";
import { getRecaptchaToken } from "@/lib/use-recaptcha";

interface ContactFormProps {
  initialService?: string;
  initialBudget?: string;
}

const SERVICE_OPTIONS = [
  "Création de site internet",
  "Design / identité visuelle",
  "Application Web ou SaaS",
  "Refonte de site existant",
  "Autre projet",
];

const fieldClass =
  "peer w-full bg-transparent border-b border-line focus:border-signal outline-none pt-6 pb-3 text-xl placeholder-transparent transition-colors";
const labelClass =
  "absolute left-0 top-0 font-mono text-xs text-paper-mute transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xl peer-placeholder-shown:font-sans peer-focus:top-0 peer-focus:text-xs peer-focus:font-mono peer-focus:text-signal";

function Field({ name, label, type = "text", required, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="relative">
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={label} className={fieldClass} />
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
    </div>
  );
}

export function ContactForm({ initialService, initialBudget }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(submitContactForm, null);
  const [selectedService, setSelectedService] = useState(initialService || SERVICE_OPTIONS[0]);

  const handleSubmit = async (formData: FormData) => {
    const token = await getRecaptchaToken("contact_form");
    if (token) {
      formData.append("g-recaptcha-response", token);
    }
    formAction(formData);
  };

  if (state?.success) {
    return (
      <div className="py-10">
        <p className="font-serif italic text-6xl text-signal">Message reçu.</p>
        <p className="mt-6 text-lg text-paper-dim max-w-lg">{state.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 border-b border-paper pb-0.5 hover:text-signal hover:border-signal transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-10">
      <input type="hidden" name="service" value={selectedService} />
      {initialBudget && <input type="hidden" name="budget" value={initialBudget} />}

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        <div>
          <Field name="name" label="Nom & prénom *" required autoComplete="name" />
          {state?.errors?.name && <p className="mt-2 text-sm text-signal">{state.errors.name[0]}</p>}
        </div>
        <div>
          <Field name="email" label="Email *" type="email" required autoComplete="email" />
          {state?.errors?.email && <p className="mt-2 text-sm text-signal">{state.errors.email[0]}</p>}
        </div>
        <Field name="company" label="Société (facultatif)" autoComplete="organization" />
        <Field name="phone" label="Téléphone (facultatif)" type="tel" autoComplete="tel" />
      </div>

      <fieldset>
        <legend className="font-mono text-xs text-paper-mute mb-4">Sujet</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((srv) => (
            <button
              key={srv}
              type="button"
              onClick={() => setSelectedService(srv)}
              aria-pressed={selectedService === srv}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                selectedService === srv ? "bg-paper text-ink border-paper" : "border-line hover:border-paper"
              }`}
            >
              {srv}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea id="message" name="message" rows={4} required placeholder="Votre message *" className={`${fieldClass} resize-none`} />
        <label htmlFor="message" className={labelClass}>
          Votre message *
        </label>
        {state?.errors?.message && <p className="mt-2 text-sm text-signal">{state.errors.message[0]}</p>}
      </div>

      {state?.message && !state.success && <p className="text-signal">{state.message}</p>}

      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="font-mono text-xs text-paper-mute">Réponse sous 24h · Devis gratuit</p>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-signal text-ink px-8 py-4 font-medium hover:bg-paper disabled:opacity-40 transition-colors"
        >
          {isPending ? "Envoi…" : "Envoyer →"}
        </button>
      </div>
    </form>
  );
}
