"use client";

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * EXPERIENCE CONCEPT: "The period fills in as you read"
 *
 * No timeline spine, no dots, no cards. Each job is a row. The time period
 * sits on the left in big outlined type and fills with the accent colour as
 * you scroll through that job, so the dates act as the timeline. Responsibilities
 * are a plain ledger of lines instead of bullet icons.
 */

type Experience = (typeof siteConfig.experience)[number];

function ExperienceRow({
  exp,
  reduce,
}: {
  exp: Experience;
  reduce: boolean;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const periodClass =
    "font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1] tracking-tight";

  return (
    <li
      ref={rowRef}
      className="grid grid-cols-1 gap-8 border-t border-white/12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16"
    >
      {/* Period: outlined, then filled by scroll progress */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <div className="relative">
            <p
              className={`${periodClass} text-transparent`}
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}
            >
              {exp.period}
            </p>
            <motion.p
              aria-hidden="true"
              className={`${periodClass} absolute inset-0 text-[var(--accent)]`}
              style={reduce ? undefined : { clipPath }}
            >
              {exp.period}
            </motion.p>
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            {exp.location}
          </p>
        </div>
      </div>

      {/* Role, summary, responsibilities */}
      <div className="lg:col-span-8">
        <p className="text-sm text-[var(--text-muted)]">{exp.type}</p>
        <h3 className="mt-2 font-display text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-tight text-white">
          {exp.role}
        </h3>
        <p className="mt-2 text-lg text-[var(--text-secondary)]">
          {exp.company}
        </p>

        {exp.isEditablePlaceholder && (
          <p className="mt-3 text-sm text-[var(--accent)]">
            Placeholder entry. Edit the details in data/site.ts.
          </p>
        )}

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {exp.summary}
        </p>

        <ul className="mt-8 max-w-2xl">
          {exp.highlights.map((item, i) => (
            <li
              key={i}
              className="border-t border-white/10 py-3.5 text-[0.95rem] leading-relaxed text-white/90 last:border-b"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          Built with {exp.stack.join(", ")}.
        </p>
      </div>
    </li>
  );
}

export function ExperienceSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-sm text-[var(--text-muted)] lg:col-span-4">
            Experience
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] lg:col-span-8">
            Hands-on work across web platforms, dashboards, mobile apps, APIs
            and team projects.
          </p>
        </div>

        <ol>
          {siteConfig.experience.map((exp) => (
            <ExperienceRow key={exp.id} exp={exp} reduce={reduce} />
          ))}
        </ol>
      </div>
    </section>
  );
}