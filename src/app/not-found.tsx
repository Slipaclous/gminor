import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 bg-[#fafaf8]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Erreur 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18191f] tracking-tight">
            Page introuvable
          </h1>
          <p className="text-sm text-[#555765] leading-relaxed">
            La page que vous recherchez a été déplacée ou n&apos;existe plus. Vous pouvez revenir à la page d&apos;accueil ou parcourir les réalisations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#18191f] text-white hover:bg-[#2d2e38] transition-colors shadow-md active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/projets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-[#18191f] bg-white border border-[#e6e6df] hover:bg-[#f4f4f0] transition-colors shadow-xs cursor-pointer"
          >
            <span>Voir les réalisations</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>
      </div>
    </main>
  );
}
