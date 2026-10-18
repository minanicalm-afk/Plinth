import { ContactForm } from "@/components/site/forms";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact Plinth Construction in Westlands, Nairobi. Call, WhatsApp, or send a note. Office hours Monday to Saturday.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
      <div className="md:col-span-5">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.98] tracking-tight">
          The studio is in Westlands.
        </h1>
        <address className="mt-8 space-y-1 text-lg not-italic leading-relaxed">
          <p>{site.legalName}</p>
          <p>{site.street}</p>
          <p>{site.area}</p>
          <p>{site.poBox}</p>
        </address>
        <p className="mt-6">
          <a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          <br />
          <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <ul className="mt-6 space-y-1 text-sm text-muted">
          {site.hours.map((item) => (
            <li key={item.days}>
              {item.days}: {item.time}
            </li>
          ))}
        </ul>
        <a className="mt-6 inline-block text-sm underline underline-offset-4" href={site.mapsUrl}>
          Open a map
        </a>
      </div>
      <div className="md:col-span-7">
        <ContactForm />
      </div>
    </div>
  );
}
