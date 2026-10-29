import React from "react";
import type { Metadata } from "next";
import { ProjectQuestionnaire } from "@/components/questionnaire/project-questionnaire";
import { SplitText } from "@/components/motion/split-text";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Questionnaire projet — Gauthier Minor",
  description:
    "Cinq questions pour cadrer votre projet de site internet, d'e-commerce ou d'application. Réponse personnelle sous 24h.",
};

export default function QuestionnairePage() {
  return (
    <main className="flex-1 px-5 sm:px-10 pt-40 pb-32">
      <PageHeader
        className="mb-20"
        title={
          <>
            <SplitText text="Votre projet," immediate />
            <br />
            <span className="font-serif italic font-normal text-signal">
              <SplitText text="en cinq questions." immediate delay={0.2} />
            </span>
          </>
        }
        aside={
          <p>
            Type de projet, objectifs, existant, calendrier et coordonnées. Deux minutes suffisent, et je vous réponds
            personnellement sous 24h.
          </p>
        }
      />
      <ProjectQuestionnaire />
    </main>
  );
}
