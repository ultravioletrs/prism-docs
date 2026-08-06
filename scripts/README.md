# Publishing images (maintainers only)

Images are no longer committed to this repo. They're stored in a shared Cloudflare R2
bucket (`websites-images`) and served at their usual `/img/...` URLs (nested under this
site's `/docs/prism-ai` basePath) by [`worker.ts`](../worker.ts), a small Cloudflare
Worker that sits in front of the static asset export.

## Why a hand-written Worker instead of a Next.js route

This site builds with `output: "export"` (see [`next.config.mjs`](../next.config.mjs)) —
a fully static export with no Next.js server at request time, and neither
`@cloudflare/next-on-pages` nor `@opennextjs/cloudflare` is used. So there's no Next.js
route or middleware that can run per-request server code to read an R2 binding.

Instead, [`wrangler.jsonc`](../wrangler.jsonc) declares both a `main` Worker
(`worker.ts`) and the static `assets` directory. Cloudflare's default
Workers-with-assets routing serves a matching static file directly, without invoking
the Worker at all — the Worker only runs on an asset miss. Since images are no longer
part of the static export, every request under `/docs/prism-ai/img/...` is a miss by
design, lands in `worker.ts`, and gets served from R2 instead. Every other route (docs
pages, search, favicons, etc.) is untouched and keeps being served as a static file.

Nothing in `content/docs/*.mdx` or `components/` changes — they keep referencing
`/img/<path>` exactly as before; `lib/base-path.ts`'s `assetPath()` still prefixes that
with `/docs/prism-ai` at build time, same as it always has.

Only maintainers publish images, using [`publish-image.mjs`](./publish-image.mjs). The
script is safe to have in a public repo because it's inert without a token — nobody can
upload to the bucket just by reading this file. See "Why maintainer-only" below.

## One-time setup

1. Create `scripts/.env.publish-image` from the template:

   ```bash
   cp scripts/.env.publish-image.example scripts/.env.publish-image
   ```

2. Create a Cloudflare API token: dashboard -> **My Profile -> API Tokens -> Create Token
   -> Custom Token**, with both permissions on the same token:
   - `Workers R2 Storage: Edit`
   - `Zone -> Cache Purge -> Purge`, **Zone Resources** scoped to the `ultraviolet.rs`
     zone

3. Paste the token into `CLOUDFLARE_API_TOKEN` in `scripts/.env.publish-image`.

4. Fill in `CLOUDFLARE_ZONE_ID` — the `ultraviolet.rs` zone ID from the domain's
   Overview page in the Cloudflare dashboard. It's not secret (can't authenticate
   anything by itself), but it isn't recorded anywhere in this repo, so it has to be
   looked up. **This wasn't available while wiring up this tooling — fill it in before
   first use.**

5. Sanity-check the token before first use:

   ```bash
   curl -s https://api.cloudflare.com/client/v4/user/tokens/verify \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
   ```

   Should return `"status":"active"`. If it doesn't, the token value itself is wrong
   (bad copy/paste, expired, revoked) — fix that before troubleshooting anything else.

`scripts/.env.publish-image` is gitignored. Never commit it, never paste the token value
into a PR, issue, or chat.

## Publishing an image

```bash
pnpm run publish-image <local-file> <public-path>
```

`<public-path>` is the path relative to `public/img/` — the same path MDX content and
components already reference via `/img/<public-path>`. Example:

```bash
pnpm run publish-image ./roles_page.png roles/roles_page.png
# -> https://www.ultraviolet.rs/docs/prism-ai/img/roles/roles_page.png
```

Keep the public path identical to this site's existing `/img/...` convention (check
`content/docs/**/*.mdx` or `public/img/` before it's fully migrated, for the pattern to
match) so MDX references don't need to change.

The script does two things, in order:

1. `wrangler r2 object put ... --remote` — uploads to the **real** bucket. `--remote` is
   required; without it, `wrangler` silently writes to a local simulated bucket and
   prints a normal-looking "Upload complete" with no error, and the object is never
   actually live.
