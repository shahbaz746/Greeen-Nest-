const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const siteUrl = "https://greennest.com";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readPosts() {
  const dir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data;
    });
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/search", "/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search"],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: url === siteUrl ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async () => {
    const posts = readPosts();
    const indexablePosts = posts.filter((p) => !p.noindex);

    const categorySlugs = new Set(
      indexablePosts.map((p) => slugify(p.category))
    );
    const tagSlugs = new Set(
      indexablePosts.flatMap((p) => (p.tags || []).map(slugify))
    );

    const postPaths = indexablePosts.map((p) => ({
      loc: `/blog/${p.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(p.date).toISOString(),
    }));

    const categoryPaths = Array.from(categorySlugs).map((slug) => ({
      loc: `/category/${slug}`,
      changefreq: "weekly",
      priority: 0.6,
    }));

    const tagPaths = Array.from(tagSlugs).map((slug) => ({
      loc: `/tag/${slug}`,
      changefreq: "weekly",
      priority: 0.4,
    }));

    return [...postPaths, ...categoryPaths, ...tagPaths];
  },
};
