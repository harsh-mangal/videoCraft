# Videocrafts India SEO and performance audit

**Updated:** 14 October 2026
**Scope:** current source, generated Astro build, all 42 public routes, static HTTP behavior, API/admin media flow and dependency audit.

## Current architecture

The public website now uses Astro static generation with React islands and Tailwind CSS 4. Every canonical route is emitted as complete HTML with its own title, description, canonical URL, social metadata and structured data. The browser does not fetch the media manifest. MongoDB media data is read once during a deployment build and embedded into the generated pages.

The admin remains an independent React/Vite application. The Node API remains independent and no longer imports files from `client/src`, eliminating the previous standalone deployment failure. Uploads are transformed into AVIF and WebP variants at publish time and can be stored in Cloudflare R2 behind `media.videocraftsindia.com`.

## Implemented technical SEO

| Area | Implementation |
| --- | --- |
| Rendering | Static HTML for every public route; selective React hydration only where interaction is needed |
| Metadata | Unique title, description, canonical, robots, Open Graph and Twitter tags |
| Structured data | `LocalBusiness`, `WebSite`, page-specific web page, `Service`, `Article`, `FAQPage` and breadcrumb nodes |
| Crawl control | Native Astro sitemap index, image sitemap, robots file, noindex 404, admin noindex |
| Status behavior | Real 404 document and generated canonical redirect rules |
| Images | Intrinsic dimensions, contextual alt text, responsive `srcset`, eager LCP heroes, AVIF/WebP upload variants and meaningful uploaded filenames |
| Caching | Hashed Astro assets and versioned media cached for one year as immutable |
| Measurement | Optional Search Console verification, optional GA4 and phone/email/WhatsApp conversion events |
| Domains | Canonical `www`; separate `admin`, `api` and recommended `media` origins |
| Accessibility | One H1 per page, skip link, labelled controls, keyboard carousels and focus treatment |
| Security | CSP, origin/CSRF validation, secure sessions, upload validation and dependency audit |

## Automated results

The build audit currently verifies:

- 42 indexable routes plus the 404 document
- exactly one H1 on every generated page
- unique titles and descriptions
- matching canonical, Open Graph and Twitter metadata
- parseable, template-specific structured data
- all public images registered in the admin catalog with dimensions and alt attributes
- valid internal links
- web and image sitemap coverage
- canonical redirects and missing-page 404 behavior
- gzip JavaScript budgets
- absence of runtime `/api/media` calls in generated HTML

Repository lint, all frontend/admin/backend tests, full builds and dependency audits pass after the migration.

## Deployment requirements

The production host still has to deploy the new build correctly. Before requesting reindexing, verify:

1. `/about`, `/services`, `/gallery`, `/contact` and story routes return their own HTML rather than the homepage.
2. Unknown paths return `404`, not the homepage with `200`.
3. `https://videocraftsindia.com/*` permanently redirects to the same path on `https://www.videocraftsindia.com/*`.
4. `/sitemap-index.xml`, `/sitemap-0.xml` and `/image-sitemap.xml` are reachable and submitted in Search Console.
5. `media.videocraftsindia.com` serves R2 objects with immutable browser/CDN caching.
6. Admin publishing triggers the configured static deployment hook.
7. The production build has `MEDIA_MANIFEST_URL=https://api.videocraftsindia.com/api/media`.
8. Search Console URL Inspection sees each route’s correct title, canonical, H1 and body copy.

Run `npm run audit:production` after deployment to check every route's status, title, canonical, H1 and static body, plus sitemap availability and genuine 404 behavior.

## Ranking work outside the stack

The stack removes technical barriers; it does not guarantee rankings. The next ranking work should focus on:

- add firsthand portfolio proof to the implemented Chandigarh, Mohali, Panchkula, Zirakpur and destination service pages without doorway-page duplication
- real wedding and family case studies with venue, process and original photography context
- a complete Google Business Profile, consistent business citations and ongoing review acquisition
- descriptive image filenames and page-specific alt text
- links and mentions from venues, planners, publications and relevant local organizations
- Search Console query/page analysis and Core Web Vitals field monitoring after deployment

The account-access and real-content workflow is maintained in [SEO_OPERATIONS.md](SEO_OPERATIONS.md). Search Console, analytics, Google Business Profile, review acquisition and editorial outreach are not complete until an authorized owner performs and verifies those production actions.

Avoid fabricated ratings, FAQ spam, hidden city lists, copied venue descriptions and mass-generated location pages.
