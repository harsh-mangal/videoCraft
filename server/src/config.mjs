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
  const adminSetupToken = env.ADMIN_SETUP_TOKEN || "";
  if (adminSetupToken && (adminSetupToken.length < 32 || adminSetupToken.length > 256)) throw new Error("ADMIN_SETUP_TOKEN must contain between 32 and 256 characters.");
  const dataDir = path.resolve(env.DATA_DIR || path.join(serverRoot, "data"));
  for (const publicDir of [path.join(root, "client/build"), path.join(root, "admin/dist"), path.join(root, "client/public")]) {
    if (dataDir === publicDir || dataDir.startsWith(publicDir + path.sep)) throw new Error("DATA_DIR must not be inside a public build or asset directory.");
  }
  const r2Values = [env.R2_ACCOUNT_ID, env.R2_ACCESS_KEY_ID, env.R2_SECRET_ACCESS_KEY, env.R2_BUCKET, env.MEDIA_PUBLIC_ORIGIN];
  if (r2Values.some(Boolean) && !r2Values.every(Boolean)) throw new Error("R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET and MEDIA_PUBLIC_ORIGIN must be configured together.");
  const r2 = r2Values.every(Boolean) ? {
    accountId: env.R2_ACCOUNT_ID,
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    bucket: env.R2_BUCKET,
    publicOrigin: exactOrigin("MEDIA_PUBLIC_ORIGIN", env.MEDIA_PUBLIC_ORIGIN, production),
    prefix: (env.R2_PREFIX || "videocrafts").replace(/^\/+|\/+$/g, ""),
  } : null;
  let siteRebuildWebhook = null;
  if (env.SITE_REBUILD_WEBHOOK) {
    siteRebuildWebhook = new URL(env.SITE_REBUILD_WEBHOOK);
    if (production && siteRebuildWebhook.protocol !== "https:") throw new Error("SITE_REBUILD_WEBHOOK must use HTTPS in production.");
  }
  return { production, origin, apiOrigin, origins, proxy, host: env.HOST || "127.0.0.1", port: Number(env.PORT || 4691), mongoUri, mongoDbName,
    dataDir, siteDir: path.resolve(env.SITE_DIR || path.join(root, "client/build")),
    adminDir: path.resolve(env.ADMIN_DIR || path.join(root, "admin/dist")),
    adminSetupToken, maxStorageBytes, r2, siteRebuildWebhook: siteRebuildWebhook?.href || null,
    siteRebuildToken: env.SITE_REBUILD_TOKEN || "" };
}
