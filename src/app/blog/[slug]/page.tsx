import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PostBody from "@/components/PostBody";
import { author } from "@/lib/content";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug);

  return (
    <main>
      <article>
        {/* Header */}
        <section className="page-hero" style={{ paddingBottom: 0 }}>
          <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, right: -100 }} />
          <div className="shell page-hero-inner">
            <Reveal as="p" className="crumb">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> /{" "}
              {post.tag}
            </Reveal>
            <Reveal>
              <span className="tag">{post.tag}</span>
            </Reveal>
            <Reveal as="h1" delay={60}>
              {post.title}
            </Reveal>
            <Reveal as="div" className="article-meta" delay={120}>
              <span>{author.name}</span>
              {post.date && (
                <>
                  <span className="dot" />
                  <span>{post.date}</span>
                </>
              )}
              {post.readingTime && (
                <>
                  <span className="dot" />
                  <span>{post.readingTime}</span>
                </>
              )}
            </Reveal>
          </div>
        </section>

        {/* Cover */}
        {post.image && (
          <section className="section-sm">
            <div className="shell-narrow">
              <Reveal className="article-cover">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 880px) 92vw, 820px"
                />
              </Reveal>
            </div>
          </section>
        )}

        {/* Body */}
        <section style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}>
          <div className="shell">
            <Reveal className="prose">
              <PostBody post={post} />
            </Reveal>

            <Reveal className="author-card">
              <Image src={author.image} alt={author.name} width={64} height={64} />
              <div>
                <strong>{author.name}</strong>
                <span>{author.role}</span>
              </div>
            </Reveal>
          </div>
        </section>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="shell">
            <Reveal className="section-head">
              <p className="eyebrow">Keep reading</p>
              <h2>More from the Tribe Blog.</h2>
            </Reveal>
            <div className="post-grid">
              {related.map((r, i) => (
                <Reveal as="article" key={r.slug} className="post" delay={i * 100}>
                  <Link href={`/blog/${r.slug}`} className="post-media">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 880px) 90vw, 360px"
                      />
                    )}
                  </Link>
                  <div className="post-body">
                    <span className="tag">{r.tag}</span>
                    <h3>{r.title}</h3>
                    <p>{r.excerpt}</p>
                    <div className="post-foot">
                      <span>{r.date}</span>
                      <Link href={`/blog/${r.slug}`} className="link-arrow">
                        Read <span>→</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// Revalidate from Sanity periodically when the CMS is connected.
export const revalidate = 1800;
