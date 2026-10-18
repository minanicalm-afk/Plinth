"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/site/photo";
import type { ProjectImage } from "@/lib/types";

export function Gallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((current) => (current === null ? current : (current + 1) % images.length));
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length]);

  if (!images.length) return null;

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-12">
        {images.map((image, imageIndex) => (
          <button
            key={`${image.url}-${imageIndex}`}
            type="button"
            aria-label={`Open photograph: ${image.alt}`}
            className={`relative block overflow-hidden bg-paper-deep text-left ${imageIndex === 0 ? "aspect-[16/10] md:col-span-8" : "aspect-[4/3] md:col-span-4"}`}
            onClick={() => setIndex(imageIndex)}
          >
            <Photo src={image.url} alt={image.alt} sizes={imageIndex === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"} />
          </button>
        ))}
      </div>
      {index !== null ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Project photographs"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-sm text-white/70">
              {index + 1} / {images.length}
            </p>
            <button type="button" className="text-sm" onClick={() => setIndex(null)}>
              Close
            </button>
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-5 pb-8">
            <button type="button" className="hidden px-4 text-sm md:block" onClick={() => setIndex((index - 1 + images.length) % images.length)}>
              Previous
            </button>
            <div className="relative mx-auto h-[70vh] w-full">
              <Photo src={images[index].url} alt={images[index].alt} sizes="100vw" className="object-contain" />
            </div>
            <button type="button" className="hidden px-4 text-sm md:block" onClick={() => setIndex((index + 1) % images.length)}>
              Next
            </button>
          </div>
          <p className="px-5 pb-6 text-center text-sm text-white/75">{images[index].alt}</p>
        </div>
      ) : null}
    </div>
  );
}
