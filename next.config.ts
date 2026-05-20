import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no Next image-optimization server; serve images
    // as-is. (Enable Cloudflare Image Resizing later to re-optimize if wanted.)
    unoptimized: true,
    remotePatterns: [
      // WordPress / GoDaddy blog + CMS media.
      { protocol: "https", hostname: "thehertribe.com" },
      { protocol: "https", hostname: "cms.thehertribe.com" },
      // Sanity's image CDN (used when the blog is backed by Sanity).
      { protocol: "https", hostname: "cdn.sanity.io" },
      // YouTube thumbnails for Tribe Talk session cards.
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;

// Enables `getCloudflareContext()` (env/bindings) during `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
