import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext adapter config for deploying this Next.js app to Cloudflare Workers.
//
// For live WordPress updates without a full rebuild (ISR / `revalidate = 60`),
// add an R2 incremental cache:
//   1. Create an R2 bucket and bind it in wrangler.jsonc (see the comment there).
//   2. Uncomment the two lines below.
//
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // incrementalCache: r2IncrementalCache,
});
