import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/forms";
import { getProjectById } from "@/lib/data";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  return { title: project ? `Edit ${project.title}` : "Edit project" };
}

export default async function EditProjectPage({ params, searchParams }: Props) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Projects</p>
      <div className="mt-3 mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl tracking-tight">Edit</h1>
        {project.published ? (
          <Link href={`/projects/${project.slug}`} className="text-sm underline-offset-4 hover:underline">
            View on the site
          </Link>
        ) : null}
      </div>
      {query.saved ? <p className="mb-6 border border-line bg-white px-4 py-3 text-sm">Saved.</p> : null}
      <ProjectForm project={project} />
    </div>
  );
}
