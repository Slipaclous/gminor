import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/settings-service";
import { PageHeader } from "@/components/layout/page-header";
import { SplitText } from "@/components/motion/split-text";
import { CalEmbed } from "@/components/booking/cal-embed";

export const metadata: Metadata = {
  title: "Réserver un appel",
  description: "Choisissez un créneau pour un premier appel gratuit avec Gauthier Minor, développeur web freelance.",
};

export default async function BookingPage() {
  const { contactInfo } = await getSiteSettings();

  // No booking link configured in the admin yet: the contact form is the fallback.
  const url = contactInfo.calcomUrl ?? "";
  if (!url.startsWith("https://")) redirect("/contact");
  // Only Cal.com pages can be embedded; any other booking link opens in a new tab.
  const embeddable = /^https:\/\/(app\.)?cal\.(com|eu)\//.test(url);

  return (
    <main className="flex-1 px-5 sm:px-10 pt-40 pb-32">
      <PageHeader
        title={
          <>
            <SplitText text="Parlons-en" immediate />{" "}
            <span className="font-serif italic font-normal text-signal">
              <SplitText text="de vive voix." immediate delay={0.3} />
            </span>
          </>
        }
        aside={
          <>
            <p>Un premier appel gratuit et sans engagement pour cadrer votre projet.</p>
            <p className="font-mono text-xs text-moss">Visio · Gratuit · Sans engagement</p>
          </>
        }
      />

      <div className="mt-16 sm:mt-20">
        {embeddable ? (
          <CalEmbed url={url} />
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-signal text-ink px-6 py-3 font-medium hover:bg-paper transition-colors"
          >
            Choisir un créneau ↗
          </a>
        )}
      </div>

      <p className="mt-6 text-sm text-paper-dim">
        Aucun créneau ne vous convient&nbsp;?{" "}
        <Link href="/contact" className="border-b border-paper pb-0.5 hover:text-signal hover:border-signal transition-colors">
          Écrivez-moi
        </Link>
      </p>
    </main>
  );
}
