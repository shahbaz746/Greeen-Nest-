"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/types/post";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="mb-3 text-sm font-medium text-ink">On this page</p>
      <ul className="space-y-2 border-l border-bark/15 text-sm">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l pl-3 py-0.5 transition-colors ${
                activeId === h.id
                  ? "border-moss font-medium text-moss-dark"
                  : "border-transparent text-bark/60 hover:text-ink"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
