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

export async function subscribeNewsletter(formData: FormData): Promise<FormResult> {
  const email = String(formData.get("email") || "").trim();
  if (!email || !email.includes("@")) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const resend = getResend();
  const { from, to, audienceId } = getEmailConfig();

  if (!resend) {
    return {
      ok: false,
      error: "Subscriptions aren't configured yet. Please check back soon.",
    };
  }

  try {
    // Add to a Resend audience when one is configured.
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    }
    // Always notify the team of a new subscriber.
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
