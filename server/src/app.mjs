import express from "express";
import helmet from "helmet";
import compression from "compression";
import multer from "multer";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { serverRoot } from "./config.mjs";
import { Store } from "./store.mjs";
import { randomToken, tokenHash, constantEqual, readSessionCookie, hashPassword, verifyPassword } from "./auth.mjs";
import { createImageVariants, uploadLimit } from "./uploads.mjs";

const catalog = JSON.parse(await readFile(path.join(serverRoot, "shared/media-catalog.json"), "utf8"));
const catalogById = new Map(catalog.map(item => [item.id, item]));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: uploadLimit, files: 1, fields: 1, parts: 3, fieldSize: 2000 },
  fileFilter(_req, file, done) { done(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)); } }).single("image");
const error = (status, message) => Object.assign(new Error(message), { status });
const fileExists = async file => access(file).then(() => true, () => false);

export async function createApp(config) {
  const app = express();
  const store = await Store.connect(config);
  const dummyPassword = await hashPassword(randomToken());
  const mediaDir = path.join(config.dataDir, "uploads");
  let uploading = false, activeLogins = 0;
  const pageCache = new Map();
  const externalMediaUrl = src => src?.startsWith("/media/") ? config.apiOrigin + src : src;
  const externalImage = image => image ? { ...image, src: externalMediaUrl(image.src), variants: image.variants?.map(variant => ({ ...variant, src: externalMediaUrl(variant.src) })) } : image;
  const publicManifest = async () => Object.fromEntries(Object.entries(await store.manifest()).map(([id, image]) => [id, externalImage(image)]));
  const adminAvailable = await fileExists(path.join(config.adminDir, "index.html"));
  const websiteAvailable = (await Promise.all([
    path.join(config.siteDir, "index.html"),
    path.join(config.rendererDir, "entry-server.js"),
    path.join(config.rendererDir, "template.html"),
    config.clientSeoFile,
    config.seoRendererFile,
  ].map(fileExists))).every(Boolean);
  let websiteModules;
  const loadWebsiteModules = async () => websiteModules ||= Promise.all([
    import(pathToFileURL(config.clientSeoFile).href),
    import(pathToFileURL(config.seoRendererFile).href),
    import(pathToFileURL(path.join(config.rendererDir, "entry-server.js")).href),
  ]);
  app.disable("x-powered-by");
  app.set("strict routing", true);
  app.use(compression({ filter: (req, res) => !req.path.startsWith("/api") && !req.path.startsWith("/media") && compression.filter(req, res) }));
  if (config.proxy) app.set("trust proxy", config.proxy);
  app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" },
    contentSecurityPolicy: { directives: { "default-src": ["'self'"], "script-src": ["'self'"], "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], "font-src": ["'self'", "https://fonts.gstatic.com"], "img-src": ["'self'", "https:", "data:", "blob:"], "connect-src": ["'self'", config.apiOrigin], "frame-src": ["https://www.google.com"], "object-src": ["'none'"], "frame-ancestors": ["'none'"], "upgrade-insecure-requests": config.production ? [] : null } },
    strictTransportSecurity: config.production ? undefined : false }));

  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    if (req.path.startsWith("/admin")) res.set("X-Robots-Tag", "noindex, nofollow");
    const origin = req.get("origin");
    const publicMediaRead = req.path === "/media" && ["GET", "HEAD"].includes(req.method);
    const publicMediaPreflight = req.path === "/media" && req.method === "OPTIONS" && req.get("access-control-request-method") === "GET";
    if (publicMediaRead || publicMediaPreflight) {
      res.set({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS" });
      if (publicMediaPreflight) return res.sendStatus(204);
      return next();
    }
    if (origin && config.origins.includes(origin)) {
      res.set({ "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": "Content-Type, X-CSRF-Token, X-Admin-Setup-Token, If-Match", "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS" });
      res.vary("Origin");
    }
    if (req.method === "OPTIONS") return config.origins.includes(origin) ? res.sendStatus(204) : res.sendStatus(403);
    if (!["GET", "HEAD"].includes(req.method) && !config.origins.includes(origin)) return next(error(403, "Request origin is not allowed."));
    next();
  });
  app.use("/api", express.json({ limit: "16kb" }));
  const cookieOptions = { httpOnly: true, secure: config.production, sameSite: "strict", path: "/api", maxAge: 8 * 60 * 60 * 1000 };
  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.get("/api/media", async (_req, res) => res.set("Cache-Control", "no-cache").json({ revision: await store.revision(), images: await publicManifest() }));
  app.post("/api/admin/setup", async (req, res) => {
    if (!config.adminSetupToken) throw error(404, "Admin setup is not enabled.");
    if (!req.is("application/json")) throw error(415, "Send a JSON setup request.");
    if (!await store.attempt("setup:" + req.ip, 5)) throw error(429, "Too many setup attempts. Try again in 15 minutes.");
    if (!constantEqual(tokenHash(req.get("x-admin-setup-token") || ""), tokenHash(config.adminSetupToken))) throw error(401, "The admin setup token is invalid.");
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw error(422, "Enter a valid email address.");
    if (typeof req.body?.password !== "string" || req.body.password.length < 14 || req.body.password.length > 128) throw error(422, "Use a password or passphrase between 14 and 128 characters.");
    const admin = await store.createInitialAdmin(email, await hashPassword(req.body.password));
    if (!admin) throw error(409, "An admin account already exists. Use the server reset command to change its password.");
    res.status(201).json({ email: admin.email });
  });
  app.post("/api/admin/login", async (req, res) => {
    if (!req.is("application/json")) throw error(415, "Send a JSON login request.");
    if (!await store.attempt("login:" + req.ip, 10)) throw error(429, "Too many sign-in attempts. Try again in 15 minutes.");
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase().slice(0, 254) : "";
    const user = await store.user(email);
    if (activeLogins >= 4) throw error(429, "Sign-in is busy. Please try again shortly.");
    activeLogins++;
    let valid;
    try { valid = await verifyPassword(req.body?.password, user?.password || dummyPassword); }
    finally { activeLogins--; }
    if (!user || !valid) throw error(401, "Email or password is incorrect.");
    const token = randomToken(), csrf = randomToken();
    await store.createSession(tokenHash(token), user.id, csrf, Date.now() + cookieOptions.maxAge);
    res.cookie("vc_admin", token, cookieOptions).json({ email: user.email, csrf });
  });
  app.use("/api/admin", async (req, _res, next) => {
    const token = readSessionCookie(req);
    req.session = /^[A-Za-z0-9_-]{43}$/.test(token) ? await store.session(tokenHash(token)) : null;
    if (!req.session) return next(error(401, "Sign in to manage the website images."));
    if (!["GET", "HEAD"].includes(req.method) && !constantEqual(req.get("x-csrf-token"), req.session.csrf)) return next(error(403, "Your security token is invalid. Sign in again."));
    next();
  });
  app.get("/api/admin/session", (req, res) => res.json({ email: req.session.email, csrf: req.session.csrf }));
  app.post("/api/admin/logout", async (req, res) => { await store.deleteSession(req.session.hash); res.clearCookie("vc_admin", { ...cookieOptions, maxAge: undefined }).json({ ok: true }); });
  const detail = async item => ({ ...item, ...await store.image(item.id) });
  app.get("/api/admin/images", async (_req, res) => res.json({ images: await Promise.all(catalog.map(detail)), revision: await store.revision() }));
  app.param("id", (req, _res, next, id) => {
    if (!catalogById.has(id)) return next(error(404, "Image not found."));
    req.image = catalogById.get(id); next();
  });
  const checkVersion = async (req, _res, next) => {
    const match = req.get("if-match")?.match(/^"(\d+)"$/);
    if (!match) return next(error(428, "An image version is required. Refresh this image before saving."));
    req.imageVersion = Number(match[1]);
    if ((await store.image(req.image.id)).version !== req.imageVersion) return next(error(409, "This image has changed. Refresh before saving."));
    if (!await store.attempt("edit:" + req.session.admin_id, 120)) return next(error(429, "Too many edits. Please try later."));
    next();
  };
  const altText = value => {
    if (typeof value !== "string" || value.length > 300) throw error(422, "Alt text must be at most 300 characters.");
    return value.trim() || null;
  };
  app.patch("/api/admin/images/:id", checkVersion, async (req, res) => {
    const alt = altText(req.body?.alt);
    const previous = (await store.image(req.image.id)).value;
    await store.saveImage(req.image.id, { ...previous, alt }, req.imageVersion, req.session.admin_id);
    pageCache.clear(); res.json({ image: await detail(req.image) });
  });
  app.put("/api/admin/images/:id", checkVersion, (req, res, next) => {
    if (uploading) return next(error(429, "Another upload is processing. Please try again shortly."));
    uploading = true;
    upload(req, res, async uploadError => {
      let generated;
      try {
        if (uploadError) throw uploadError;
        if (!req.file) throw error(422, "Choose a JPEG, PNG or WebP image, up to 12 MB.");
        const alt = altText(req.body.alt || "");
        generated = await createImageVariants(req.file.buffer, mediaDir, config.maxStorageBytes);
        await store.saveImage(req.image.id, { ...generated.image, alt }, req.imageVersion, req.session.admin_id);
        pageCache.clear(); res.json({ image: await detail(req.image) });
      } catch (err) { if (generated) await generated.cleanup(); next(err); }
      finally { uploading = false; }
    });
  });
  app.post("/api/admin/images/:id/restore", checkVersion, async (req, res) => {
    await store.saveImage(req.image.id, null, req.imageVersion, req.session.admin_id);
    pageCache.clear(); res.json({ image: await detail(req.image) });
  });
  app.use("/api", (_req, _res, next) => next(error(404, "API endpoint not found.")));

  app.get("/media/:file", (req, res, next) => {
    if (!/^[a-f0-9-]{36}-\d{1,4}\.webp$/.test(req.params.file)) return next(error(404, "Image not found."));
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.sendFile(req.params.file, { root: mediaDir, dotfiles: "deny" }, err => { if (err) next(error(404, "Image not found.")); });
  });
  if (adminAvailable) {
    app.get("/admin", (_req, res) => res.redirect(302, "/admin/"));
    app.use("/admin", (_req, res, next) => { res.set({ "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" }); next(); });
    app.use("/admin/assets", express.static(path.join(config.adminDir, "assets"), { immutable: true, maxAge: "1y", fallthrough: false }));
    app.get(["/admin/", "/admin/{*path}"], (_req, res, next) => res.sendFile(path.join(config.adminDir, "index.html"), err => { if (err) next(error(503, "The admin build is unavailable.")); }));
  }

  if (websiteAvailable) {
    app.use("/assets", express.static(path.join(config.siteDir, "assets"), { immutable: true, maxAge: "1y", fallthrough: false }));
    app.get("/manifest.json", async (_req, res) => {
      const manifest = JSON.parse(await readFile(path.join(config.siteDir, "manifest.json"), "utf8"));
      const icon = (await publicManifest())["site-icon"];
      if (icon?.src) manifest.icons = [{ src: icon.src, sizes: icon.width + "x" + icon.height, type: "image/webp" }];
      res.set("Cache-Control", "no-cache").json(manifest);
    });
    app.get(["/robots.txt", "/sitemap.xml", "/brand-icon.png"], (req, res) => res.set("Cache-Control", "no-cache").sendFile(path.join(config.siteDir, req.path)));
    app.get(["/", "/{*path}"], async (req, res) => {
      const [{ normalizePath, routeMeta, getPageMeta }, { renderHead, jsonForHtml }, { render }] = await loadWebsiteModules();
      let pathname;
      try { pathname = decodeURIComponent(req.path); } catch { throw error(400, "Invalid URL encoding."); }
      const route = normalizePath(pathname.replace(/\.html$/i, "").replace(/^\/index$/i, "/"));
      const known = !!routeMeta[route];
      if (known && req.path !== route) return res.redirect(301, route + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
      const canonical = known ? route : "/404";
      const revision = await store.revision();
      const key = canonical + ":" + revision;
      if (!pageCache.has(key)) {
        const media = await publicManifest();
        const template = await readFile(path.join(config.rendererDir, "template.html"), "utf8");
        const html = template.replace("<!--seo-head-->", renderHead(getPageMeta(canonical, media), media)).replace("<!--app-html-->", await render(canonical, media)).replace("<!--media-data-->", '<script type="application/json" id="site-media">' + jsonForHtml(media) + "</script>");
        if (revision === await store.revision()) pageCache.set(key, html);
        res.status(known ? 200 : 404).set("Cache-Control", "no-cache").type("html").send(html);
      } else res.status(known ? 200 : 404).set("Cache-Control", "no-cache").type("html").send(pageCache.get(key));
    });
  } else {
    app.get("/", (_req, res) => res.set("Cache-Control", "no-store").json({ ok: true, service: "Videocrafts API" }));
  }
  app.use((_req, _res, next) => next(error(404, "Not found.")));
  app.use((err, req, res, _next) => {
    const status = err instanceof multer.MulterError ? (err.code === "LIMIT_FILE_SIZE" ? 413 : 422) : (err.status >= 400 && err.status < 600 ? err.status : 500);
    const message = status === 500 ? "The server could not complete this request. Check the server setup and try again." : err instanceof multer.MulterError ? "Upload one image up to 12 MB with no extra fields." : err.message;
    if (status === 500) console.error("Request failed:", err.message);
    res.status(status).set("Cache-Control", "no-store");
    if (req.path.startsWith("/api/") || req.path.startsWith("/media/")) res.json({ error: message });
    else res.type("text").send(message);
  });
  return { app, store };
}
