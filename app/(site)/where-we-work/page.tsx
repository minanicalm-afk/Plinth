import { pageMeta } from "@/lib/seo";
import { counties, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Where we work",
  description:
    "Plinth Construction works in Nairobi and eleven surrounding counties, including Kiambu, Kajiado, Machakos, Nakuru, Mombasa and Kilifi.",
  path: "/where-we-work",
});

export default function WhereWeWorkPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow">Where we work</p>
      <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em]">
        Nairobi first, then the counties we can reach properly.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        The office is in Westlands. A job further out is taken when a foreman can stay with it, not when it merely looks good on a map. These are the {counties.length} counties on the current list.
      </p>
      <div className="mt-12">
        {counties.map((county) => (
          <section key={county.slug} id={county.slug} className="scroll-mt-28 border-t border-line py-8">
            <h2 className="font-display text-3xl tracking-tight">{county.name}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{county.note}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        {site.street}, {site.area}. {site.phoneDisplay}.
      </p>
    </div>
  );
}
