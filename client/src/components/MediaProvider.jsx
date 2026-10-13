import { createContext, useContext } from "react";
import { resolveImage } from "../utils/images";

const empty = {};
const MediaContext = createContext(empty);

// Published media is embedded into Astro's generated HTML at build time. The
// browser never needs to call /api/media on navigation or focus.
export function MediaProvider({ initialMedia = empty, children }) {
  return <MediaContext.Provider value={initialMedia}>{children}</MediaContext.Provider>;
}

export const useMedia = () => useContext(MediaContext);
export const useMediaImage = src => resolveImage(src, useMedia());
