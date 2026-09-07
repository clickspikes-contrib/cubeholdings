"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (dir: number) =>
      setActive((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1.9fr_1fr]">
        <button
          onClick={() => setOpen(true)}
          className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--surface-2)]"
          aria-label={`Open ${name} gallery`}
        >
          <Image
            src={images[active]}
            alt={`${name} — view ${active + 1}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 65vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-4 right-4 rounded-full bg-ink-950/70 px-3.5 py-1.5 text-xs text-white backdrop-blur">
            {active + 1} / {images.length}
          </span>
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-2">
            {images.slice(0, 6).map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={`focus-ring relative aspect-square overflow-hidden rounded-sm bg-[var(--surface-2)] transition-opacity ${
                  i === active ? "ring-2 ring-brand-500" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
            className="focus-ring absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div
            className="relative h-[82vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${name} — view ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              {[
                { d: -1, cls: "left-5", path: "M15 6l-6 6 6 6", label: "Previous" },
                { d: 1, cls: "right-5", path: "M9 6l6 6-6 6", label: "Next" },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    go(b.d);
                  }}
                  aria-label={`${b.label} image`}
                  className={`focus-ring absolute ${b.cls} top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10`}
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.path} />
                  </svg>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
