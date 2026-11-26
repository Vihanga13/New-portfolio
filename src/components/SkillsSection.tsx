"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * SKILLS CONCEPT: "The index"
 *
 * No cards, no icon tiles, no pill tags. Each skill category is one huge line
 * of type. Pick a line and it opens to show what is inside it, like opening
 * a drawer. The motion only happens in response to a click, so it shows
 * what changed instead of decorating the page.
 */

export function SkillsSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const categories = siteConfig.skills;
  const [openId, setOpenId] = useState<string | null>(categories[0]?.id ?? null);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-sm text-[var(--text-muted)] lg:col-span-4">
            Skills
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] lg:col-span-8">
            Grouped by what each tool is used for, not scored with percentages.
            Pick a line to see what is inside it.
          </p>
        </div>

        <ul className="border-b border-white/12">
          {categories.map((category) => {
            const isOpen = openId === category.id;
            const panelId = `skills-panel-${category.id}`;
            const buttonId = `skills-button-${category.id}`;

            return (
              <li key={category.id} className="border-t border-white/12">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : category.id)}
                    className="group flex w-full items-baseline justify-between gap-6 py-5 text-left sm:py-7"
                  >
                    <span
                      className={`font-display text-[clamp(1.75rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                        isOpen
                          ? "text-[var(--accent)]"
                          : "text-white/55 group-hover:text-white"
                      }`}
                    >
                      {category.title}
                    </span>

                    <span className="flex shrink-0 items-center gap-4 text-sm text-[var(--text-muted)]">
                      <span className="hidden sm:inline">
                        {category.skills.length} tools
                      </span>
                      <span
                        aria-hidden="true"
                        className={`relative block h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                      </span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 pb-9 lg:grid-cols-12 lg:gap-16">
                        <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)] lg:col-span-4">
                          {category.subtitle}
                        </p>

                        <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-8">
                          {category.skills.map((skill) => (
                            <li
                              key={skill}
                              className="text-lg text-white transition-colors hover:text-[var(--accent)] sm:text-xl"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}