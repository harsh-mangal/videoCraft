import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { SITE_LOGO } from "../config/seo";

const navItems = [["Home", "/"], ["About Us", "/about"], ["Gallery", "/gallery"], ["Our Services", "/services"], ["Contact Us", "/contact"]];
const navClass = ({ isActive }) => "inline-flex min-h-11 items-center whitespace-nowrap rounded px-2 transition hover:text-black " + (isActive ? "text-[#4D504A] underline underline-offset-8" : "text-gray-800");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = event => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-[#f3efec]" aria-label="Primary navigation">
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between lg:justify-center">
        <Link to="/" aria-label="Videocrafts India home" onClick={() => setMenuOpen(false)}>
          <ResponsiveImage src={SITE_LOGO} alt="Videocrafts India" width={320} sizes="140px" loading="eager" className="h-12 w-auto max-w-[160px] object-contain" />
        </Link>
        <div className="flex items-center gap-3 lg:hidden">
          <a href="tel:+919888626212" aria-label="Call Videocrafts India" className="carousel-control"><Phone className="h-5 w-5" aria-hidden="true" /></a>
          <button ref={menuButton} type="button" onClick={() => setMenuOpen(open => !open)} className="carousel-control" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="mt-2 hidden items-center justify-center gap-6 lg:flex">
        <div className="flex flex-wrap items-center justify-center gap-3 text-base font-medium xl:gap-5">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === "/"} className={navClass}>{label}</NavLink>)}
        </div>
        <a href="tel:+919888626212" className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-black px-4 py-2 text-base hover:bg-white"><Phone className="h-4 w-4" aria-hidden="true" />+91 98886 26212</a>
      </div>
      <div id="mobile-navigation" hidden={!menuOpen} className={menuOpen ? "mt-3 flex flex-col gap-1 border-t border-gray-300 pt-3 text-lg font-medium lg:hidden" : "hidden"}>
        {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === "/"} className={navClass} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
      </div>
    </div>
  </nav>;
}
