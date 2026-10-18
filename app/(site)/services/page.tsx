import { Photo } from "@/components/site/photo";
import { services } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Residential, commercial, industrial, infrastructure and renovation work by an NCA 2 building contractor in Nairobi.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow">Services</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
        The work we take.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        We do not take every enquiry. If the job is outside these five, or outside the counties we can reach with a foreman who stays, we will say so.
      </p>
      <div className="mt-16 space-y-20 md:space-y-28">
        {services.map((service, index) => (
          <section id={service.slug} key={service.slug} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className={index % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/3] bg-paper-deep">
                <Photo src={service.image} alt={service.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            </div>
            <div>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{service.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{service.body}</p>
              <h3 className="mt-8 text-sm font-semibold tracking-[0.14em] text-muted uppercase">Typical work</h3>
              <ul className="mt-4 space-y-2">
                {service.typical.map((item) => (
                  <li key={item} className="border-t border-line py-2 text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
