import Link from "next/link";
import { getAllProjects, getEnquiries } from "@/lib/data";
import { formatWhen } from "@/lib/utils";

export const metadata = { title: "Overview" };

export default async function AdminHome() {
  const [projects, enquiries] = await Promise.all([getAllProjects(), getEnquiries()]);
  const fresh = enquiries.filter((item) => item.status === "new");

  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Overview</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Studio</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Projects" value={String(projects.length)} />
        <Stat label="New messages" value={String(fresh.length)} />
        <Stat label="Published" value={String(projects.filter((project) => project.published).length)} />
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/admin/projects/new" className="btn btn-accent">
          Add a project
        </Link>
        <Link href="/admin/enquiries" className="btn btn-line">
          Read messages
        </Link>
      </div>
      <h2 className="mt-14 font-display text-2xl">Latest messages</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {enquiries.slice(0, 5).map((item) => (
          <li key={item.id} className="flex items-baseline justify-between gap-4 py-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted">{item.type === "quote" ? "Quote" : "Message"} · {item.county || "No county"}</p>
            </div>
            <p className="text-sm text-muted">{formatWhen(item.createdAt)}</p>
          </li>
        ))}
        {enquiries.length === 0 ? <li className="py-6 text-muted">No messages yet.</li> : null}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line px-5 py-6">
      <p className="font-display text-4xl">{value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
