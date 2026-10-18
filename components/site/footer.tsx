import Link from "next/link";
import { Mark } from "@/components/site/header";
import { counties, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper pb-24 md:pb-16">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <Mark />
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
            A building contractor in Westlands, working across Nairobi and the counties around it.
          </p>
          <p className="mt-8 font-display text-[clamp(3.5rem,10vw,7rem)] leading-none tracking-[-0.04em]">
            {site.name}
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed">
              <p>{site.legalName}</p>
              <p>{site.street}</p>
              <p>{site.area}</p>
              <p>{site.poBox}</p>
              <a className="mt-3 inline-block underline-offset-4 hover:underline" href={site.mapsUrl}>
                Map
              </a>
            </address>
          </div>
          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/projects" className="hover:underline">Projects</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/team" className="hover:underline">Team</Link></li>
              <li><Link href="/testimonials" className="hover:underline">Testimonials</Link></li>
              <li><Link href="/quote" className="hover:underline">Request a quote</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.hours.map((item) => (
                <li key={item.days}>
                  {item.days}
                  <span className="block text-muted">{item.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              <br />
              <a href={`tel:${site.phoneTel}`} className="hover:underline">{site.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] border-t border-line px-5 py-8 md:px-10">
        <p className="eyebrow">Counties</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {counties.map((county) => (
            <li key={county.slug}>
              <Link href={`/where-we-work#${county.slug}`} className="text-muted hover:text-ink">
                {county.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          © {site.founded}–{site.founded + site.years} {site.legalName}. Registered {site.ncaCategory}, {site.ncaClass.toLowerCase()}.
        </p>
      </div>
    </footer>
  );
}
