import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { MongoClient } from "mongodb";
import sharp from "sharp";
import { createApp } from "../src/app.mjs";
import { loadConfig, productionUrls, root } from "../src/config.mjs";
import { hashPassword, tokenHash } from "../src/auth.mjs";
import { routeMeta } from "../../client/src/config/seo.js";

let directory, server, store, origin, csrf, cookie, config, catalog, mongoProcess;
const password = "Local-test-passphrase-839!";
const adminOrigin = "http://127.0.0.1:5174";
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
async function availablePort() {
  const listener = createServer();
  await new Promise((resolve, reject) => listener.once("error", reject).listen(0, "127.0.0.1", resolve));
  const port = listener.address().port;
  await new Promise(resolve => listener.close(resolve));
  return port;
}
async function testMongoUri(rootDirectory) {
  if (process.env.MONGODB_TEST_URI) return process.env.MONGODB_TEST_URI;
  const databaseDirectory = path.join(rootDirectory, "mongodb");
  await mkdir(databaseDirectory);
  const port = await availablePort();
  let launchError, logs = "";
  mongoProcess = spawn(process.env.MONGOD_BINARY || "mongod", ["--dbpath", databaseDirectory, "--bind_ip", "127.0.0.1", "--port", String(port), "--quiet", "--nounixsocket"], { stdio: ["ignore", "ignore", "pipe"] });
  mongoProcess.once("error", error => { launchError = error; });
  mongoProcess.stderr.on("data", chunk => { logs = (logs + chunk).slice(-4000); });
  const uri = "mongodb://127.0.0.1:" + port;
  for (let attempt = 0; attempt < 80; attempt++) {
    if (launchError) throw new Error("Start mongod or set MONGODB_TEST_URI before running backend tests: " + launchError.message);
    if (mongoProcess.exitCode !== null) throw new Error("Temporary mongod exited before startup. " + logs);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 100 });
    try { await client.connect(); await client.db("admin").command({ ping: 1 }); await client.close(); return uri; }
    catch { await client.close().catch(() => {}); await pause(100); }
  }
  throw new Error("Temporary mongod did not become ready. " + logs);
}
async function api(url, options = {}) {
  return fetch(origin + url, { ...options, headers: { Origin: adminOrigin, Cookie: cookie || "", "X-CSRF-Token": csrf || "", ...options.headers } });
}
async function login() {
  const response = await api("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@example.test", password }) });
  assert.equal(response.status, 200);
  cookie = response.headers.get("set-cookie").split(";")[0];
  assert.match(response.headers.get("set-cookie"), /HttpOnly/);
  assert.match(response.headers.get("set-cookie"), /SameSite=Strict/);
  csrf = (await response.json()).csrf;
}
before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "videocrafts-api-test-"));
  const mongoUri = await testMongoUri(directory);
  config = { ...loadConfig({ MONGODB_URI: mongoUri, MONGODB_DB: "videocrafts_test_" + Date.now() }), dataDir: path.join(directory, "data") };
  const created = await createApp(config); store = created.store;
  await store.createAdmin("admin@example.test", await hashPassword(password));
  server = created.app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  origin = "http://127.0.0.1:" + server.address().port;
  catalog = JSON.parse(await readFile(path.join(root, "shared/media-catalog.json"), "utf8"));
});
after(async () => {
  await new Promise(resolve => server.close(resolve));
  await store.database.dropDatabase();
  await store.close();
  if (mongoProcess?.exitCode === null) { mongoProcess.kill("SIGTERM"); await new Promise(resolve => mongoProcess.once("exit", resolve)); }
  await rm(directory, { recursive: true, force: true });
});

test("project paths and MongoDB indexes keep runtime data private and expiring", async () => {
  const defaults = loadConfig({});
  assert.equal(defaults.siteDir, path.join(root, "client/build"));
  assert.equal(defaults.adminDir, path.join(root, "admin/dist"));
  assert.equal(defaults.rendererDir, path.join(root, "server/site-renderer"));
  assert.equal(defaults.dataDir, path.join(root, "server/data"));
  const production = loadConfig({ NODE_ENV: "production", MONGODB_URI: "mongodb://database.example.test:27017" });
  assert.equal(production.origin, productionUrls.public);
  assert.equal(production.apiOrigin, productionUrls.api);
  assert.deepEqual(production.origins, [productionUrls.public, productionUrls.api, productionUrls.admin]);
  assert((await store.admins.indexes()).some(index => index.key.email === 1 && index.unique));
  assert((await store.sessions.indexes()).some(index => index.key.expires === 1 && index.expireAfterSeconds === 0));
  assert((await store.attempts.indexes()).some(index => index.key.until === 1 && index.expireAfterSeconds === 0));
  for (const directory of ["client/build", "client/public", "admin/dist"]) {
    for (const suffix of ["", "/uploads"]) {
      assert.throws(() => loadConfig({ DATA_DIR: path.join(root, directory + suffix) }), /must not be inside a public/);
    }
  }
});

