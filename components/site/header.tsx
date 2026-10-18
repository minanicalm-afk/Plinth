"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const desktopLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
];

const mobileLinks = [
  ...desktopLinks,
  { href: "/testimonials", label: "Testimonials" },
  { href: "/where-we-work", label: "Where we work" },
  { href: "/contact", label: "Contact" },
];

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative block h-4 w-4 border border-current" aria-hidden>
        <span className="absolute inset-x-0 -bottom-px h-[3px] bg-accent" />
      </span>
      <span className="font-display text-[0.92rem] font-medium tracking-[0.22em]">{site.name.toUpperCase()}</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
          <Mark />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {desktopLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:opacity-70">
              {link.label}
            </Link>
          ))}
          <Link href="/quote" className="btn btn-accent">
            Request a Quote
          </Link>
        </nav>
        <button
          type="button"
          className="text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper px-5 pb-28 pt-8 md:top-20 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-4xl tracking-tight"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quote" className="btn btn-accent mt-4 w-fit" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
