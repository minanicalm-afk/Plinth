import Link from "next/link";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { deleteProject } from "@/lib/actions/admin";
import { getAllProjects } from "@/lib/data";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight">The list</h1>
        </div>
        <Link href="/admin/projects/new" className="btn btn-accent">
          Add a project
        </Link>
      </div>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.id} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-2xl tracking-tight">{project.title}</p>
              <p className="mt-1 text-sm text-muted">
                {project.category} · {project.location} · {project.year}
                {project.published ? "" : " · Hidden"}
                {project.featured ? " · On the home page" : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/projects/${project.id}`} className="text-sm underline-offset-4 hover:underline">
                Edit
              </Link>
              {project.published ? (
                <Link href={`/projects/${project.slug}`} className="text-sm text-muted underline-offset-4 hover:underline">
                  View
                </Link>
              ) : null}
              <ConfirmSubmit action={deleteProject} id={project.id} label="Delete" confirm={`Delete ${project.title}?`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
