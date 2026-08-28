import React, { useState } from "react";
import { openWhatsApp } from "../utils/whatsapp";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "Wedding Photography",
  eventDate: "",
  eventAddress: "",
  message: "",
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition focus:border-[#4D504A] focus:ring-2 focus:ring-[#4D504A]/20";

const ContactForm = ({ compact = false }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setError("Please enter your name, phone number and required service.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const details = [
      "Hello Videocrafts India, I would like to enquire about your photography services.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Service: ${form.service}`,
      `Event date: ${form.eventDate || "Not decided"}`,
      `Venue / city: ${form.eventAddress.trim() || "Not provided"}`,
      `Message: ${form.message.trim() || "Please share availability and package details."}`,
    ];

    openWhatsApp(details.join("\n"));
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${compact ? "space-y-4" : "space-y-5"}`} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" value={form.name} onChange={updateField} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
          <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={updateField} className={inputClass} placeholder="Your WhatsApp number" required />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-service" className="mb-1 block text-sm font-medium text-gray-700">Service *</label>
          <select id="contact-service" name="service" value={form.service} onChange={updateField} className={inputClass} required>
            <option>Wedding Photography</option>
            <option>Pre-Wedding Photography</option>
            <option>Wedding Videography</option>
            <option>Maternity Shoot</option>
            <option>Newborn / Kids Shoot</option>
            <option>Product Photography</option>
            <option>Food Photography</option>
            <option>Corporate Photography / Video</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-date" className="mb-1 block text-sm font-medium text-gray-700">Event date</label>
          <input id="contact-date" name="eventDate" type="date" value={form.eventDate} onChange={updateField} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-address" className="mb-1 block text-sm font-medium text-gray-700">Venue / city</label>
          <input id="contact-address" name="eventAddress" type="text" value={form.eventAddress} onChange={updateField} className={inputClass} placeholder="Event location" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">Tell us more</label>
        <textarea id="contact-message" name="message" value={form.message} onChange={updateField} className={`${inputClass} min-h-28 resize-y`} placeholder="Share your requirements, event type or package questions" />
      </div>

      {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-[#4D504A] px-6 py-3 font-semibold text-white transition hover:bg-[#343731] focus:outline-none focus:ring-2 focus:ring-[#4D504A] focus:ring-offset-2 sm:w-auto">
        Continue on WhatsApp
      </button>
      <p className="text-xs text-gray-500">Your details will be added to a WhatsApp message. You can review it before sending.</p>
    </form>
  );
};

export default ContactForm;
