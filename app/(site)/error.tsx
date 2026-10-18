"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-10">
      <p className="eyebrow">Something slipped</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">This page did not load.</h1>
      <p className="mt-4 text-lg text-ink-soft">Try it once more. If it keeps failing, call the studio.</p>
      <button type="button" className="btn btn-accent mt-8" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
