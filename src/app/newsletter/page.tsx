import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe to the Newsletter",
  description:
    "Join The HER Tribe — your weekly dose of aspiration, growth and sisterhood. Subscribe for stories, guidance, and community, plus a free e-book.",
};

const benefits = [
  "Real stories of growth, courage & reinvention",
  "Practical guidance on career, financial well-being, emotional resilience & self-care",
  "Tools & ideas to help you break barriers and step into your next chapter",
  "Community moments — because success is sweeter when shared",
  "Invites & early access to workshops, meetups, and Tribe events",
];

export default function NewsletterPage() {
  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, left: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Newsletter
          </Reveal>
          <Reveal as="h1" delay={60}>
            Join <em className="fancy">The HER Tribe</em> now.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            ✨ Your weekly dose of aspiration, growth &amp; sisterhood — your space
            to grow, rise &amp; reclaim your power.
          </Reveal>
        </div>
      </section>

      {/* Why join */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="split" style={{ alignItems: "center" }}>
            <Reveal className="split-copy">
              <p className="eyebrow">Why join?</p>
              <h2 style={{ marginBottom: 18 }}>
                Be part of a movement, not just a mailing list.
              </h2>
              <p style={{ color: "var(--muted)", marginBottom: 14 }}>
                Every woman hits moments where she feels stuck, unseen, or unsure
                of what comes next. But you don&apos;t have to navigate mid-life,
                career shifts, self-doubt, or reinvention alone.
              </p>
              <p style={{ color: "var(--muted)" }}>
                Because empowered women don&apos;t wait for permission — they seek
                inspiration, knowledge, and a community that lifts them higher.
                And that&apos;s exactly what The HER Tribe was built for.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <blockquote
                className="form"
                style={{ fontSize: "1.4rem", lineHeight: 1.4, fontStyle: "italic" }}
              >
                <span className="fancy">
                  “Your space to grow, rise &amp; reclaim your power.”
                </span>
                <footer
                  style={{
                    marginTop: 18,
                    fontSize: "0.95rem",
                    fontStyle: "normal",
                    color: "var(--soft)",
                  }}
                >
                  — Aditi Verma, theHERtribe.com
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal as="p" className="eyebrow" style={{ textAlign: "center" }}>
            What you&apos;ll get every week
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            Join the Tribe. Grow with the Tribe.
          </Reveal>
          <Reveal>
            <ul
              className="checklist list-reset"
              style={{ maxWidth: 720, marginInline: "auto" }}
            >
              {benefits.map((b) => (
                <li key={b}>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Free e-book offer + form */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal>
            <div className="form" style={{ textAlign: "center" }}>
              <p className="eyebrow">Free e-book</p>
              <h3 style={{ fontSize: "1.7rem", margin: "12px 0 8px" }}>
                Get a free e-book you&apos;ll love.
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: 22 }}>
                Enter your details and download — plus join the weekly Tribe Letter.
              </p>
              <NewsletterForm
                showName
                cta="Join now & download"
                successMessage="Check your inbox — your free e-book is on its way. 💜"
              />
              <p style={{ color: "var(--soft)", fontSize: "0.82rem", marginTop: 16 }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="value-strip">
            {[
              { t: "Free", s: "Always" },
              { t: "Weekly", s: "No inbox overload" },
              { t: "Private", s: "We never sell your data" },
              { t: "One-click", s: "Unsubscribe anytime" },
            ].map((v) => (
              <div key={v.t}>
                <strong>{v.t}</strong>
                <span>{v.s}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
