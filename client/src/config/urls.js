export const SITE_URL = "https://www.videocraftsindia.com";
export const ADMIN_URL = "https://admin.videocraftsindia.com";
export const API_URL = import.meta.env?.VITE_API_ORIGIN?.replace(/\/$/, "") || "https://api.videocraftsindia.com";

export function apiUrl(path) {
  return API_URL + path;
}
