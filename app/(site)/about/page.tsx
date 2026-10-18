import Link from "next/link";
import { Photo } from "@/components/site/photo";
import { principles, process } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, trustStats } from "@/lib/site";

export const metadata = pageMeta({
  title: "About",
  description:
    "Plinth Construction is an NCA 2 building contractor in Westlands, Nairobi, founded in 2008. Houses, workplaces, sheds and renovations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
          A contractor that says when a date is going to move.
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-ink-soft md:col-span-7">
            <p>
              Plinth was formed in {site.founded} by people who had already spent their twenties on Nairobi sites. They wanted a company that would keep the same foreman on a job, and that would rather lose a tender than hide a number.
            </p>
            <p>
              The name is a builder&apos;s word. A plinth is the base a building stands on — the part you stop noticing once the work above it is honest. That is the standard we try to hold: the unglamorous pieces done properly, so the rest can last.
            </p>
            <p>
              We are registered with the National Construction Authority in category 2 for building works. The office is in Westlands. The sites are wherever the programme says they are, inside the counties we can actually reach.
            </p>
          </div>
          <div className="relative aspect-[4/5] bg-paper-deep md:col-span-5">
            <Photo
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80"
              alt="A building frame on site, before the finishes go on."
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>
      </div>

      <dl className="grid border-y border-line md:grid-cols-4">
        {trustStats().map((stat) => (
          <div key={stat.label} className="border-b border-line px-5 py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0">
            <dt className="font-display text-4xl tracking-tight">{stat.value}</dt>
            <dd className="mt-2 text-sm text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
        <h2 className="font-display text-4xl tracking-tight">What we hold to</h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="border-t border-line pt-5">
              <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-paper-deep">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <h2 className="font-display text-4xl tracking-tight">How a job runs</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {process.map((step, index) => (
              <li key={step.title}>
                <p className="text-sm text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/quote" className="btn btn-accent mt-12">
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
