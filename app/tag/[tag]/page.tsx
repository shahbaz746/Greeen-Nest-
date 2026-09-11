import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTagSlugs, getPostsByTag, tagDisplayName } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Metadata {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) return {};

  const name = tagDisplayName(params.tag);
  const description = `Posts tagged “${name}” on ${siteConfig.name}.`;
  return {
    title: `#${name}`,
    description,
    alternates: { canonical: `/tag/${params.tag}` },
    openGraph: {
      title: `#${name} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/tag/${params.tag}`,
    },
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  const name = tagDisplayName(params.tag);
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: `#${name}`, href: `/tag/${params.tag}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbItems.map((i) => ({ name: i.name, url: i.href }))
        )}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <p className="text-xs font-medium uppercase tracking-wide text-moss">Tag</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">#{name}</h1>
      <p className="mt-3 max-w-xl text-base text-bark/70">
        {posts.length} post{posts.length === 1 ? "" : "s"} tagged &ldquo;{name}&rdquo;.
      </p>

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
