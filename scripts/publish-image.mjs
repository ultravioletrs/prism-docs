#!/usr/bin/env node
// Maintainer-only. Uploads an image to the shared R2 bucket and purges it
// from Cloudflare's edge cache, so it's live right after this finishes.
// Requires CLOUDFLARE_API_TOKEN (scoped: R2 Edit on websites-images + Zone
// Cache Purge on the ultraviolet.rs zone) and CLOUDFLARE_ZONE_ID.
//
// Usage:
//   pnpm run publish-image <local-file> <public-path>
//
// <public-path> is the path relative to public/img/ — the same path MDX
// content and components already use via /img/<public-path> (see
// lib/base-path.ts's assetPath(), which prefixes the /docs/prism-ai
// basePath at build time):
//
//   pnpm run publish-image ./roles_page.png roles/roles_page.png
//   -> https://www.ultraviolet.rs/docs/prism-ai/img/roles/roles_page.png

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { extname } from "node:path";
import process from "node:process";

const BUCKET_NAME = "websites-images";
// Keeps this repo's objects from colliding with other properties in the
// shared bucket. Keep in sync with worker.ts's R2_KEY_PREFIX.
const R2_KEY_PREFIX = "prism-docs";
// Keep in sync with next.config.mjs's BASE_PATH and worker.ts's IMG_PREFIX.
const SITE_ORIGIN = "https://www.ultraviolet.rs";
const BASE_PATH = "/docs/prism-ai";

const MIME_TYPES = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

try {
  process.loadEnvFile(new URL("./.env.publish-image", import.meta.url));
} catch {
  // No local env file — assume CLOUDFLARE_API_TOKEN / CLOUDFLARE_ZONE_ID
  // are already exported (e.g. in CI).
}

// pnpm forwards a leading "--" to the underlying command instead of
// stripping it (unlike npm), so tolerate it either way.
const cliArgs = process.argv.slice(2).filter((arg) => arg !== "--");
const [localFile, publicPath] = cliArgs;

if (!localFile || !publicPath) {
  console.error(
    "Usage: pnpm run publish-image <local-file> <public-path>\n" +
      "Example: pnpm run publish-image ./roles_page.png roles/roles_page.png",
  );
  process.exit(1);
}

if (!existsSync(localFile)) {
  console.error(`Local file not found: ${localFile}`);
  process.exit(1);
}

const restPath = publicPath.replace(/^\/+/, "");
if (!restPath) {
  console.error(`Destination must include a path, got: ${publicPath}`);
  process.exit(1);
}

const contentType = MIME_TYPES[extname(restPath).toLowerCase()];
if (!contentType) {
  console.error(`Unrecognized image extension for: ${restPath}`);
  process.exit(1);
}

const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID } = process.env;
if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
  console.error(
    "Missing CLOUDFLARE_API_TOKEN and/or CLOUDFLARE_ZONE_ID.\n" +
      "Copy scripts/.env.publish-image.example to scripts/.env.publish-image and fill in the token.",
  );
  process.exit(1);
}

const objectPath = `${BUCKET_NAME}/${R2_KEY_PREFIX}/${restPath}`;

console.log(`Uploading ${localFile} -> r2://${objectPath}`);
execFileSync(
  "wrangler",
  [
    "r2",
    "object",
    "put",
    objectPath,
    `--file=${localFile}`,
    `--content-type=${contentType}`,
    "--remote",
  ],
  { stdio: "inherit", env: process.env },
);

const publicUrl = `${SITE_ORIGIN}${BASE_PATH}/img/${restPath}`;

console.log(`Purging edge cache for ${publicUrl}`);
const purgeResponse = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files: [publicUrl] }),
  },
);

const purgeResult = await purgeResponse.json();
if (!purgeResponse.ok || !purgeResult.success) {
  console.error("Cache purge failed:", JSON.stringify(purgeResult, null, 2));
  process.exit(1);
}

console.log(`Done. Live at ${publicUrl}`);
