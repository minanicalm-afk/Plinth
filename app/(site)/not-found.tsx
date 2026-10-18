import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-10">
      <p className="eyebrow">Missing</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">That project is not on the list.</h1>
      <p className="mt-4 text-lg text-ink-soft">It may be unpublished, or the address has changed.</p>
      <Link href="/projects" className="btn btn-line mt-8">
        All projects
      </Link>
    </div>
  );
}
