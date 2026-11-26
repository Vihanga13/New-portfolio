"use client";

import React from "react";
import { siteConfig } from "@/data/site";

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const repeated = [...items, ...items];
  return (
    <div className="flex w-max">
      <div
        className={`flex shrink-0 items-center gap-3 pr-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {repeated.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono-code text-xs text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-white"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div
      aria-label="Technology stack overview"
      className="marquee-track relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07080a] to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07080a] to-transparent sm:w-28"
      />

      <div className="flex flex-col gap-3">
        <MarqueeRow items={siteConfig.marqueeRows.top} direction="left" />
        <MarqueeRow items={siteConfig.marqueeRows.bottom} direction="right" />
      </div>
    </div>
  );
}
