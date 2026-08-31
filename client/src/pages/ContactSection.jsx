import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contact" className="bg-white px-4 py-16">
    <div className="luxury-card mx-auto max-w-5xl bg-[#f7f3f0] p-6 sm:p-12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="luxury-kicker">Begin your story</p>
        <h2 className="section-heading mt-4">
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
