import type { PortableTextBlock } from "@portabletext/react";
import { posts as localPosts, type Block, type Post } from "@/lib/content";
import { sanityClient, sanityEnabled } from "@/lib/sanity";

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  readingTime: string;
};

export type FullPost = PostSummary & {
  blocks?: Block[];
  html?: string;
  portable?: PortableTextBlock[];
};

type SanitySummary = Omit<PostSummary, "date" | "readingTime"> & {
  date: string | null;
  readingTime: string | null;
};

type WpRendered = {
  rendered?: string;
};

type WpPost = {
  slug: string;
  date: string;
  modified?: string;
  link?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url?: string }>;
      };
    }>;
    "wp:term"?: Array<Array<{ name?: string; taxonomy?: string }>>;
  };
};

const SUMMARY_PROJECTION = `
  "slug": slug.current,
  title,
  "date": coalesce(publishedAt, _createdAt),
  "tag": coalesce(category, "Blog"),
  excerpt,
  "image": coverImage.asset->url,
  "readingTime": readingTime
`;

const WORDPRESS_API_URL = (
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://thehertribe.com/wp-json/wp/v2"
).replace(/\/$/, "");

const wordpressEnabled = process.env.WORDPRESS_ENABLED !== "false";

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(value = ""): string {
  return decodeEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function sanitizeWordPressHtml(value = ""): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\shref=["']javascript:[^"']*["']/gi, "")
    .replace(/\ssrc=["']javascript:[^"']*["']/gi, "");
}

function readingTimeFromHtml(html = ""): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  if (!words) return "";
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function getWpFeaturedImage(post: WpPost): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return (
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.source_url ||
    ""
  );
}

function getWpCategory(post: WpPost): string {
  const terms = post._embedded?.["wp:term"] || [];
  const category = terms.flat().find((term) => term.taxonomy === "category" && term.name);
  return decodeEntities(category?.name || "Blog");
}

function normalizeWpPost(post: WpPost): FullPost {
  const html = sanitizeWordPressHtml(post.content?.rendered || "");
  const excerpt = stripHtml(post.excerpt?.rendered || html).slice(0, 190);
  return {
    slug: post.slug,
    title: decodeEntities(stripHtml(post.title?.rendered || "Untitled")),
    date: formatDate(post.date),
    tag: getWpCategory(post),
    excerpt: excerpt ? `${excerpt}${excerpt.length >= 190 ? "…" : ""}` : "",
    image: getWpFeaturedImage(post),
    readingTime: readingTimeFromHtml(html),
    html,
  };
}

function toSummary(p: Post): PostSummary {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    tag: p.tag,
    excerpt: p.excerpt,
    image: p.image,
    readingTime: p.readingTime,
  };
}

function normalize(s: SanitySummary): PostSummary {
  return {
    ...s,
    date: formatDate(s.date),
    readingTime: s.readingTime || "",
  };
}

async function fetchWordPressPosts(params = ""): Promise<WpPost[]> {
  if (!wordpressEnabled) return [];
  const separator = params ? `&${params}` : "";
  const response = await fetch(
    `${WORDPRESS_API_URL}/posts?per_page=20&_embed=1${separator}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    throw new Error(`WordPress posts request failed: ${response.status}`);
  }
  return response.json();
}

export async function getAllPosts(): Promise<PostSummary[]> {
  if (wordpressEnabled) {
    try {
      const docs = await fetchWordPressPosts();
      if (docs && docs.length) return docs.map(normalizeWpPost);
    } catch (err) {
      console.error("WordPress getAllPosts failed, trying next source:", err);
    }
  }

  if (sanityEnabled && sanityClient) {
    try {
      const docs = await sanityClient.fetch<SanitySummary[]>(
        `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){${SUMMARY_PROJECTION}}`
      );
      if (docs && docs.length) return docs.map(normalize);
    } catch (err) {
      console.error("Sanity getAllPosts failed, using local posts:", err);
    }
  }
  return localPosts.map(toSummary);
}

export async function getPostSlugs(): Promise<string[]> {
  if (wordpressEnabled) {
    try {
      const docs = await fetchWordPressPosts("_fields=slug");
      if (docs && docs.length) return docs.map((post) => post.slug);
    } catch (err) {
      console.error("WordPress getPostSlugs failed, trying next source:", err);
    }
  }

  if (sanityEnabled && sanityClient) {
    try {
      const slugs = await sanityClient.fetch<string[]>(
        `*[_type == "post" && defined(slug.current)].slug.current`
      );
      if (slugs && slugs.length) return slugs;
    } catch (err) {
      console.error("Sanity getPostSlugs failed, using local posts:", err);
    }
  }
  return localPosts.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<FullPost | null> {
  if (wordpressEnabled) {
    try {
      const docs = await fetchWordPressPosts(`slug=${encodeURIComponent(slug)}`);
      if (docs && docs[0]) return normalizeWpPost(docs[0]);
    } catch (err) {
      console.error("WordPress getPostBySlug failed, trying next source:", err);
    }
  }

  if (sanityEnabled && sanityClient) {
    try {
      const doc = await sanityClient.fetch<(SanitySummary & { body?: PortableTextBlock[] }) | null>(
        `*[_type == "post" && slug.current == $slug][0]{${SUMMARY_PROJECTION}, body}`,
        { slug }
      );
      if (doc) return { ...normalize(doc), portable: doc.body || [] };
    } catch (err) {
      console.error("Sanity getPostBySlug failed, using local posts:", err);
    }
  }
  const local = localPosts.find((p) => p.slug === slug);
  return local ? { ...toSummary(local), blocks: local.body } : null;
}

export async function getRelatedPosts(
  slug: string,
  limit = 2
): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}
