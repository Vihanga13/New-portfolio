"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem, projectsData } from "@/data/projects";
import { DeviceMockup } from "./DeviceMockup";

/**
 * PROJECTS CONCEPT: "The sticky table of contents"
 *
 * Desktop is split in two. On the left, the list of project titles stays
 * fixed on screen. On the right, each project gets a big panel with its
 * mockup and story. As you scroll, the title of the project you are looking
 * at lights up on the left, and you can click any title to jump to it.
 * One idea, no gimmicks. On mobile it becomes a simple stack of panels.
 */

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const [activeId, setActiveId] = useState<string | number>(
    projectsData[0]?.id ?? ""
  );
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});

  // Highlight the project whose panel is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-project-id");
            if (id) {
              const match = projectsData.find((p) => String(p.id) === id);
              if (match) setActiveId(match.id);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    Object.values(panelRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jumpTo = (project: ProjectItem) => {
    panelRefs.current[String(project.id)]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-sm text-[var(--text-muted)] lg:col-span-5">
            Selected work
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] lg:col-span-7">
            Web, mobile and AI projects. Each one opens into a full case study:
            the problem, what I built and what was hard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 border-t border-white/12 pt-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky title list (desktop only) */}
          <nav
            aria-label="Projects"
            className="hidden lg:col-span-5 lg:block"
          >
            <ul className="sticky top-28 space-y-2">
              {projectsData.map((project) => {
                const isActive = activeId === project.id;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(project)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block w-full text-left font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.1] tracking-tight transition-all duration-300 ${
                        isActive
                          ? "translate-x-3 text-[var(--accent)]"
                          : "text-white/30 hover:text-white/70"
                      }`}
                    >
                      {project.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: one big panel per project */}
          <div className="space-y-24 lg:col-span-7 lg:space-y-32">
            {projectsData.map((project) => {
              const isActive = activeId === project.id;
              return (
                <article
                  key={project.id}
                  data-project-id={String(project.id)}
                  ref={(el) => {
                    panelRefs.current[String(project.id)] = el;
                  }}
                  className="scroll-mt-28"
                >
                  <div
                    className={`transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "lg:opacity-60"
                    }`}
                  >
                    <DeviceMockup project={project} />
                  </div>

                  <h3 className="mt-8 font-display text-3xl font-bold tracking-tight text-white lg:sr-only">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm text-[var(--text-secondary)] lg:mt-8">
                    {project.category}
                    {project.badge && (
                      <span className="ml-4 text-[var(--accent)]">
                        {project.badge}
                      </span>
                    )}
                  </p>

                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/90">
                    {project.description}
                  </p>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                    {project.technologies.length > 0
                      ? `Built with ${project.technologies.join(", ")}.`
                      : project.technologiesNote ||
                        "Technologies are editable in data/projects.ts."}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-bright)]"
                    >
                      Open case study
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="group inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        Live demo
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="group inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        Repository
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}