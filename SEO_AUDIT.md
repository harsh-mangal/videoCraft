# SEO, performance and responsive audit

**Date:** 2026-08-28  
**Scope:** Current source and generated production build, all 11 public routes, local static HTTP behavior, browser layout and interactions, dependency scan, and referenced ImageKit assets. This replaces the historical CRA audit in CODEBASE_AUDIT.md.

## Result

The reported application issues have been addressed in code. The site now generates crawlable page content and route-specific metadata before JavaScript runs, has a canonical sitemap and robots file, uses responsive images and smaller JavaScript bundles, and has regression/build checks.

**Deployment is not complete.** The configured canonical domain, https://videocrafts.in, failed DNS resolution from this environment. Its live HTTP status, TLS, indexability and Search Console state cannot be verified here. Confirm the domain and hosting before publishing or submitting the sitemap.

## Technical SEO checks

| Area | Implemented and checked | Status |
| --- | --- | --- |
| Crawlable content | Complete HTML for 11 routes, including lazy route content, with no loading placeholders or hidden streaming fragments | Pass locally |
| Titles/descriptions | One unique title and description per public route | Pass |
| Canonicals | One absolute production-domain canonical per known route; case/trailing variants normalized; no canonical on 404 | Pass locally |
| Social previews | Open Graph and Twitter title, description and image in initial HTML; distinct article images | Pass structurally; live preview not tested |
| Sitemap | Valid XML with exactly 11 canonical HTTPS URLs; no aliases, duplicates or 404 pages | Pass |
| Robots | Crawl allowed, including JS/CSS/images; absolute sitemap reference | Pass |
| Structured data | LocalBusiness, WebSite and WebPage; BreadcrumbList for inner routes; parseable JSON-LD | Pass structurally |
| Business consistency | Existing phone, email and Chandigarh address visible in footer/contact and matched in schema | Source-consistent; owner must confirm facts |
| Headings | Exactly one H1 per route; meaningful home H1 and article heading cleanup | Pass |
| Internal links | Generated root-relative links resolve to routes; portfolios have contact links | Pass |
| Redirects | Legacy spellings, common trailing slash/case variants and direct HTML requests canonicalize in local preview | Pass locally; host rules supplied |
| Missing URLs | Local HTTP 404 plus noindex metadata; no home-page fallback for missing pages/assets | Pass locally |
| Images | Responsive srcset/sizes, optimized URLs, alt attributes and intrinsic dimensions | Pass structurally |
| Caching | Hashed JS/CSS, immutable asset headers and revalidated HTML; Apache compression configuration | Configured; host/CDN behavior needs deployment check |
| Source portability | Git filename case corrected; production check validates import spelling exactly | Pass locally |
| Security dependencies | npm audit reports no vulnerabilities in the current lockfile | Pass at audit time |

Static generation avoids making discovery of the page body depend on JavaScript rendering. Titles, canonical metadata and links follow [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). The sitemap contains only absolute canonical URLs, following [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). There are deliberately no invented last-modified dates, business hours, prices, review counts or ratings in structured data.

### Route inventory

All rows below have initial HTML, canonical URLs, indexable robots metadata and matching sitemap entries. Description length is a diagnostic, not a ranking guarantee.

| URL path | Title | Description characters |
| --- | --- | --- |
| / | Wedding Photographers in Chandigarh \| Videocrafts India | 145 |
| /about | About Our Photography Studio \| Videocrafts India | 151 |
| /services | Photography Services in Chandigarh \| Videocrafts India | 149 |
| /gallery | Wedding & Family Photography Gallery \| Videocrafts India | 140 |
| /contact | Contact Videocrafts India \| Chandigarh Photography Studio | 158 |
| /bridal-portraits | Bridal Portrait Photography \| Videocrafts India | 147 |
| /pre-wedding | Pre-Wedding Photography \| Videocrafts India Chandigarh | 153 |
| /videocrafts-junior | Newborn, Kids & Family Photography \| Videocrafts Junior | 148 |
| /wedding-stories/tales-of-romance | Tales of Romance: A Wedding Story \| Videocrafts India | 143 |
| /wedding-stories/from-i-do-to-forever | From I Do to Forever: Wedding Story \| Videocrafts India | 155 |
| /wedding-stories/unforgettable-wedding-day | An Unforgettable Wedding Day \| Videocrafts India | 148 |

## Performance changes and measurements

| Measure | Previous audit | Current build / observation |
| --- | --- | --- |
| Initial JavaScript | About 186 KB gzip in one main bundle | About 90 KB gzip including the shared image module; roughly half the previous payload |
| Main CSS | About 12.3 KB gzip | About 5.6 KB gzip |
| Route loading | All pages eagerly imported | Separate inner-route chunks; HTML already prerendered |
| Animation/carousel dependencies | Framer Motion, Swiper, Slick | Removed; small manual carousel and static content |
| Dependency audit | 60 flagged entries, including 3 critical | 0 flagged entries |
| Tests | 1 helper test | 32 regression tests |
| Image requests | Source-size images with limited responsive delivery | ImageKit width/quality/format transformations plus srcset/sizes |
| Layout stability | Many images lacked intrinsic dimensions | Measured source dimensions for all 121 remaining ImageKit assets |
| Interface icons | External service-icon images and text glyphs | Named Lucide React imports; 11 external icon images replaced with inline SVG |
| Loading priority | CSS backgrounds and eager image strips | High-priority hero; default lazy images below the fold; no duplicated moving strips |

