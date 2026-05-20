import {
  mentors as localMentors,
  tribeTalks as localTribeTalks,
  workshopOfferings as localWorkshops,
  type Mentor,
  type TribeTalk,
  type WorkshopOffering,
} from "@/lib/content";

// Headless WordPress (GoDaddy) is the CMS. Mentors / Workshops / Tribe Talk are
// managed as ordinary WordPress POSTS filed under a dedicated category — no
// plugins needed. Each maps to the shapes the pages use, and falls back to the
// in-code content in content.ts until the matching category/posts exist.
//
//   Category "mentors"     -> title=name,  excerpt=role,      content=bio,  featured image=photo
//   Category "workshops"   -> title=title, excerpt=subtitle,  content=copy, featured image=image
//   Category "tribe-talk"  -> title=topic, excerpt=speaker,   content contains the YouTube link
//
// These categories are also excluded from the blog (see lib/posts.ts).

export const CONTENT_CATEGORY_SLUGS = {
  mentors: "mentors",
  workshops: "workshops",
  tribeTalk: "tribe-talk",
} as const;

const WP_URL = (
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://thehertribe.com/wp-json/wp/v2"
).replace(/\/$/, "");

const wpEnabled = process.env.WORDPRESS_ENABLED !== "false";

type WpRendered = { rendered?: string };

type WpPost = {
  id: number;
  slug: string;
  date: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: { sizes?: Record<string, { source_url?: string }> };
    }>;
  };
};

function decodeEntities(value = ""): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
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

function featuredImage(post: WpPost): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return (
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.source_url ||
    ""
  );
}

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function extractYouTubeId(html = ""): string {
  const m = html.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : "";
}

// Resolve a category slug -> id (memoized per worker isolate).
const categoryIdCache = new Map<string, Promise<number | null>>();

async function getCategoryId(slug: string): Promise<number | null> {
  if (!wpEnabled) return null;
  const cached = categoryIdCache.get(slug);
  if (cached) return cached;
  const p = (async () => {
    try {
      const res = await fetch(
        `${WP_URL}/categories?slug=${encodeURIComponent(slug)}&per_page=1`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) return null;
      const cats = (await res.json()) as Array<{ id: number }>;
      return cats?.[0]?.id ?? null;
    } catch {
      return null;
    }
  })();
  categoryIdCache.set(slug, p);
  return p;
}

// Category ids to exclude from the blog (mentors/workshops/tribe-talk).
export async function getContentCategoryIds(): Promise<number[]> {
  const ids = await Promise.all(
    Object.values(CONTENT_CATEGORY_SLUGS).map((s) => getCategoryId(s))
  );
  return ids.filter((id): id is number => typeof id === "number");
}

async function fetchPostsByCategory(slug: string): Promise<WpPost[]> {
  if (!wpEnabled) return [];
  const id = await getCategoryId(slug);
  if (!id) return [];
  const res = await fetch(
    `${WP_URL}/posts?categories=${id}&per_page=100&_embed=1`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`WordPress posts (cat ${slug}) failed: ${res.status}`);
  return res.json();
}

export async function getMentors(): Promise<Mentor[]> {
  if (wpEnabled) {
    try {
      const posts = await fetchPostsByCategory(CONTENT_CATEGORY_SLUGS.mentors);
      const mapped = posts
        .map((p) => ({
          name: stripHtml(p.title?.rendered || ""),
          role: stripHtml(p.excerpt?.rendered || ""),
          bio: stripHtml(p.content?.rendered || ""),
          image: featuredImage(p),
        }))
        .filter((m) => m.name && m.image);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getMentors failed, using local content:", err);
    }
  }
  return localMentors;
}

export async function getWorkshopOfferings(): Promise<WorkshopOffering[]> {
  if (wpEnabled) {
    try {
      const posts = await fetchPostsByCategory(CONTENT_CATEGORY_SLUGS.workshops);
      const mapped = posts
        .map((p) => ({
          title: stripHtml(p.title?.rendered || ""),
          subtitle: stripHtml(p.excerpt?.rendered || ""),
          copy: stripHtml(p.content?.rendered || ""),
          price: "Free",
          image: featuredImage(p),
        }))
        .filter((w) => w.title && w.image);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getWorkshopOfferings failed, using local content:", err);
    }
  }
  return localWorkshops;
}

export async function getTribeTalks(): Promise<TribeTalk[]> {
  if (wpEnabled) {
    try {
      const posts = await fetchPostsByCategory(CONTENT_CATEGORY_SLUGS.tribeTalk);
      const mapped = posts
        .map((p) => ({
          youtubeId: extractYouTubeId(p.content?.rendered || ""),
          speaker: stripHtml(p.excerpt?.rendered || ""),
          topic: stripHtml(p.title?.rendered || ""),
          date: formatDate(p.date),
        }))
        .filter((t) => t.youtubeId && t.topic);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getTribeTalks failed, using local content:", err);
    }
  }
  return localTribeTalks;
}
