# GreenNest

A production-ready, SEO-optimized home & garden blog built with Next.js 14 (App Router + TypeScript), Tailwind CSS, and MDX.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (custom warm earthy design system — see `tailwind.config.ts`)
- **MDX** for blog content, rendered with `next-mdx-remote`
- **next-sitemap** for `sitemap.xml` + `robots.txt`, generated automatically after every build
- **next/image** + **next/font** for Core Web Vitals

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
app/                     Routes (App Router)
  blog/                  Blog listing + [slug] post pages
  category/[category]/   Category archive pages
  tag/[tag]/              Tag archive pages
  about/ contact/ search/
  privacy-policy/ terms-of-service/
  not-found.tsx          Custom 404
  rss.xml/route.ts        RSS feed
components/              Reusable UI (Header, Footer, PostCard, TOC, etc.)
content/posts/           Your blog posts, as .mdx files
lib/                     Post-loading utilities + JSON-LD builders
public/images/posts/[slug]/   Per-post image folders
site.config.ts           Central site config (name, socials, analytics IDs, categories)
```

## Adding a new blog post

1. Create a new file in `content/posts/`, named after your slug, e.g. `content/posts/my-new-post.mdx`.
2. Add frontmatter at the top of the file:

   ```yaml
   ---
   title: "Your Post Title"
   slug: "your-post-title"
   description: "A one or two sentence summary (used for meta description and card excerpts)."
   date: "2026-09-10"
   author: "Elena Marsh"
   category: "Gardening"
   tags: ["tag one", "tag two"]
   coverImage: "/images/posts/your-post-title/cover.jpg"
   coverImageAlt: "Descriptive alt text for the cover image"
   noindex: false
   ---
   ```

   - `category` should match one of the categories defined in `site.config.ts` (`siteConfig.categories`) so it shows up correctly in the category dropdown and archive pages. Add new categories there if needed.
   - `description` is optional — if omitted, the first 155 characters of the post body are used automatically as a fallback meta description.
   - Set `noindex: true` on a post to keep it out of the sitemap and tell search engines not to index it (it will still appear in on-site listings).
   - To add an FAQ schema block to a post (renders as `FAQPage` structured data, not visible UI), add:

     ```yaml
     faq:
       - question: "Question one?"
         answer: "Answer one."
       - question: "Question two?"
         answer: "Answer two."
     ```

3. Write the post body in Markdown/MDX below the frontmatter. Use `##` and `###` headings — these are automatically picked up for the table of contents.
4. Save the file. In dev mode, the new post appears immediately on the homepage, blog listing, its category page, and any tag pages it matches. Related posts and prev/next navigation are generated automatically from category and tag overlap.

## Adding images

- Put images for a specific post in `public/images/posts/[slug]/` (a folder already exists for each sample post — reuse this pattern for new posts).
- Reference them in frontmatter or in the post body as `/images/posts/your-slug/filename.jpg`.
- The sample posts use placeholder images from picsum.photos so the site runs out of the box. Replace `coverImage` (and any in-body images) with your own files before launch, and remove `picsum.photos` / `images.unsplash.com` from `next.config.mjs` once you're no longer using them.
- Keep images reasonably sized (under ~500KB) before adding them — `next/image` will handle resizing/WebP conversion and responsive `srcset` generation at build/request time, but it can't fix an enormous source file.
- Every image in the codebase requires descriptive `alt` text — this is enforced by convention throughout the components, not by a lint rule, so keep it up when you add new images.

## Pasting in content from Word (.docx) files

Since you'll be supplying content as `.docx` files:

1. Open the doc and copy the body text.
2. Paste it into a new `.mdx` file in `content/posts/`, then convert formatting to Markdown as you go: `##`/`###` for headings, `**bold**`, `*italic*`, `- ` for bullet lists, `1. ` for numbered lists, `[link text](https://example.com)` for links.
3. Export any images from the Word doc and save them into `public/images/posts/[slug]/`, then reference them with standard Markdown image syntax: `![Alt text](/images/posts/your-slug/image.jpg)`.
4. Add the frontmatter block from the section above.

There are several free "docx to Markdown" converters (including Pandoc, `pandoc -f docx -t markdown`) if you'd rather not convert formatting by hand.

## SEO features included

- Per-page `generateMetadata` (title, description, canonical URL, Open Graph, Twitter Card) on every route
- JSON-LD structured data: `Article` on every post, `BreadcrumbList` on every page, `Organization` + `WebSite` on the homepage, `FAQPage` on posts with a `faq` frontmatter block
- Automatic `sitemap.xml` and `robots.txt` via `next-sitemap`, generated on `npm run build` (via the `postbuild` script) — includes every post, category, and tag page, and excludes posts marked `noindex: true`
- `rss.xml` feed of all indexable posts
- Semantic HTML throughout: one `<h1>` per page, `<article>`/`<nav>`/`<header>`/`<footer>` landmarks, required alt text
- `next/image` everywhere with explicit dimensions, `next/font` for zero layout-shift font loading
- Clean slugs: `/blog/your-post-title`, `/category/indoor-plants`, `/tag/houseplants`
- Automatic fallback meta description from post content when `description` is omitted
- Automatic related-posts linking by shared category/tags

## Before you launch

- Replace the placeholder domain (`https://greennest.com`) in `site.config.ts` and `next-sitemap.config.js` with your real domain.
- Replace `siteConfig.analytics.googleAnalyticsId` and `googleSiteVerification` in `site.config.ts` with your real IDs.
- Replace the placeholder logo, OG image, and author avatar in `public/images/site/` with real assets.
- Replace `siteConfig.social` links and `siteConfig.contact` details with your real ones.
- Wire up the contact form (`components/ContactForm.tsx`) and newsletter form (`components/NewsletterForm.tsx`) to a real backend — both currently only do client-side validation and don't send anywhere. An API route, or a service like Formspree/Mailchimp, both work well here.
- Swap the `picsum.photos`/`images.unsplash.com` sample images for your own, then remove them from `images.remotePatterns` in `next.config.mjs`.

## Running a production build locally

```bash
npm run build
npm run start
```

`npm run build` automatically runs `next-sitemap` afterward (via the `postbuild` script) to regenerate `sitemap.xml` and `robots.txt` in `/public`.

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel detects Next.js automatically — no configuration needed.
3. Add your environment variables if you introduce any (e.g. for a contact form backend), under Project Settings → Environment Variables.
4. Deploy. Every push to your main branch redeploys automatically.
5. Once you have a custom domain, add it under Project Settings → Domains, then update `site.config.ts` and `next-sitemap.config.js` to match.