test("private APIs require authentication and login rejects a foreign origin", async () => {
  assert.equal((await api("/api/admin/images")).status, 401);
  assert.equal((await api("/api/admin/images/" + catalog[0].id, { method: "PUT" })).status, 401);
  assert.equal((await api("/api/admin/login", { method: "POST", headers: { Origin: "https://attacker.example", "Content-Type": "application/json" }, body: "{}" })).status, 403);
  assert.equal((await api("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@example.test", password: "incorrect" }) })).status, 401);
  await login();
});
test("authenticated catalog includes every registered image and no password or session hash", async () => {
  const response = await api("/api/admin/images");
  const body = await response.json();
  assert.equal(response.headers.get("content-encoding"), null, "Private API responses are not compressed");
  assert.equal(body.images.length, catalog.length);
  assert(body.images.some(item => item.id === "site-icon"));
  assert(body.images.some(item => item.label.includes("background")));
  assert(!JSON.stringify(body).includes(password));
  const publicResponse = await api("/api/media");
  assert.equal(publicResponse.headers.get("access-control-allow-origin"), "*");
  assert.deepEqual((await publicResponse.json()).images, {});
});
test("edits require CSRF, version checks and a known image ID", async () => {
  const id = catalog[0].id;
  const options = { method: "PATCH", headers: { "Content-Type": "application/json", "If-Match": '"0"' }, body: JSON.stringify({ alt: "Test photo" }) };
  assert.equal((await api("/api/admin/images/" + id, { ...options, headers: { ...options.headers, "X-CSRF-Token": "wrong" } })).status, 403);
  assert.equal((await api("/api/admin/images/unknown", options)).status, 404);
  assert.equal((await api("/api/admin/images/" + id, { ...options, headers: { "Content-Type": "application/json" } })).status, 428);
  assert.equal((await api("/api/admin/images/" + id, options)).status, 200);
  assert.equal((await api("/api/admin/images/" + id, options)).status, 409);
  assert.equal((await store.image(id)).value.alt, "Test photo");
});
test("invalid and active uploads are rejected before they can be published", async () => {
  const id = catalog[1].id;
  for (const [content, type] of [["not an image", "image/jpeg"], ['<svg xmlns="http://www.w3.org/2000/svg"/>', "image/png"]]) {
    const form = new FormData(); form.append("image", new Blob([content], { type }), "test.png");
    assert.equal((await api("/api/admin/images/" + id, { method: "PUT", headers: { "If-Match": '"0"' }, body: form })).status, 422);
  }
  const huge = new FormData(); huge.append("image", new Blob([new Uint8Array(12 * 1024 * 1024 + 1)], { type: "image/jpeg" }), "large.jpg");
  assert.equal((await api("/api/admin/images/" + id, { method: "PUT", headers: { "If-Match": '"0"' }, body: huge })).status, 413);
  assert.equal((await store.image(id)).version, 0);
});
test("upload persists, serves optimized variants and updates public HTML and social preview", async () => {
  const hero = catalog.find(item => item.label === "Home hero / default social preview");
  // Prime the HTML cache before publishing, so stale-cache bugs are covered.
  const initial = await api("/", { headers: { "Accept-Encoding": "gzip" } });
  assert.equal(initial.status, 200);
  assert.equal(initial.headers.get("content-encoding"), "gzip");
  await initial.text();
  const data = await sharp({ create: { width: 1000, height: 750, channels: 3, background: "#6a8957" } }).withExif({ IFD0: { Artist: "Private test-only metadata" } }).png().toBuffer();
  assert((await sharp(data).metadata()).exif);
  const form = new FormData(); form.append("image", new Blob([data], { type: "image/png" }), "../unsafe-name.png"); form.append("alt", "New studio photograph");
  const response = await api("/api/admin/images/" + hero.id, { method: "PUT", headers: { "If-Match": '"0"' }, body: form });
  assert.equal(response.status, 200);
  const item = (await response.json()).image;
  assert.equal(item.value.width, 1000); assert.equal(item.value.height, 750);
  assert(item.value.variants.length >= 3);
  const file = await api(item.value.src);
  assert.equal(file.status, 200); assert.match(file.headers.get("content-type"), /image\/webp/);
  assert.match(file.headers.get("cache-control"), /immutable/);
  assert.equal((await sharp(Buffer.from(await file.arrayBuffer())).metadata()).exif, undefined);
  const html = await (await api("/")).text();
  assert(html.includes('data-media-id="' + hero.id + '"'));
  assert(html.includes('src="' + config.apiOrigin + item.value.variants.find(variant => variant.width >= 960).src + '"') || html.includes('src="' + config.apiOrigin + item.value.src + '"'));
  assert(html.includes('property="og:image" content="' + config.apiOrigin + item.value.src + '"'));
  assert(html.includes('id="site-media"'));
  assert.equal((await (await api("/api/media")).json()).images[hero.id].src, config.apiOrigin + item.value.src);
  const storedImage = await store.images.findOne({ _id: hero.id });
  assert.equal(storedImage.history.length, 1);
  assert.equal(storedImage.history[0].next.alt, "New studio photograph");
  await new Promise(resolve => server.close(resolve)); await store.close();
  const restarted = await createApp(config); store = restarted.store;
  server = restarted.app.listen(0, "127.0.0.1"); await new Promise(resolve => server.once("listening", resolve));
  origin = "http://127.0.0.1:" + server.address().port;
  assert.equal((await store.image(hero.id)).value.src, item.value.src);
  assert.equal((await api("/api/admin/session")).status, 200);
  const restored = await api("/api/admin/images/" + hero.id + "/restore", { method: "POST", headers: { "If-Match": '"1"' } });
  assert.equal(restored.status, 200);
  assert.equal((await store.image(hero.id)).value, null);
  assert(!(await (await api("/")).text()).includes(item.value.src));
});
test("favicon, background and logo replacements use the same managed media pipeline", async () => {
  const bytes = await sharp({ create: { width: 200, height: 200, channels: 4, background: "#234a36" } }).png().toBuffer();
  const targets = [catalog.find(item => item.id === "site-icon"), catalog.find(item => item.label === "Home background · enjoy your day"), catalog.find(item => item.label === "Studio logo · navigation and footer")];
  for (const item of targets) {
    const form = new FormData(); form.append("image", new Blob([bytes], { type: "image/png" }), "sample.png");
    const response = await api("/api/admin/images/" + item.id, { method: "PUT", headers: { "If-Match": '"' + (await store.image(item.id)).version + '"' }, body: form });
    assert.equal(response.status, 200);
    const saved = (await response.json()).image.value;
    const html = await (await api("/")).text();
    assert(html.includes(saved.src));
    if (item.id === "site-icon") {
      assert(html.includes('rel="icon" type="image/webp" href="' + config.apiOrigin + saved.src + '"'));
      assert.equal((await (await api("/manifest.json")).json()).icons[0].src, config.apiOrigin + saved.src);
    }
    if (item.label.includes("background")) assert(html.includes("background-image:url(" + config.apiOrigin + saved.src + ")"));
  }
});
test("backend does not expose private data, renderer code or admin indexing", async () => {
  assert.equal((await api("/.env")).status, 404);
  assert.equal((await api("/site-renderer/entry-server.js")).status, 404);
  assert.equal((await api("/media/not-a-file.svg")).status, 404);
  assert.equal((await api("/admin/")).headers.get("x-robots-tag"), "noindex, nofollow");
  assert((await readdir(config.dataDir)).includes("uploads"));
  assert((await store.database.listCollections().toArray()).some(collection => collection.name === "admins"));
});
test("all public routes, canonical redirects and admin entry work on the Node server", async () => {
  for (const route of Object.keys(routeMeta)) {
    const response = await api(route);
    assert.equal(response.status, 200, route);
    assert((await response.text()).includes('id="site-media"'), route);
  }
  for (const [from, to] of [["/About/", "/about"], ["/index.html", "/"], ["/bridal-potraits", "/bridal-portraits"], ["/admin", "/admin/"]]) {
    const response = await api(from, { redirect: "manual" });
    assert([301, 302].includes(response.status), from);
    assert.equal(response.headers.get("location"), to);
    await response.text();
  }
  assert.equal((await api("/admin/")).status, 200);
  assert.equal((await api("/missing-page")).status, 404);
});
test("logout invalidates the server session and expired sessions are denied", async () => {
  assert.equal((await api("/api/admin/logout", { method: "POST" })).status, 200);
  assert.equal((await api("/api/admin/images")).status, 401);
  await login();
  await store.sessions.updateOne({ _id: tokenHash(cookie.split("=")[1]) }, { $set: { expires: new Date(0) } });
  assert.equal((await api("/api/admin/images")).status, 401);
  await login();
  await store.createAdmin("admin@example.test", await hashPassword(password), true);
  assert.equal((await api("/api/admin/images")).status, 401);
});
test("login rate limits are persistent and production requires HTTPS and MongoDB", async () => {
  assert.throws(() => loadConfig({ NODE_ENV: "production" }), /MONGODB_URI/);
  assert.throws(() => loadConfig({ NODE_ENV: "production", MONGODB_URI: "mongodb://database.example.test:27017", PUBLIC_ORIGIN: "http://example.com" }), /HTTPS/);
  for (let count = 0; count < 11; count++) await store.attempt("login:127.0.0.1", 10);
  const response = await api("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@example.test", password }) });
  assert.equal(response.status, 429);
});
