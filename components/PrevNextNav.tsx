import Link from "next/link";
import type { Post } from "@/types/post";

export function PrevNextNav({
  previous,
  next,
}: {
  previous: Post | null;
  next: Post | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid gap-4 border-t border-bark/10 pt-8 sm:grid-cols-2"
    >
      <div>
        {previous && (
          <Link
            href={`/blog/${previous.slug}`}
            className="group block rounded-sm border border-bark/10 p-4 hover:border-moss"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-bark/50">
              Previous
            </span>
            <p className="mt-1 font-serif text-base font-semibold text-ink group-hover:text-moss-dark">
              {previous.frontmatter.title}
            </p>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group block rounded-sm border border-bark/10 p-4 text-right hover:border-moss"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-bark/50">
              Next
            </span>
            <p className="mt-1 font-serif text-base font-semibold text-ink group-hover:text-moss-dark">
              {next.frontmatter.title}
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
}
