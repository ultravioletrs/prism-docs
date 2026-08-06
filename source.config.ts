import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // Images now live in R2, not public/img/ (see worker.ts, scripts/README.md).
    // fumadocs-mdx's default remark-image plugin statically imports every
    // markdown image (`import __img0 from "../../../public/img/x.png"`),
    // which requires the file to exist on disk at build time regardless of
    // how it's served at runtime — that breaks the build once public/img/ is
    // gone. Disabling it leaves markdown images as plain `<img src="/img/...">`
    // elements, which mdx-components.tsx's custom `img` renderer already
    // pipes through assetPath() exactly like every other image reference.
    remarkImageOptions: false,
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: ["bash", "go"],
    },
    // MDX options
  },
});
