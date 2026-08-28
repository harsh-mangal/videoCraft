import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contact" className="bg-white px-4 py-16">
    <div className="mx-auto max-w-5xl rounded-2xl bg-[#f7f3f0] p-5 shadow-sm sm:p-10">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-normal uppercase text-[#5E5E56] sm:text-4xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Get in touch
        </h2>
        <p className="mt-3 text-xl italic text-[#62625A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Tell us about your event and continue the enquiry on WhatsApp.
        </p>
      </div>
      <ContactForm compact />
    </div>
  </section>
);

export default ContactSection;
