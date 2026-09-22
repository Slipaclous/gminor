import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectVisual } from "@/components/projects/project-visual";

interface ProjectCardProps {
  project: ProjectItem;
  featuredLayout?: boolean;
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  const primaryMetric = project.metrics?.[0];

  return (
    <div className="group h-full flex flex-col justify-between rounded-3xl bg-white border border-[#e6e6df] hover:border-[#18191f]/40 p-5 sm:p-7 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div>
        {/* 1. Tailored Artistic Visual (Zero crop, brand & UI fidelity) */}
        <Link
          href={`/projets/${project.slug}`}
          className="block relative w-full overflow-hidden rounded-2xl cursor-pointer"
        >
          <ProjectVisual
            slug={project.slug}
            title={project.title}
            category={project.category}
            categoryLabel={project.categoryLabel}
            imageUrl={project.imageUrl}
            aspectRatio="aspect-[16/10]"
          />
        </Link>

        {/* 2. Editorial Information & Impact */}
        <div className="pt-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#555765] font-mono">
            <span>{project.client || "Client Confidentiel"}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#18191f] tracking-tight">
            <Link
              href={`/projets/${project.slug}`}
              className="hover:underline flex items-center justify-between gap-3 group/title"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-[#555765] group-hover/title:text-[#18191f] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all shrink-0" />
            </Link>
          </h3>

          <p className="text-sm text-[#555765] leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#555765] bg-[#fafaf8] border border-[#e6e6df]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 rounded-md text-[11px] font-mono text-[#555765]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Strip */}
      <div className="pt-5 mt-5 border-t border-[#e6e6df] flex items-center justify-between gap-4">
        <Link
          href={`/projets/${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#18191f] hover:text-emerald-700 transition-colors"
        >
          <span>Consulter l&apos;étude</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#555765] hover:text-[#18191f] transition-colors font-mono"
          >
            <span>Visiter</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
