import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { render } from "../.cache/ssr/entry-server.js";
import { routeMeta, legacyRoutes, getPageMeta, SITE_URL } from "../src/config/seo.js";
import { renderHead, escapeHtml } from "./seo.mjs";

const template = await readFile("build/index.html", "utf8");
const routes = Object.keys(routeMeta);
for (const route of [...routes, "/404"]) {
  const html = template.replace("<!--seo-head-->", renderHead(getPageMeta(route))).replace("<!--app-html-->", await render(route));
  const file = route === "/" ? "build/index.html" : "build" + route + ".html";
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(route => "  <url><loc>" + escapeHtml(SITE_URL + route) + "</loc></url>").join("\n") + "\n</urlset>\n";
const robots = "User-agent: *\nAllow: /\n\nSitemap: " + SITE_URL + "/sitemap.xml\n";
// Check in crawler files for inspection; regenerate from the same route catalog on every build.
for (const directory of ["public", "build"]) {
  await writeFile(directory + "/sitemap.xml", sitemap);
  await writeFile(directory + "/robots.txt", robots);
}

const redirects = ["/index.html / 301!"];
const apache = [
  "Options -Indexes -MultiViews", "ErrorDocument 404 /404.html", "<IfModule mod_rewrite.c>",
  "RewriteEngine On", "RewriteBase /",
  "RewriteCond %{THE_REQUEST} \\s/+index\\.html[?\\s] [NC]",
  "RewriteRule ^index\\.html$ / [R=301,L,NC]",
];
const regex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replaceAll(" ", "\\x20");
for (const [old, target] of Object.entries(legacyRoutes)) {
  redirects.push(encodeURI(old) + " " + target + " 301!");
  // React Router previously published this spelling with initial capitals.
  if (old.startsWith("/from-")) redirects.push(encodeURI("/From-‘I-Do’-to Forever") + " " + target + " 301!");
  apache.push("RewriteRule ^" + regex(old.slice(1)) + "/?$ " + target + " [R=301,L,NC]");
}
for (const route of routes.filter(route => route !== "/")) {
  const escaped = regex(route.slice(1));
  redirects.push(route + ".html " + route + " 301!", route + "/ " + route + " 301!", route + " " + route + ".html 200");
  apache.push(
    "RewriteCond %{THE_REQUEST} \\s/+" + escaped + "\\.html[?\\s] [NC]",
    "RewriteRule ^" + escaped + "\\.html$ " + route + " [R=301,L,NC]",
    "RewriteCond %{REQUEST_URI} !^" + route + "$",
    "RewriteRule ^" + escaped + "/?$ " + route + " [R=301,L,NC]",
    "RewriteRule ^" + escaped + "$ " + route.slice(1) + ".html [END]",
  );
}
apache.push("RewriteCond %{REQUEST_FILENAME} !-f", "RewriteRule . - [R=404,L]", "</IfModule>", "<IfModule mod_headers.c>",
  'Header always set X-Content-Type-Options "nosniff"',
  'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  '<FilesMatch "\\.html$">', 'Header set Cache-Control "no-cache"', "</FilesMatch>",
  "<IfModule mod_setenvif.c>", 'SetEnvIf Request_URI "^/assets/" hashed_asset',
  'Header set Cache-Control "public, max-age=31536000, immutable" env=hashed_asset',
  "</IfModule>", "</IfModule>", "<IfModule mod_deflate.c>", "AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml application/xml", "</IfModule>");
redirects.push("/* /404.html 404");
for (const directory of ["public", "build"]) {
  await writeFile(directory + "/_redirects", redirects.join("\n") + "\n");
  await writeFile(directory + "/.htaccess", apache.join("\n") + "\n");
}
console.log("Prerendered " + routes.length + " routes + 404; generated sitemap, robots and hosting rules.");
