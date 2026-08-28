import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    if (hash) {
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      document.getElementById(id)?.scrollIntoView();
    } else if (previous.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    previous.current = pathname;
  }, [pathname, hash]);
  return null;
}
