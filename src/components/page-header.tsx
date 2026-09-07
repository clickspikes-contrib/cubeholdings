import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * Interior page hero. Mirrors the homepage treatment — a dark rounded panel —
 * so every page opens with the same shape.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-2 pt-2 lg:px-3 lg:pt-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 lg:rounded-[2.5rem]">
        {image && (
          <>
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/70 to-ink-950/60" />
          </>
        )}

        <div className="relative px-6 pb-14 pt-32 lg:px-14 lg:pb-16 lg:pt-40">
          <Reveal>
            <p className="label !text-brand-300">{eyebrow}</p>
            <h1 className="display mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4rem)] text-white">
              {title}
            </h1>
            {lead && (
              <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-white/70">
                {lead}
              </p>
            )}
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
