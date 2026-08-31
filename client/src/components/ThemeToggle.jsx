import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "videocrafts-theme";
const readSavedTheme = () => {
  try {
    const value = window.localStorage?.getItem(STORAGE_KEY);
    if (value) return value;
  } catch { /* Use the cookie fallback below. */ }
  return (document.cookie || "").match(/(?:^|; )videocrafts-theme=(dark|light)(?:;|$)/)?.[1] || null;
};
const saveTheme = (theme) => {
  try { window.localStorage?.setItem(STORAGE_KEY, theme); } catch { /* The cookie remains available. */ }
  try { document.cookie = `${STORAGE_KEY}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`; } catch { /* Persistence can be unavailable in sandboxed contexts. */ }
};

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const sync = () => setDark(root.classList.contains("dark"));
    const followSystem = () => {
      if (readSavedTheme()) return;
      root.classList.toggle("dark", media?.matches === true);
      sync();
    };
    sync();
    media?.addEventListener?.("change", followSystem);
    return () => media?.removeEventListener?.("change", followSystem);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#111513" : "#4D504A");
    saveTheme(next ? "dark" : "light");
    setDark(next);
  };

  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="carousel-control theme-toggle" onClick={toggleTheme} aria-label={label} title={label} aria-pressed={dark}>
      {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
