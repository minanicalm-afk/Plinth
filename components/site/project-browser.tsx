"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/site/project-card";
import { categories, isCategory, type ProjectCard as Card } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectBrowser({ projects }: { projects: Card[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get("category") ?? "All";
  const category = raw === "All" || isCategory(raw) ? raw : "All";
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);

  function choose(next: string) {
    const query = new URLSearchParams(params.toString());
    if (next === "All") query.delete("category");
    else query.set("category", next);
    const value = query.toString();
    router.replace(value ? `/projects?${value}` : "/projects", { scroll: false });
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="toolbar" aria-label="Filter projects by category">
        {["All", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => choose(item)}
            className={cn(
              "shrink-0 border px-3 py-2 text-sm",
              category === item ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 mb-8 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {visible.length === 0 ? (
        <p className="max-w-md text-lg text-ink-soft">Nothing in this category is published yet.</p>
      ) : (
        <ProjectGrid projects={visible} />
      )}
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: Card[] }) {
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
          priority={index < 2}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ))}
    </div>
  );
}
