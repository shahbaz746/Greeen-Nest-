import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function NotFound() {
  const recent = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
      <p className="font-serif text-7xl font-semibold text-moss">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">
        This bed hasn&apos;t been planted yet
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base text-bark/70">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved. Try the
        homepage, or one of these recent posts.
      </p>
      <Link
        href="/"
        className="mt-7 inline-block rounded-sm bg-moss px-6 py-3 text-sm font-medium text-paper hover:bg-moss-dark"
      >
        Back to home
      </Link>

      {recent.length > 0 && (
        <div className="mt-16 grid gap-x-8 gap-y-12 text-left sm:grid-cols-3">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
