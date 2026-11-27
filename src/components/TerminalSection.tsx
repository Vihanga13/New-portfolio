"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";
import { submitContactMessage } from "@/lib/contact";

/**
 * QUICK ANSWERS CONCEPT: "Pick a question"
 *
 * Visitors see recruiter questions set as large type on the left and typed
 * answers on the right. Power users can also type commands (`about`, `skills`,
 * `projects`, `contact`, `message`, `whoami`, `help`, `clear`,
 * `sudo hire vihanga`), and send a note directly via Formspree.
 */

interface Answer {
  title: string;
  lines: string[];
  actionHref?: string;
  actionLabel?: string;
  showQuickSend?: boolean;
}

const QUESTIONS = [
  { label: "Who are you?", cmd: "about" },
  { label: "What do you build with?", cmd: "skills" },
  { label: "What have you built?", cmd: "projects" },
  { label: "Are you available?", cmd: "whoami" },
  { label: "How do I reach you?", cmd: "contact" },
  { label: "Send a quick note", cmd: "message" },
  { label: "Can I hire you?", cmd: "sudo hire vihanga" },
];

function getAnswer(cmd: string): Answer {
  switch (cmd) {
    case "about":
      return {
        title: "Who are you?",
        lines: [
          `${siteConfig.person.name}, ${siteConfig.person.shortTitle}.`,
          `${siteConfig.education.degree} (${siteConfig.education.classification}, ${siteConfig.education.graduation}) at ${siteConfig.education.institution}, in collaboration with ${siteConfig.education.partner}.`,
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
          `Location: ${siteConfig.contact.location}`,
          `LinkedIn: ${linkedInHref ?? "see the Contact section"}`,
          `GitHub: ${siteConfig.github.profileUrl}`,
          siteConfig.contact.email
            ? `Email: ${siteConfig.contact.email}`
            : "Email: use the contact form (configurable in data/site.ts).",
          ...(siteConfig.contact.phone
            ? [`Phone: ${siteConfig.contact.phone}`]
            : []),
        ],
        actionHref: "#contact",
        actionLabel: "Open the full contact form",
        showQuickSend: true,
      };
    }
    case "message":
    case "send":
    case "hire":
      return {
        title: "Send a quick note",
        lines: [
          "Drop your name, email, and message below to send directly to my inbox via Formspree.",
        ],
        actionHref: "#contact",
        actionLabel: "Or jump to the Contact section",
        showQuickSend: true,
      };
    case "sudo hire vihanga":
      return {
        title: "Can I hire you?",
        lines: [
          "Access granted. Let's build something impactful together.",
          "Ready to collaborate on web, mobile and AI projects — send a quick note below or jump to Contact.",
        ],
        actionHref: "#contact",
        actionLabel: "Open full contact form",
        showQuickSend: true,
      };
    case "help":
      return {
        title: "help",
        lines: [
          "Pick a question on the left, or type one of these commands:",
          "about, skills, projects, contact, message, whoami, clear, sudo hire vihanga",
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

  // Inline quick-send Formspree state
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
      setSendStatus(null);
      return;
    }

    setActiveCmd(cmd);
    setAnswer(getAnswer(cmd));
    setInput("");
    setSendStatus(null);

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

  const handleQuickSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendStatus(null);
    setSending(true);

    const result = await submitContactMessage({
      name: senderName,
      email: senderEmail,
      subject:
        activeCmd === "sudo hire vihanga"
          ? "Hiring inquiry from Terminal"
          : "Quick note from Terminal",
      message: senderMessage,
      source: "terminal",
    });

    if (result.ok) {
      setSendStatus({ type: "success", text: result.message });
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
    } else {
      setSendStatus({ type: "error", text: result.message });
    }

    setSending(false);
  };

  return (
    <section aria-label="Quick answers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
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
                placeholder='or type a command, e.g. "message" or "help"'
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

                {/* Inline Formspree quick-send form */}
                {answer.showQuickSend && !isTyping && (
                  <form
                    onSubmit={handleQuickSend}
                    noValidate
                    className="mt-8 max-w-xl space-y-5 border-t border-white/12 pt-6"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="terminal-sender-name"
                          className="block text-xs text-[var(--text-muted)]"
                        >
                          Your name
                        </label>
                        <input
                          id="terminal-sender-name"
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Jane Doe"
                          className="mt-1.5 w-full border-0 border-b border-white/25 bg-transparent pb-2 text-sm text-white placeholder:text-white/25 focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="terminal-sender-email"
                          className="block text-xs text-[var(--text-muted)]"
                        >
                          Your email
                        </label>
                        <input
                          id="terminal-sender-email"
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="mt-1.5 w-full border-0 border-b border-white/25 bg-transparent pb-2 text-sm text-white placeholder:text-white/25 focus:border-[var(--accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="terminal-sender-message"
                        className="block text-xs text-[var(--text-muted)]"
                      >
                        Message
                      </label>
                      <textarea
                        id="terminal-sender-message"
                        rows={2}
                        required
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        placeholder="Quick note about a role, project, or collaboration..."
                        className="mt-1.5 w-full resize-y border-0 border-b border-white/25 bg-transparent pb-2 text-sm text-white placeholder:text-white/25 focus:border-[var(--accent)] focus:outline-none"
                      />
                    </div>

                    {sendStatus && (
                      <p
                        role="status"
                        aria-live="polite"
                        className={`border-l-2 pl-3 text-xs leading-relaxed ${
                          sendStatus.type === "success"
                            ? "border-[var(--accent)] text-white"
                            : "border-rose-400 text-rose-200"
                        }`}
                      >
                        {sendStatus.text}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-bright)] disabled:opacity-60"
                      >
                        {sending ? (
                          <>
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send via Formspree</span>
                            <Send className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        )}
                      </button>

                      {answer.actionHref && (
                        <a
                          href={answer.actionHref}
                          className="group inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-xs text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          {answer.actionLabel}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </form>
                )}

                {!answer.showQuickSend && answer.actionHref && !isTyping && (
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
