# Videocrafts India

Responsive photography website built with React 19, React Router, Vite and Tailwind CSS. It generates static HTML for all public routes and works on static hosting; no application backend or database is needed.

## Local development

Use Node.js 24 or newer (.nvmrc selects 24).

    npm ci
    npm start

## Verify and build

    npm run lint
    npm test
    npm run build
    npm run preview

The production output is in **build/**. Preview runs at http://127.0.0.1:4173 and implements static route rewrites, canonical redirects and real 404 responses. Set PORT to select another port.

The build creates client chunks, prerenders all routes using React's static generation API, generates crawler/hosting files, and checks the resulting HTML, metadata, image attributes, internal links, source import casing and HTTP behavior. Run **npm run check:seo** to rerun the output checks. Local audit details are written to .cache/build-audit.json.

## SEO configuration

**src/config/seo.js** is the shared source for the canonical domain, route metadata, legacy redirects and structured data. The configured domain is **https://videocrafts.in**. It did not resolve from the audit environment on 2026-08-28: confirm the intended production domain and DNS before deployment. If it is different, change SITE_URL and rebuild; do not hand-edit only the sitemap.

Every known route gets its own HTML, title, description, canonical URL, Open Graph/Twitter tags and JSON-LD. The build creates public/sitemap.xml, public/robots.txt, public/.htaccess and public/_redirects, and copies them to build/. Rebuild after adding a route or changing SEO data. Add new route components to src/Layout.jsx and matching metadata to routeMeta.

No fabricated ratings, opening hours, prices or client claims are added to structured data. See [SEO_AUDIT.md](SEO_AUDIT.md) for verification, content review items and the deployment checklist.

## Deployment

Upload **the contents of build/**, including .htaccess, to the domain's document root. Do not publish the repository root, .cache/, node_modules/ or the SSR build.

- **Apache / Hostinger:** Apache 2.4, mod_rewrite, and permission for the supplied .htaccess rules are required. The file maps clean URLs to generated HTML files, redirects older URLs and serves 404.html with a 404 status. Headers and compression are conditional on their Apache modules. Confirm these rules on your actual host.
- **Netlify:** netlify.toml sets the build command, Node version and publish directory. _redirects maps routes to generated HTML and ends with a 404 rule. _headers enables immutable caching for hashed assets. Confirm redirect behavior after deployment.
- **Other hosts:** configure equivalent clean-URL mappings and an actual 404 response. Do not rewrite every request to the home page: that loses route-specific initial metadata.

Configure HTTPS and redirects from alternate hostnames in your hosting control panel after confirming the domain. Submit /sitemap.xml to Search Console after deployment and ownership verification. This work does not deploy the site or submit it to Google.

## Enquiry flow

Both contact forms validate locally and prepare a message for WhatsApp **+91 98886 26212**. Accepted phone formats are a 10-digit local number or a plus-prefixed international number with 10–15 digits; spaces, balanced digit groups in parentheses and hyphens are supported. The visitor reviews and sends the message in WhatsApp.

The footer's updates form also opens a WhatsApp request. The site does not save enquiries, deliver email, or maintain a subscriber database.

## Performance and interaction

- Each inner route is a separate JavaScript chunk; all content is present in the generated HTML.
- Images use ImageKit width/quality/format transformations, responsive srcset and sizes, and intrinsic dimensions from src/config/imageDimensions.json.
- The visible page hero is eager/high priority; images below the fold are lazy by default.
- Manual carousels replace autoplay, Swiper and Slick. Gallery/article content no longer depends on Framer Motion to become visible.
- UI and service icons use named imports from lucide-react. Decorative icons are hidden from assistive technology; icon-only controls keep accessible labels. Studio and partner logos remain image assets.
- Mobile navigation, skip link, focus handling, form errors, and carousel buttons support keyboard use.
- .github/workflows/ci.yml runs lint, tests, build/SEO checks and dependency auditing on Linux once pushed.

Build output, dependencies, caches, local environment files, editor settings and OS files are ignored. Commit package-lock.json; generated build files are no longer tracked.
