import { apiUrl, mediaUrl } from "./config";

export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}
export async function request(path, { method = "GET", body, csrf, version } = {}) {
  const headers = {};
  if (csrf) headers["X-CSRF-Token"] = csrf;
  if (version !== undefined) headers["If-Match"] = '"' + version + '"';
  if (body && !(body instanceof FormData)) { headers["Content-Type"] = "application/json"; body = JSON.stringify(body); }
  let response;
  try { response = await fetch(apiUrl("/api/admin" + path), { method, headers, body, credentials: "include" }); }
  catch { throw new ApiError("Cannot reach the backend. Check your connection and that the Node server is running.", 0); }
  let result;
  try { result = await response.json(); }
  catch { throw new ApiError("The API did not return JSON. Check the backend and proxy configuration.", response.status); }
  if (!response.ok) throw new ApiError(result.error || "The request failed. Please try again.", response.status);
  return result;
}
export function thumbnail(src, width = 480) {
  src = mediaUrl(src);
  if (!src?.startsWith("https://ik.imagekit.io/")) return src;
  const url = new URL(src); url.searchParams.set("tr", "w-" + width + ",q-75,f-auto"); return url.href;
}
