"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FolderGit2,
  Hash,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import { AccentTheme, siteConfig } from "@/data/site";
import { projectsData, ProjectItem } from "@/data/projects";
import { useAccentTheme } from "./ThemeProvider";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

interface PaletteAction {
  id: string;
  group: "Sections" | "Projects" | "Profiles & Contact" | "Accent Theme";
  label: string;
  hint?: string;
  keywords: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setAccent, accent } = useAccentTheme();

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const actions = useMemo<PaletteAction[]>(() => {
    const jump = (id: string) => {
      onClose();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const sectionItems: PaletteAction[] = [
      { id: "sec-home", group: "Sections", label: "Go to Home", hint: "01", keywords: "home hero top", icon: <Hash className="h-4 w-4" />, run: () => jump("home") },
      { id: "sec-about", group: "Sections", label: "Go to About Me", hint: "02", keywords: "about bio background", icon: <Hash className="h-4 w-4" />, run: () => jump("about") },
      { id: "sec-skills", group: "Sections", label: "Go to Technical Skills", hint: "03", keywords: "skills stack tech bento", icon: <Hash className="h-4 w-4" />, run: () => jump("skills") },
      { id: "sec-projects", group: "Sections", label: "Go to Featured Projects", hint: "04", keywords: "projects portfolio work", icon: <Hash className="h-4 w-4" />, run: () => jump("projects") },
      { id: "sec-exp", group: "Sections", label: "Go to Experience", hint: "05", keywords: "experience career timeline", icon: <Hash className="h-4 w-4" />, run: () => jump("experience") },
      { id: "sec-edu", group: "Sections", label: "Go to Education", hint: "06", keywords: "education nsbm plymouth degree", icon: <Hash className="h-4 w-4" />, run: () => jump("education") },
      { id: "sec-gh", group: "Sections", label: "Go to GitHub Activity", hint: "GH", keywords: "github repos contributions", icon: <Hash className="h-4 w-4" />, run: () => jump("github") },
      { id: "sec-contact", group: "Sections", label: "Go to Contact", hint: "07", keywords: "contact email hire message", icon: <Hash className="h-4 w-4" />, run: () => jump("contact") },
    ];

    const projectItems: PaletteAction[] = projectsData.map((p) => ({
      id: `proj-${p.id}`,
      group: "Projects",
      label: `${p.number} · ${p.title}`,
      hint: p.category,
      keywords: `${p.title} ${p.category} ${p.technologies.join(" ")}`,
      icon: <FolderGit2 className="h-4 w-4" />,
      run: () => {
        onClose();
        onSelectProject(p);
      },
    }));

    const profileItems: PaletteAction[] = [
      {
        id: "open-github",
        group: "Profiles & Contact",
        label: "Open GitHub (@Vihanga13)",
        hint: "External",
        keywords: "github profile code repositories",
        icon: <ExternalLink className="h-4 w-4" />,
        run: () => {
          window.open(siteConfig.github.profileUrl, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "open-linkedin",
        group: "Profiles & Contact",
        label: "Open LinkedIn (vihanga-nilusha)",
        hint: "External",
        keywords: "linkedin profile connect",
        icon: <ExternalLink className="h-4 w-4" />,
        run: () => {
          const li = siteConfig.socials.find((s) => s.platform === "linkedin");
          if (li) window.open(li.href, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "copy-email",
        group: "Profiles & Contact",
        label: siteConfig.contact.email
          ? copiedEmail
            ? "Email copied to clipboard"
            : `Copy email (${siteConfig.contact.email})`
          : "Jump to Contact form (email configurable in data/site.ts)",
        hint: siteConfig.contact.email ? "Copy" : "Form",
        keywords: "email copy mail contact",
        icon: copiedEmail ? <Check className="h-4 w-4 text-[var(--accent)]" /> : <Copy className="h-4 w-4" />,
        run: async () => {
          if (siteConfig.contact.email && navigator.clipboard) {
            await navigator.clipboard.writeText(siteConfig.contact.email);
            setCopiedEmail(true);
            window.setTimeout(() => setCopiedEmail(false), 1800);
          } else {
            jump("contact");
          }
        },
      },
    ];

    const themeItems: PaletteAction[] = (
      [
        { id: "lime", label: "Accent: Electric Lime" },
        { id: "violet", label: "Accent: Subtle Violet" },
        { id: "cyan", label: "Accent: Electric Cyan" },
      ] as { id: AccentTheme; label: string }[]
    ).map((t) => ({
      id: `theme-${t.id}`,
      group: "Accent Theme",
      label: t.label,
      hint: accent === t.id ? "Active" : "Switch",
      keywords: `theme color accent ${t.id}`,
      icon: <Palette className="h-4 w-4" />,
      run: () => {
        setAccent(t.id);
      },
    }));

    return [...sectionItems, ...projectItems, ...profileItems, ...themeItems];
  }, [accent, copiedEmail, onClose, onSelectProject, setAccent]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.keywords.toLowerCase().includes(q) ||
        (a.hint && a.hint.toLowerCase().includes(q))
    );
  }, [actions, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0d0f14] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-[var(--accent)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, open project, switch accent…"
                aria-label="Search commands"
                className="w-full bg-transparent text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none"
              />
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
                ESC
              </kbd>
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Sparkles className="mb-2 h-5 w-5 text-[var(--text-muted)]" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    No matching commands for &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={item.run}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        selected
                          ? "bg-[rgba(var(--accent-rgb),0.14)] text-white"
                          : "text-[var(--text-secondary)] hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-3 truncate">
                        <span
                          className={
                            selected
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-muted)]"
                          }
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="ml-3 flex shrink-0 items-center gap-2">
                        {item.hint && (
                          <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
                            {item.hint}
                          </span>
                        )}
                        {selected && (
                          <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)]" />
                        )}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono-code text-[11px] text-[var(--text-muted)]">
              <span>↑↓ Navigate · ↵ Select</span>
              <span>Ctrl / ⌘ + K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

