"use client";

import React, { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContactForm, type ContactState } from "@/app/actions/contact";
import { getRecaptchaToken } from "@/lib/use-recaptcha";

interface Answers {
  type: string;
  goals: string[];
  existing: string;
  existingUrl: string;
  deadline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  details: string;
}

const TYPES = ["Site vitrine", "Refonte de site", "E-commerce", "Application / SaaS", "Design uniquement", "Autre"];
const GOALS = [
  "Image de marque forte",
  "Plus de demandes de contact",
  "Vendre en ligne",
  "Être bien référencé",
  "Gagner du temps (outil métier)",
  "Site administrable",
  "Animations & effet waouh",
  "Multilingue",
];
const EXISTING = ["Rien pour l'instant", "Un logo seulement", "Une charte graphique", "Un site à refondre"];
const DEADLINES = ["Dès que possible", "1 à 2 mois", "3 à 6 mois", "Pas de date précise"];
const BUDGETS = ["Moins de 2 000 €", "2 000 – 5 000 €", "5 000 – 10 000 €", "Plus de 10 000 €", "Je ne sais pas encore"];

const STEPS = ["Projet", "Objectifs", "Existant", "Calendrier", "Vous"] as const;

const EMPTY: Answers = {
  type: "",
  goals: [],
  existing: "",
  existingUrl: "",
  deadline: "",
  budget: "",
  name: "",
  email: "",
  company: "",
  details: "",
};

function Choice({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`text-left px-5 py-4 border transition-all duration-300 text-lg ${
        selected ? "bg-signal text-ink border-signal" : "border-line hover:border-paper"
      }`}
    >
      {label}
    </button>
  );
}

const inputClass =
  "w-full bg-transparent border-b border-line focus:border-signal outline-none py-3 text-xl placeholder:text-paper-mute transition-colors";

export function ProjectQuestionnaire() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(submitContactForm, null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setA((prev) => ({ ...prev, [key]: value }));
  const toggleGoal = (g: string) =>
    set("goals", a.goals.includes(g) ? a.goals.filter((x) => x !== g) : [...a.goals, g]);

  const canNext = [!!a.type, a.goals.length > 0, !!a.existing, !!a.deadline && !!a.budget, a.name.length > 1 && /\S+@\S+\.\S+/.test(a.email)][step];

  const go = (delta: number) => {
    setDirection(delta);
    setStep((s) => Math.min(STEPS.length - 1, Math.max(0, s + delta)));
  };

  const submit = async () => {
    const message = [
      `Type de projet : ${a.type}`,
      `Objectifs : ${a.goals.join(", ")}`,
      `Existant : ${a.existing}${a.existingUrl ? ` (${a.existingUrl})` : ""}`,
      `Délai : ${a.deadline}`,
      `Budget : ${a.budget}`,
      "",
      a.details || "(Pas de précisions supplémentaires)",
    ].join("\n");

    const formData = new FormData();
    formData.set("name", a.name);
    formData.set("email", a.email);
    formData.set("company", a.company);
    formData.set("service", `Questionnaire — ${a.type}`);
    formData.set("budget", a.budget);
    formData.set("message", message);
    const token = await getRecaptchaToken("contact_form");
    if (token) formData.set("g-recaptcha-response", token);
    React.startTransition(() => formAction(formData));
  };

  if (state?.success) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="py-20">
        <p className="font-serif italic text-6xl sm:text-8xl text-signal">Merci {a.name.split(" ")[0]}.</p>
        <p className="mt-6 text-xl text-paper-dim max-w-xl">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-16">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div className="h-px bg-line overflow-hidden">
              <motion.div className="h-full bg-signal" animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6 }} />
            </div>
            <p className={`mt-2 font-mono text-xs ${i === step ? "text-paper" : "text-paper-mute"}`}>
              0{i + 1} <span className="hidden sm:inline">{label}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="relative min-h-[26rem]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <>
                <h2 className="text-4xl sm:text-6xl tracking-[-0.04em] font-medium mb-10">
                  Quel type de <span className="font-serif italic">projet</span> ?
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TYPES.map((t) => (
                    <Choice key={t} label={t} selected={a.type === t} onClick={() => set("type", t)} />
                  ))}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="text-4xl sm:text-6xl tracking-[-0.04em] font-medium mb-3">
                  Qu&apos;attendez-vous de ce <span className="font-serif italic">site</span> ?
                </h2>
                <p className="text-paper-dim mb-10">Plusieurs choix possibles.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {GOALS.map((g) => (
                    <Choice key={g} label={g} selected={a.goals.includes(g)} onClick={() => toggleGoal(g)} />
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-4xl sm:text-6xl tracking-[-0.04em] font-medium mb-10">
                  D&apos;où <span className="font-serif italic">partons-nous</span> ?
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {EXISTING.map((e) => (
                    <Choice key={e} label={e} selected={a.existing === e} onClick={() => set("existing", e)} />
                  ))}
                </div>
                <input
                  className={`${inputClass} mt-10`}
                  placeholder="Adresse du site actuel (facultatif)"
                  value={a.existingUrl}
                  onChange={(e) => set("existingUrl", e.target.value)}
                />
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-4xl sm:text-6xl tracking-[-0.04em] font-medium mb-10">
                  Quel <span className="font-serif italic">calendrier</span> et quel budget ?
                </h2>
                <p className="font-mono text-xs text-paper-mute mb-3">Délai</p>
                <div className="grid sm:grid-cols-4 gap-3 mb-10">
                  {DEADLINES.map((d) => (
                    <Choice key={d} label={d} selected={a.deadline === d} onClick={() => set("deadline", d)} />
                  ))}
                </div>
                <p className="font-mono text-xs text-paper-mute mb-3">Budget</p>
                <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {BUDGETS.map((b) => (
                    <Choice key={b} label={b} selected={a.budget === b} onClick={() => set("budget", b)} />
                  ))}
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="text-4xl sm:text-6xl tracking-[-0.04em] font-medium mb-10">
                  Et <span className="font-serif italic">vous</span> ?
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                  <input className={inputClass} placeholder="Nom *" autoComplete="name" value={a.name} onChange={(e) => set("name", e.target.value)} />
                  <input className={inputClass} placeholder="Email *" type="email" autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} />
                  <input className={inputClass} placeholder="Entreprise (facultatif)" autoComplete="organization" value={a.company} onChange={(e) => set("company", e.target.value)} />
                  <textarea
                    className={`${inputClass} sm:col-span-2 resize-none`}
                    rows={3}
                    placeholder="Quelque chose à ajouter ? Inspirations, contraintes…"
                    value={a.details}
                    onChange={(e) => set("details", e.target.value)}
                  />
                </div>
                {state && !state.success && (
                  <p className="mt-6 text-signal">
                    {state.message || Object.values(state.errors ?? {}).flat().join(" ")}
                  </p>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={step === 0}
          className="text-paper-dim hover:text-paper disabled:opacity-0 transition-opacity"
        >
          ← Retour
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canNext}
            className="rounded-full bg-paper text-ink px-8 py-4 font-medium disabled:opacity-30 hover:bg-signal transition-colors"
          >
            Continuer →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canNext || isPending}
            className="rounded-full bg-signal text-ink px-8 py-4 font-medium disabled:opacity-30 hover:bg-paper transition-colors"
          >
            {isPending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        )}
      </div>
    </div>
  );
}
