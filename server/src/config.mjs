import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("../../", import.meta.url));
export function loadConfig(env = process.env) {
  const production = env.NODE_ENV === "production";
  const origin = new URL(env.PUBLIC_ORIGIN || "http://127.0.0.1:3001");
  if (origin.pathname !== "/" || origin.search || origin.hash || origin.username || origin.password) throw new Error("PUBLIC_ORIGIN must be an origin without a path or credentials.");
  if (production && origin.protocol !== "https:") throw new Error("Production requires an HTTPS PUBLIC_ORIGIN.");
  const origins = [...new Set([origin.origin, ...(env.ADMIN_ORIGINS || (production ? "" : "http://127.0.0.1:5174,http://localhost:5174")).split(",").filter(Boolean)])];
  for (const value of origins) if (new URL(value).origin !== value || (production && !value.startsWith("https://"))) throw new Error("ADMIN_ORIGINS must contain exact trusted origins.");
  const proxy = Number(env.TRUST_PROXY_HOPS || 0);
  if (!Number.isInteger(proxy) || proxy < 0 || proxy > 2) throw new Error("TRUST_PROXY_HOPS must be 0, 1 or 2.");
  const maxStorageBytes = Number(env.MAX_STORAGE_MB || 1024) * 1024 * 1024;
  if (!Number.isFinite(maxStorageBytes) || maxStorageBytes < 1024 * 1024) throw new Error("MAX_STORAGE_MB must be a positive number of at least 1.");
  const dataDir = path.resolve(env.DATA_DIR || path.join(root, "server/data"));
  for (const publicDir of [path.join(root, "client/build"), path.join(root, "admin/dist"), path.join(root, "client/public")]) {
    if (dataDir === publicDir || dataDir.startsWith(publicDir + path.sep)) throw new Error("DATA_DIR must not be inside a public build or asset directory.");
  }
  return { production, origin: origin.origin, origins, proxy, host: env.HOST || "127.0.0.1", port: Number(env.PORT || 3001),
    dataDir, siteDir: path.join(root, "client/build"),
    adminDir: path.join(root, "admin/dist"), rendererDir: path.join(root, "server/site-renderer"),
    maxStorageBytes };
}
