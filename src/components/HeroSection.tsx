"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "./ui/MagneticButton";

/**
 * HERO CONCEPT: "The name is the light switch"
 *
 * One memorable element: the giant outlined name is "lit" by a spotlight that
 * follows the cursor (or drifts on its own on touch devices / when idle).
 * The same spotlight pushes a field of dots away and tints them with the
 * accent colour, so the text and the background react as one object.
 * Everything else on the screen stays quiet on purpose.
 */

function NameLines({ lines, reduce }: { lines: string[]; reduce: boolean }) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className={`block overflow-hidden py-[0.03em] ${
            i === 1 ? "md:pl-[10vw]" : ""
          }`}
        >
          <motion.span
            initial={reduce ? false : { y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.15 + i * 0.12,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [colomboTime, setColomboTime] = useState("");

  // Gentle parallax: the name drifts up slightly as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Split the name into two lines ("Vihanga" / "Nilusha").
  const [first, ...rest] = siteConfig.person.name.split(" ");
  const nameLines = [first, rest.join(" ")].filter(Boolean);

  const socials = siteConfig.socials.filter(
    (s) => s.platform === "github" || s.platform === "linkedin"
  );

  /* ------------------------------ Clock ------------------------------ */
  useEffect(() => {
    const update = () => {
      try {
        setColomboTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: siteConfig.person.timezone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setColomboTime("");
      }
    };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  /* ----------------------- Greeting + role cyclers ---------------------- */
  useEffect(() => {
    if (reduce) return;
    const g = window.setInterval(
      () =>
        setGreetingIndex((p) => (p + 1) % siteConfig.person.greetings.length),
      2400
    );
    const r = window.setInterval(
      () =>
        setRoleIndex((p) => (p + 1) % siteConfig.person.rotatingRoles.length),
      2800
    );
    return () => {
      window.clearInterval(g);
      window.clearInterval(r);
    };
  }, [reduce]);

  /* ---------------- Spotlight + dot field (single rAF loop) --------------- */
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const nameEl = nameRef.current;
    const fill = fillRef.current;
    if (!section || !canvas || !nameEl || !fill) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let frame = 0;
    let accent = "190, 242, 100"; // fallback if --accent-rgb is missing
    const cur = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, active: false };

    const readAccent = () => {
      const v = getComputedStyle(section).getPropertyValue("--accent-rgb").trim();
      if (v) accent = v;
    };

    const draw = (t: number) => {
      const spacing = w < 640 ? 26 : 32;
      const radius = w < 640 ? 120 : 170;

      if (reduce) {
        cur.x = w * 0.5;
        cur.y = h * 0.45;
      } else {
        if (!pointer.active) {
          // Idle drift so touch devices and first load still feel alive.
          pointer.x = w * (0.5 + 0.38 * Math.sin(t * 0.00035));
          pointer.y = h * (0.45 + 0.2 * Math.sin(t * 0.0005 + 1.3));
        }
        cur.x += (pointer.x - cur.x) * 0.12;
        cur.y += (pointer.y - cur.y) * 0.12;
      }

      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          const dx = bx - cur.x;
          const dy = by - cur.y;
          const dist = Math.hypot(dx, dy) || 1;
          const f = dist < radius ? 1 - dist / radius : 0;
          const push = f * f * 26;
          const x = bx + (dx / dist) * push;
          const y =
            by +
            (dy / dist) * push +
            (reduce ? 0 : Math.sin(t * 0.0012 + bx * 0.015) * 1.1);

          ctx.fillStyle =
            f > 0.02
              ? `rgba(${accent}, ${0.25 + f * 0.75})`
              : "rgba(255, 255, 255, 0.14)";
          ctx.beginPath();
          ctx.arc(x, y, 1 + f * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Move the "lit" copy of the name with the same spotlight.
      const sr = section.getBoundingClientRect();
      const nr = nameEl.getBoundingClientRect();
      fill.style.setProperty("--mx", `${cur.x - (nr.left - sr.left)}px`);
      fill.style.setProperty("--my", `${cur.y - (nr.top - sr.top)}px`);
      fill.style.setProperty("--mr", `${radius * 1.3}px`);

      frame++;
      if (frame % 90 === 0) readAccent();
    };

    const resize = () => {
      const r = section.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!cur.x && !cur.y) {
        cur.x = w * 0.5;
        cur.y = h * 0.45;
      }
      readAccent();
      draw(performance.now());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    // Reduced motion: one static frame, no loop, no listeners.
    if (reduce) {
      return () => ro.disconnect();
    }

    const tick = (t: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(t);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 }
    );
    io.observe(section);

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer.active = false;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerdown", onMove);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointercancel", onLeave);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("visibilitychange", start);
    };
  }, [reduce]);

  const maskImage =
    "radial-gradient(circle var(--mr, 220px) at var(--mx, 50%) var(--my, 50%), #000 0%, rgba(0,0,0,0.85) 35%, transparent 100%)";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Reactive dot field */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pb-10 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        {/* Top row: availability + greeting */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-2 text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              {siteConfig.person.availability.label}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Colombo{colomboTime ? `, ${colomboTime}` : ", Sri Lanka"}
            </span>
          </div>

          <div className="relative h-5 min-w-[5rem] overflow-hidden text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={siteConfig.person.greetings[greetingIndex]}
                initial={reduce ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {siteConfig.person.greetings[greetingIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* The one memorable thing: the spotlit name */}
        <motion.div style={{ y: nameY }} className="my-auto py-10 sm:py-14">
          <div
            ref={nameRef}
            className="relative font-display text-[clamp(3.25rem,17.5vw,15rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em]"
          >
            {/* Outline layer: the accessible heading */}
            <h1
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}
            >
              <span className="sr-only">{siteConfig.person.name}</span>
              <span aria-hidden="true" className="block">
                <NameLines lines={nameLines} reduce={reduce} />
              </span>
            </h1>

            {/* Lit layer: same text, filled, revealed only under the spotlight */}
            <div
              ref={fillRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 select-none text-[var(--accent)]"
              style={{ WebkitMaskImage: maskImage, maskImage }}
            >
              <NameLines lines={nameLines} reduce={reduce} />
            </div>
          </div>
        </motion.div>

        {/* Quiet bottom row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-end gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-6 lg:col-span-5">
            <p className="max-w-[34rem] text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {siteConfig.hero.supportingText}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span>{siteConfig.person.shortTitle}, currently working as</span>
              <span className="relative inline-block h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={siteConfig.person.rotatingRoles[roleIndex]}
                    initial={reduce ? false : { y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-medium text-white"
                  >
                    {siteConfig.person.rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-6 md:justify-end lg:col-span-7">
            <MagneticButton
              href={siteConfig.person.cvPath}
              download={siteConfig.person.cvFileName}
              className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--accent-fg)] hover:bg-[var(--accent-bright)] accent-transition"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download CV</span>
            </MagneticButton>

            <a
              href="#projects"
              className="group inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              See my projects
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm capitalize text-[var(--text-secondary)] transition hover:text-white"
              >
                {s.platform}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}