import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { getPageMeta, routeMeta, SITE_URL } from "../src/config/seo.js";

const origin = new URL(process.env.SITE_AUDIT_ORIGIN || SITE_URL).origin;
const checks = [];

for (const route of Object.keys(routeMeta)) {
  const response = await fetch(origin + route, { redirect: "manual", headers: { accept: "text/html" } });
  assert.equal(response.status, 200, `${route}: expected HTTP 200`);
  const html = await response.text();
  const document = new JSDOM(html).window.document;
  const meta = getPageMeta(route);
  assert.equal(document.title, meta.title, `${route}: title`);
  assert.equal(document.querySelector('meta[name="description"]')?.content, meta.description, `${route}: description`);
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, meta.canonical, `${route}: canonical`);
  assert.equal(document.querySelectorAll("h1").length, 1, `${route}: one H1`);
  assert(document.querySelector("main")?.textContent.trim().length > 50, `${route}: visible HTML content`);
  checks.push(route);
}

for (const file of ["/robots.txt", "/sitemap-index.xml", "/sitemap-0.xml", "/image-sitemap.xml"]) {
  const response = await fetch(origin + file, { redirect: "manual" });
  assert.equal(response.status, 200, `${file}: expected HTTP 200`);
}

const missing = await fetch(origin + "/seo-audit-deliberately-missing", { redirect: "manual" });
assert.equal(missing.status, 404, "unknown URL: genuine HTTP 404");

console.log(`Production SEO audit passed for ${checks.length} routes at ${origin}.`);
