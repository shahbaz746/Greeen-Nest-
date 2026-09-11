import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationJsonLd,
  websiteJsonLd,
  breadcrumbJsonLd,
} from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.domain,
    images: ["/images/site/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 6);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }])} />

      {featured && (
        <section className="border-b border-bark/10 bg-cream/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-moss">
                Latest from the journal
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
                {featured.frontmatter.title}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bark/80">
                {featured.frontmatter.description}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-bark/60">
                <span>{featured.frontmatter.author}</span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={featured.frontmatter.date}>
                  {format(new Date(featured.frontmatter.date), "MMM d, yyyy")}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{featured.readingTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-7 inline-block rounded-sm bg-moss px-6 py-3 text-sm font-medium text-paper hover:bg-moss-dark"
              >
                Read the full post
              </Link>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="block overflow-hidden rounded-sm border border-bark/10"
            >
              <Image
                src={featured.frontmatter.coverImage}
                alt={featured.frontmatter.coverImageAlt || featured.frontmatter.title}
                width={900}
                height={650}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Recent posts
          </h2>
          <Link href="/blog" className="text-sm font-medium text-moss hover:text-moss-dark">
            View all posts &rarr;
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="border-y border-bark/10 bg-moss/5">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Explore by category
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group rounded-sm border border-bark/10 bg-paper p-6 transition-colors hover:border-moss"
              >
                <p className="font-serif text-lg font-semibold text-ink group-hover:text-moss-dark">
                  {cat.name}
                </p>
                <span className="mt-3 inline-block text-sm text-moss">
                  Browse posts &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-6 rounded-sm border border-bark/10 bg-cream/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Get one email a week
            </h2>
            <p className="mt-2 max-w-md text-sm text-bark/70">
              New posts, seasonal to-do lists, and the occasional garden
              disaster story. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
