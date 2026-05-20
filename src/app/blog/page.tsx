import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BlogList from "@/components/BlogList";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The Tribe Blog — fresh thinking on money, work, growth, and well-being for women designing their own lives.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts[0];

  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Blog
          </Reveal>
          <Reveal as="h1" delay={60}>
            The Tribe <em className="fancy">Blog</em>
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Fresh thinking on money, work, growth, and well-being — written for
            women designing their own lives.
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="feature-post">
            <div>
              <span className="tag">Featured · {featured.tag}</span>
              <h2>{featured.title}</h2>
              <p className="lead">{featured.excerpt}</p>
              <div className="post-foot" style={{ borderTop: 0, paddingTop: 16 }}>
                <span>{featured.date}</span>
                <span>{featured.readingTime}</span>
              </div>
              <div className="hero-actions" style={{ marginTop: 20 }}>
                <Link href={`/blog/${featured.slug}`} className="btn btn-primary">
                  Read the story
                </Link>
              </div>
            </div>
            <Link href={`/blog/${featured.slug}`} className="feature-post-media">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 880px) 90vw, 480px"
                />
              )}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filterable grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">All stories</p>
            <h2>Read by category.</h2>
          </Reveal>
          <BlogList posts={posts} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Reveal className="cta">
            <div className="cta-inner">
              <p className="eyebrow is-centered">The Tribe Letter</p>
              <h2>Thoughtful notes, straight to your inbox.</h2>
              <p className="lead">
                Occasional reflections on money, mindset, and momentum — never
                spam, always from the heart.
              </p>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
