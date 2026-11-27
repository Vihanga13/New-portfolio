"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";

/**
 * QUICK ANSWERS CONCEPT: "Pick a question"
 *
 * Instead of a terminal, visitors see the questions a recruiter would ask,
 * set as big type. Pick one and the answer types itself out on the right.
 * Click the answer to skip the typing. Power users can still type the old
 * commands (about, skills, projects, contact, whoami, help, clear,
 * sudo hire vihanga) into the small input underneath.
 * Every answer is pulled from your real site data. Nothing is invented.
 */

interface Answer {
  title: string;
  lines: string[];
  actionHref?: string;
  actionLabel?: string;
}

const QUESTIONS = [
  { label: "Who are you?", cmd: "about" },
  { label: "What do you build with?", cmd: "skills" },
  { label: "What have you built?", cmd: "projects" },
  { label: "Are you available?", cmd: "whoami" },
  { label: "How do I reach you?", cmd: "contact" },
  { label: "Can I hire you?", cmd: "sudo hire vihanga" },
];

function getAnswer(cmd: string): Answer | null {
  switch (cmd) {
    case "about":
      return {
        title: "Who are you?",
        lines: [
          `${siteConfig.person.name}, ${siteConfig.person.shortTitle}.`,
          `${siteConfig.education.degree} (${siteConfig.education.classification}, ${siteConfig.education.graduation}) at ${siteConfig.education.institution}, in collaboration with the University of Plymouth, UK.`,
        ],
        actionHref: "#about",
        actionLabel: "Read the full story",
      };
    case "skills":
      return {
        title: "What do you build with?",
        lines: siteConfig.skills.map(
          (cat) => `${cat.title}: ${cat.skills.join(", ")}`
        ),
        actionHref: "#skills",
        actionLabel: "Jump to Skills",
      };
    case "projects":
      return {
        title: "What have you built?",
        lines: projectsData.map(
          (p) => `${p.title} (${p.category}): ${p.tagline}`
        ),
        actionHref: "#projects",
        actionLabel: "Jump to Projects",
      };
    case "whoami":
      return {
        title: "Are you available?",
        lines: [
          `${siteConfig.person.name}, ${siteConfig.person.fullTitle}.`,
          `Status: ${siteConfig.person.availability.label}.`,
        ],
        actionHref: "#contact",
        actionLabel: "Get in touch",
      };
    case "contact": {
      const linkedInHref = siteConfig.socials.find(
        (s) => s.platform === "linkedin"
      )?.href;
      return {
        title: "How do I reach you?",
        lines: [
          `Location: ${siteConfig.person.location}`,
          `LinkedIn: ${linkedInHref ?? "see the Contact section"}`,
          `GitHub: ${siteConfig.github.profileUrl}`,
          siteConfig.contact.email
            ? `Email: ${siteConfig.contact.email}`
            : "Email: use the contact form (configurable in data/site.ts).",
        ],
        actionHref: "#contact",
        actionLabel: "Open the contact form",
      };
    }
    case "sudo hire vihanga":
      return {
        title: "Can I hire you?",
        lines: [
          "Access granted. Let's build something impactful together.",
          "Ready to collaborate on web, mobile and AI projects.",
        ],
        actionHref: "#contact",
        actionLabel: "Start the conversation",
      };
    case "help":
      return {
        title: "help",
        lines: [
          "Pick a question on the left, or type one of these commands:",
          "about, skills, projects, contact, whoami, clear, sudo hire vihanga",
        ],
      };
    default:
      return {
        title: cmd,
        lines: [
          `Command not found: "${cmd}". Type "help" to see what is available.`,
        ],
      };
  }
}

export function TerminalSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const [activeCmd, setActiveCmd] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [typed, setTyped] = useState(0);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fullText = useMemo(
    () => (answer ? answer.lines.join("\n") : ""),
    [answer]
  );
  const isTyping = typed < fullText.length;

  // Type the answer out, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (!answer) return;
    if (reduce) {
      setTyped(fullText.length);
      return;
    }
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((prev) => {
        if (prev >= fullText.length) {
          window.clearInterval(id);
          return prev;
        }
        return prev + 2;
      });
    }, 14);
    return () => window.clearInterval(id);
  }, [answer, fullText, reduce]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setAnswer(null);
      setActiveCmd(null);
      setInput("");
      return;
    }

    setActiveCmd(cmd);
    setAnswer(getAnswer(cmd));
    setInput("");

    if (cmd === "sudo hire vihanga") {
      try {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (!reduced) {
          confetti({ particleCount: 70, spread: 68, origin: { y: 0.72 } });
        }
      } catch {
        // Ignore confetti errors
      }
    }
  };

  return (
    <section aria-label="Quick answers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-t border-white/12 pt-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: the questions */}
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-sm text-[var(--text-muted)]">
              Quick answers
            </h2>

            <ul className="space-y-1">
              {QUESTIONS.map((q) => {
                const isActive = activeCmd === q.cmd;
                return (
                  <li key={q.cmd}>
                    <button
                      type="button"
                      onClick={() => run(q.cmd)}
                      aria-pressed={isActive}
                      className={`block w-full text-left font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.15] tracking-tight transition-all duration-300 ${
                        isActive
                          ? "translate-x-3 text-[var(--accent)]"
                          : "text-white/45 hover:text-white"
                      }`}
                    >
                      {q.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
              }}
              className="mt-10 flex items-baseline gap-3 border-b border-white/25 pb-2 transition-colors focus-within:border-[var(--accent)]"
            >
              <label htmlFor="quick-answers-input" className="sr-only">
                Or type a command
              </label>
              <span aria-hidden="true" className="text-[var(--accent)]">
                &rsaquo;
              </span>
              <input
                ref={inputRef}
                id="quick-answers-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='or type a command, e.g. "help"'
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </form>
          </div>

          {/* Right: the answer stage */}
          <div className="min-h-[20rem] border-white/12 lg:col-span-7 lg:border-l lg:pl-14">
            {answer ? (
              <div>
                <h3 className="font-display text-2xl font-semibold text-white/90 sm:text-3xl">
                  {answer.title}
                </h3>

                {/* Typed text for sighted users; click to skip the typing */}
                <div
                  aria-hidden="true"
                  onClick={() => setTyped(fullText.length)}
                  className="mt-6 cursor-pointer whitespace-pre-line text-lg leading-relaxed text-[var(--text-secondary)]"
                >
                  {fullText.slice(0, typed)}
                  {isTyping && (
                    <span className="ml-0.5 inline-block h-5 w-[3px] translate-y-1 animate-pulse bg-[var(--accent)]" />
                  )}
                </div>

                {/* Full text for screen readers, announced once */}
                <p role="status" className="sr-only whitespace-pre-line">
                  {fullText}
                </p>

                {answer.actionHref && !isTyping && (
                  <a
                    href={answer.actionHref}
                    className="group mt-8 inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {answer.actionLabel}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            ) : (
              <p className="max-w-sm text-lg leading-relaxed text-[var(--text-muted)]">
                Pick a question and the answer shows up here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}