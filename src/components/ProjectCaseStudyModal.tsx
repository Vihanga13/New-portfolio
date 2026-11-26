"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { DeviceMockup } from "./DeviceMockup";

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeBtnRef.current?.focus(), 40);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`case-study-title-${project.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
        >
          <motion.article
            layoutId={`project-card-${project.id}`}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0b0d12] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-code text-xs font-semibold text-[var(--accent)]">
                    PROJECT {project.number}
                  </span>
                  <span className="text-white/25" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-mono-code text-xs text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="rounded-full border border-[var(--accent)]/30 bg-[rgba(var(--accent-rgb),0.1)] px-2.5 py-0.5 font-mono-code text-[10px] text-[var(--accent)]">
                      {project.badge}
                    </span>
                  )}
                </div>
                <h3
                  id={`case-study-title-${project.id}`}
                  className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  {project.title}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable case study body */}
            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <DeviceMockup project={project} />
                </div>

                <div className="flex flex-col justify-between gap-4 lg:col-span-5">
                  <div>
                    <h4 className="font-mono-code text-xs uppercase tracking-wider text-[var(--accent)]">
                      Overview
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.caseStudy.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono-code text-xs uppercase tracking-wider text-white/80">
                      Technologies Used
                    </h4>
                    {project.technologies.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono-code text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-3 py-2 font-mono-code text-xs text-[var(--text-muted)]">
                        {project.technologiesNote ||
                          "Editable in data/projects.ts"}
                      </p>
                    )}
                  </div>

                  {/* Links only rendered when actually provided */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-fg)]"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white hover:border-[var(--accent)]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Structured Case Study Breakdown */}
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-2.5 flex items-center gap-2 text-white">
                    <AlertCircle className="h-4 w-4 text-[var(--accent)]" />
                    <h4 className="font-display text-base font-semibold">
                      Problem Being Solved
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.caseStudy.problem}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-2.5 flex items-center gap-2 text-white">
                    <Wrench className="h-4 w-4 text-[var(--accent)]" />
                    <h4 className="font-display text-base font-semibold">
                      My Responsibilities
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {project.caseStudy.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-2.5 flex items-center gap-2 text-white">
                    <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                    <h4 className="font-display text-base font-semibold">
                      Key Features
                    </h4>
                  </div>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                    {project.caseStudy.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-2.5 flex items-center gap-2 text-white">
                    <Layers className="h-4 w-4 text-[var(--accent)]" />
                    <h4 className="font-display text-base font-semibold">
                      Development Challenges
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {project.caseStudy.challenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
