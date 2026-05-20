import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconCheck } from "@/components/icons";
import { faqs, images, workshops } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Career mentorship, financial literacy, well-being circles, and Tribe Talk — practical programs designed around real women's lives.",
};

const programs = [
  {
    tag: "Mentorship",
    title: "Career & growth mentorship",
    copy: "One-on-one and group mentorship to help you find direction, build confidence, and take the next step in your career.",
    image: images.hero,
    features: [
      "Resume & profile direction",
      "Confidence & interview prep",
      "Skill & growth planning",
      "Honest career conversations",
    ],
  },
  {
    tag: "Money literacy",
    title: "Financial independence",
    copy: "Jargon-free guidance to help you understand your money, plan ahead, and make decisions with confidence.",
    image: images.perfection,
    features: [
      "Budgeting & saving basics",
      "Planning & goal setting",
      "Intro to investing",
      "Stress-free money habits",
    ],
  },
  {
    tag: "Well-being",
    title: "Life transformation circles",
    copy: "Workshops and circles for emotional energy, self-awareness, and designing a life that feels like yours.",
    image: images.reflections,
    features: [
      "Self-awareness workshops",
      "Resilience & energy",
      "Designing life with intention",
      "Supportive group circles",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, left: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, right: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Programs
          </Reveal>
          <Reveal as="h1" delay={60}>
            Programs built around <em className="fancy">real lives</em>.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Three pathways — career, money, and well-being — plus Tribe Talk, our
            open space for honest conversation. Come for the skills, stay for the
            community.
          </Reveal>
        </div>
      </section>

      {/* Program blocks */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell" style={{ display: "grid", gap: "clamp(56px, 8vw, 110px)" }}>
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`program-block ${i % 2 === 1 ? "is-flip" : ""}`}
            >
              <Reveal className="program-media">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 880px) 90vw, 520px"
                />
              </Reveal>
              <Reveal className="split-copy" delay={120}>
                <span className="program-tag">{program.tag}</span>
                <h2>{program.title}</h2>
                <p className="lead">{program.copy}</p>
                <div className="feature-grid">
                  {program.features.map((f) => (
                    <div className="feature" key={f}>
                      <IconCheck />
                      <b>{f}</b>
                    </div>
                  ))}
                </div>
                <div className="hero-actions">
                  <Link href="/contact" className="btn btn-ghost">
                    Ask about this program
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Tribe Talk feature */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <span className="blob blob-rose" style={{ width: 320, height: 320, top: -100, left: -60 }} />
            <div className="cta-inner">
              <p className="eyebrow is-centered">Tribe Talk</p>
              <h2>Honest conversations with women who&apos;ve been there.</h2>
              <p className="lead">
                Tribe Talk opens space for real stories from women mentors and
                leaders — the wins, the setbacks, and everything they learned
                along the way.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Join the next session
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured workshops */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">Featured workshops</p>
            <h2>Led by women across career, wellness, and money.</h2>
          </Reveal>
          <div className="people-grid">
            {workshops.map((person, i) => (
              <Reveal key={person.name} className="person" delay={i * 90}>
                <div className="person-photo">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 880px) 45vw, 280px"
                  />
                </div>
                <span className="person-role">{person.role}</span>
                <h3>{person.title}</h3>
                <p>with {person.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell-narrow">
          <Reveal className="section-head is-centered">
            <p className="eyebrow is-centered">Good to know</p>
            <h2>Frequently asked questions</h2>
          </Reveal>
          <Reveal className="faq">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="plus" />
                </summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
