import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SearchClient } from "@/components/SearchClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every post on GreenNest by title, topic, or tag.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Search", url: "/search" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Search", href: "/search" }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink">Search</h1>
      <p className="mt-3 max-w-xl text-base text-bark/70">
        Search across every post on GreenNest.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <SearchClient posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
