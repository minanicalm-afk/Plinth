import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ViewTransition } from "react";
import { BeforeAfter } from "@/components/site/before-after";
import { Gallery } from "@/components/site/gallery";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { getPublishedProject, getPublishedProjects } from "@/lib/data";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.heroImage, alt: project.heroAlt }],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-paper" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getPublishedProject(slug), getPublishedProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const paragraphs = project.body.split(/\n\n+/);

  return (
    <article>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <div className="relative h-[70vh] min-h-[420px] max-h-[860px] bg-ink">
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="relative h-full w-full">
            <Photo src={project.heroImage} alt={project.heroAlt} sizes="100vw" priority className="object-cover" />
          </div>
        </ViewTransition>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-10 md:py-16">
        <p className="eyebrow">
          <Link href="/projects" className="hover:text-ink">Projects</Link>
          <span aria-hidden> / </span>
          {project.category}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.04em]">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted">
          {project.location} · {project.year}
        </p>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft">{project.summary}</p>

        <dl className="mt-12 grid border-y border-line sm:grid-cols-2">
          <Fact label="Location" value={placeLine(project.location, project.county)} />
          <Fact label="Duration" value={project.duration} />
          <Fact label="Client" value={project.clientType} />
          <Fact label="Year" value={String(project.year)} />
          <Fact label="Scope" value={project.scope} wide />
          <Fact label="Outcome" value={project.outcome} wide />
        </dl>

        <div className="mt-12 max-w-[68ch] space-y-5 text-[1.075rem] leading-[1.7] text-ink-soft">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>

      {project.gallery.length ? (
        <div className="mx-auto max-w-[1440px] px-5 pb-8 md:px-10">
          <h2 className="mb-6 font-display text-3xl tracking-tight">Photographs</h2>
          <Gallery images={project.gallery} />
        </div>
      ) : null}

      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
        <h2 className="mb-6 font-display text-3xl tracking-tight">Before and after</h2>
        <BeforeAfter
          before={project.beforeImage}
          beforeAlt={project.beforeAlt}
          after={project.afterImage}
          afterAlt={project.afterAlt}
        />
      </div>

      {next ? (
        <div className="border-t border-line">
          <Link href={`/projects/${next.slug}`} className="group mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 md:grid-cols-2 md:px-10">
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
              <Photo src={next.heroImage} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{next.title}</p>
              <p className="mt-3 text-muted">{next.location}</p>
            </div>
          </Link>
        </div>
      ) : null}

      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-5 px-5 py-16 md:px-10">
          <h2 className="max-w-xl font-display text-4xl tracking-tight">A project of your own?</h2>
          <Link href="/quote" className="btn btn-accent">
            Request a Quote
          </Link>
          <p className="text-sm text-white/60">{site.phoneDisplay}</p>
        </div>
      </div>
    </article>
  );
}

function placeLine(location: string, county: string) {
  if (location.toLowerCase().includes(county.toLowerCase())) return location;
  return `${location}, ${county} County`;
}

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`border-b border-line px-0 py-5 sm:px-6 sm:first:pl-0 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}
