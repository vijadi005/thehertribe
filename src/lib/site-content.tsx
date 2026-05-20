import { Fragment, type ReactNode } from "react";

// Editable page copy from WordPress (ACF fields on a Page with slug
// "site-content"). Falls back to these defaults until the page is filled in WP.
// Headlines support a *emphasis* convention: text wrapped in *asterisks*
// renders with the rose/plum italic accent.

export type SiteContent = {
  home: { eyebrow: string; title: string; lead: string };
  about: { title: string; lead: string };
  programs: { title: string; lead: string };
  contact: { title: string; lead: string };
  email: string;
  phone: string;
};

const defaults: SiteContent = {
  home: {
    eyebrow: "Be fearless. Be empowered.",
    title: "Take control of your life and write your *own story*.",
    lead: "The Her Tribe is a women-led community for financial literacy, career mentorship, workshops, and personal growth — a circle of women lifting each other forward.",
  },
  about: {
    title: "A circle of women, *growing together*.",
    lead: "The Her Tribe began with a simple belief: every woman deserves a community that helps her thrive — financially, professionally, and personally.",
  },
  programs: {
    title: "Programs built around *real lives*.",
    lead: "Three pathways — career, money, and well-being — plus Tribe Talk, our open space for honest conversation. Come for the skills, stay for the community.",
  },
  contact: {
    title: "Let's *talk*.",
    lead: "Whether you want to join the community, ask about a program, or share your own story as a mentor — we'd love to hear from you.",
  },
  email: "thehertribe@gmail.com",
  phone: "(613) 314-6225",
};

const WP_URL = (
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://cms.thehertribe.com/wp-json/wp/v2"
).replace(/\/$/, "");
const wpEnabled = process.env.WORDPRESS_ENABLED !== "false";

function pick(acf: Record<string, unknown>, key: string, fallback: string): string {
  const v = acf?.[key];
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (wpEnabled) {
    try {
      const res = await fetch(`${WP_URL}/pages?slug=site-content&_fields=acf`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const arr = (await res.json()) as Array<{ acf?: Record<string, unknown> }>;
        const acf = arr?.[0]?.acf;
        if (acf && typeof acf === "object") {
          return {
            home: {
              eyebrow: pick(acf, "home_eyebrow", defaults.home.eyebrow),
              title: pick(acf, "home_title", defaults.home.title),
              lead: pick(acf, "home_lead", defaults.home.lead),
            },
            about: {
              title: pick(acf, "about_title", defaults.about.title),
              lead: pick(acf, "about_lead", defaults.about.lead),
            },
            programs: {
              title: pick(acf, "programs_title", defaults.programs.title),
              lead: pick(acf, "programs_lead", defaults.programs.lead),
            },
            contact: {
              title: pick(acf, "contact_title", defaults.contact.title),
              lead: pick(acf, "contact_lead", defaults.contact.lead),
            },
            email: pick(acf, "contact_email", defaults.email),
            phone: pick(acf, "contact_phone", defaults.phone),
          };
        }
      }
    } catch (err) {
      console.error("getSiteContent failed, using defaults:", err);
    }
  }
  return defaults;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return `tel:${digits.length === 10 ? "+1" + digits : "+" + digits}`;
}

// Render *emphasis* spans as the italic accent used across the site.
export function renderEmphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i} className="fancy">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
