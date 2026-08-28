import { structuredData, SITE_NAME } from "../src/config/seo.js";
import { resolveImage } from "../src/utils/images.js";

export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
export const jsonForHtml = value => JSON.stringify(value).replace(/</g, "\\u003c");

export function renderHead(meta, media = {}) {
  const named = { description: meta.description, robots: meta.robots, "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": meta.image };
  const properties = { "og:title": meta.title, "og:description": meta.description, "og:image": meta.image, "og:url": meta.canonical || "", "og:type": "website", "og:site_name": SITE_NAME, "og:locale": "en_IN" };
  const tags = ["<title>" + escapeHtml(meta.title) + "</title>"];
  const icon = resolveImage("/brand-icon.png", media);
  tags.push('<link rel="icon" type="' + (icon.replaced ? "image/webp" : "image/png") + '" href="' + escapeHtml(icon.src) + '" />', '<link rel="apple-touch-icon" href="' + escapeHtml(icon.src) + '" />');
  for (const [name, content] of Object.entries(named)) tags.push('<meta name="' + name + '" content="' + escapeHtml(content) + '" />');
  for (const [name, content] of Object.entries(properties)) tags.push('<meta property="' + name + '" content="' + escapeHtml(content) + '" />');
  if (meta.canonical) tags.push('<link rel="canonical" href="' + escapeHtml(meta.canonical) + '" />');
  const data = structuredData(meta, media);
  if (data) tags.push('<script id="site-schema" type="application/ld+json">' + jsonForHtml(data) + "</script>");
  return tags.join("\n");
}
