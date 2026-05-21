import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

// ISR incremental cache backed by Cloudflare KV (binding NEXT_INC_CACHE_KV),
// wrapped in a regional (edge Cache API) layer so repeat reads are served from
// the edge instead of hitting KV — keeps us well within the KV free-tier limits.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),
});
