import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconPlay } from "@/components/icons";
import { getTribeTalks } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Tribe Talk",
  description:
    "Stories, insights, and resources to inspire growth, self-care, and empowerment — watch past Tribe Talk sessions with women mentors and leaders.",
};

export const revalidate = 60;

const themes = [
  "Financial freedom",
  "Career growth",
  "Emotional wellbeing",
  "Spirituality & positivity",
  "Health & nutrition",
];

export default async function TribeTalkPage() {
  const tribeTalks = await getTribeTalks();

  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, left: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Tribe Talk
          </Reveal>
          <Reveal as="h1" delay={60}>
            <em className="fancy">Tribe Talk</em>
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Stories, insights, and resources to inspire growth, self-care, and
            empowerment — honest conversations with women who&apos;ve been there.
          </Reveal>
          <Reveal className="filter-row" delay={200} style={{ justifyContent: "center", marginBottom: 0 }}>
            {themes.map((t) => (
              <span className="chip" key={t} style={{ cursor: "default" }}>
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Past sessions */}
      <section className="section" style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">Watch the conversations</p>
            <h2>Past Tribe Talk sessions.</h2>
          </Reveal>
          <div className="post-grid">
            {tribeTalks.map((talk, i) => (
              <Reveal as="article" key={talk.youtubeId} className="post" delay={(i % 3) * 90}>
                <a
                  href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="post-media"
                  aria-label={`Watch: ${talk.topic}`}
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${talk.youtubeId}/hqdefault.jpg`}
                    alt={talk.topic}
                    fill
                    sizes="(max-width: 880px) 90vw, 360px"
                  />
                  <span className="play-badge">
                    <span>
                      <IconPlay size={22} />
                    </span>
                  </span>
                </a>
                <div className="post-body">
                  <span className="tag">{talk.speaker}</span>
                  <h3>
                    <a
                      href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {talk.topic}
                    </a>
                  </h3>
                  <div className="post-foot">
                    <span>{talk.date}</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${talk.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="link-arrow"
                    >
                      Watch <span>→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <span className="blob blob-plum" style={{ width: 320, height: 320, top: -120, right: -80 }} />
            <div className="cta-inner">
              <p className="eyebrow is-centered">Want to talk?</p>
              <h2>Join the next Tribe Talk.</h2>
              <p className="lead">
                Be the first to know about upcoming sessions — or put yourself
                forward to share your own story with the Tribe.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Register your interest
                </Link>
                <Link href="/mentors" className="btn btn-ghost">
                  Meet the mentors
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
