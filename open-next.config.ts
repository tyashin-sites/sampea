import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// Persist Next's ISR / fetch cache across Worker invocations in KV.
// Binding name MUST be NEXT_INC_CACHE_KV — OpenNext hardcodes it.
// queue: without it OpenNext uses a dummy queue and stale ISR pages are never
// regenerated (x-nextjs-cache: STALE until the next deploy). Needs the
// NEXT_CACHE_DO_QUEUE Durable Object + WORKER_SELF_REFERENCE binding.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
});
