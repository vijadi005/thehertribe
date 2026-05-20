"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { images, nav, site } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell">
        <div className="nav">
          <Link href="/" className="nav-brand" aria-label={`${site.name} home`}>
            <Image
              src={images.logo}
              alt={site.name}
              width={130}
              height={54}
              priority
              className="nav-logo"
            />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-right">
            <Link href="/contact" className="btn btn-primary">
              Join the tribe
            </Link>
            <button
              type="button"
              className={`nav-toggle ${open ? "is-open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className={`nav-drawer ${open ? "is-open" : ""}`}>
        <div className="shell">
          <nav className="nav-drawer-inner" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary">
              Join the tribe
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
