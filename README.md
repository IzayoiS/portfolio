# Iqbal Muhammad Hasbi — Portfolio

Freelance portfolio site, bilingual (English / Indonesian), with a Git-based CMS for editing content without touching code.

Live: https://iqbalhasbi.my.id

## Stack

- [Astro](https://astro.build) 7, statically prerendered pages
- [Keystatic](https://keystatic.com) CMS, with content stored as YAML in this repo
- Cloudflare Workers via `@astrojs/cloudflare`; only `/keystatic` and `/api/keystatic` run server-side
- Self-hosted fonts (Space Grotesk, Space Mono), no external requests

## Features

- `/` in English and `/id/` in Indonesian, plus a language switch and sitemap with hreflang
- Light / dark theme, following the system setting by default
- Accessible: skip link, visible focus, `prefers-reduced-motion`, readable without JavaScript
- SEO: canonical URL, Open Graph, JSON-LD `Person`

## Getting started

Requires Node 22.23+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Edit content at http://localhost:4321/keystatic. In dev mode, changes are written straight to `src/content/`.

| Command        | Action                                      |
| -------------- | ------------------------------------------- |
| `pnpm dev`     | Dev server (no Cloudflare adapter)          |
| `pnpm build`   | Production build to `dist/`                 |
| `pnpm preview` | Preview the production build on port 4322   |
| `pnpm check`   | Type-check Astro and TypeScript             |

## Content

All copy lives in `src/content/`, and every visible string has an `en` and `id` value.

```
src/content/
├── profile.yaml    name, photo, email, WhatsApp, socials, SEO
├── hero.yaml       headline, lead, highlights
├── services.yaml
├── process.yaml
├── about.yaml
├── contact.yaml
└── projects/       one YAML file per project
```

Images go in `src/assets/images/`.

## Deploy (Cloudflare)

1. Connect this repo to Cloudflare Workers, with build command `pnpm build`.
2. Make Keystatic work in production by creating a GitHub App through `/keystatic` on the deployed site, then setting these environment variables (see `.env.example`):

   ```
   KEYSTATIC_GITHUB_CLIENT_ID=
   KEYSTATIC_GITHUB_CLIENT_SECRET=
   KEYSTATIC_SECRET=
   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
   ```

In production, each save in Keystatic is committed to this repo, and that commit triggers a redeploy.

## License

Code: MIT. Content and photos: © Iqbal Muhammad Hasbi, all rights reserved.
