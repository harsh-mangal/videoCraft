import { loadPublishedMedia } from "../lib/publishedMedia";
import { resolveImage } from "../utils/images";

export const prerender = true;

export async function GET() {
  const media = await loadPublishedMedia();
  const icon = resolveImage("/brand-icon.png", media);
  return new Response(JSON.stringify({
    short_name: "Videocrafts",
    name: "Videocrafts India Photography",
    icons: [{ src: icon.src, sizes: `${icon.width || 192}x${icon.height || 192}`, type: icon.replaced ? "image/webp" : "image/png" }],
    start_url: "/",
    display: "standalone",
    theme_color: "#4D504A",
    background_color: "#f4f0ed",
  }), { headers: { "Content-Type": "application/manifest+json; charset=utf-8", "Cache-Control": "no-cache" } });
}
