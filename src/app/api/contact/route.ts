import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name (at least 2 characters)." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please write a message of at least 10 characters.",
      },
      { status: 400 }
    );
  }

  const webhookUrl =
    process.env.CONTACT_WEBHOOK_URL || siteConfig.contact.formspreeEndpoint;
  if (webhookUrl) {
    try {
      const forwardRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
        }),
      });
      if (!forwardRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: "Delivery endpoint returned an error. Please try again later.",
          },
          { status: 502 }
        );
      }
      return NextResponse.json({
        ok: true,
        delivered: true,
        message: "Thank you — your message has been delivered.",
      });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not reach the configured contact delivery service.",
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    delivered: false,
    message:
      "Message validated! Configure CONTACT_WEBHOOK_URL (or your email in data/site.ts) to connect live email delivery.",
  });
}
