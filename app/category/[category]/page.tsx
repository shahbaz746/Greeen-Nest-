import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategorySlugs,
  getPostsByCategory,
  categoryDisplayName,
} from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const name = categoryDisplayName(params.category);
  const configured = siteConfig.categories.find((c) => c.slug === params.category);
  if (!configured) return {};

  const description = `Every ${configured.name} post on ${siteConfig.name}.`;
  return {
    title: configured.name,
    description,
    alternates: { canonical: `/category/${params.category}` },
    openGraph: {
      title: `${configured.name} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/category/${params.category}`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const configured = siteConfig.categories.find((c) => c.slug === params.category);
  if (!configured) notFound();

  const posts = getPostsByCategory(params.category);
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: configured.name, href: `/category/${params.category}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbItems.map((i) => ({ name: i.name, url: i.href }))
        )}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <p className="text-xs font-medium uppercase tracking-wide text-moss">
        Category
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
        {configured.name}
      </h1>
      <p className="mt-3 max-w-xl text-base text-bark/70">
        {posts.length} post{posts.length === 1 ? "" : "s"} filed under{" "}
        {configured.name}.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-bark/60">
          Nothing here yet — new {configured.name.toLowerCase()} posts are on
          the way.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
