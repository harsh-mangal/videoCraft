import ResponsiveImage from "../components/ResponsiveImage";
import React, { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import { EMAIL_PATTERN } from "../utils/enquiry";
import { openWhatsApp } from "../utils/whatsapp";

const footerLinks = [
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Services", "/services"],
  ["Wedding stories", "/wedding-stories/tales-of-romance"],
  ["Contact", "/contact"],
];

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
    <footer className="site-footer w-full">
      <section className="footer-invitation px-5 py-16 sm:py-20" aria-labelledby="footer-invitation-title">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="footer-kicker">Private consultations · Chandigarh</p>
            <h2 id="footer-invitation-title" className="footer-display mt-4">Your story deserves to be remembered beautifully.</h2>
          </div>
          <Link to="/contact" className="footer-cta inline-flex min-h-12 shrink-0 items-center gap-3 px-6 py-3">
            Begin a conversation <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="footer-main px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="footer-brand sm:col-span-2 lg:col-span-4 lg:pr-10">
            <Link to="/" aria-label="Videocrafts India home" className="inline-flex">
              <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025" alt="Videocrafts India" className="footer-logo h-auto w-52" loading="lazy" decoding="async" />
            </Link>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed">
              Photography and films made with feeling, craft and an eye for the moments in between.
            </p>
            <div className="mt-7"><SocialLinks /></div>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <h3 className="footer-heading">Explore</h3>
            <ul className="mt-5 space-y-2">
              {footerLinks.map(([label, path]) => <li key={path}>
                <Link to={path} className="footer-link inline-flex min-h-10 items-center">{label}</Link>
              </li>)}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="footer-heading">The studio</h3>
            <address className="mt-5 space-y-3 not-italic">
              <a href="tel:+919888626212" className="footer-contact"><Phone size={17} aria-hidden="true" />+91 98886 26212</a>
              <a href="mailto:videocrafts95@gmail.com" className="footer-contact"><Mail size={17} aria-hidden="true" />videocrafts95@gmail.com</a>
              <p className="footer-contact items-start"><MapPin size={17} className="mt-1 shrink-0" aria-hidden="true" /><span>First Floor, 56-57-58,<br />Madhya Marg, Sector 9-D,<br />Chandigarh 160009</span></p>
            </address>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="footer-heading">Studio notes</h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">Receive occasional photography updates through WhatsApp. You can review the message before sending.</p>
            <form noValidate onSubmit={submitNewsletter} className="mt-6 w-full max-w-md">
              <label htmlFor="footer-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">Email address</label>
              <div className="footer-form flex w-full">
                <input id="footer-email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!error} aria-describedby={error ? "updates-error" : undefined} value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none" />
                <button type="submit" aria-label="Continue on WhatsApp" className="footer-submit inline-flex min-w-12 items-center justify-center px-4">
                  <Send size={18} aria-hidden="true" focusable="false" />
                </button>
              </div>
              {error && <p id="updates-error" role="alert" className="mt-2 text-sm text-red-300">{error}</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="footer-legal px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Videocrafts India. All rights reserved.</p>
          <p>Wedding · Portrait · Commercial photography and films</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