The byte comparisons below use the same Accept: image/webp header for each original/optimized pair, with a 640px transform for the mobile variant. They are resource-size measurements, not whole-page load-time measurements.

| ImageKit asset | Original response | 640px response |
| --- | ---: | ---: |
| Home banner | 19,764 bytes | 5,688 bytes |
| Gallery Wedding-7 | 40,048 bytes | 37,646 bytes |
| Award image | 27,844 bytes | 13,184 bytes |

All 132 original ImageKit source headers were read successfully during the asset audit. A subsequent Lucide React update replaced 11 icon images, leaving 121 image assets with measured dimensions. This does not guarantee future CDN availability. Image transformations use [ImageKit's documented resize/format behavior](https://imagekit.io/docs/image-transformation).

There is **no claimed Lighthouse score or Core Web Vitals result**. No throttled Lighthouse run, production field data or CrUX report was collected. Once deployed, measure LCP, INP and CLS on representative real devices and in Search Console. Lower bundle/image bytes are verified; a specific loading-time improvement is not claimed.

## Responsive and accessibility checks

- Home tested at 320, 375, 768, 820, 1024 and 1440px: no document-width overflow and no overlapping visible navigation hit targets.
- All ten inner routes tested at 375, 768 and 1024px: no document-width overflow; expected page headings and no broken loaded images observed.
- No warning/error logs were captured during those browser checks.
- Mobile menu opens, closes after route selection, supports Escape and returns focus to the toggle.
- Empty enquiry submission stays on the site, announces the error, marks the invalid field and focuses it.
- Manual carousel buttons support keyboard activation; autoplay and JavaScript reveal transforms are removed.
- A skip link and route focus handling are present. Standard controls have visible focus styling; major navigation/carousel controls use 44px targets.
- Muted text colors were darkened. Fixed service-card heights and the crowded tablet footer/navigation layout were removed.

These are targeted checks, not a formal WCAG certification or comprehensive screen-reader audit. No real enquiry, WhatsApp message or updates request was sent.

## Prior issue resolution

| Historical finding | Resolution |
| --- | --- |
| ClientFeedBack / ClientFeedback mismatch | Case-only rename recorded in Git; strict import check and Linux CI added |
| Tablet menu/phone overlap | Desktop navigation uses its own flex layout from the large breakpoint; tablet/mobile menu below that |
| Valid variants get 404 metadata | Shared path normalization and canonical redirects |
| Dependency advisories | New Vite/Vitest toolchain, patched React/Router, unnecessary libraries removed |
| Reduced-motion/autoplay | Autoplay and animated image strips removed; manual controls retained |
| Initial response missing per-page SEO | React static generation with complete Suspense content; metadata generated per route |
| Malformed phone numbers accepted | Whole-input validation, balanced formatting, local/international length limits and normalized enquiry text |
| Minimal test coverage | 32 tests plus production SEO/import/HTTP checks and CI configuration |
| Ignore rules ineffective for tracked output | build/ and .DS_Store removed from the Git index; local files retained |

## Owner and deployment actions still required

1. **Confirm the production domain and DNS.** The configured domain did not resolve from this environment. Change SITE_URL in src/config/seo.js if needed and rebuild so sitemap, canonicals and metadata remain consistent.
2. **Deploy and verify host behavior.** Upload build/ including hidden files. Verify HTTPS, alternate hostname redirects, compression, cache headers, clean route responses, old URL redirects and actual 404 status codes. The generated Apache/Netlify rules are not a substitute for testing the live hosting configuration. Native Apache configuration validation was blocked by an OS permission error; the 22 passing HTTP checks use the project's Node preview server, not Apache or Netlify.
3. **Validate business and editorial content.** Confirm the studio address, phone, email, establishment history, review quotations/permissions, award imagery and the factual status of the wedding narratives before publication. The inherited Sarah/Jack-style stories and testimonials were preserved, not independently authenticated or represented as verified customer evidence.
4. **Verify search ownership and discovery.** Submit the deployed sitemap through an owner-controlled Search Console property, inspect representative URLs, and run Google's Rich Results Test. No Search Console account or Business Profile was accessed.
5. **Improve content from actual shoots.** Add verified location/service-specific copy, useful package/process FAQs, and more descriptive photo captions/alt text where the owner can supply accurate context. The current alt attributes are present but some remain broad portfolio descriptions.
6. **Measure production performance.** Test slow mobile connections and real devices after CDN/hosting settings are active; monitor LCP/INP/CLS instead of relying only on bundle sizes.
7. **Maintenance.** Re-run dependency audits regularly. ESLint remains at the latest compatible version 9 because the accessibility plugin does not yet declare version 10 compatibility; do not force incompatible peer dependencies.

No deployment, rankings, indexing, rich-result eligibility or ownership verification is implied by this audit.

## Reproduce the local checks

Use Node.js 24 or newer:

    npm ci
    npm run lint
    npm test
    npm run build
    npm audit
    npm run preview

The build includes SEO, asset, exact-case import and local HTTP checks. Detailed machine-readable results are written to .cache/build-audit.json. The CI workflow is configured for Ubuntu with Node 24; it has not been run on GitHub from this local session.

The implementation uses [Vite's static prerendering approach](https://vite.dev/guide/ssr#pre-rendering-ssg) and [React's static-generation API](https://react.dev/reference/react-dom/static/prerenderToNodeStream). The website is still deployed as static files and does not require an application server.
