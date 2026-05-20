"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogCategories } from "@/lib/content";
import type { PostSummary } from "@/lib/posts";

export default function BlogList({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.tag === active);

  return (
    <>
      <Reveal className="filter-row">
        {blogCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip ${active === cat ? "is-active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      {filtered.length === 0 ? (
        <p className="lead">No stories in this category yet — check back soon.</p>
      ) : (
        <div className="post-grid">
          {filtered.map((post, i) => (
            <Reveal as="article" key={post.slug} className="post" delay={i * 90}>
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
      )}
    </>
  );
}
