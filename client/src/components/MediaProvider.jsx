import { createContext, useContext, useEffect, useState } from "react";
import { resolveImage } from "../utils/images";

const empty = {};
const MediaContext = createContext(empty);

export function MediaProvider({ initialMedia = empty, children, live = true }) {
  const [media, setMedia] = useState(initialMedia);
  useEffect(() => {
    if (!live) return;
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch("/api/media", { signal: controller.signal });
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) return;
        const result = await response.json();
        if (result.images && typeof result.images === "object") setMedia(result.images);
      } catch { /* Keep the last published images when the API is unavailable. */ }
    };
    refresh();
    window.addEventListener("focus", refresh);
    return () => { controller.abort(); window.removeEventListener("focus", refresh); };
  }, [live]);
  return <MediaContext.Provider value={media}>{children}</MediaContext.Provider>;
}

export const useMedia = () => useContext(MediaContext);
export const useMediaImage = src => resolveImage(src, useMedia());
