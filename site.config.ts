export const siteConfig = {
  name: "GreenNest",
  tagline: "A home and garden journal for growing, decorating, and living well.",
  description:
    "GreenNest is a home and garden blog covering gardening tips, houseplant care, DIY projects, and simple ways to make a home feel more alive.",
  domain: "https://greennest.com",
  locale: "en_US",
  author: {
    name: "Elena Marsh",
    bio: "Elena is a self-taught gardener and former landscape architect who writes about growing things, indoors and out, from her home outside Asheville, NC.",
    avatar: "/images/site/author-elena.jpg",
  },
  social: {
    instagram: "https://instagram.com/greennest",
    pinterest: "https://pinterest.com/greennest",
    facebook: "https://facebook.com/greennest",
    youtube: "https://youtube.com/@greennest",
  },
  contact: {
    email: "hello@greennest.com",
    address: "128 Hollow Creek Road, Asheville, NC 28801",
  },
  analytics: {
    // Replace with a real GA4 measurement ID, e.g. "G-XXXXXXXXXX"
    googleAnalyticsId: "G-XXXXXXXXXX",
    // Replace with the verification string from Google Search Console
    googleSiteVerification: "REPLACE_WITH_SEARCH_CONSOLE_TOKEN",
  },
  postsPerPage: 9,
  categories: [
    { name: "Gardening", slug: "gardening" },
    { name: "Indoor Plants", slug: "indoor-plants" },
    { name: "Home Decor", slug: "home-decor" },
    { name: "DIY Projects", slug: "diy-projects" },
    { name: "Outdoor Living", slug: "outdoor-living" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
