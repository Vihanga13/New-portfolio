"use client";

import React, { useState } from "react";
import { ImageIcon, Smartphone, Globe, Sparkles, Shield } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface DeviceMockupProps {
  project: ProjectItem;
  compact?: boolean;
}

function PlaceholderCanvas({
  project,
  isPhone,
}: {
  project: ProjectItem;
  isPhone: boolean;
}) {
  // Domain-authentic wireframe placeholders (no fake metrics)
  if (project.id === "nutritious-app") {
    return (
      <div className="flex h-full flex-col justify-between bg-gradient-to-b from-[#121815] to-[#0a0d0c] p-3.5 text-left">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[9px] uppercase tracking-wider text-[var(--accent)]">
              PyTorch Vision
            </span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono-code text-[8px] text-white/70">
              Flutter
            </span>
          </div>
          <div className="mt-3 flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-[var(--accent)]/40 bg-white/[0.02]">
            <div className="text-center">
              <Sparkles className="mx-auto h-5 w-5 text-[var(--accent)]" />
              <p className="mt-1.5 font-mono-code text-[9px] text-white/80">
                Meal Scan Frame
              </p>
              <p className="font-mono-code text-[8px] text-[var(--text-muted)]">
                Screenshot Placeholder
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <p className="font-mono-code text-[9px] text-white/90">
              Food Recognition · Flask API
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <p className="font-mono-code text-[9px] text-[var(--text-secondary)]">
              Dietary Log · Firebase
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "apptelic") {
    return (
      <div className="flex h-full flex-col justify-between bg-gradient-to-b from-[#111520] to-[#090b10] p-3.5 text-left">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[9px] uppercase tracking-wider text-[var(--accent)]">
              AppTelic
            </span>
            <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
            <p className="font-mono-code text-[9px] text-white/90">
              Firebase Auth
            </p>
            <p className="mt-1 font-mono-code text-[8px] text-[var(--text-muted)]">
              GitHub OAuth Connected
            </p>
          </div>
          <div className="mt-2.5 rounded-xl border border-dashed border-[var(--accent)]/35 bg-[rgba(var(--accent-rgb),0.06)] p-2.5">
            <p className="font-mono-code text-[9px] text-[var(--accent)]">
              Groq AI Stream
            </p>
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-4/5 rounded bg-white/15" />
              <div className="h-1.5 w-3/5 rounded bg-white/10" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono-code text-[8px] text-[var(--text-muted)]">
          <span>Flutter Client</span>
          <span>Screenshot Slot</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#12151d] to-[#090b0f] p-5 text-center">
      <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-[var(--accent)]">
        {isPhone ? (
          <Smartphone className="h-5 w-5" />
        ) : (
          <ImageIcon className="h-5 w-5" />
        )}
      </div>
      <p className="font-display text-sm font-semibold text-white">
        {project.title}
      </p>
      <p className="mt-1 max-w-[210px] font-mono-code text-[10px] text-[var(--text-muted)]">
        Screenshot placeholder — add asset in data/projects.ts
      </p>
    </div>
  );
}

export function DeviceMockup({ project, compact = false }: DeviceMockupProps) {
  const [imgError, setImgError] = useState(false);
  const hasRealImage = Boolean(project.screenshot) && !imgError;

  // Render full-bleed framed showcase when a project visual/screenshot exists
  if (hasRealImage) {
    return (
      <div
        className={`group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0b0d12] shadow-xl ${
          compact ? "h-48" : "aspect-[16/10] w-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
            {project.frameType === "phone" ? (
              <Smartphone className="h-3 w-3 text-[var(--accent)]" />
            ) : (
              <Globe className="h-3 w-3 text-[var(--accent)]" />
            )}
            <span>{project.slug}</span>
          </div>
          <span className="font-mono-code text-[9px] uppercase text-[var(--accent)]">
            {project.frameType === "phone" ? "MOBILE" : "WEB"}
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden bg-[#07080a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot!}
            alt={`${project.title} showcase visual`}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    );
  }

  // Phone frame for mobile Flutter projects (placeholder fallback)
  if (project.frameType === "phone") {
    return (
      <div
        className={`relative flex w-full items-center justify-center rounded-xl border border-white/[0.07] bg-[#07080a]/70 ${
          compact ? "h-48 p-3" : "h-64 p-4 sm:h-72"
        }`}
      >
        <div
          className={`relative flex flex-col overflow-hidden rounded-[24px] border-2 border-white/20 bg-[#0b0d12] shadow-2xl ${
            compact ? "h-42 w-28" : "h-56 w-36 sm:h-64 sm:w-40"
          }`}
        >
          {/* Phone notch / dynamic pill */}
          <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-white/20" />
          <div className="mt-1.5 flex-1 overflow-hidden">
            <PlaceholderCanvas project={project} isPhone={true} />
          </div>
        </div>
      </div>
    );
  }

  // Hybrid frame (browser + companion phone badge)
  if (project.frameType === "hybrid") {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#080a0e] ${
          compact ? "h-48 p-3" : "h-64 p-4 sm:h-72"
        }`}
      >
        {/* Minimal browser frame */}
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0b0d12] shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
            </div>
            <div className="flex items-center gap-1 rounded bg-white/[0.04] px-2 py-0.5 font-mono-code text-[9px] text-[var(--text-muted)]">
              <Globe className="h-2.5 w-2.5" />
              <span>{project.slug}.app</span>
            </div>
            <span className="font-mono-code text-[9px] text-[var(--accent)]">
              WEB + FLUTTER
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            {hasRealImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.screenshot!}
                alt={`${project.title} web interface`}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <PlaceholderCanvas project={project} isPhone={false} />
            )}
          </div>
        </div>

        {/* Neo-brutalist Flutter phone mini-frame overlay */}
        {!compact && (
          <div
            aria-hidden="true"
            className="absolute right-6 bottom-5 hidden w-24 overflow-hidden rounded-xl border-2 border-[var(--accent)] bg-[#0f1218] p-2 shadow-[4px_4px_0px_rgba(var(--accent-rgb),0.85)] sm:block"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-1">
              <span className="font-mono-code text-[8px] font-bold text-[var(--accent)]">
                FLUTTER
              </span>
              <Smartphone className="h-2.5 w-2.5 text-white" />
            </div>
            <p className="mt-1.5 font-mono-code text-[8px] leading-tight text-white/90">
              Neo-Brutalist Mobile UI
            </p>
          </div>
        )}
      </div>
    );
  }

  // Minimal browser frame for web projects
  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0b0d12] shadow-xl ${
        compact ? "h-48" : "h-64 sm:h-72"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
          <Globe className="h-3 w-3" />
          <span>{project.slug}</span>
        </div>
        <span className="font-mono-code text-[9px] text-[var(--text-muted)]">
          WEB
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        {hasRealImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.screenshot!}
            alt={`${project.title} screenshot`}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderCanvas project={project} isPhone={false} />
        )}
      </div>
    </div>
  );
}
