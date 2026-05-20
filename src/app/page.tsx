import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pillarIcons } from "@/components/icons";
import { images, pillars, stats, testimonials, workshops } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <span className="blob blob-rose" style={{ width: 520, height: 520, top: -160, right: -120 }} />
        <span className="blob blob-plum" style={{ width: 380, height: 380, bottom: -180, left: -120 }} />
        <div className="shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal as="p" className="eyebrow">
                Be fearless. Be empowered.
              </Reveal>
              <Reveal as="h1" delay={80}>
                Take control of your life and write your <em className="fancy">own story</em>.
              </Reveal>
              <Reveal as="p" className="lead" delay={160}>
                The Her Tribe is a women-led community for financial literacy,
                career mentorship, workshops, and personal growth — a circle of
                women lifting each other forward.
              </Reveal>
              <Reveal className="hero-actions" delay={220}>
                <Link href="/contact" className="btn btn-primary">
                  Join the tribe
                </Link>
                <Link href="/programs" className="btn btn-ghost">
                  Explore programs
                </Link>
              </Reveal>
              <Reveal className="hero-meta" delay={300}>
                {stats.map((stat, i) => (
                  <div key={stat.label} style={{ display: "contents" }}>
                    {i > 0 && <span className="hero-meta-rule" />}
                    <div className="hero-meta-item">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal className="hero-visual" delay={160}>
              <span className="hero-petal" />
              <div className="hero-frame">
                <Image
                  src={images.hero}
                  alt="A woman from The Her Tribe community"
                  fill
                  priority
                  sizes="(max-width: 880px) 90vw, 520px"
                />
              </div>
              <div className="hero-badge">
                <small>At the center</small>
                <strong>Money · Mindset · Mentorship</strong>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="shell">
        <Reveal className="value-strip">
          {[
            { t: "Career clarity", s: "Find your next move" },
            { t: "Financial confidence", s: "Own your numbers" },
            { t: "Emotional well-being", s: "Lead with intention" },
            { t: "Women uplifting women", s: "Never alone" },
          ].map((v) => (
            <div key={v.t}>
              <strong>{v.t}</strong>
              <span>{v.s}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Vision split */}
      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal className="split-media is-arch">
              <Image
                src={images.workshop}
                alt="The Her Tribe workshop"
                fill
                sizes="(max-width: 880px) 90vw, 540px"
              />
            </Reveal>
            <Reveal className="split-copy" delay={120}>
              <p className="eyebrow">Our vision</p>
              <h2>A community where women gain the confidence to design their own life.</h2>
              <p className="lead">
                The Her Tribe empowers women through knowledge, resources,
                mentorship, and well-being — so they can navigate personal and
                professional life with more confidence.
              </p>
              <ul className="checklist list-reset">
                <li>
                  <span>
                    <b>Practical, judgment-free guidance</b> — meet women exactly where they are.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Real mentors, real conversations</b> — not theory, but lived experience.
                  </span>
                </li>
                <li>
                  <span>
                    <b>A tribe that stays</b> — community that lasts beyond a single workshop.
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head is-centered">
            <p className="eyebrow is-centered">Three ways we help</p>
            <h2>Practical support, built around real women&apos;s lives.</h2>
          </Reveal>
          <div className="pillar-grid">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <Reveal
                  key={pillar.title}
                  className={`pillar ${i === 1 ? "is-feature" : ""}`}
                  delay={i * 110}
                >
                  <span className="pillar-num">{pillar.num}</span>
                  <div className="pillar-icon">
                    <Icon />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                  <Link href="/programs" className="link-arrow">
                    Learn more <span>→</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">Workshops & Tribe Talk</p>
            <h2>Come for the skills. Stay for the network.</h2>
            <p className="lead">
              Guided by women across career, wellness, and money — every session
              is a chance to learn something and meet someone.
            </p>
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
          <Reveal className="hero-actions" delay={120}>
            <Link href="/programs" className="btn btn-ghost">
              See all programs
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <span className="blob blob-rose" style={{ width: 420, height: 420, top: -120, left: -100, opacity: 0.25 }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <Reveal className="section-head is-centered">
            <p className="eyebrow is-centered">Testimonials</p>
            <h2>Women who found clarity and confidence here.</h2>
          </Reveal>
          <div className="quote-grid">
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={t.name} className="quote" delay={i * 120}>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <Image src={t.image} alt={t.name} width={52} height={52} />
                  <span>
                    <span className="quote-name">{t.name}</span>
                    <br />
                    <span className="quote-role">{t.role}</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">The Tribe Blog</p>
            <h2>Fresh thinking on money, work, and well-being.</h2>
          </Reveal>
          <div className="post-grid">
            {posts.map((post, i) => (
              <Reveal as="article" key={post.slug} className="post" delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="post-media">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 880px) 90vw, 360px"
                    />
                  )}
                </Link>
                <div className="post-body">
                  <span className="tag">{post.tag}</span>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <div className="post-foot">
                    <span>{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="link-arrow">
                      Read <span>→</span>
                    </Link>
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
              <p className="eyebrow is-centered">Join the tribe</p>
              <h2>Your story is worth designing on your own terms.</h2>
              <p className="lead">
                Become part of a community of women learning, growing, and
                lifting each other forward — and get thoughtful updates along the
                way.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Join the community
                </Link>
                <Link href="/about" className="btn btn-ghost">
                  Learn our story
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
