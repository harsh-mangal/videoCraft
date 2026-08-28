# Videocrafts India: code flow and audit

Audited on 2026-08-28 against the current working tree, including its pre-existing uncommitted changes. This audit adds `.gitignore` and this document; it does not fix application code or update dependencies.

## Architecture

This is a React 19 single page website built with Create React App (`react-scripts` 5.0.1). React Router 7 handles navigation. Tailwind CSS 3, global CSS, and component inline styles provide the presentation. There is no application server, database, authentication, CMS, or persisted enquiry storage in this repository.

### Startup and navigation

```text
public/index.html (#root, fonts, initial metadata)
  -> src/index.js (React createRoot, StrictMode, global CSS)
    -> src/App.js (BrowserRouter)
      -> src/Layout.jsx
        -> ScrollToTop (scrolls on pathname changes)
        -> PageMeta (updates title, description, Open Graph and canonical)
        -> Navbar (desktop links / mobile menu state / telephone link)
        -> main -> Routes -> selected page
        -> InstagramSection (static photographs linking to Instagram)
        -> Footer (social/email links and updates enquiry)
```

`reportWebVitals()` is called without a callback, so no metrics reporting is configured.

### Pages

| Route | Component | Responsibility |
| --- | --- | --- |
| `/` | `Home.jsx` | Composes the seven home sections listed below |
| `/about` | `About.jsx` | Studio history, services, image strips, custom slideshow, mission and team content |
| `/services` | `OurServices.jsx` | Six static photography service cards |
| `/gallery` | `Gallery.jsx` | Static portfolio image grid with reveal animations |
| `/contact` | `ContactUs.jsx` | Shared enquiry form, contact details, map and appointment link |
| `/bridal-portraits` | `BridalPortraits.jsx` | Bridal portfolio |
| `/pre-wedding` | `PreWedding.jsx` | Pre-wedding portfolio |
| `/videocrafts-junior` | `VideoCraftsJunior.jsx` | Children and family portfolio |
| `/wedding-stories/tales-of-romance` | `TalesOfRomance.jsx` | Static article and related story links |
| `/wedding-stories/from-i-do-to-forever` | `WeddingStory2.jsx` | Static article and related story links |
| `/wedding-stories/unforgettable-wedding-day` | `WeddingStory3.jsx` | Static article and related story links |
| Unmatched URLs | `NotFound.jsx` | Client-rendered 404 screen |

`Layout.jsx` also redirects six older URL spellings to the current routes using `Navigate replace`.

Home section order is `Banner` -> `WeddingSection` -> `ClientFeedback` (includes `ReviewsSection`) -> `LegacySection` -> `WeddingStories` -> `HeroSection` -> `ContactSection` (includes compact `ContactForm`). Shared Instagram and footer content follows every page, including the 404 page.

### Enquiry and updates flow

1. `ContactForm` holds name, phone, email, service, date, venue and message in local React state. Home and Contact reuse the same component.
2. Submit prevents the browser's normal form action. Custom validation requires name, phone and service, checks a minimum of ten phone digits, and checks email format when provided.
3. The form creates a plain-text message containing the entered details.
4. `src/utils/whatsapp.js` trims and URL-encodes the message, targets `919888626212`, and calls `window.location.assign()` to leave the website for WhatsApp.
5. The visitor still has to review and send the message in WhatsApp. The website does not submit, save or confirm delivery of an enquiry.

The footer separately validates an email address and uses the same utility to open an updates-list request. It does not implement an email subscription database or newsletter service. Other phone, email, social and appointment links are ordinary external links.

### State, animation and external services

- Local state exists in Navbar (menu), About (slide index, hover pause and swipe position), ContactForm (fields/error), and Footer (email/error). No global state store is used.
- `react-slick` runs three home portfolio carousels; Swiper runs the review carousel. About uses its own interval and CSS image-strip animations. Framer Motion reveals galleries and story sections.
- Images are remote ImageKit URLs embedded in components; fonts come from Google Fonts; Contact embeds Google Maps. Reviews and the Instagram strip are static source data, not live feeds.
- `npm run build` creates `build/`. Apache SPA routing comes from `public/.htaccess`; Netlify-style routing comes from `public/_redirects`. The app assumes deployment at the domain root.

## Findings

### P1 — Filename case mismatch can break Linux builds

`src/pages/Home.jsx:4` imports `./ClientFeedback`, and the disk filename is `ClientFeedback.jsx`, but Git still records `src/pages/ClientFeedBack.jsx`. `core.ignorecase=true` hides the case-only rename on this Mac. A checkout using Git's recorded spelling on a case-sensitive filesystem will not resolve the import.

Fix before deployment: record the filename change through a temporary name with `git mv`, then verify the final Git path and run a Linux build. This audit leaves the index unchanged.

### P2 — Tablet navigation overlaps the phone button

At 768px, the Contact Us link visibly overlaps the telephone button. `src/components/Navbar.jsx:52` switches to three equal grid columns at `md`, while the five non-wrapping navigation links overflow the middle column into the telephone column.

Use a layout that reserves enough width for both groups, or keep the mobile navigation until a larger breakpoint. Recheck at 768, 820 and 1024px. The overlap was observed in the browser; the attempted click was blocked by browser security policy, so click behavior is not claimed as verified.

