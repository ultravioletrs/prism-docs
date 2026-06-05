# Prism Docs

This is the source code for the Prism documentation site, built with [Next.js](https://nextjs.org/) and [Fumadocs](https://fumadocs.dev/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- [pnpm](https://pnpm.io/) (v10 or newer)

### Installation

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js app router pages and layouts.
- `content/docs/`: Documentation content in MDX format.
- `components/`: Reusable React components.
- `lib/`: Utility functions and Fumadocs configuration.

### Deploy

The site is exported as static assets and deployed to Cloudflare Workers with Wrangler:

```bash
pnpm run deploy
```
