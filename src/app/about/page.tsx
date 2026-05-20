import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pillarIcons } from "@/components/icons";
import { images, stats } from "@/lib/content";
import { getSiteContent, renderEmphasis } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Her Tribe began as a circle of women supporting each other — today it's a community for mentorship, financial literacy, and well-being.",
};

export const revalidate = 60;

const values = [
  {
    icon: "career" as const,
    title: "Lead with empathy",
    copy: "We meet every woman where she is — without judgment, without comparison, with genuine care.",
  },
  {
    icon: "money" as const,
    title: "Knowledge is power",
    copy: "Confidence grows from understanding. We make money, careers, and growth approachable for everyone.",
  },
  {
    icon: "bloom" as const,
    title: "Rise together",
    copy: "When one woman grows, the whole tribe rises. Community is the heart of everything we do.",
  },
];

export default async function AboutPage() {
  const sc = await getSiteContent();

  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, left: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / About
          </Reveal>
          <Reveal as="h1" delay={60}>
            {renderEmphasis(sc.about.title)}
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            {sc.about.lead}
          </Reveal>
        </div>
      </section>

      {/* Story split */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="split">
            <Reveal className="split-media is-arch">
              <Image
                src={images.hero}
                alt="The Her Tribe community"
                fill
                sizes="(max-width: 880px) 90vw, 540px"
              />
            </Reveal>
            <Reveal className="split-copy" delay={120}>
              <p className="eyebrow">Our story</p>
              <h2>From a few honest conversations to a thriving community.</h2>
              <p className="lead">
                What started as women gathering to talk about money, careers, and
                the things we rarely say out loud grew into something bigger — a
                tribe where support is the norm, not the exception.
              </p>
              <p className="lead">
                Today, The Her Tribe brings together mentors, learners, and
                friends across financial literacy, career growth, and well-being,
                all rooted in the idea that women rise highest when they rise
                together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="stat-row">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} className="stat" delay={i * 100}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head is-centered">
            <p className="eyebrow is-centered">What we stand for</p>
            <h2>The values that hold the tribe together.</h2>
          </Reveal>
          <div className="value-grid">
            {values.map((v, i) => {
              const Icon = pillarIcons[v.icon];
              return (
                <Reveal key={v.title} className="value-card" delay={i * 110}>
                  <div className="pillar-icon">
                    <Icon />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.copy}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="founder">
            <Reveal className="founder-media">
              <Image
                src={images.founder}
                alt="Aditi Verma, founder of The Her Tribe"
                fill
                sizes="(max-width: 880px) 90vw, 420px"
              />
            </Reveal>
            <Reveal className="split-copy" delay={120}>
              <p className="eyebrow">From the founder</p>
              <blockquote>
                &ldquo;I wanted to build the kind of community I once needed — one
                that listens first, then helps you take the next step.&rdquo;
              </blockquote>
              <p className="lead">
                Aditi Verma founded The Her Tribe to give women a place to find
                clarity, confidence, and companionship. Through mentorship and
                honest conversation, she&apos;s helped many women move forward in
                their careers and lives.
              </p>
              <p className="signature" style={{ marginTop: 22 }}>
                Aditi Verma
              </p>
              <p style={{ color: "var(--muted)" }}>Founder & mentor</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Supported by + CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <div className="cta-inner">
              <p className="eyebrow is-centered">Supported by the Dhruva Foundation</p>
              <h2>Want to be part of the next chapter?</h2>
              <p className="lead">
                Whether you&apos;re looking for mentorship or want to mentor
                others, there&apos;s a place for you in the tribe.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Get in touch
                </Link>
                <Link href="/programs" className="btn btn-ghost">
                  Explore programs
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
