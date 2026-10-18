import Link from "next/link";
import { Mark } from "@/components/site/header";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-24">
      <Mark />
      <p className="eyebrow mt-12">404</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">This page is not on the drawings.</h1>
      <p className="mt-5 max-w-md text-lg text-ink-soft">The address may have changed, or the page was never built.</p>
      <Link href="/" className="btn btn-accent mt-8 w-fit">
        Back to the studio
      </Link>
    </div>
  );
}
