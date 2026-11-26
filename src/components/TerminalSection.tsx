"use client";

import React, { useRef, useState } from "react";
import { Terminal as TerminalIcon, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";
import { GlowCard } from "./ui/GlowCard";

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

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 1,
      command: "help",
      lines: [
        "Available commands: about, skills, projects, contact, whoami, clear, sudo hire vihanga",
        "Tip: Click a preset command below or type directly and press Enter.",
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
          "about             — Education, focus, and engineering summary",
          "skills            — Core frontend, backend, mobile, cloud & AI stack",
          "projects          — 5 featured case studies (SkillForz, Nutritious App, …)",
          "contact           — Location, profiles, and direct contact section",
          "whoami            — Quick developer identity readout",
          "sudo hire vihanga — Trigger celebration & jump to contact",
          "clear             — Reset terminal output",
        ];
        break;
      case "about":
        lines = [
          `${siteConfig.person.name} — ${siteConfig.person.shortTitle}`,
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
        actionLabel = "Explore Skills Bento";
        break;
      case "projects":
        lines = projectsData.map(
          (p) => `${p.number}. ${p.title} [${p.category}] — ${p.tagline}`
        );
        actionHref = "#projects";
        actionLabel = "View Projects";
        break;
      case "contact":
        lines = [
          `Location: ${siteConfig.person.location}`,
          `LinkedIn: ${siteConfig.socials.find((s) => s.platform === "linkedin")?.href}`,
          `GitHub: ${siteConfig.github.profileUrl}`,
          siteConfig.contact.email
            ? `Email: ${siteConfig.contact.email}`
            : "Email: Use the Contact form below (configurable in data/site.ts).",
        ];
        actionHref = "#contact";
        actionLabel = "Go to Contact Form";
        break;
      case "whoami":
        lines = [
          `vihanga@colombo:~$ ${siteConfig.person.name}`,
          `Role: ${siteConfig.person.fullTitle}`,
          `Status: ${siteConfig.person.availability.label}`,
        ];
        break;
      case "sudo hire vihanga":
        lines = [
          "[sudo] access granted: Let's build something impactful together.",
          "Launching confetti… Ready to collaborate on Web, Mobile, and AI projects.",
        ];
        actionHref = "#contact";
        actionLabel = "Open Contact Section";
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
          `Command not found: "${cmd}". Type "help" to see available commands.`,
        ];
    }

    setHistory((prev) => [
      ...prev.slice(-6),
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
    <section aria-label="Interactive developer terminal" className="pb-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <GlowCard className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2.5">
              <TerminalIcon className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-mono-code text-xs font-medium text-white">
                vihanga-cli — interactive shell
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono-code text-[11px] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-white"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          <div
            onClick={() => inputRef.current?.focus()}
            className="cursor-text p-4 font-mono-code text-xs leading-relaxed sm:p-6 sm:text-[13px]"
          >
            <div className="space-y-4">
              {history.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-[var(--accent)]">❯</span>
                    <span>{entry.command}</span>
                  </div>
                  <div className="space-y-1 pl-4 text-[var(--text-secondary)]">
                    {entry.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    {entry.actionHref && (
                      <a
                        href={entry.actionHref}
                        className="mt-1 inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                      >
                        {entry.actionLabel}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(input);
              }}
              className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3"
            >
              <label htmlFor="portfolio-terminal-input" className="sr-only">
                Terminal command input
              </label>
              <span className="text-[var(--accent)]">❯</span>
              <input
                ref={inputRef}
                id="portfolio-terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Type a command (e.g. "about", "projects", "sudo hire vihanga")…'
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-white placeholder:text-[var(--text-muted)] focus:outline-none"
              />
            </form>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}

