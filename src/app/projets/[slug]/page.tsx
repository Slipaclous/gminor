import React, { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDbProjects, getDbProjectBySlug } from "@/lib/projects-service";
import { CtaBanner } from "@/components/home/cta-banner";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { projectShot } from "@/lib/project-shots";

interface ProjectDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getDbProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: `${project.title} — Étude de cas | Gauthier Minor`,
    description: project.tagline || project.description,
  };
}

function Chapter({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid md:grid-cols-12 gap-6 py-16 sm:py-24 border-t border-line">
      <div className="md:col-span-4">
        <h2 className="font-serif italic text-4xl sm:text-5xl">{title}</h2>
      </div>
      <div className="md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const all = await getDbProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all[(index + 1) % all.length];
  const gallery = (project.gallery ?? []).filter(Boolean);

  return (
    <main className="flex-1">
      <section className="px-5 sm:px-10 pt-36 pb-12">
        <Link href="/projets" className="font-mono text-xs text-paper-mute hover:text-signal transition-colors">
          ← Toutes les réalisations
        </Link>
        <h1 className="mt-10 text-[14vw] sm:text-[9vw] leading-[0.88] tracking-[-0.055em] font-medium">
          <SplitText text={project.title} immediate />
        </h1>
        <div className="mt-10 grid md:grid-cols-12 gap-8">
          <p className="md:col-span-6 text-xl sm:text-2xl leading-snug text-paper-dim">{project.tagline}</p>
          <dl className="md:col-span-5 md:col-start-8 grid grid-cols-2 gap-6 text-sm">
            {[
              ["Client", project.client ?? project.title],
              ["Rôle", project.role],
              ["Année", project.year],
              ["Catégorie", project.categoryLabel],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-line pt-3">
                <dt className="font-mono text-xs text-moss/80">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-signal text-ink px-6 py-3 font-medium hover:bg-paper transition-colors"
          >
            Voir le site en ligne ↗
          </a>
        )}
      </section>

      <div className="px-5 sm:px-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-3">
          <ViewTransition name={`project-${project.slug}`}>
            <Image src={projectShot(project)} alt={project.title} fill priority sizes="100vw" className="object-cover object-top" />
          </ViewTransition>
        </div>
      </div>

      {project.metrics.length > 0 && (
        <section className="px-5 sm:px-10 mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
          {project.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="bg-ink py-10 pr-6">
              <p className="font-serif italic text-4xl sm:text-5xl text-signal">{m.value}</p>
              <p className="mt-2 text-sm text-paper-dim">{m.label}</p>
            </Reveal>
          ))}
        </section>
      )}

      <div className="px-5 sm:px-10 mt-16">
        <Chapter title="Le contexte">
          <Reveal>
            <p className="text-xl sm:text-2xl leading-relaxed">{project.challenge}</p>
          </Reveal>
        </Chapter>

        <Chapter title="L'approche">
          <Reveal>
            <p className="text-lg leading-relaxed text-paper-dim">{project.solution}</p>
          </Reveal>
          {project.modules && project.modules.length > 0 && (
            <div className="mt-12 space-y-px bg-line">
              {project.modules.map((mod) => (
                <Reveal key={mod.title} className="bg-ink py-6">
                  <p className="font-mono text-xs text-moss/80">{mod.subtitle}</p>
                  <h3 className="mt-1 text-2xl font-medium tracking-tight">{mod.title}</h3>
                  <p className="mt-2 text-paper-dim">{mod.description}</p>
                </Reveal>
              ))}
            </div>
          )}
        </Chapter>
      </div>

      {gallery.length > 0 && (
        <section className="px-5 sm:px-10 grid sm:grid-cols-2 gap-4 sm:gap-6 py-8">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 0.1} className={`relative aspect-[4/3] overflow-hidden bg-ink-3 ${i % 3 === 2 ? "sm:col-span-2 sm:aspect-[21/9]" : ""}`}>
              <Image src={src} alt={`${project.title} — visuel ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
            </Reveal>
          ))}
        </section>
      )}

      <div className="px-5 sm:px-10">
        <Chapter title="Les résultats">
          <ul className="space-y-6">
            {project.results.map((r, i) => (
              <Reveal key={r} delay={i * 0.05}>
                <li className="flex gap-6 text-lg leading-relaxed">
                  <span className="font-mono text-xs text-moss pt-2">✓</span>
                  <span>{r}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Chapter>
      </div>

      {project.techStack.length > 0 && (
        <Marquee
          items={project.techStack}
          duration={Math.max(20, project.techStack.length * 3)}
          className="border-y border-line py-5 text-3xl sm:text-5xl tracking-tight font-medium"
        />
      )}

      {next && next.slug !== project.slug && (
        <Link
          href={`/projets/${next.slug}`}
          data-cursor="Suivant"
          className="group relative block px-5 sm:px-10 py-24 sm:py-32 overflow-hidden"
        >
          <Image
            src={projectShot(next)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-0 scale-110 transition-all duration-1000 ease-expo group-hover:opacity-30 group-hover:scale-100"
          />
          <p className="relative font-mono text-xs text-paper-mute">Projet suivant</p>
          <p className="relative mt-4 text-[12vw] sm:text-[8vw] leading-[0.9] tracking-[-0.05em] font-medium transition-all duration-700 group-hover:font-serif group-hover:italic">
            {next.title} →
          </p>
        </Link>
      )}

      <CtaBanner />
    </main>
  );
}
