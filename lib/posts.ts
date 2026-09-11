import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImageAlt?: string;
  noindex?: boolean;
  faq?: { question: string; answer: string }[];
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  slug: string;
};

export type Heading = {
  depth: number;
  text: string;
  id: string;
};

function readPostFile(filename: string): Post {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  const fallbackDescription =
    frontmatter.description ||
    content.replace(/[#*_`>\[\]]/g, "").trim().slice(0, 155).trim() + "...";

  return {
    frontmatter: {
      ...frontmatter,
      description: fallbackDescription,
      tags: frontmatter.tags || [],
    },
    content,
    readingTime: readingTime(content).text,
    slug: frontmatter.slug || filename.replace(/\.mdx?$/, ""),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map(readPostFile);
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter(
    (p) => slugify(p.frontmatter.category) === categorySlug
  );
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((p) =>
    p.frontmatter.tags.some((t) => slugify(t) === tagSlug)
  );
}

export function getAllCategorySlugs(): string[] {
  const posts = getAllPosts();
  const set = new Set(posts.map((p) => slugify(p.frontmatter.category)));
  return Array.from(set);
}

export function getAllTagSlugs(): string[] {
  const posts = getAllPosts();
  const set = new Set(posts.flatMap((p) => p.frontmatter.tags.map(slugify)));
  return Array.from(set);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);

  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.frontmatter.category === post.frontmatter.category) {
      score += 3;
    }
    const sharedTags = candidate.frontmatter.tags.filter((t) =>
      post.frontmatter.tags.includes(t)
    );
    score += sharedTags.length;
    return { candidate, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate);
}

export function getAdjacentPosts(slug: string): {
  previous: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].replace(/[#*`]/g, "").trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }
  return headings;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function categoryDisplayName(categorySlug: string): string {
  const posts = getAllPosts();
  const match = posts.find(
    (p) => slugify(p.frontmatter.category) === categorySlug
  );
  return match?.frontmatter.category || categorySlug;
}

export function tagDisplayName(tagSlug: string): string {
  const posts = getAllPosts();
  for (const p of posts) {
    const match = p.frontmatter.tags.find((t) => slugify(t) === tagSlug);
    if (match) return match;
  }
  return tagSlug;
}
