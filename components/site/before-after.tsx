"use client";

import { useState } from "react";
import { Photo } from "@/components/site/photo";

export function BeforeAfter({
  before,
  beforeAlt,
  after,
  afterAlt,
}: {
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
}) {
  const [value, setValue] = useState(58);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink select-none">
        <Photo src={after} alt={afterAlt} sizes="100vw" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Photo src={before} alt={beforeAlt} sizes="100vw" />
        </div>
        <input
          className="compare-range"
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="Compare before and after. Move left to see more of the finished building."
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <div className="pointer-events-none absolute inset-y-0 z-[2]" style={{ left: `${value}%` }}>
          <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white" />
          <div className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center border border-white/80 bg-ink/50 text-[0.65rem] tracking-[0.14em] text-white uppercase">
            Drag
          </div>
        </div>
        <span className="pointer-events-none absolute top-4 left-4 bg-ink/60 px-2 py-1 text-[0.68rem] tracking-[0.16em] text-white uppercase">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 bg-ink/60 px-2 py-1 text-[0.68rem] tracking-[0.16em] text-white uppercase">
          After
        </span>
      </div>
      <p className="mt-3 text-sm text-muted">Drag the handle, or use the arrow keys when it is focused.</p>
    </div>
  );
}
