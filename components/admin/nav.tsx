"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export function AdminNav({ fresh, mode }: { fresh: number; mode: "neon" | "local" }) {
  const pathname = usePathname();

  return (
    <div className="px-5 py-6">
      <Link href="/" className="font-display text-sm tracking-[0.2em]">
        PLINTH
      </Link>
      <p className="mt-1 text-xs text-muted">Studio</p>
      <nav className="mt-8 flex gap-4 overflow-x-auto md:flex-col md:gap-1" aria-label="Studio">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("flex items-center justify-between py-2 text-sm", active ? "text-ink" : "text-muted")}
              aria-current={active ? "page" : undefined}
            >
              <span>{link.label}</span>
              {link.href === "/admin/enquiries" && fresh > 0 ? (
                <span className="bg-accent px-1.5 py-0.5 text-xs text-white">{fresh}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <p className="mt-8 text-xs text-muted">{mode === "neon" ? "Saving to Neon" : "Saving on this computer"}</p>
    </div>
  );
}
