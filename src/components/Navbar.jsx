import React, { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Gallery", "/gallery"],
  ["Our Services", "/services"],
  ["Contact Us", "/contact"],
];

const navClass = ({ isActive }) =>
  `whitespace-nowrap transition hover:text-gray-600 ${isActive ? "text-[#4D504A] underline underline-offset-8" : "text-gray-800"}`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-[#f3efec]/95 backdrop-blur" aria-label="Primary navigation">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between md:justify-center">
          <Link to="/" aria-label="Videocrafts India home" onClick={() => setMenuOpen(false)}>
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025"
              alt="Videocrafts India"
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+919888626212"
              aria-label="Call Videocrafts India"
              className="flex items-center rounded-md border border-black p-2 transition hover:bg-gray-100"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4D504A]"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className="mt-4 hidden grid-cols-3 items-center md:grid">
          <div aria-hidden="true" />
          <div className="flex justify-center space-x-9 text-lg font-medium">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} end={path === "/"} className={navClass}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex justify-end">
            <a
              href="tel:+919888626212"
              className="flex items-center space-x-2 rounded-md border border-black px-4 py-2 transition hover:bg-gray-100"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="text-lg font-medium">+91 98886 26212</span>
            </a>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="mt-4 flex flex-col space-y-4 border-t border-gray-300 pt-4 text-lg font-medium md:hidden">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={navClass}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
