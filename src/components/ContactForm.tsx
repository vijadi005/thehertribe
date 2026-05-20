"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions";
import { site } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const result = await submitContact(new FormData(form));
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form" role="status">
        <p className="eyebrow">Thank you</p>
        <h3 style={{ fontSize: "1.6rem", margin: "12px 0" }}>
          Your message is on its way.
        </h3>
        <p style={{ color: "var(--muted)" }}>
          We&apos;ll get back to you within a day or two. In the meantime, you can
          always reach us at{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--plum)" }}>
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: 20 }}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Optional"
            autoComplete="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="interest">I&apos;m interested in</label>
          <select id="interest" name="interest" defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            <option>Joining the community</option>
            <option>Career mentorship</option>
            <option>Financial literacy</option>
            <option>Well-being circles</option>
            <option>Becoming a mentor</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a little about what you're looking for…"
          required
        />
      </div>

      {status === "error" && (
        <p style={{ color: "var(--rose-deep)", marginBottom: 14, fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
      <p className="form-note">We usually reply within a couple of days.</p>
    </form>
  );
}
