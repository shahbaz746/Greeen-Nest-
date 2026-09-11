import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  extractHeadings,
  slugify,
} from "@/lib/posts";
import { mdxComponents } from "@/lib/mdx-components";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { AuthorBio } from "@/components/AuthorBio";
import { ShareButtons } from "@/components/ShareButtons";
import { PostCard } from "@/components/PostCard";
import { PrevNextNav } from "@/components/PrevNextNav";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.frontmatter.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.domain}/blog/${post.slug}`,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: [{ url: post.frontmatter.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [post.frontmatter.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);
  const { previous, next } = getAdjacentPosts(post.slug);
  const categorySlug = slugify(post.frontmatter.category);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.frontmatter.category, href: `/category/${categorySlug}` },
    { name: post.frontmatter.title, href: `/blog/${post.slug}` },
  ];

  return (
    <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbItems.map((i) => ({ name: i.name, url: i.href }))
        )}
      />
      {post.frontmatter.faq && post.frontmatter.faq.length > 0 && (
        <JsonLd data={faqJsonLd(post.frontmatter.faq)} />
      )}

      <Breadcrumbs items={breadcrumbItems} />

      <header className="mx-auto max-w-3xl">
        <Link
          href={`/category/${categorySlug}`}
          className="text-xs font-medium uppercase tracking-wide text-moss hover:text-moss-dark"
        >
          {post.frontmatter.category}
        </Link>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {post.frontmatter.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-bark/60">
          <span>By {post.frontmatter.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.frontmatter.date}>
            {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-sm border border-bark/10">
        <Image
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.coverImageAlt || post.frontmatter.title}
          width={1400}
          height={800}
          priority
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <div className="prose prose-lg mx-auto max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          <div className="mx-auto mt-10 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${slugify(tag)}`}
                className="rounded-full border border-bark/15 px-3.5 py-1.5 text-xs text-bark/70 hover:border-moss hover:text-moss-dark"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-8">
            <ShareButtons slug={post.slug} title={post.frontmatter.title} />
          </div>

          <div className="mx-auto mt-10">
            <AuthorBio authorName={post.frontmatter.author} />
          </div>
        </div>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl border-t border-bark/10 pt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Related posts
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto mt-16 max-w-5xl">
        <PrevNextNav previous={previous} next={next} />
      </div>
    </article>
  );
}
