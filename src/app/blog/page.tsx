import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { posts, formatDate } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, guides and perspective on buying, building and investing in property in Dhaka, from Cube Holdings Ltd.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        image="/projects/chandrali-1.jpeg"
        eyebrow="Journal"
        title="Notes on building in Dhaka."
        lead="Guides for buyers, perspective on the market, and what we learn on site."
      />

      <section className="shell py-20">
        <div className="space-y-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70}>
              <Link
                href={`/blog/${post.slug}`}
                className="focus-ring card card-hover group grid gap-6 border border-[var(--line)] p-8 hover:border-brand-400 lg:grid-cols-[auto_1fr_auto] lg:items-baseline lg:gap-10"
              >
                <time
                  dateTime={post.date}
                  className="label whitespace-nowrap !normal-case"
                >
                  {formatDate(post.date)}
                </time>

                <div>
                  <h2 className="display max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] leading-tight transition-colors group-hover:text-brand-600">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                </div>

                <span className="whitespace-nowrap text-[0.8125rem] text-[var(--muted)]">
                  {post.category} · {post.readingMinutes} min
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
