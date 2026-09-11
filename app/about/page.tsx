import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${siteConfig.name} and the person writing it.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: `The story behind ${siteConfig.name} and the person writing it.`,
    url: `${siteConfig.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink">
        About GreenNest
      </h1>

      <div className="mt-8 overflow-hidden rounded-sm border border-bark/10">
        <Image
          src="https://picsum.photos/seed/greennest-about/1200/700"
          alt="Elena Marsh tending a raised garden bed outside her home"
          width={1200}
          height={700}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="prose prose-lg mt-10 max-w-none font-sans prose-headings:font-serif prose-headings:font-semibold">
        <p>
          GreenNest started as a way to keep track of what actually worked in
          one backyard garden and a house full of houseplants — which
          watering schedule kept the tomatoes from splitting, which corner of
          the living room a fiddle leaf fig would tolerate, which fall
          decorating choices held up past the first week of October.
        </p>
        <h2>Our mission</h2>
        <p>
          Most home and garden advice online is written to rank for a
          keyword, not to actually help someone standing in their kitchen
          wondering why their basil keeps dying. GreenNest is written the
          other way around: every post starts from a real problem, tested in
          a real home, before it becomes an article.
        </p>
        <h2>Who's behind it</h2>
        <p>
          GreenNest is written by {siteConfig.author.name}.{" "}
          {siteConfig.author.bio}
        </p>
        <h2>What you'll find here</h2>
        <p>
          Practical gardening guidance for beginners and people who've
          killed a few plants along the way, honest houseplant care advice,
          small-space and outdoor living ideas, and home decor that
          prioritizes function over trend. New posts go up weekly.
        </p>
      </div>
    </div>
  );
}
