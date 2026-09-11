import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/site.config";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts().filter((p) => !p.frontmatter.noindex);

  const items = posts
    .map((post) => {
      const url = `${siteConfig.domain}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.domain}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
