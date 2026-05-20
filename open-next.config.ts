import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// ISR incremental cache backed by Cloudflare KV (binding NEXT_INC_CACHE_KV in
// wrangler.jsonc). This makes the pages' `revalidate` actually work on
// Cloudflare, so WordPress edits show up on the live site within ~60s.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
