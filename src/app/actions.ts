"use server";

import { Resend } from "resend";
import { site } from "@/lib/content";

export type FormResult = { ok: boolean; error?: string };

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function getEmailConfig() {
  return {
    from: process.env.RESEND_FROM_EMAIL || "The Her Tribe <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || site.email,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  };
}

function getKitConfig() {
  return {
    apiKey: process.env.KIT_API_KEY,
    formId: process.env.KIT_FORM_ID,
  };
}

async function kitPost(apiKey: string, path: string, body: unknown) {
  return fetch(`https://api.kit.com/v4/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });
}

// Subscribe an email to a Kit (formerly ConvertKit) form via the v4 API.
// Kit requires two steps: create/upsert the subscriber, THEN add them to the
// form (the form-subscribe endpoint 404s if the subscriber doesn't exist yet).
// Returns null when Kit isn't configured so callers can fall back to Resend.
async function subscribeToKit(
  email: string,
  firstName?: string
): Promise<FormResult | null> {
  const { apiKey, formId } = getKitConfig();
  if (!apiKey || !formId) return null;

  try {
    // 1) Create/upsert the subscriber on the account.
    const createRes = await kitPost(apiKey, "subscribers", {
      email_address: email,
      ...(firstName ? { first_name: firstName } : {}),
    });
    if (!createRes.ok) {
      const detail = await createRes.text().catch(() => "");
      console.error("Kit create subscriber failed", { status: createRes.status, detail });
      return { ok: false, error: "Could not subscribe right now. Please try again." };
    }

    // 2) Add the subscriber to the configured form (triggers its opt-in/automation).
    const formRes = await kitPost(apiKey, `forms/${encodeURIComponent(formId)}/subscribers`, {
      email_address: email,
    });
    if (!formRes.ok) {
      // The subscriber exists on the account at this point, so don't fail the
      // signup — just log so the form association can be investigated.
      const detail = await formRes.text().catch(() => "");
      console.error("Kit add-to-form failed", { status: formRes.status, detail });
    }

    return { ok: true };
  } catch (error) {
    console.error("Kit subscribe unexpected failure", error);
    return { ok: false, error: "Could not subscribe right now. Please try again." };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function limit(value: string, max: number) {
  return value.slice(0, max);
}

export async function submitContact(formData: FormData): Promise<FormResult> {
  const name = limit(String(formData.get("name") || "").trim(), 120);
  const email = limit(String(formData.get("email") || "").trim(), 180);
  const phone = limit(String(formData.get("phone") || "").trim(), 60);
  const interest = limit(String(formData.get("interest") || "").trim(), 120);
  const message = limit(String(formData.get("message") || "").trim(), 3000);

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const resend = getResend();
  const { from, to } = getEmailConfig();

  if (!resend) {
    return {
      ok: false,
      error: `Email isn't configured yet. Please email us directly at ${site.email}.`,
    };
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name}${interest ? ` — ${interest}` : ""}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Interested in: ${interest || "Not provided"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || "—"}</p>
        <p><strong>Interested in:</strong> ${escapeHtml(interest) || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });
    if (error) {
      console.error("Resend contact email failed", {
        name: error.name,
        message: error.message,
      });
      return { ok: false, error: "Could not send your message. Please try again." };
    }
    return { ok: true };
  } catch (error) {
    console.error("Contact email unexpected failure", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

// Best-effort team notification + Resend audience sync. Never blocks the
// subscriber-facing result — Kit is the source of truth for the list.
async function notifyTeamOfSubscriber(email: string) {
  const resend = getResend();
  if (!resend) return;
  const { from, to, audienceId } = getEmailConfig();
  try {
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    }
    await resend.emails.send({
      from,
      to,
      subject: "New newsletter subscriber",
      html: `<p>New subscriber for The Tribe Letter: <strong>${escapeHtml(email)}</strong></p>`,
    });
  } catch (error) {
    console.error("Resend newsletter notification failed", error);
  }
}

export async function subscribeNewsletter(formData: FormData): Promise<FormResult> {
  const email = String(formData.get("email") || "").trim();
  const firstName = limit(String(formData.get("first_name") || "").trim(), 80);
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Primary: subscribe to Kit (formerly ConvertKit) when configured.
  const kitResult = await subscribeToKit(email, firstName);
  if (kitResult) {
    if (kitResult.ok) {
      await notifyTeamOfSubscriber(email);
    }
    return kitResult;
  }

  // Fallback: no Kit configured yet — use Resend audience + team notification.
  const resend = getResend();
  if (!resend) {
    return {
      ok: false,
      error: "Subscriptions aren't configured yet. Please check back soon.",
    };
  }

  const { from, to, audienceId } = getEmailConfig();
  try {
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    }
    const { error } = await resend.emails.send({
      from,
      to,
      subject: "New newsletter subscriber",
      html: `<p>New subscriber for The Tribe Letter: <strong>${escapeHtml(email)}</strong></p>`,
    });
    if (error) {
      console.error("Resend newsletter notification failed", {
        name: error.name,
        message: error.message,
      });
      return { ok: false, error: "Could not subscribe right now. Please try again." };
    }
    return { ok: true };
  } catch (error) {
    console.error("Newsletter subscription unexpected failure", error);
    return { ok: false, error: "Could not subscribe right now. Please try again." };
  }
}
