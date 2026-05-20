"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions";

export default function NewsletterForm() {
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
        You&apos;re on the list — welcome to the Tribe Letter.
      </p>
    );
  }

  return (
    <form className="newsletter" style={{ marginInline: "auto" }} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        aria-label="Email address"
        required
        style={{
          padding: "14px 18px",
          border: "1px solid var(--line)",
          borderRadius: "999px",
          background: "#fff",
          fontFamily: "inherit",
        }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Joining…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p style={{ gridColumn: "1 / -1", color: "var(--rose-deep)", fontSize: "0.88rem" }}>
          {error}
        </p>
      )}
    </form>
  );
}
