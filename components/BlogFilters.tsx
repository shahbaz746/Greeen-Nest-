"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/site.config";

export function BlogFilters({ activeCategory }: { activeCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-bark/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !activeCategory
              ? "border-moss bg-moss text-paper"
              : "border-bark/20 text-ink hover:border-moss"
          }`}
        >
          All
        </button>
        {siteConfig.categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setCategory(cat.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeCategory === cat.slug
                ? "border-moss bg-moss text-paper"
                : "border-bark/20 text-ink hover:border-moss"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearchSubmit} role="search" className="flex gap-2">
        <label htmlFor="blog-filter-search" className="sr-only">
          Search posts
        </label>
        <input
          id="blog-filter-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="w-full min-w-[180px] rounded-sm border border-bark/20 bg-paper px-3.5 py-2 text-sm placeholder:text-bark/40 focus:border-moss focus:outline-none sm:w-56"
        />
        <button
          type="submit"
          className="rounded-sm border border-bark/20 px-3.5 py-2 text-sm text-ink hover:border-moss hover:text-moss-dark"
        >
          Go
        </button>
      </form>
    </div>
  );
}
