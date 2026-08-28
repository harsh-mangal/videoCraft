import React, { useState } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { openWhatsApp } from "../utils/whatsapp";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitNewsletter = (event) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    openWhatsApp(`Hello Videocrafts India, please add ${cleanEmail} to your updates list.`);
  };

  const socialLinks = [
    { href: "https://www.facebook.com/videocrafts9572", label: "Facebook", icon: <FaFacebookF size={26} />, className: "text-blue-600" },
    { href: "https://www.instagram.com/videocrafts/", label: "Instagram", icon: <FaInstagram size={26} />, className: "text-pink-500" },
    { href: "https://www.youtube.com/@videocrafts84", label: "YouTube", icon: <FaYoutube size={26} />, className: "text-red-600" },
    { href: "https://wa.me/919888626212", label: "WhatsApp", icon: <FaWhatsapp size={26} />, className: "text-green-600" },
  ];

  return (
    <footer className="w-full">
      <div className="w-full bg-white px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row md:items-stretch">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:border-r md:border-gray-300 md:pr-8 md:text-left">
            <h2 className="mb-6 text-[22px] uppercase text-[#5E5E56]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Follow Us</h2>
            <div className="mb-6 flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer" className={`${item.className} transition hover:opacity-70`}>
                  {item.icon}
                </a>
              ))}
            </div>
            <a href="mailto:videocrafts95@gmail.com" className="text-[#84847C] hover:underline" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              videocrafts95@gmail.com
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center md:border-r md:border-gray-300 md:px-8">
            <Link to="/" aria-label="Videocrafts India home">
              <img src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025" alt="Videocrafts India" className="w-52 h-auto transition hover:scale-105" loading="lazy" decoding="async" />
            </Link>
          </div>

          <div className="flex flex-1 flex-col items-center text-center md:items-start md:pl-8 md:text-left">
            <h2 className="mb-4 text-[22px] uppercase text-[#5E5E56]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Stay Connected</h2>
            <p className="mb-5 italic text-[#84847C]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Share your email to receive photography updates.
            </p>
            <form onSubmit={submitNewsletter} className="w-full">
              <div className="flex w-full max-w-sm">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input id="footer-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="Enter your email" className="min-w-0 flex-1 border-b-2 border-gray-400 bg-transparent px-3 py-3 text-gray-700 outline-none focus:border-[#4D504A]" />
                <button type="submit" aria-label="Continue on WhatsApp" className="ml-2 bg-[#4D504A] px-5 py-3 text-white transition hover:bg-[#343731]">
                  <FaEnvelope size={20} aria-hidden="true" />
                </button>
              </div>
              {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f5f0eb] px-4 py-4">
        <p className="text-center text-sm text-gray-600" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Copyright © {new Date().getFullYear()} Videocrafts India. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
