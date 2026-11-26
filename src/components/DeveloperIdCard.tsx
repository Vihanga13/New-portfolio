"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "./QRCodeCanvas";
import { RotateCw, MapPin, GraduationCap, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";

export function DeveloperIdCard() {
  const shouldReduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false });
  const [imgError, setImgError] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 14;
    setTilt({ rx, ry });
    setSheen({ x: px * 100, y: py * 100, active: true });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSheen((prev) => ({ ...prev, active: false }));
  };

  const showPortrait = Boolean(siteConfig.person.portraitImage) && !imgError;

  return (
    <div
      className="relative w-full max-w-[340px] select-none [perspective:1100px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? "Developer ID card back showing portfolio QR code. Activate to flip to front."
            : "Interactive developer ID card for Vihanga Nilusha. Activate to flip and view QR code."
        }
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        animate={{
          rotateX: shouldReduceMotion ? 0 : tilt.rx,
          rotateY: (flipped ? 180 : 0) + (shouldReduceMotion ? 0 : tilt.ry),
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.7,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-[220px] w-full cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#12161f] via-[#0b0d12] to-[#08090c] p-5 shadow-2xl"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: sheen.active ? 0.55 : 0.15,
              background: `radial-gradient(circle 180px at ${sheen.x}% ${sheen.y}%, rgba(var(--accent-rgb), 0.24), transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
                  {showPortrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={siteConfig.person.portraitImage!}
                      alt={siteConfig.person.portraitAlt}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-display text-base font-bold tracking-tight text-[var(--accent)]">
                        {siteConfig.person.initials}
                      </span>
                      <span className="font-mono-code text-[8px] uppercase tracking-widest text-[var(--text-muted)]">
                        PHOTO
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    <ShieldCheck className="h-3 w-3" />
                    DEV PASS · ID
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-white">
                    {siteConfig.person.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Software Engineer
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono-code text-[10px] text-[var(--text-muted)]">
                <RotateCw className="h-2.5 w-2.5" />
                Flip
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[11px]">
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                <span className="truncate">{siteConfig.person.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                <span className="truncate">BSc (Hons) CS · &apos;25</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono-code text-[10px] text-[var(--text-muted)]">
              <span>WEB · MOBILE · AI</span>
              <span className="text-[var(--accent)]">
                {siteConfig.person.availability.open ? "● AVAILABLE" : "● FOCUSED"}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#0e1118] via-[#090b0f] to-[#07080a] p-5 shadow-2xl"
        >
          <div className="flex h-full items-center justify-between gap-4">
            <div className="flex h-full flex-col justify-between py-1">
              <div>
                <p className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  Scan Portfolio
                </p>
                <p className="mt-1 font-display text-base font-semibold text-white">
                  {siteConfig.person.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  Open live portfolio link on mobile or share with your team.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-[var(--text-muted)]">
                <RotateCw className="h-3 w-3 text-[var(--accent)]" />
                Click card to flip back
              </div>
            </div>

            <div className="shrink-0 rounded-xl border border-white/15 bg-white p-2 shadow-lg">
              <QRCodeSVG value={siteConfig.seo.siteUrl} size={112} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
