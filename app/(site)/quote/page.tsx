import { QuoteForm } from "@/components/site/forms";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Request a Quote",
  description:
    "Request a construction quote from Plinth in Nairobi. Tell us the site, the county and a rough budget. We reply within one working day.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
      <div className="md:col-span-5">
        <p className="eyebrow">Request a quote</p>
        <h1 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.98] tracking-tight">
          Tell us about the site.
        </h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
          <p>
            A few facts are enough: where it is, what you think it is, and when you would like someone to walk it. We reply within one working day. If we are the wrong firm, we will say so.
          </p>
          <ol className="space-y-3 text-base">
            <li><span className="text-accent">01</span> A reply, usually by phone.</li>
            <li><span className="text-accent">02</span> A site walk, if the job is in our counties.</li>
            <li><span className="text-accent">03</span> A written outline of scope, time and cost.</li>
          </ol>
          <p className="text-base">
            Or call <a className="underline underline-offset-4" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.
          </p>
        </div>
      </div>
      <div className="md:col-span-7">
        <QuoteForm />
      </div>
    </div>
  );
}
