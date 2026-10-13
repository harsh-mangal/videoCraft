import catalog from "../../../shared/media-catalog.json";
import { routeMeta, SITE_URL } from "../config/seo";
import { seoLandingPages } from "../content/seoLandingPages";
import { loadPublishedMedia } from "../lib/publishedMedia";
import { managedImageUrl, resolveImage } from "../utils/images";

const routeGroups = {
  "/": ["Home", "SEO"],
  "/about": ["About"],
  "/services": ["Services"],
  "/gallery": ["Gallery"],
  "/contact": ["Contact"],
  "/bridal-portraits": ["Bridal portraits"],
  "/pre-wedding": ["Pre-wedding"],
  "/videocrafts-junior": ["Junior"],
  "/wedding-stories/tales-of-romance": ["Wedding stories", "SEO"],
  "/wedding-stories/from-i-do-to-forever": ["Wedding stories", "SEO"],
  "/wedding-stories/unforgettable-wedding-day": ["Wedding stories", "SEO"],
};
const escapeXml = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export async function GET() {
  const media = await loadPublishedMedia();
  const urls = Object.entries(routeMeta).map(([path, meta]) => {
    const landing = seoLandingPages[path];
    let items = landing ? [{ src: landing.hero, label: landing.heroAlt }] : catalog.filter(item => item.groups.some(group => routeGroups[path]?.includes(group)));
    if (meta.image && !items.some(item => item.src?.split("?")[0] === meta.image.split("?")[0])) items.unshift({ src: meta.image, label: meta.label });
    items = [...new Map(items.map(item => [item.src.split("?")[0], item])).values()].slice(0, path === "/gallery" ? 40 : 20);
    const images = items.map(item => {
      const image = resolveImage(item.src, media);
      return `<image:image><image:loc>${escapeXml(new URL(managedImageUrl(image, 1600), SITE_URL).href)}</image:loc><image:caption>${escapeXml(image.alt || item.label)}</image:caption></image:image>`;
    }).join("");
    return `<url><loc>${escapeXml(SITE_URL + path)}</loc>${images}</url>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

