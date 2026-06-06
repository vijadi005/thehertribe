"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions";

type Props = {
  /** Show a first-name field (sent to Kit as first_name). */
  showName?: boolean;
  /** Submit button label. */
  cta?: string;
  /** Message shown after a successful subscribe. */
  successMessage?: string;
};

const fieldStyle: React.CSSProperties = {
  padding: "14px 18px",
  border: "1px solid var(--line)",
  borderRadius: "999px",
  background: "#fff",
  fontFamily: "inherit",
};

export default function NewsletterForm({
  showName = false,
  cta = "Subscribe",
  successMessage = "You’re on the list — welcome to the Tribe Letter.",
}: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const result = await subscribeNewsletter(new FormData(form));
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setError(result.error || "Something went wrong — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="lead" style={{ marginTop: 8 }} role="status">
        {successMessage}
      </p>
    );
  }

  return (
    <form className="newsletter" style={{ marginInline: "auto" }} onSubmit={handleSubmit}>
      {showName && (
        <input
          type="text"
          name="first_name"
          placeholder="Your first name"
          aria-label="First name"
          style={{ ...fieldStyle, gridColumn: "1 / -1" }}
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        aria-label="Email address"
        required
        style={fieldStyle}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Joining…" : cta}
      </button>
      {status === "error" && (
        <p style={{ gridColumn: "1 / -1", color: "var(--rose-deep)", fontSize: "0.88rem" }}>
          {error}
        </p>
      )}
    </form>
  );
}
