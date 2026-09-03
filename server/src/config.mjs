import path from "node:path";
import { fileURLToPath } from "node:url";

export const serverRoot = fileURLToPath(new URL("../", import.meta.url));
export const root = fileURLToPath(new URL("../../", import.meta.url));
export const productionUrls = Object.freeze({
  public: "https://www.videocraftsindia.com",
  admin: "https://admin.videocraftsindia.com",
  api: "https://api.videocraftsindia.com",
});

function exactOrigin(name, value, production) {
  const url = new URL(value);
  if (url.origin !== value || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error(name + " must be an exact origin without a path or credentials.");
  }
  if (production && url.protocol !== "https:") throw new Error("Production requires HTTPS for " + name + ".");
  return url.origin;
}

export function loadConfig(env = process.env) {
  const production = env.NODE_ENV === "production";
  if (production && !env.MONGODB_URI) throw new Error("MONGODB_URI is required in production.");
  const mongoUri = env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const mongoDbName = env.MONGODB_DB || "videocrafts";
  if (!/^[A-Za-z0-9_-]{1,63}$/.test(mongoDbName)) throw new Error("MONGODB_DB must contain only letters, numbers, underscores or hyphens and be at most 63 characters.");
  const origin = exactOrigin("PUBLIC_ORIGIN", env.PUBLIC_ORIGIN || (production ? productionUrls.public : "http://127.0.0.1:4691"), production);
  const apiOrigin = exactOrigin("API_ORIGIN", env.API_ORIGIN || (production ? productionUrls.api : origin), production);
  const adminOrigins = (env.ADMIN_ORIGINS || (production ? productionUrls.admin : "http://127.0.0.1:5174,http://localhost:5174"))
    .split(",").map(value => value.trim()).filter(Boolean).map(value => exactOrigin("ADMIN_ORIGINS", value, production));
  const origins = [...new Set([origin, apiOrigin, ...adminOrigins])];
  const proxy = Number(env.TRUST_PROXY_HOPS || 0);
  if (!Number.isInteger(proxy) || proxy < 0 || proxy > 2) throw new Error("TRUST_PROXY_HOPS must be 0, 1 or 2.");
  const maxStorageBytes = Number(env.MAX_STORAGE_MB || 1024) * 1024 * 1024;
  if (!Number.isFinite(maxStorageBytes) || maxStorageBytes < 1024 * 1024) throw new Error("MAX_STORAGE_MB must be a positive number of at least 1.");
  const dataDir = path.resolve(env.DATA_DIR || path.join(serverRoot, "data"));
  for (const publicDir of [path.join(root, "client/build"), path.join(root, "admin/dist"), path.join(root, "client/public")]) {
    if (dataDir === publicDir || dataDir.startsWith(publicDir + path.sep)) throw new Error("DATA_DIR must not be inside a public build or asset directory.");
  }
  return { production, origin, apiOrigin, origins, proxy, host: env.HOST || "127.0.0.1", port: Number(env.PORT || 4691), mongoUri, mongoDbName,
    dataDir, siteDir: path.resolve(env.SITE_DIR || path.join(root, "client/build")),
    adminDir: path.resolve(env.ADMIN_DIR || path.join(root, "admin/dist")), rendererDir: path.resolve(env.RENDERER_DIR || path.join(serverRoot, "site-renderer")),
    clientSeoFile: path.resolve(env.CLIENT_SEO_FILE || path.join(root, "client/src/config/seo.js")),
    seoRendererFile: path.resolve(env.SEO_RENDERER_FILE || path.join(root, "client/scripts/seo.mjs")),
    maxStorageBytes };
}
