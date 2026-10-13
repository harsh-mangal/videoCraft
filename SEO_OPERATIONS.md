# SEO production operations

The repository implements the technical and on-page work that can be completed safely in code. The steps below require the site owner's Google accounts, business-profile access, permission to publish client work, or real campaign data. Do not mark them complete until the production URLs and accounts have been checked.

## 1. Deploy and verify the public build

1. Deploy `client/build/` to `https://www.videocraftsindia.com`.
2. Set `MEDIA_MANIFEST_URL=https://api.videocraftsindia.com/api/media` in the build environment.
3. Run `npm run audit:production` from the repository. Set `SITE_AUDIT_ORIGIN` only when auditing a staging origin.
4. Test the homepage, wedding photographer, pre-wedding, one wedding story and contact page in PageSpeed Insights on mobile and desktop. Record LCP, INP and CLS rather than copying a lab score into the website.
5. Confirm the apex domain permanently redirects to the identical path on `www`.

## 2. Google Search Console

1. Add a Domain property for `videocraftsindia.com` through DNS. If URL-prefix verification is required, put the supplied value in `PUBLIC_GOOGLE_SITE_VERIFICATION` and rebuild.
2. Submit `https://www.videocraftsindia.com/sitemap-index.xml` and `https://www.videocraftsindia.com/image-sitemap.xml`.
3. Use URL Inspection on the homepage and each priority service route. Confirm the selected canonical, rendered H1, page copy and image resources match the deployed page.
4. Request indexing in small, reviewed batches after deployment. Indexing can take time and is not guaranteed.
5. Record a baseline before evaluating changes: valid indexed URLs, non-brand clicks, impressions, page/query position, image-search visibility and Core Web Vitals field data.

Create separate query filters for wedding photographer Chandigarh, candid wedding photographer Chandigarh, wedding videographer Chandigarh, wedding photography packages Chandigarh, pre-wedding photographer Chandigarh, pre-wedding locations Chandigarh, maternity photographer Chandigarh, newborn photographer Chandigarh, wedding photographer Mohali and wedding photographer Panchkula.

## 3. Analytics and lead measurement

Set `PUBLIC_GA_MEASUREMENT_ID` to the real GA4 web-stream ID and rebuild. The site emits these privacy-safe events without sending form values:

| Event | Meaning |
| --- | --- |
| `phone_click` | Visitor selected a telephone link |
| `email_click` | Visitor selected an email link |
| `whatsapp_start` | Visitor selected a direct WhatsApp link |
| `whatsapp_form_continue` | A valid website enquiry continued to WhatsApp |

Mark the useful lead events as key events in GA4. Compare enquiries with confirmed bookings in the business's CRM or manual pipeline; browser events alone do not prove revenue.

## 4. Google Business Profile

- Keep the legal/public business name, Sector 9-D address, phone number and actual opening hours accurate. Do not add search phrases to the business name.
- Add only services the studio currently offers: wedding photography, candid wedding coverage, wedding films, pre-wedding, maternity, newborn, portrait, corporate event and product photography.
- Link relevant GBP service or post actions to the strongest matching landing page. Use a consistent campaign tag such as `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- Upload recent work only with client permission. Ask for genuine reviews after delivery and respond consistently without scripting keyword-heavy reviews.

## 5. Real stories and portfolio evidence

The current landing pages avoid inventing venues, clients, awards and testimonials. Before publishing a case study, collect:

- permission to identify the couple/client and display the selected photographs;
- venue, event type, date or season, priorities and the real production challenge;
- how lighting, weather, timing or logistics were handled;
- credited planner, venue and vendors where appropriate;
- an approved first-party testimonial, if one exists;
- links to the matching service and city pages.

A useful story needs original facts and a coherent image sequence. Do not generate venue pages by replacing one city name with another.

## 6. Local authority and outreach

Prioritize legitimate profiles and editorial relationships: WedMeGood, WeddingSutra submissions, venue websites, planners, makeup artists, designers, decorators, bridal publications, Chandigarh media, corporate clients and relevant photography awards. Offer licensed photography, a credited editorial gallery, a joint case study or a documented studio-history story. Do not buy followed links, automate directory submissions or run reciprocal-link schemes.

Track outreach by target, contact, asset offered, status, resulting URL and referral/enquiry outcome. Review links for relevance and editorial value, not raw count.

## 7. Monthly review

Review Search Console and lead data by page and query family. Improve pages with impressions but weak click-through or engagement, consolidate true cannibalization, and publish additional location or venue content only when firsthand material makes it distinct. Monitor qualified enquiries, lead-to-booking rate and booked revenue alongside rankings.
