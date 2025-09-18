import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ import Link
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  // helper to close menu on link click
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#f3efec] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between md:justify-center">
          <div className="cursor-pointer">
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025"
              alt="Video Crafts Logo"
              className="h-12 mx-auto"
              onClick={()=>navigate('/')}
            />
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+919888626212"
              className="flex items-center space-x-2 border border-black px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Row */}
        <div className="hidden md:grid grid-cols-3 items-center mt-4">
          <div></div>

          {/* Links Centered */}
          <div className="flex justify-center space-x-9 text-lg font-medium mt-4">
            <Link to="/" className="hover:text-gray-600 whitespace-nowrap">Home</Link>
            <Link to="/about" className="hover:text-gray-600 whitespace-nowrap">About Us</Link>
            <Link to="/gallery" className="hover:text-gray-600 whitespace-nowrap">Gallery</Link>
            <Link to="/services" className="hover:text-gray-600 whitespace-nowrap">Our Services</Link>
            <Link to="/contact" className="hover:text-gray-600 whitespace-nowrap">Contact Us</Link>
          </div>

          {/* Phone Right */}
          <div className="flex justify-end">
            <a
              href="tel:+919888626212"
              className="flex items-center space-x-2 border border-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <Phone className="w-4 h-4" />
              <span className="text-lg font-medium">+91-9888626212</span>
            </a>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 text-lg font-medium">
            <Link to="/" onClick={handleLinkClick} className="hover:text-gray-600 whitespace-nowrap">Home</Link>
            <Link to="/about" onClick={handleLinkClick} className="hover:text-gray-600 whitespace-nowrap">About Us</Link>
            <Link to="/gallery" onClick={handleLinkClick} className="hover:text-gray-600 whitespace-nowrap">Gallery</Link>
            <Link to="/services" onClick={handleLinkClick} className="hover:text-gray-600 whitespace-nowrap">Our Services</Link>
            <Link to="/contact" onClick={handleLinkClick} className="hover:text-gray-600 whitespace-nowrap">Contact Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
