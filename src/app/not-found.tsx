import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Terminal Window Mockup */}
        <div className="rounded-3xl bg-[#0d0d10] border border-white/[0.12] overflow-hidden shadow-2xl text-left">
          {/* Terminal Header */}
          <div className="px-4 py-3 bg-[#121318] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-zinc-400">
              HTTP 404 — Not Found
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 space-y-4 font-mono text-xs text-zinc-300">
            <p className="text-zinc-500">
              $ curl -I https://gminor.dev/requested-url
            </p>
            <p className="text-red-400 font-bold">
              HTTP/2 404 NOT FOUND
            </p>
            <p className="text-zinc-400 font-normal leading-relaxed">
              La ressource demandée n&apos;existe pas ou a été déplacée vers une nouvelle architecture.
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Système opérationnel • Redirection suggérée</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/projets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 border border-white/[0.1] hover:border-white/[0.25] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Voir les projets récents</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
