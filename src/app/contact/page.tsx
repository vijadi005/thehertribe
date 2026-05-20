import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { IconMail, IconPhone, IconClock } from "@/components/icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to The Her Tribe — join the community, ask about a program, or become a mentor. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <span className="blob blob-rose" style={{ width: 460, height: 460, top: -180, left: -100 }} />
        <div className="shell page-hero-inner">
          <Reveal as="p" className="crumb">
            <Link href="/">Home</Link> / Contact
          </Reveal>
          <Reveal as="h1" delay={60}>
            Let&apos;s <em className="fancy">talk</em>.
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            Whether you want to join the community, ask about a program, or share
            your own story as a mentor — we&apos;d love to hear from you.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="contact-grid">
            <Reveal>
              <p className="eyebrow">Reach us</p>
              <h2 style={{ margin: "16px 0 28px" }}>
                A friendly inbox, always open.
              </h2>

              <div className="contact-card">
                <div className="pillar-icon">
                  <IconMail size={22} />
                </div>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="pillar-icon">
                  <IconPhone size={22} />
                </div>
                <div>
                  <h3>Phone</h3>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="pillar-icon">
                  <IconClock size={22} />
                </div>
                <div>
                  <h3>Response time</h3>
                  <p>We usually reply within 1–2 days.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
