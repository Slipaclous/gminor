import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DeleteMessageButton } from "@/components/admin/delete-message-button";
import { Mail, Clock, Building2, User, MessageSquare, DollarSign, Send, ArrowUpRight } from "lucide-react";

export default async function AdminMessagesPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  let messages: Array<{
    id: string;
    name: string;
    email: string;
    company: string | null;
    budget: string | null;
    service: string | null;
    message: string;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
      messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (err) {
    console.warn("Prisma messages query fallback:", err);
  }

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Demandes Reçues &amp; Devis ({messages.length})
          </h1>
          <p className="text-sm text-zinc-400">
            Consultez les demandes de devis et préférences de contact soumises par vos prospects (notifiées également par Resend).
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((msg) => {
          const isSimulated = msg.message.includes("[DEMANDE DE PROJET & DEVIS DU SIMULATEUR]");

          return (
            <div
              key={msg.id}
              className="rounded-3xl bg-[#0d0d10] border border-white/[0.08] p-6 sm:p-8 space-y-4 shadow-xl hover:border-white/[0.2] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-white font-bold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{msg.name}</h3>
                      {isSimulated && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                          Simulateur de devis
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-zinc-400 hover:text-white underline font-mono"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Meta Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {msg.company && (
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-black border border-white/[0.08] text-zinc-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{msg.company}</span>
                  </span>
                )}
                {msg.service && (
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-black border border-white/[0.08] text-zinc-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>{msg.service}</span>
                  </span>
                )}
                {msg.budget && (
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-zinc-900 border border-white/[0.1] text-emerald-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{msg.budget}</span>
                  </span>
                )}
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-2xl bg-black border border-white/[0.06] text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                {msg.message}
              </div>

              {/* Actions: Reply & Delete */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/[0.06]">
                <DeleteMessageButton messageId={msg.id} senderName={msg.name} />

                <a
                  href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Votre projet ${msg.service || ""} - G-Minor`)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Répondre par Email</span>
                </a>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="p-12 rounded-3xl bg-[#0d0d10] border border-white/[0.08] text-center space-y-3">
            <Mail className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Aucun message pour le moment</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Les messages soumis depuis le formulaire ou le simulateur de devis s&apos;afficheront ici et vous seront transmis par email via Resend.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
