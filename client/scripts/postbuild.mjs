import { writeFile } from "node:fs/promises";
import { routeMeta, legacyRoutes } from "../src/config/seo.js";

const routes = Object.keys(routeMeta);
const redirects = ["/index.html / 301!"];
for (const [old, target] of Object.entries(legacyRoutes)) redirects.push(encodeURI(old) + " " + target + " 301!");
for (const route of routes.filter(route => route !== "/")) {
  redirects.push(route + ".html " + route + " 301!", route + "/ " + route + " 301!");
}
redirects.push("/* /404.html 404");
await writeFile("build/_redirects", redirects.join("\n") + "\n");

const apache = [
  "Options -Indexes -MultiViews",
  "ErrorDocument 404 /404.html",
  "<IfModule mod_rewrite.c>",
  "RewriteEngine On",
  "RewriteCond %{THE_REQUEST} \\s/+index\\.html[?\\s] [NC]",
  "RewriteRule ^index\\.html$ / [R=301,L,NC]",
  "RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[?\\s] [NC]",
  "RewriteRule ^(.+)\\.html$ /$1 [R=301,L,NE]",
  "RewriteCond %{REQUEST_FILENAME} !-f",
  "RewriteCond %{REQUEST_FILENAME} !-d",
  "RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f",
  "RewriteRule ^(.+?)/?$ /$1/index.html [END]",
  "RewriteCond %{REQUEST_FILENAME} !-f",
  "RewriteCond %{REQUEST_FILENAME} !-d",
  "RewriteRule . - [R=404,L]",
  "</IfModule>",
  "<IfModule mod_headers.c>",
  'Header always set X-Content-Type-Options "nosniff"',
  'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  '<FilesMatch "\\.html$">',
  'Header set Cache-Control "no-cache"',
  "</FilesMatch>",
  "<IfModule mod_setenvif.c>",
  'SetEnvIf Request_URI "^/_astro/" hashed_asset',
  'Header set Cache-Control "public, max-age=31536000, immutable" env=hashed_asset',
  "</IfModule>",
  "</IfModule>",
  "<IfModule mod_deflate.c>",
  "AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml application/xml",
  "</IfModule>",
];
await writeFile("build/.htaccess", apache.join("\n") + "\n");
console.log("Generated canonical redirects, 404 rules and immutable asset caching for " + routes.length + " routes.");
