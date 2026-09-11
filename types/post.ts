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