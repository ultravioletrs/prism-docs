// Cloudflare Worker in front of the static asset export.
//
// This site builds via `next build` with `output: "export"` (see
// next.config.mjs) — there is no Next.js server at request time, and
// neither `@cloudflare/next-on-pages` nor `@opennextjs/cloudflare` is in use,
// so images can't be proxied through a Next.js route or middleware the way
// an SSR-capable Cloudflare adapter would allow.
//
// Instead, this hand-written Worker sits in front of the `assets` binding
// (wrangler.jsonc). Cloudflare's default Workers-with-assets routing serves
// a matching static file directly without ever invoking this Worker, and
// only falls through to fetch() below on an asset miss. Images are no
// longer committed under public/img/, so every request for one is a miss by
// design, lands here, and gets served from the shared "websites-images" R2
// bucket instead — while every other route (docs pages, search, etc.)
// keeps being served as a static file exactly as before.

interface R2ObjectBody {
  body: ReadableStream;
  size: number;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
}

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Minimal structural types for the Workers Cache API -- avoids depending on
// the gitignored, wrangler-generated worker-configuration.d.ts (pnpm run
// build never regenerates it, only the separate types:check script does).
interface CFCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}
interface CFCacheStorage {
  readonly default: CFCache;
}

interface Env {
  ASSETS: Fetcher;
  IMAGES_BUCKET: R2Bucket;
}

// Shared bucket ("websites-images") holds assets for multiple properties;
// this prefix keeps prism-docs' objects from colliding with other sites'.
const R2_KEY_PREFIX = "prism-docs";

// Next.js's basePath (next.config.mjs's BASE_PATH) plus the existing
// public/img/ convention that MDX content and components already reference
// via lib/base-path.ts's assetPath(). Keep in sync with next.config.mjs if
// the basePath ever changes.
const IMG_PREFIX = "/docs/prism-ai/img/";

const IMAGE_EXTENSION = /\.(webp|jpe?g|png|svg|gif|avif)$/i;

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "cache-control": "no-store" },
  });
}

async function serveFromR2(
  request: Request,
  bucket: R2Bucket,
  ctx: ExecutionContext,
): Promise<Response> {
  // bucket.get() is an R2 binding call, not an HTTP subrequest -- it never
  // touches Cloudflare's HTTP cache. Without explicitly writing the
  // response into the Cache API, every request (from every visitor, at
  // every edge location) would re-read from R2, no matter what
  // Cache-Control header gets set on the returned Response. Using the
  // request's own URL (unmodified) as the cache key keeps this purgeable by
  // the existing purge-by-URL call in the publish-image script.
  const cache = (caches as unknown as CFCacheStorage).default;
  const cacheKey = new Request(request.url, request);

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const { pathname } = new URL(request.url);
  const restPath = pathname.slice(IMG_PREFIX.length);
  const object = await bucket.get(`${R2_KEY_PREFIX}/${restPath}`);
  if (!object) return notFound();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("content-length", String(object.size));
  // Browser TTL long enough to skip most repeat-visit requests, short
  // enough to self-heal within the hour if a purge is ever missed. Edge TTL
  // is effectively unbounded -- the publish-image script purges it
  // explicitly and immediately on every upload, so there's no benefit to a
  // shorter one, and every edge location that has ever served an image now
  // actually caches it (see the Cache API use above).
  headers.set("cache-control", "public, max-age=3600, s-maxage=31536000");

  const response = new Response(object.body, { headers });
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith(IMG_PREFIX) && IMAGE_EXTENSION.test(pathname)) {
      return serveFromR2(request, env.IMAGES_BUCKET, ctx);
    }

    // Not an R2-backed image path — fall back to the static export (docs
    // pages, search index, favicons, etc.), including its normal 404
    // behavior for genuinely missing paths.
    return env.ASSETS.fetch(request);
  },
};
