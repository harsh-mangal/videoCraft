import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { JSDOM } from "jsdom";
import { routeMeta, getPageMeta, SITE_URL, normalizePath } from "../src/config/seo.js";
import { createPreviewServer } from "./serve.mjs";

const titles = new Set(), descriptions = new Set();
const report = { pages: [], assets: [], http: [] };
// Compare actual spellings, not just existsSync (macOS often ignores filename case).
const sourceFiles = new Set((await readdir("src", { recursive: true })).map(file => "src/" + file));
for (const file of await readdir("../shared")) sourceFiles.add("../shared/" + file);
for (const file of [...sourceFiles].filter(file => /\.[jt]sx?$/.test(file))) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?)["'](\.[^"']+)["']/g)) {
    const base = path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1]));
    assert([base, base + ".js", base + ".jsx", base + ".json", base + "/index.js"].some(candidate => sourceFiles.has(candidate)), "Missing or case-mismatched import: " + file + " -> " + match[1]);
  }
}
for (const route of [...Object.keys(routeMeta), "/404"]) {
  const html = await readFile(route === "/" ? "build/index.html" : "build" + route + ".html", "utf8");
  const document = new JSDOM(html).window.document;
  const meta = getPageMeta(route);
  assert.equal(document.querySelectorAll("h1").length, 1, route + ": exactly one H1");
  assert.equal(document.head.querySelectorAll("title").length, 1);
  assert.equal(document.title, meta.title);
  assert(!titles.has(meta.title)); titles.add(meta.title);
  assert.equal(document.querySelector('meta[name="description"]').content, meta.description);
  assert(!descriptions.has(meta.description)); descriptions.add(meta.description);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, meta.canonical ? 1 : 0);
  assert.equal(document.querySelector('link[rel="canonical"]')?.href || null, meta.canonical);
  assert.equal(document.querySelector('meta[name="robots"]').content, meta.robots);
  assert.equal(document.querySelector('meta[property="og:title"]').content, meta.title);
  assert.equal(document.querySelector('meta[name="twitter:title"]').content, meta.title);
  if (meta.canonical) assert(JSON.parse(document.getElementById("site-schema").textContent)["@graph"].length >= 3);
  assert(document.querySelector("main").textContent.trim().length > 50, route + ": prerendered page content");
  assert(!document.querySelector('main [role="status"], div[hidden][id^="S:"]'), "No streaming fallback or hidden page content");
  assert(!html.includes("<!--app-html-->") && !html.includes("<!--seo-head-->"));
  assert(!document.querySelector("a button, button a"), "No nested interactive controls");
  const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
  for (const image of document.images) {
    assert(image.hasAttribute("alt") && Number(image.width) > 0 && Number(image.height) > 0, "Images reserve space and have alt attributes");
    assert(image.dataset.mediaId, "Every website image is registered for the admin library");
    if (image.src.startsWith("https://ik.imagekit.io/")) assert(image.srcset && image.sizes && image.src.includes("tr="), "Responsive optimized images");
  }
  for (const link of document.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href.startsWith("/") && !href.startsWith("//")) assert(routeMeta[normalizePath(href.split("#")[0])] || href === "/sitemap.xml", "Broken internal link " + href);
  }
  for (const asset of document.querySelectorAll('script[src^="/"], link[href^="/"]')) {
    const url = asset.getAttribute("src") || asset.getAttribute("href");
    if (!url.startsWith("//")) assert((await stat("build" + url)).isFile(), "Missing asset " + url);
  }
  report.pages.push({ route, title: meta.title, titleLength: meta.title.length, descriptionLength: meta.description.length, images: document.images.length, htmlBytes: Buffer.byteLength(html) });
}
const sitemap = new JSDOM(await readFile("build/sitemap.xml", "utf8"), { contentType: "application/xml" }).window.document;
assert.deepEqual([...sitemap.querySelectorAll("loc")].map(node => node.textContent), Object.keys(routeMeta).map(route => SITE_URL + route));
assert((await readFile("build/robots.txt", "utf8")).includes("Sitemap: " + SITE_URL + "/sitemap.xml"));
for (const name of await readdir("build/assets")) {
  const data = await readFile("build/assets/" + name);
  report.assets.push({ name, bytes: data.length, gzipBytes: gzipSync(data).length });
}
assert(report.assets.filter(asset => asset.name.endsWith(".js")).every(asset => asset.gzipBytes < 150000), "JS chunk gzip budget: 150 kB");

const server = createPreviewServer();
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = "http://127.0.0.1:" + server.address().port;
try {
  const expectations = [
    ...Object.keys(routeMeta).map(route => [route, 200]),
    ["/sitemap.xml", 200], ["/robots.txt", 200],
    ["/about/", 301, "/about"], ["/About", 301, "/about"], ["/about.html", 301, "/about"],
    ["/index.html", 301, "/"], ["/bridal-potraits", 301, "/bridal-portraits"],
    ["/From-%E2%80%98I-Do%E2%80%99-to%20Forever", 301, "/wedding-stories/from-i-do-to-forever"],
    ["/missing-page", 404], ["/404.html", 404], ["/assets/missing.js", 404],
  ];
  for (const [url, status, target] of expectations) {
    const response = await fetch(origin + url, { redirect: "manual" });
    assert.equal(response.status, status, url);
    if (target) assert.equal(response.headers.get("location"), target, url);
    report.http.push({ url, status });
    await response.arrayBuffer();
  }
} finally { await new Promise(resolve => server.close(resolve)); }
const auditDirectory = new URL("../../.cache/", import.meta.url);
await mkdir(auditDirectory, { recursive: true });
await writeFile(new URL("build-audit.json", auditDirectory), JSON.stringify(report, null, 2) + "\n");
console.log("SEO/build checks passed: " + report.pages.length + " HTML pages, canonical sitemap, images, assets, internal links and " + report.http.length + " HTTP checks.");
