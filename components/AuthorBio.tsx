import Image from "next/image";
import { siteConfig } from "@/site.config";

export function AuthorBio({ authorName }: { authorName: string }) {
  return (
    <div className="flex items-start gap-4 rounded-sm border border-bark/10 bg-cream/50 p-5">
      <Image
        src={siteConfig.author.avatar}
        alt={`Portrait of ${authorName}`}
        width={64}
        height={64}
        className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-bark/50">
          Written by
        </p>
        <p className="mt-1 font-serif text-lg font-semibold text-ink">
          {authorName}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-bark/80">
          {siteConfig.author.bio}
        </p>
      </div>
    </div>
  );
}
