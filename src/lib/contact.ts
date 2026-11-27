import { siteConfig } from "@/data/site";

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  source?: "contact-form" | "terminal";
}

export interface ContactResult {
  ok: boolean;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates contact input and submits directly to the configured Formspree endpoint,
 * falling back to the local /api/contact route if no Formspree URL is set.
 */
export async function submitContactMessage(
  payload: ContactSubmission
): Promise<ContactResult> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const subject = (payload.subject || "").trim();
  const message = payload.message.trim();

  if (name.length < 2) {
    return {
      ok: false,
      message: "Please enter your name (at least 2 characters).",
    };
  }
  if (!EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      message: "Please provide a valid email address.",
    };
  }
  if (message.length < 10) {
    return {
      ok: false,
      message: "Please write a message of at least 10 characters.",
    };
  }

  const endpoint = siteConfig.contact.formspreeEndpoint || "/api/contact";
  const isFormspree = Boolean(siteConfig.contact.formspreeEndpoint);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(
        isFormspree
          ? {
              name,
              email,
              subject: subject || undefined,
              message,
              source: payload.source || "contact-form",
              _replyto: email,
              _subject: subject
                ? `Portfolio (${payload.source || "web"}): ${subject}`
                : `Portfolio message from ${name}`,
            }
          : { name, email, subject, message }
      ),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const formspreeError = Array.isArray(json.errors)
        ? json.errors
            .map((err: { message?: string }) => err?.message)
            .filter(Boolean)
            .join(", ")
        : null;
      return {
        ok: false,
        message:
          formspreeError ||
          json.error ||
          "Could not send your message. Please try again.",
      };
    }

    return {
      ok: true,
      message:
        json.message ||
        "Thanks! Your message has been sent directly to Vihanga.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error while sending your message. Please try again.",
    };
  }
}