### P2 — Valid URL variants receive 404 metadata

`src/components/PageMeta.jsx:67` uses an exact `routeMeta[pathname]` lookup. The installed router matches `/about/` and `/About` to `/about`, but neither has a metadata key, so the page title/description becomes Page Not Found. `/gallery/` and `/contact/` have the same problem. Canonical URLs also retain these variants.

Normalize paths consistently for route metadata and canonical URLs, or redirect variants to a canonical spelling. This was reproduced with the installed router's `matchRoutes` and the current metadata keys.

### P2 — Dependency advisories need controlled updates

`npm audit --json` reports **60 affected dependency entries: 3 critical, 31 high, 13 moderate and 13 low**. These totals include the build/test/development toolchain; they are not 60 proven browser vulnerabilities.

The lockfile includes Swiper 12.0.1 and React Router 7.9.1. Swiper is in the affected range for the [maintainer-published prototype pollution advisory](https://github.com/advisories/GHSA-hmx5-qpq5-p643), patched in 12.1.2. Swiper options in this application are hardcoded; no attacker-controlled options path was identified. React Router's audit results also include server-related features that this BrowserRouter-only frontend does not use.

Update affected packages in a separate tested change and distinguish browser dependencies from tooling exposure. Do not blindly apply `npm audit fix --force`: the audit proposes `react-scripts@0.0.0` for some dependency chains, which is not a suitable migration plan. No exploit testing or dependency updates were performed.

### P2 — Reduced-motion handling does not stop JavaScript autoplay

`src/App.css:14` reduces CSS animation and transition durations, but it does not disable `autoplay: true` in `WeddingSection.jsx:48`, Swiper autoplay in `ReviewsSection.jsx:38`, the interval in `About.jsx:46`, or Framer Motion transforms. The About slideshow offers mouse hover and touch swipes, but no focusable pause/next controls. The review carousel has no explicit pause control.

Respect the motion preference in the JavaScript animation/carousel settings and provide keyboard-accessible pause and navigation controls. This finding comes from source inspection; reduced-motion behavior was not tested in a browser.

### P2 — Route metadata is absent from the initial HTML response

`PageMeta` only runs after JavaScript. All deep links are served the same `public/index.html`, containing home-page Open Graph tags. Consumers that only read the HTML response cannot see each story's title, description or canonical URL. Route-specific browser titles do work for the exact canonical paths.

If per-page social previews are required, generate route-specific HTML at build time or render metadata on the server. No live social-crawler test was performed.

### P3 — Phone validation accepts malformed input

`src/pages/ContactForm.jsx:35` removes non-digits only for its length check, has no upper bound, then sends the original string. Inputs such as `abcdefgh1234567890` and arbitrarily long numbers pass. The form uses `noValidate`, so native validation will not add a stricter check.

Define the supported phone format, validate the whole value and normalize it before composing the enquiry. Add rejection tests alongside valid local/international examples.

### P3 — Regression coverage is minimal

`src/App.test.js` has one test of WhatsApp number/URL encoding. It does not exercise form validation, complete message contents, newsletter errors, routing/redirects, metadata or responsive navigation. A passing test run therefore does not establish that these user flows work.

Add focused component tests for forms and route metadata, plus responsive browser checks. `FIXES.md` also still says a full build could not run; the successful build recorded below supersedes that old verification limitation.

## Git ignore changes

The new `.gitignore` excludes dependencies, generated builds, coverage/caches, local environment files, logs, OS/editor files, and the checkout's `Archive.zip`. It keeps `.env.example`, `.env.*.example`, `package-lock.json`, source, and public deployment configuration available to Git.

**Already tracked files are unaffected by ignore rules.** Git currently tracks `.DS_Store` and files under `build/`. If the repository should contain source only, the one-time index cleanup is `git rm -r --cached -- build .DS_Store` (keeps local files), followed by reviewing and committing the change. This was not run because the checkout already has substantial uncommitted work and this audit does not stage changes.

## Verification and limits

| Check | Result |
| --- | --- |
| `CI=true npm test -- --watchAll=false --runInBand` | Passed: 1 suite, 1 test |
| Clean-cache `npm run build` | Passed; no source lint warnings |
| Source parsing / relative imports | 33 JS/JSX files parsed; 35 relative imports resolve locally; one Git filename-case mismatch identified |
| Router / metadata path comparison | Reproduced metadata miss for valid slash/case variants |
| `.gitignore` checks | All 14 assertions passed, including files that must stay trackable |
| Browser home-page check | Loaded with no captured warning/error logs; observed header overlap at 768px |
| `npm audit --json` | Completed, exit 1 due to the advisories summarized above |

The first build emitted obsolete lint warnings from the existing cache. Moving `node_modules/.cache` to `node_modules/.cache-before-audit-20260828` and rebuilding removed them. Browser-data freshness warnings remain; no package/lockfile changes were made. The build was regenerated, and the development server was used only for local inspection.

No WhatsApp message, newsletter request or other real enquiry was sent. Full mobile/route interaction coverage, Linux execution, external image/link availability, deployed rewrite behavior and vulnerability exploitability remain unverified.
