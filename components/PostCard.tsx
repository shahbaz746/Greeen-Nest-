import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "@/lib/posts";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PostCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden rounded-sm border border-bark/10"
      >
        <Image
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.coverImageAlt || post.frontmatter.title}
          width={640}
          height={440}
          priority={priority}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs text-bark/60">
          <Link
            href={`/category/${slugify(post.frontmatter.category)}`}
            className="font-medium text-moss hover:text-moss-dark"
          >
            {post.frontmatter.category}
          </Link>

          <span aria-hidden="true">&middot;</span>

          <time dateTime={post.frontmatter.date}>
            {format(new Date(post.frontmatter.date), "MMM d, yyyy")}
          </time>
        </div>

        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-moss-dark">
            {post.frontmatter.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-bark/80">
          {post.frontmatter.description}
        </p>

        <p className="mt-3 text-xs text-bark/50">{post.readingTime}</p>
      </div>
    </article>
  );
}