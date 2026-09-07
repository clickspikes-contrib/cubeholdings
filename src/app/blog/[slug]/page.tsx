import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { posts, bySlug, formatDate } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = bySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = bySlug(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="shell max-w-[760px] pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
          <Link href="/blog" className="focus-ring transition-colors hover:text-brand-600">
            Journal
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{post.category}</span>
        </nav>

        <h1 className="display mt-8 text-[clamp(2.25rem,5.5vw,3.75rem)]">
          {post.title}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-8 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="opacity-40">·</span>
          <span>{post.readingMinutes} min read</span>
          <span className="opacity-40">·</span>
          <span>{post.category}</span>
        </div>

        <div className="mt-12 space-y-6">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={`leading-[1.75] ${
                i === 0
                  ? "text-[1.1875rem] text-[var(--fg)]"
                  : "text-[1.0625rem] text-[var(--muted)]"
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        <div className="rule my-16" />

        <div className="card border border-[var(--line)] bg-[var(--surface-2)] p-8">
          <h2 className="display text-[1.75rem] leading-tight">
            Looking for an apartment in Dhaka?
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            Browse what we have under construction, or talk to our sales team
            about a specific address.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects/ongoing"
              className="btn btn-dark"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="btn btn-ghost"
            >
              Contact us
            </Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="shell max-w-[760px] pb-24 pt-16">
          <p className="label">Keep reading</p>
          <div className="mt-7 space-y-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="focus-ring card card-hover group block border border-[var(--line)] p-6 hover:border-brand-400"
                >
                  <h3 className="display text-[1.375rem] leading-tight transition-colors group-hover:text-brand-600">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] text-[var(--muted)]">
                    {formatDate(p.date)} · {p.readingMinutes} min
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
