import Image from "next/image";
import Link from "next/link";
import { images, nav, site } from "@/lib/content";
import { IconInstagram, IconLinkedin, IconFacebook } from "@/components/icons";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-logo" aria-label={`${site.name} home`}>
              <Image src={images.logo} alt={site.name} width={150} height={62} />
            </Link>
            <p>
              A women-led community for financial literacy, career mentorship,
              and well-being — helping women design their own lives with
              confidence.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <IconLinkedin />
              </a>
              <a href="#" aria-label="Facebook">
                <IconFacebook />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <Link href="/programs">Career mentorship</Link>
            <Link href="/programs">Financial literacy</Link>
            <Link href="/programs">Well-being circles</Link>
            <Link href="/programs">Tribe Talk</Link>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.phoneHref}>{site.phone}</a>
            <p style={{ marginTop: 14, maxWidth: "26ch" }}>
              Supported by the Dhruva Foundation.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {site.name}. Be fearless. Be empowered.
          </span>
          <span>Made with care for women everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
