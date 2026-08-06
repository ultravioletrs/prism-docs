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
  pathname: string,
  bucket: R2Bucket,
): Promise<Response> {
  const restPath = pathname.slice(IMG_PREFIX.length);
  const object = await bucket.get(`${R2_KEY_PREFIX}/${restPath}`);
  if (!object) return notFound();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("content-length", String(object.size));
  // Short browser TTL (revalidates quickly) + long edge TTL (until purged
  // explicitly by the publish-image script on upload).
  headers.set("cache-control", "public, max-age=300, s-maxage=31536000");

  return new Response(object.body, { headers });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith(IMG_PREFIX) && IMAGE_EXTENSION.test(pathname)) {
      return serveFromR2(pathname, env.IMAGES_BUCKET);
    }

    // Not an R2-backed image path — fall back to the static export (docs
    // pages, search index, favicons, etc.), including its normal 404
    // behavior for genuinely missing paths.
    return env.ASSETS.fetch(request);
  },
};
