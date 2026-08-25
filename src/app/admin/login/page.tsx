"use client";

import React, { useActionState } from "react";
import { loginAdminAction, LoginState } from "@/app/actions/auth";
import { Logo } from "@/components/layout/logo";
import { Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(
    loginAdminAction,
    null
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0d13] px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Top brand */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Logo />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Espace Administrateur
            </h1>
            <p className="text-sm text-zinc-400">
              Gestion des projets et du portfolio Gauthier Minor
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-zinc-900/90 border border-white/[0.12] p-8 shadow-2xl space-y-6">
          {state?.error && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Mot de passe d&apos;accès
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoFocus
                  placeholder="Entrez votre mot de passe..."
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-zinc-950/90 border border-white/[0.14] text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-sans"
                />
                <Lock className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-zinc-300">
                (Mot de passe par défaut en dev : <code className="text-emerald-400 font-mono">admin123</code>)
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <span>Se connecter au Back-Office</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            ← Retourner sur le site public
          </Link>
        </div>
      </div>
    </div>
  );
}
