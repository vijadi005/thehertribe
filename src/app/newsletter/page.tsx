import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Subscribe to the Newsletter",
  description:
    "Subscribe to the Tribe Letter — thoughtful notes on money, mindset, career, and well-being for women, plus first word on workshops and Tribe Talk.",
};

const perks = [
  "Practical money & mindset tips, in plain language",
  "First word on upcoming workshops & Tribe Talk sessions",
  "Honest reflections on career, growth, and well-being",
  "No spam, ever — unsubscribe anytime",
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
            Subscribe to the <em className="fancy">Tribe Letter</em>.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Thoughtful notes on money, mindset, career, and well-being — written
            for women designing their own lives. Straight to your inbox, never
            spammy.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="split" style={{ alignItems: "center" }}>
            <Reveal className="split-copy">
              <p className="eyebrow">What you&apos;ll get</p>
              <h2 style={{ marginBottom: 22 }}>A little inbox encouragement.</h2>
              <ul className="checklist list-reset">
                {perks.map((perk) => (
                  <li key={perk}>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="form">
                <p className="eyebrow">The Tribe Letter</p>
                <h3 style={{ fontSize: "1.6rem", margin: "12px 0 8px" }}>
                  Join the list
                </h3>
                <p style={{ color: "var(--muted)", marginBottom: 22 }}>
                  Enter your email and you&apos;re in — welcome to the Tribe.
                </p>
                <NewsletterForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="value-strip">
            {[
              { t: "Free", s: "Always" },
              { t: "Occasional", s: "No inbox overload" },
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
