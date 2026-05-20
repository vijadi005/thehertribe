import {
  mentors as localMentors,
  tribeTalks as localTribeTalks,
  workshopOfferings as localWorkshops,
  type Mentor,
  type TribeTalk,
  type WorkshopOffering,
} from "@/lib/content";

// Headless WordPress (GoDaddy) is the CMS for all structured content.
// Each content type below maps a WP custom post type + ACF fields to the
// shapes the pages already use, and falls back to the in-code content in
// content.ts until the WordPress side is configured.

const WP_URL = (
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://thehertribe.com/wp-json/wp/v2"
).replace(/\/$/, "");

const wpEnabled = process.env.WORDPRESS_ENABLED !== "false";

type WpMedia = {
  source_url?: string;
  media_details?: { sizes?: Record<string, { source_url?: string }> };
};

type WpEntry = {
  id: number;
  slug: string;
  date: string;
  menu_order?: number;
  title?: { rendered?: string };
  acf?: Record<string, unknown>;
  _embedded?: { "wp:featuredmedia"?: WpMedia[] };
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

function stripTags(value = ""): string {
  return decodeEntities(value.replace(/<[^>]+>/g, "").trim());
}

function acfStr(entry: WpEntry, key: string): string {
  const value = entry.acf?.[key];
  return typeof value === "string" ? value.trim() : "";
}

function featuredImage(entry: WpEntry): string {
  const media = entry._embedded?.["wp:featuredmedia"]?.[0];
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
  if (Number.isNaN(date.getTime())) return value; // already a display string
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchType(type: string, params = ""): Promise<WpEntry[]> {
  if (!wpEnabled) return [];
  const separator = params ? `&${params}` : "";
  const response = await fetch(
    `${WP_URL}/${type}?per_page=100&_embed=1&orderby=menu_order&order=asc${separator}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    throw new Error(`WordPress ${type} request failed: ${response.status}`);
  }
  return response.json();
}

// CPT: `mentor` — title = name, featured image = photo, ACF: role, bio
export async function getMentors(): Promise<Mentor[]> {
  if (wpEnabled) {
    try {
      const docs = await fetchType("mentor");
      const mapped = docs
        .map((d) => ({
          name: stripTags(d.title?.rendered || ""),
          role: decodeEntities(acfStr(d, "role")),
          bio: decodeEntities(acfStr(d, "bio")),
          image: featuredImage(d),
        }))
        .filter((m) => m.name && m.image);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getMentors failed, using local content:", err);
    }
  }
  return localMentors;
}

// CPT: `workshop` — title, featured image, ACF: subtitle, price, description
export async function getWorkshopOfferings(): Promise<WorkshopOffering[]> {
  if (wpEnabled) {
    try {
      const docs = await fetchType("workshop");
      const mapped = docs
        .map((d) => ({
          title: stripTags(d.title?.rendered || ""),
          subtitle: decodeEntities(acfStr(d, "subtitle")),
          copy: decodeEntities(acfStr(d, "description")),
          price: decodeEntities(acfStr(d, "price")) || "Free",
          image: featuredImage(d),
        }))
        .filter((w) => w.title && w.image);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getWorkshopOfferings failed, using local content:", err);
    }
  }
  return localWorkshops;
}

// CPT: `tribe_talk` — title = topic, ACF: speaker, youtube_id, session_date
export async function getTribeTalks(): Promise<TribeTalk[]> {
  if (wpEnabled) {
    try {
      const docs = await fetchType("tribe_talk");
      const mapped = docs
        .map((d) => ({
          youtubeId: acfStr(d, "youtube_id"),
          speaker: decodeEntities(acfStr(d, "speaker")),
          topic: stripTags(d.title?.rendered || ""),
          date: formatDate(acfStr(d, "session_date") || d.date),
        }))
        .filter((t) => t.youtubeId && t.topic);
      if (mapped.length) return mapped;
    } catch (err) {
      console.error("WordPress getTribeTalks failed, using local content:", err);
    }
  }
  return localTribeTalks;
}
