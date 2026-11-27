"use client";

import React, { useState } from "react";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { submitContactMessage } from "@/lib/contact";
import { MagneticButton } from "./ui/MagneticButton";

/**
 * CONTACT CONCEPT: "Fill in the blanks"
 *
 * The form is a sentence you complete: "Hello Vihanga, I'm ____ and you can
 * reach me at ____." It reads like writing a note instead of filling in a
 * form. Same validation and same /api/contact endpoint as before. The
 * direct channels are plain rows instead of cards.
 */

const blank =
  "mx-1 inline-block max-w-full border-0 border-b-2 border-white/30 bg-transparent px-1 pb-0.5 text-[var(--accent)] placeholder:text-white/25 transition-colors focus:border-[var(--accent)] focus:outline-none";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const firstName = siteConfig.person.name.split(" ")[0];

  const handleCopyEmail = async () => {
    if (!siteConfig.contact.email || !navigator.clipboard) return;
    await navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleCopyPhone = async () => {
    if (!siteConfig.contact.phone || !navigator.clipboard) return;
    await navigator.clipboard.writeText(siteConfig.contact.phone);
    setCopiedPhone(true);
    window.setTimeout(() => setCopiedPhone(false), 1800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const result = await submitContactMessage({
      name,
      email,
      subject,
      message,
      source: "contact-form",
    });

    if (result.ok) {
      setStatus({ type: "success", text: result.message });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus({ type: "error", text: result.message });
    }

    setSubmitting(false);
  };

  const linkedIn = siteConfig.socials.find((s) => s.platform === "linkedin");
  const github = siteConfig.socials.find((s) => s.platform === "github");

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <h2 className="max-w-5xl font-display text-[clamp(2.25rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-tight text-white">
          {siteConfig.contact.heading}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {siteConfig.contact.supportingText}
        </p>

        {/* The form, written as a sentence */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-16 max-w-4xl border-t border-white/12 pt-12 sm:mt-20"
        >
          <p className="font-display text-[clamp(1.35rem,2.8vw,2.1rem)] leading-[1.9] text-white">
            Hello {firstName}, I&apos;m
            <input
              type="text"
              aria-label="Your name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              className={`${blank} w-[min(100%,13rem)]`}
            />
            and you can reach me at
            <input
              type="email"
              aria-label="Your email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={`${blank} w-[min(100%,19rem)]`}
            />
            . I&apos;d like to talk about
            <input
              type="text"
              aria-label="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="a project, role or idea"
              className={`${blank} w-[min(100%,17rem)]`}
            />
            .
          </p>

          <label
            htmlFor="contact-message"
            className="mt-10 block text-sm text-[var(--text-muted)]"
          >
            A few more details
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project, role or idea."
            className="mt-2 w-full resize-y border-0 border-b-2 border-white/30 bg-transparent px-1 pb-3 text-lg leading-relaxed text-white placeholder:text-white/25 transition-colors focus:border-[var(--accent)] focus:outline-none"
          />

          {status && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-6 border-l-2 pl-4 text-sm leading-relaxed ${
                status.type === "success"
                  ? "border-[var(--accent)] text-white"
                  : "border-rose-400 text-rose-200"
              }`}
            >
              {status.text}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-relaxed text-[var(--text-muted)]">
              {siteConfig.contact.formEndpointNote}
            </p>
            <MagneticButton
              type="submit"
              disabled={submitting}
              className="shrink-0 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-[var(--accent-fg)] hover:bg-[var(--accent-bright)] disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <Send
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </MagneticButton>
          </div>
        </form>

        {/* Direct channels: plain rows */}
        <dl className="mt-20 grid max-w-4xl grid-cols-1 border-t border-white/12 sm:grid-cols-2">
          <div className="border-b border-white/12 py-6 sm:pr-8">
            <dt className="text-sm text-[var(--text-muted)]">Email</dt>
            <dd className="mt-2">
              {siteConfig.contact.email ? (
                <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="break-all font-display text-lg font-semibold text-white transition-colors hover:text-[var(--accent)]"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-sm text-[var(--text-secondary)] underline decoration-white/30 underline-offset-4 transition hover:text-white"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </span>
              ) : (
                <span className="text-sm text-[var(--text-secondary)]">
                  {siteConfig.contact.emailPlaceholderHint}
                </span>
              )}
            </dd>
          </div>

          <div className="border-b border-white/12 py-6 sm:pl-8">
            <dt className="text-sm text-[var(--text-muted)]">Based in</dt>
            <dd className="mt-2 font-display text-lg font-semibold text-white">
              {siteConfig.contact.location}
            </dd>
            <dd className="mt-1 text-sm text-[var(--text-secondary)]">
              Open to local, hybrid and international remote roles.
            </dd>
          </div>

          {siteConfig.contact.phone && (
            <div className="border-b border-white/12 py-6 sm:col-span-2">
              <dt className="text-sm text-[var(--text-muted)]">Phone</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="font-display text-lg font-semibold text-white transition-colors hover:text-[var(--accent)]"
                >
                  {siteConfig.contact.phone}
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="text-sm text-[var(--text-secondary)] underline decoration-white/30 underline-offset-4 transition hover:text-white"
                >
                  {copiedPhone ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
          )}

          {linkedIn && (
            <div className="border-b border-white/12 py-6 sm:border-b-0 sm:pr-8">
              <dt className="text-sm text-[var(--text-muted)]">LinkedIn</dt>
              <dd className="mt-2">
                <a
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-display text-lg font-semibold text-white transition-colors hover:text-[var(--accent)]"
                >
                  {linkedIn.handle}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </dd>
            </div>
          )}

          {github && (
            <div className="py-6 sm:pl-8">
              <dt className="text-sm text-[var(--text-muted)]">GitHub</dt>
              <dd className="mt-2">
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-display text-lg font-semibold text-white transition-colors hover:text-[var(--accent)]"
                >
                  {github.handle}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}