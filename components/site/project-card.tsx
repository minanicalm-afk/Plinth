import { ViewTransition } from "react";
import Link from "next/link";
import { Photo } from "@/components/site/photo";
import type { ProjectCard as Card } from "@/lib/types";

export function ProjectCard({
  project,
  sizes,
  priority = false,
  index,
  aspect = "aspect-[4/5]",
}: {
  project: Card;
  sizes: string;
  priority?: boolean;
  index?: number;
  aspect?: string;
}) {
  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="group block">
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className={`relative overflow-hidden bg-paper-deep ${aspect}`}>
            <Photo
              src={project.heroImage}
              alt={project.heroAlt}
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="eyebrow">{project.category}</p>
          {index !== undefined ? (
            <p className="text-sm tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</p>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-[1.7rem] leading-none tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">
          {project.location}
          <span aria-hidden> · </span>
          {project.year}
        </p>
      </Link>
    </article>
  );
}
