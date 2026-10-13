import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import ThemeToggle from "./ThemeToggle";
import { SITE_LOGO } from "../config/brand";

const navItems = [["Home", "/"], ["About Us", "/about"], ["Gallery", "/gallery"], ["Our Services", "/services"], ["Contact Us", "/contact"]];
const navClass = isActive => "nav-link inline-flex min-h-11 items-center whitespace-nowrap px-2 " + (isActive ? "is-active" : "");

export default function Navbar({ currentPath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => { setMenuOpen(false); }, [currentPath]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = event => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return <nav className="luxury-nav sticky top-0 z-50 w-full" aria-label="Primary navigation">
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:py-4">
      <div className="relative flex items-center justify-between lg:justify-center">
        <a href="/" aria-label="Videocrafts India home" onClick={() => setMenuOpen(false)}>
          <ResponsiveImage src={SITE_LOGO} alt="Videocrafts India" width={320} sizes="140px" loading="eager" className="theme-logo h-12 w-auto max-w-[160px] object-contain" />
        </a>
        <div className="flex items-center gap-2 lg:absolute lg:right-6">
          <ThemeToggle />
          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:+919888626212" aria-label="Call Videocrafts India" className="carousel-control"><Phone className="h-5 w-5" aria-hidden="true" /></a>
            <button ref={menuButton} type="button" onClick={() => setMenuOpen(open => !open)} className="carousel-control" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 hidden items-center justify-center gap-6 lg:flex">
        <div className="flex flex-wrap items-center justify-center gap-3 font-medium xl:gap-5">
          {navItems.map(([label, path]) => <a key={path} href={path} aria-current={currentPath === path ? "page" : undefined} className={navClass(currentPath === path)}>{label}</a>)}
        </div>
        <a href="tel:+919888626212" className="luxury-outline inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2 text-sm"><Phone className="h-4 w-4" aria-hidden="true" />+91 98886 26212</a>
      </div>
      <div id="mobile-navigation" hidden={!menuOpen} className={menuOpen ? "mt-3 flex flex-col gap-1 border-t border-gray-300 pt-3 text-lg font-medium lg:hidden" : "hidden"}>
        {navItems.map(([label, path]) => <a key={path} href={path} aria-current={currentPath === path ? "page" : undefined} className={navClass(currentPath === path)} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </div>
    </div>
  </nav>;
}
