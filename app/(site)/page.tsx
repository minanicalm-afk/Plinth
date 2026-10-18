import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { getPublishedProjects, getPublishedTestimonials } from "@/lib/data";
import { process, services } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";
import { counties, site, trustStats } from "@/lib/site";
import { toCard } from "@/lib/types";

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([getPublishedProjects(), getPublishedTestimonials()]);
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  const lead = featured[0] ?? projects[0];
  const quotes = testimonials.slice(0, 2);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <section className="hero-home relative min-h-[100svh] bg-ink text-white">
        <Photo
          src={lead?.heroImage ?? site.heroImage}
          alt={lead?.heroAlt ?? site.heroAlt}
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/25" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-28 pb-28 md:px-10 md:pb-20">
          <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-white/75 uppercase">
            Nairobi · Since {site.founded}
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.04em]">
            Buildings with a longer life.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            A Nairobi contractor for houses, workplaces, sheds and the ground they stand on — across the city and eleven counties around it.
          </p>
          {lead ? (
            <Link href={`/projects/${lead.slug}`} className="mt-4 w-fit text-sm text-white/80 underline-offset-4 hover:underline">
              {lead.title}, {lead.location} · {lead.year}
            </Link>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="btn btn-light">
              View Our Projects
            </Link>
            <Link href="/quote" className="btn btn-accent">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line" aria-label="Credentials">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
          {trustStats().map((stat) => (
            <div key={stat.label} className="border-t border-line px-5 py-8 md:border-t-0 md:border-l md:px-8 md:first:border-l-0">
              <dt className="font-display text-4xl tracking-tight md:text-5xl">{stat.value}</dt>
              <dd className="mt-2 text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.035em]">
                Recent buildings, and the ground around them.
              </h2>
            </div>
            <Link href="/projects" className="text-sm underline-offset-4 hover:underline">
              All projects
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-12">
          {featured.map((project, index) => (
            <div key={project.slug} className={index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-6"}>
              <ProjectCard
                project={toCard(project)}
                priority={index === 0}
                aspect={index === 0 ? "aspect-[4/5] md:aspect-[4/5]" : "aspect-[4/5]"}
                sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-none tracking-tight">
              Five kinds of work. One way of doing them.
            </h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className="group grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
                  <span className="text-sm text-muted md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-3xl tracking-tight md:col-span-4">{service.title}</span>
                  <span className="text-ink-soft md:col-span-6">{service.summary}</span>
                  <span className="text-sm text-muted md:col-span-1 md:text-right">View</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] bg-paper-deep">
            <Photo
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
              alt="Drawings and a scale model on a table before a project is priced."
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-tight">
            Formed in {site.founded}, still walking the site before we price it.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              Plinth is a building contractor based in Westlands. The people who started it had already spent years on other firms&apos; sites, and wanted a practice that would say when a date was going to move.
            </p>
            <p>
              Most of the work is in Nairobi. The rest is in {counties.length - 1} counties further out, when the job is worth the travel and a foreman can stay with it.
            </p>
          </div>
          <Link href="/about" className="btn btn-line mt-8">
            About the company
          </Link>
        </Reveal>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <p className="eyebrow text-white/60">How a job runs</p>
          <ol className="mt-10 grid gap-10 md:grid-cols-4">
            {process.map((step, index) => (
              <li key={step.title}>
                <p className="font-display text-3xl text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {quotes.length ? (
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] tracking-tight">From the clients</h2>
            <Link href="/testimonials" className="text-sm underline-offset-4 hover:underline">
              All of them
            </Link>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {quotes.map((quote) => (
              <figure key={quote.id} className="border-t border-line pt-8">
                <blockquote className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug tracking-tight">
                  “{quote.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  {quote.name}, {quote.role}
                  {quote.projectTitle ? ` · ${quote.projectTitle}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight">Where we work</h2>
            <Link href="/where-we-work" className="text-sm underline-offset-4 hover:underline">
              The counties
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
            {counties.map((county) => (
              <li key={county.slug}>{county.name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6 px-5 py-20 md:px-10 md:py-28">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-tight">
            If you have a site, a building, or a date you are trying to keep.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn btn-accent">
              Request a Quote
            </Link>
            <a href={`tel:${site.phoneTel}`} className="btn btn-line">
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
