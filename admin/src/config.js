export const PUBLIC_SITE_URL = "https://www.videocraftsindia.com/";
export const ADMIN_URL = "https://admin.videocraftsindia.com/";
export const API_URL = "https://api.videocraftsindia.com";

const adminHostname = new URL(ADMIN_URL).hostname;

export function apiUrl(path, location = globalThis.location) {
  const origin = location?.hostname === adminHostname ? API_URL : "";
  return origin + path;
}

export function mediaUrl(src, location = globalThis.location) {
  return src?.startsWith("/media/") ? apiUrl(src, location) : src;
}

export function websiteUrl(location = globalThis.location) {
  return location?.hostname === adminHostname ? PUBLIC_SITE_URL : "http://127.0.0.1:4691/";
}
