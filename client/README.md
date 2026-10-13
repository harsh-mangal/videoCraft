# Public website

Astro 7 static site for `https://www.videocraftsindia.com/`, with React 19 used only for interactive islands and Tailwind CSS 4 for styling.

## Commands

```sh
npm --prefix client run dev
npm --prefix client run build
npm --prefix client run preview
npm --prefix client test
npm --prefix client run check:seo
npm --prefix client run audit:production # after deployment
```

Development runs at `http://127.0.0.1:5173`. Production output is written to `client/build/`.

## Published media

Copy `.env.example` to an ignored `.env` when you want a local build to include the current production media map:

```dotenv
MEDIA_MANIFEST_URL=https://api.videocraftsindia.com/api/media
```

This endpoint is read during the build only. Browsers do not fetch `/api/media`. Without the variable, builds use the catalog’s original fallback images. Production should set the variable and configure the API’s deployment webhook so each admin publish queues a new build.

## Rendering model

- Astro owns routing, page HTML, metadata, sitemap generation and the 404 page.
- `src/layouts/BaseLayout.astro` emits the complete document head and shared page structure.
- `src/pages/` contains the canonical file-based routes.
- `src/site-pages/` contains the existing React page presentation components.
- `src/islands/` wraps only interactive React areas for hydration.
- `src/lib/publishedMedia.js` loads the published manifest once during a build.
- `scripts/postbuild.mjs` generates canonical hosting redirects and cache rules.
- `scripts/check-build.mjs` audits the generated pages and static HTTP behavior.

Static pages remain readable with JavaScript disabled. Navbar, forms and manual carousels hydrate independently where needed.

The build emits 42 canonical routes plus a real 404, the standard Astro sitemap and a dedicated image sitemap. Optional `PUBLIC_GOOGLE_SITE_VERIFICATION` and `PUBLIC_GA_MEASUREMENT_ID` build variables enable Search Console verification and GA4 without placing account values in source control.
