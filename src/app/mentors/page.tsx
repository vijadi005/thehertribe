import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getMentors } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Mentors",
  description:
    "Meet the #powertribe — the financial experts, coaches, psychologists, and educators who make it happen for the women of The Her Tribe.",
};

export const revalidate = 1800;

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
        <span className="blob blob-plum" style={{ width: 340, height: 340, bottom: -160, left: -80 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Mentors
          </Reveal>
          <Reveal as="h1" delay={60}>
            Meet the <em className="fancy">#powertribe</em>.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            The women who make it happen for you — financial experts, coaches,
            psychologists, and educators, each here to help you grow.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="mentor-grid">
            {mentors.map((mentor, i) => (
              <Reveal as="article" key={mentor.name} className="mentor-card" delay={(i % 3) * 90}>
                <div className="mentor-photo">
                  {mentor.image && (
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      sizes="(max-width: 560px) 90vw, (max-width: 1024px) 45vw, 360px"
                    />
                  )}
                </div>
                <div className="mentor-body">
                  <span className="person-role">{mentor.role}</span>
                  <h3>{mentor.name}</h3>
                  <p>{mentor.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a mentor CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <span className="blob blob-plum" style={{ width: 320, height: 320, top: -120, right: -80 }} />
            <div className="cta-inner">
              <p className="eyebrow is-centered">Want to help?</p>
              <h2>Become a mentor.</h2>
              <p className="lead">
                We&apos;re always looking for women who add value to the Tribe and
                help the cause. If that&apos;s you, we&apos;d love to talk.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Join as a mentor
                </Link>
                <Link href="/workshop" className="btn btn-ghost">
                  See the workshops
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
