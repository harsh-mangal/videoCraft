import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath, routeMeta } from "../src/config/seo.js";

const types = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

// A local preview of the static host contract: canonical redirects, static routes, real 404s.
export function createPreviewServer(directory = "build") {
  const root = path.resolve(directory);
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); } catch { response.writeHead(400); response.end(); return; }
    const route = normalizePath(pathname.replace(/\.html$/i, "").replace(/^\/index$/i, "/"));
    if (routeMeta[route] && url.pathname !== route) {
      response.writeHead(301, { Location: route + url.search }); response.end(); return;
    }
    const known = !!routeMeta[route];
    const relative = known ? (route === "/" ? "index.html" : route.slice(1) + ".html") : pathname.slice(1);
    const file = path.resolve(root, relative);
    const safe = file.startsWith(root + path.sep) && !relative.split("/").some(part => part.startsWith("."));
    let body, status = 200, extension = path.extname(file);
    try {
      if (!safe || pathname === "/404" || pathname === "/404.html") throw new Error("Not found");
      body = await readFile(file);
    } catch {
      status = 404; extension = ".html"; body = await readFile(path.join(root, "404.html"));
    }
    response.writeHead(status, {
      "Content-Type": types[extension] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cache-Control": status === 200 && pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createPreviewServer().listen(port, "127.0.0.1", () => console.log("Static preview: http://127.0.0.1:" + port));
}
