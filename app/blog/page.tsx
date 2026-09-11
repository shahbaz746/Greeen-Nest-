import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { BlogFilters } from "@/components/BlogFilters";
import { Pagination } from "@/components/Pagination";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: `Every post on ${siteConfig.name}: gardening, houseplants, DIY projects, home decor, and outdoor living.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: `Every post on ${siteConfig.name}: gardening, houseplants, DIY projects, home decor, and outdoor living.`,
    url: `${siteConfig.domain}/blog`,
  },
};

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const allPosts = getAllPosts();
  const activeCategory = searchParams.category;
  const filtered = activeCategory
    ? allPosts.filter((p) => slugify(p.frontmatter.category) === activeCategory)
    : allPosts;

  const currentPage = Math.max(1, Number(searchParams.page) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / siteConfig.postsPerPage));
  const start = (currentPage - 1) * siteConfig.postsPerPage;
  const paginated = filtered.slice(start, start + siteConfig.postsPerPage);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink">The Journal</h1>
      <p className="mt-3 max-w-xl text-base text-bark/70">
        Everything we&apos;ve written about gardening, houseplants, DIY projects,
        decor, and outdoor living — newest first.
      </p>

      <Suspense fallback={<div className="mt-10 h-16" />}>
        <BlogFilters activeCategory={activeCategory} />
      </Suspense>

      {paginated.length === 0 ? (
        <p className="text-sm text-bark/60">
          No posts in this category yet — check back soon.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog"
      />
    </div>
  );
}
