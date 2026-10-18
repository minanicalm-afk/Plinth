import { getPublishedTestimonials } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Testimonials",
  description: "What clients say about Plinth Construction — houses, clinics, sheds and estate works around Nairobi.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const quotes = await getPublishedTestimonials();

  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow">Testimonials</p>
      <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em]">
        In their words.
      </h1>
      <div className="mt-12">
        {quotes.map((quote) => (
          <figure key={quote.id} className="border-t border-line py-12">
            <blockquote className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-snug tracking-tight">
              “{quote.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              {quote.name}, {quote.role}
              {quote.projectTitle ? ` · ${quote.projectTitle}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
