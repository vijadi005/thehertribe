import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconCheck } from "@/components/icons";
import { workshopTopics } from "@/lib/content";
import { getMentors, getWorkshopOfferings } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Enroll for FREE mentor-led workshops on financial literacy, leadership, communication, life transformation, entrepreneurship, and personal branding.",
};

export const revalidate = 60;

export default async function WorkshopPage() {
  const [workshopOfferings, mentors] = await Promise.all([
    getWorkshopOfferings(),
    getMentors(),
  ]);

  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, left: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, right: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Workshops
          </Reveal>
          <Reveal as="h1" delay={60}>
            Learn and grow with <em className="fancy">experienced mentors</em>.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Enroll for FREE mentor sessions on the life skills that matter for
            personal development and professional growth.
          </Reveal>
        </div>
      </section>

      {/* Offerings */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell" style={{ display: "grid", gap: "clamp(48px, 7vw, 96px)" }}>
          {workshopOfferings.map((w, i) => (
            <div key={w.title} className={`program-block ${i % 2 === 1 ? "is-flip" : ""}`}>
              <Reveal className="program-media">
                {w.image && (
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="(max-width: 880px) 90vw, 520px"
                  />
                )}
              </Reveal>
              <Reveal className="split-copy" delay={120}>
                <span className="program-tag">{w.price} · Workshop</span>
                <h2>{w.title}</h2>
                <p className="lead" style={{ color: "var(--plum)", marginBottom: 14 }}>
                  {w.subtitle}
                </p>
                <p className="lead">{w.copy}</p>
                <div className="hero-actions">
                  <Link href="/contact" className="btn btn-primary">
                    Enroll for free
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">What you&apos;ll learn</p>
            <h2>Skills that matter, taught by women who&apos;ve lived them.</h2>
          </Reveal>
          <div className="feature-grid">
            {workshopTopics.map((topic) => (
              <Reveal className="feature" key={topic}>
                <IconCheck />
                <b>{topic}</b>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Led by mentors */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">Led by the #powertribe</p>
            <h2>Guided by experienced mentors.</h2>
          </Reveal>
          <div className="people-grid">
            {mentors.slice(0, 4).map((m, i) => (
              <Reveal key={m.name} className="person" delay={i * 90}>
                <div className="person-photo">
                  {m.image && (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 880px) 45vw, 280px"
                    />
                  )}
                </div>
                <span className="person-role">{m.role}</span>
                <h3>{m.name}</h3>
              </Reveal>
            ))}
          </div>
          <Reveal className="hero-actions" delay={120}>
            <Link href="/mentors" className="btn btn-ghost">
              Meet all the mentors
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <div className="cta-inner">
              <p className="eyebrow is-centered">It&apos;s free</p>
              <h2>Ready to learn something new?</h2>
              <p className="lead">
                Every workshop is free to join. Tell us what you&apos;re curious
                about and we&apos;ll point you to the next session.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Enroll now
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
