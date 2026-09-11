/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // NOTE: swap these for your real CDN/image host in production.
    // picsum.photos is used only to generate placeholder cover images
    // for the sample posts included in /content/posts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