2. Purges that exact URL from Cloudflare's edge cache (`POST /zones/{id}/purge_cache`),
   so the update is visible within seconds instead of waiting out the cache TTL.

If you re-run the same command for an existing path, it overwrites the object in place
and purges again — that's the intended way to update an image without changing its URL.

## Bulk-uploading via the R2 dashboard (initial migration)

For migrating the existing `public/img/` tree in bulk instead of one file at a time, you
can drag-and-drop folders into the bucket in the Cloudflare dashboard. **The keys have
to land under the exact prefix the Worker expects:**

| Site URL                                                        | Required R2 key                    |
| ----------------------------------------------------------------- | ----------------------------------- |
| `https://www.ultraviolet.rs/docs/prism-ai/img/roles/roles_page.png` | `prism-docs/roles/roles_page.png` |
| `https://www.ultraviolet.rs/docs/prism-ai/img/Prism_logo.png`       | `prism-docs/Prism_logo.png`       |

So in the R2 dashboard, in the `websites-images` bucket: create/open a folder named
`prism-docs`, and drag in the **contents** of `public/img/` (the `cvms/`, `billing/`,
`roles/`, `ui/` subfolders and the top-level files) — not the `img` folder itself as one
more nested level. Dragging `img/` in as a folder would produce
`prism-docs/img/roles/roles_page.png`, which `worker.ts` never looks up (it strips the
leading `/docs/prism-ai/img/` from the request and prepends `prism-docs/`, nothing
else) — every image would silently 404.

Only upload what's actually referenced somewhere in the site (`content/docs/**/*.mdx`,
`components/`, `lib/`). If new images get added later, upload them the same way before
merging so the bucket doesn't accumulate orphaned files.

## Why maintainer-only

This repo is public. The risk isn't the script being visible — it's inert without a
credential. The risk is _credential distribution_: whoever holds `CLOUDFLARE_API_TOKEN`
can write to the shared bucket. So nobody, internal or external, gets a personal R2
token. Only a maintainer, holding this one scoped token, runs `publish-image`.

Practical flow for a PR that adds an image (contributor is internal or external,
doesn't matter): the contributor attaches the image to the PR the normal GitHub way
(drag-and-drop into the description or a comment). A maintainer reviewing the PR runs
`pnpm run publish-image` locally before merging, then approves.

## Troubleshooting

- **`Local file not found: --`** — you ran `pnpm run publish-image -- <file> <dest>`.
  pnpm forwards a leading `--` to the script literally instead of stripping it like npm
  does. The script strips it defensively, but plain `pnpm run publish-image <file>
  <dest>` (no `--`) is the form to use.
- **`Unrecognized image extension`** — the script only knows the extensions currently
  used in `public/img/` (`.webp`, `.jpg`/`.jpeg`, `.png`, `.svg`, `.gif`, `.avif`). If a
  genuinely new format is needed, add it to `MIME_TYPES` in `publish-image.mjs`.
- **`Resource location: local` in the upload output** — means `--remote` didn't get
  applied for some reason (e.g. running the underlying `wrangler` command by hand
  without copying the full flag list from the script). The object was never written to
  the real bucket even though the CLI reports success. Always use `pnpm run
  publish-image`, or add `--remote` yourself if invoking wrangler directly.
- **`Cache purge failed` / `Authentication error` (code 10000)** — Cloudflare reuses
  this code for both "bad token" and "token valid but missing this permission." Run the
  token verify curl command above first to rule out a bad token. If that succeeds, the
  token is missing `Zone -> Cache Purge -> Purge` for the `ultraviolet.rs` zone, or that
  permission's Zone Resources selector doesn't include it — edit the token in the
  dashboard and add it.
- To confirm an object actually made it into the bucket after a `--remote` upload:

  ```bash
  wrangler r2 object get websites-images/prism-docs/<path-after-img/> --remote --file=/tmp/check
  ```
