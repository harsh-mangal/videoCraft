import { randomBytes, createHash, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const options = { N: 65536, r: 8, p: 1, maxmem: 128 * 1024 * 1024 };
export const randomToken = () => randomBytes(32).toString("base64url");
export const tokenHash = token => createHash("sha256").update(token).digest("hex");
export function constantEqual(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const a = Buffer.from(left), b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
export async function hashPassword(password) {
  if (typeof password !== "string" || password.length < 14 || password.length > 128) throw new Error("Use a password or passphrase between 14 and 128 characters.");
  const salt = randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64, options);
  return salt + ":" + hash.toString("hex");
}
export async function verifyPassword(password, encoded) {
  if (typeof password !== "string" || password.length > 128 || !encoded) return false;
  const [salt, hash] = encoded.split(":");
  return constantEqual((await scrypt(password, salt, 64, options)).toString("hex"), hash);
}
export function readSessionCookie(request) {
  return request.headers.cookie?.split(";").map(value => value.trim()).find(value => value.startsWith("vc_admin="))?.slice(9) || "";
}
