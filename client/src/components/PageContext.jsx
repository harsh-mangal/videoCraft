import { createContext, useContext } from "react";
import { MediaProvider } from "./MediaProvider";

const PathContext = createContext("/");

export function PageContext({ pathname = "/", media = {}, children }) {
  return <PathContext.Provider value={pathname}>
    <MediaProvider initialMedia={media}>{children}</MediaProvider>
  </PathContext.Provider>;
}

export const usePagePath = () => useContext(PathContext);
