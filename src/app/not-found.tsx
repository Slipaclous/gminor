import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 min-h-svh flex flex-col justify-center px-5 sm:px-10">
      <p className="text-[40vw] leading-[0.8] tracking-[-0.07em] font-medium">
        4<span className="font-serif italic text-signal">0</span>4
      </p>
      <p className="mt-8 text-xl text-paper-dim">Cette page s&apos;est perdue en chemin.</p>
      <Link href="/" className="mt-6 self-start border-b border-paper pb-1 hover:text-signal hover:border-signal transition-colors">
        Retour à l&apos;accueil →
      </Link>
    </main>
  );
}
