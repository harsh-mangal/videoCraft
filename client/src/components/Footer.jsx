import ResponsiveImage from "../components/ResponsiveImage";
import React, { useState } from "react";
import { Send } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import { EMAIL_PATTERN } from "../utils/enquiry";
import { openWhatsApp } from "../utils/whatsapp";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitNewsletter = (event) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    openWhatsApp(`Hello Videocrafts India, please add ${cleanEmail} to your updates list.`);
  };


  return (
    <footer className="w-full">
      <div className="w-full bg-white px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-stretch">
          <div className="flex min-w-0 flex-1 flex-col items-center text-center lg:items-start lg:border-r lg:border-gray-300 lg:pr-8 lg:text-left">
            <h2 className="mb-6 text-[22px] uppercase text-[#5E5E56]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Follow Us</h2>
            <div className="mb-6"><SocialLinks /></div>
            <a href="mailto:videocrafts95@gmail.com" className="text-[#62625A] hover:underline" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              videocrafts95@gmail.com
            </a>
            <a href="tel:+919888626212" className="mt-3 inline-flex min-h-11 items-center text-[#62625A] hover:underline">+91 98886 26212</a>
            <address className="mt-2 text-sm not-italic leading-relaxed text-[#62625A]">
              First Floor, 56-57-58, Madhya Marg,<br />Sector 9-D, Chandigarh 160009
            </address>
            <Link to="/contact" className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Contact our Chandigarh studio</Link>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center lg:border-r lg:border-gray-300 lg:px-8">
            <Link to="/" aria-label="Videocrafts India home">
              <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025" alt="Videocrafts India" className="w-52 h-auto transition hover:scale-105" loading="lazy" decoding="async" />
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-center text-center lg:items-start lg:pl-8 lg:text-left">
            <h2 className="mb-4 text-[22px] uppercase text-[#5E5E56]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Stay Connected</h2>
            <p className="mb-5 italic text-[#62625A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Request photography updates on WhatsApp. You can review your message before sending.
            </p>
            <form noValidate onSubmit={submitNewsletter} className="w-full">
              <div className="flex w-full max-w-sm">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input id="footer-email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!error} aria-describedby={error ? "updates-error" : undefined} value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="Enter your email" className="min-w-0 flex-1 border-b-2 border-gray-400 bg-transparent px-3 py-3 text-gray-700 outline-none focus:border-[#4D504A]" />
                <button type="submit" aria-label="Continue on WhatsApp" className="ml-2 bg-[#4D504A] px-5 py-3 text-white transition hover:bg-[#343731]">
                  <Send size={20} aria-hidden="true" focusable="false" />
                </button>
              </div>
              {error && <p id="updates-error" role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
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
