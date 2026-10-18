import { Suspense } from "react";
import { ProjectBrowser, ProjectGrid } from "@/components/site/project-browser";
import { getPublishedProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { toCard } from "@/lib/types";

export const metadata = pageMeta({
  title: "Projects",
  description:
    "Houses, offices, sheds, roads and renovations by Plinth Construction in Nairobi, Kiambu, Kajiado, Machakos and beyond.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = (await getPublishedProjects()).map(toCard);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow">Projects</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
        Selected work
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        A short list, not a catalogue of everything since {site.founded}. Filter by the kind of building, then open a project for the photographs and the facts.
      </p>
      <div className="mt-12">
        <Suspense fallback={<ProjectGrid projects={projects} />}>
          <ProjectBrowser projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
