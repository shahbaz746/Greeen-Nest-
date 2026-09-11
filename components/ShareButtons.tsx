"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.domain}/blog/${slug}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      label: "Pin on Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&description=${encodeURIComponent(title)}`,
    },
    {
      label: "Share by Email",
      href: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-bark/50">
        Share
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-bark/15 px-3.5 py-1.5 text-xs text-ink hover:border-moss hover:text-moss-dark"
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="rounded-full border border-bark/15 px-3.5 py-1.5 text-xs text-ink hover:border-moss hover:text-moss-dark"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
