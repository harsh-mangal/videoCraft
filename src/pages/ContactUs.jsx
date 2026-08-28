import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import ContactForm from "./ContactForm";

const socialLinks = [
  { href: "https://www.facebook.com/videocrafts9572", label: "Facebook", icon: <FaFacebookF /> },
  { href: "https://www.instagram.com/videocrafts/", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://www.youtube.com/@videocrafts84", label: "YouTube", icon: <FaYoutube /> },
  { href: "https://wa.me/919888626212", label: "WhatsApp", icon: <FaWhatsapp /> },
];

const ContactUs = () => (
  <section className="bg-white px-4 py-14">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-[#84847C]">Contact Videocrafts India</p>
        <h1 className="mt-3 text-4xl font-medium uppercase text-[#4D504A] sm:text-5xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Let’s capture your story
        </h1>
        <p className="mt-5 max-w-xl text-[#6C6C63]">
          Tell us about your event, preferred date and location. After you submit the form, WhatsApp will open with your enquiry ready to review and send.
        </p>
        <img
          src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/contact.jpg?updatedAt=1758104863608"
          alt="A wedding moment photographed by Videocrafts India"
          className="mt-8 aspect-[4/3] w-full rounded-xl object-cover shadow-lg"
          decoding="async"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <h2 className="text-xl uppercase text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Call or WhatsApp</h2>
            <a href="tel:+919888626212" className="mt-1 block text-[#84847C] hover:underline">+91 98886 26212</a>
          </div>
          <div>
            <h2 className="text-xl uppercase text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Email</h2>
            <a href="mailto:videocrafts95@gmail.com" className="mt-1 block text-[#84847C] hover:underline">videocrafts95@gmail.com</a>
          </div>
          <div className="sm:col-span-2">
            <h2 className="text-xl uppercase text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Studio</h2>
            <address className="mt-1 not-italic text-[#84847C]">First Floor, 56-57-58, Madhya Marg, Sector 9-D, Chandigarh 160009</address>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4D504A] text-white transition hover:scale-105 hover:bg-[#343731]">
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#f7f3f0] p-5 shadow-lg sm:p-8">
        <h2 className="mb-6 text-3xl font-medium text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Send an enquiry
        </h2>
        <ContactForm />
      </div>
    </div>

    <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="h-[380px] overflow-hidden rounded-xl shadow-lg">
        <iframe
          title="Videocrafts India studio location"
          src="https://www.google.com/maps?q=First%20Floor%2056-57-58%20Madhya%20Marg%20Sector%209-D%20Chandigarh%20160009&output=embed"
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-col justify-center rounded-xl border border-[#4D504A]/30 bg-[#f2eaea] p-8 shadow-md">
        <h2 className="text-center text-3xl font-medium uppercase text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Visits by appointment
        </h2>
        <p className="mt-5 text-center text-[#6C6C63]">
          Please call or message before visiting so our team can confirm availability and give your consultation the time it deserves.
        </p>
        <a href="https://wa.me/919888626212?text=Hello%20Videocrafts%20India%2C%20I%20would%20like%20to%20schedule%20a%20studio%20visit." target="_blank" rel="noopener noreferrer" className="mx-auto mt-7 inline-flex rounded-md bg-[#4D504A] px-6 py-3 font-semibold text-white transition hover:bg-[#343731]">
          Schedule on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default ContactUs;
