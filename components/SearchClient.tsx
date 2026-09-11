"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/types/post";

export function SearchClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return posts.filter((post) => {
      const haystack = `${post.frontmatter.title} ${post.frontmatter.description} ${post.frontmatter.tags.join(
        " "
      )}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, posts]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} role="search" className="flex max-w-xl gap-2">
        <label htmlFor="search-page-input" className="sr-only">
          Search articles
        </label>
        <input
          id="search-page-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “tomatoes,” “low light plants,” or “fall decor”"
          className="w-full rounded-sm border border-bark/20 bg-paper px-4 py-2.5 text-sm placeholder:text-bark/40 focus:border-moss focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-sm bg-moss px-5 py-2.5 text-sm font-medium text-paper hover:bg-moss-dark"
        >
          Search
        </button>
      </form>

      <div className="mt-10">
        {query.trim() === "" && (
          <p className="text-sm text-bark/60">
            Start typing to search across every post on GreenNest.
          </p>
        )}
        {query.trim() !== "" && results.length === 0 && (
          <p className="text-sm text-bark/60">
            No posts matched &ldquo;{query}&rdquo;. Try a different word, or{" "}
            <a href="/blog" className="text-moss underline">
              browse all posts
            </a>
            .
          </p>
        )}
        {results.length > 0 && (
          <>
            <p className="mb-6 text-sm text-bark/60">
              {results.length} result{results.length === 1 ? "" : "s"} for
              &ldquo;{query}&rdquo;
            </p>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
