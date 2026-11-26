"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";

/**
 * TERMINAL CONCEPT: "Ask the site"
 *
 * Same commands as before, but without the fake terminal window (no title bar,
 * no glow card, no tiny mono text). It is one big prompt line: type a command
 * or pick one, and the answer prints below in readable text with a link that
 * jumps to the matching section.
 */

interface TerminalEntry {
  id: number;
  command: string;
  lines: string[];
  actionHref?: string;
  actionLabel?: string;
}

const QUICK_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "whoami",
  "sudo hire vihanga",
  "clear",
];

const MAX_ENTRIES = 4;

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 1,
      command: "help",
      lines: [
        "Available commands: about, skills, projects, contact, whoami, clear, sudo hire vihanga.",
        "Tip: pick a command below or type one and press Enter.",
      ],
    },
  ]);
  const counterRef = useRef(2);
  const inputRef = useRef<HTMLInputElement>(null);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let lines: string[] = [];
    let actionHref: string | undefined;
    let actionLabel: string | undefined;

    switch (cmd) {
      case "help":
        lines = [
          "about: education, focus and a short engineering summary",
          "skills: my frontend, backend, mobile, cloud and AI stack",
          `projects: ${projectsData.length} featured case studies`,
          "contact: location, profiles and the contact form",
          "whoami: a quick identity readout",
          "sudo hire vihanga: a small celebration, then the contact section",
          "clear: reset this output",
        ];
        break;
      case "about":
        lines = [
          `${siteConfig.person.name}, ${siteConfig.person.shortTitle}`,
          `Education: ${siteConfig.education.degree} (${siteConfig.education.classification}, ${siteConfig.education.graduation})`,
          `${siteConfig.education.institution} in collaboration with the University of Plymouth, UK.`,
        ];
        actionHref = "#about";
        actionLabel = "Jump to About";
        break;
      case "skills":
        lines = siteConfig.skills.map(
          (cat) => `${cat.title}: ${cat.skills.join(", ")}`
        );
        actionHref = "#skills";
        actionLabel = "Jump to Skills";
        break;
      case "projects":
        lines = projectsData.map(
          (p) => `${p.title} (${p.category}): ${p.tagline}`
        );
        actionHref = "#projects";
        actionLabel = "Jump to Projects";
        break;
      case "contact": {
        const linkedInHref = siteConfig.socials.find(
          (s) => s.platform === "linkedin"
        )?.href;
        lines = [
          `Location: ${siteConfig.person.location}`,
          `LinkedIn: ${linkedInHref ?? "see the Contact section"}`,
          `GitHub: ${siteConfig.github.profileUrl}`,
          siteConfig.contact.email
            ? `Email: ${siteConfig.contact.email}`
            : "Email: use the contact form (configurable in data/site.ts).",
        ];
        actionHref = "#contact";
        actionLabel = "Jump to Contact";
        break;
      }
      case "whoami":
        lines = [
          `vihanga@colombo:~$ ${siteConfig.person.name}`,
          `Role: ${siteConfig.person.fullTitle}`,
          `Status: ${siteConfig.person.availability.label}`,
        ];
        break;
      case "sudo hire vihanga":
        lines = [
          "Access granted. Let's build something impactful together.",
          "Ready to collaborate on web, mobile and AI projects.",
        ];
        actionHref = "#contact";
        actionLabel = "Open the contact section";
        try {
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          if (!reduced) {
            confetti({
              particleCount: 70,
              spread: 68,
              origin: { y: 0.72 },
            });
          }
        } catch {
          // Ignore confetti errors
        }
        break;
      default:
        lines = [
          `Command not found: "${cmd}". Type "help" to see what is available.`,
        ];
    }

    setHistory((prev) => [
      ...prev.slice(-(MAX_ENTRIES - 1)),
      {
        id: counterRef.current++,
        command: cmd,
        lines,
        actionHref,
        actionLabel,
      },
    ]);
    setInput("");
  };

  return (
    <section aria-label="Quick answers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-t border-white/12 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Skip the scrolling
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--text-secondary)]">
              Type a command, or pick one, to get a short answer and a link to
              that part of the site.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {QUICK_COMMANDS.map((cmd) => (
                <li key={cmd}>
                  <button
                    type="button"
                    onClick={() => {
                      runCommand(cmd);
                      inputRef.current?.focus();
                    }}
                    className="border-b border-white/25 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {cmd}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            {/* Answers */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Command output"
              className="min-h-[12rem] space-y-8"
            >
              {history.length === 0 && (
                <p className="text-base text-[var(--text-muted)]">
                  Nothing here yet. Type &quot;help&quot; to see what you can
                  ask.
                </p>
              )}

              {history.map((entry) => (
                <div key={entry.id}>
                  <p className="font-display text-2xl font-semibold text-[var(--accent)]">
                    <span aria-hidden="true">&rsaquo; </span>
                    {entry.command}
                  </p>
                  <div className="mt-3 space-y-1.5 text-base leading-relaxed text-[var(--text-secondary)]">
                    {entry.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  {entry.actionHref && (
                    <a
                      href={entry.actionHref}
                      className="group mt-4 inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {entry.actionLabel}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(input);
              }}
              className="mt-10 flex items-baseline gap-3 border-b-2 border-white/30 pb-3 transition-colors focus-within:border-[var(--accent)]"
            >
              <label htmlFor="portfolio-terminal-input" className="sr-only">
                Type a command
              </label>
              <span
                aria-hidden="true"
                className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] text-[var(--accent)]"
              >
                &rsaquo;
              </span>
              <input
                ref={inputRef}
                id="portfolio-terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='try "projects"'
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent font-display text-[clamp(1.5rem,3.4vw,2.5rem)] text-white placeholder:text-white/25 focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}