import { ProjectForm } from "@/components/admin/forms";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Projects</p>
      <h1 className="mt-3 mb-10 font-display text-5xl tracking-tight">New project</h1>
      <ProjectForm />
    </div>
  );
}
