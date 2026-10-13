import React, { useId, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildEnquiryMessage, validateEnquiry } from "../utils/enquiry";
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
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const formId = useId();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const problem = validateEnquiry(form);
    setError(problem);
    if (problem) {
      formRef.current.elements.namedItem(problem.field)?.focus();
      return;
    }
    openWhatsApp(buildEnquiryMessage(form));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`w-full ${compact ? "space-y-4" : "space-y-5"}`} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={formId + "-name"} className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
          <input id={formId + "-name"} name="name" aria-invalid={error?.field === "name"} aria-describedby={error?.field === "name" ? formId + "-error" : undefined} type="text" maxLength={100} autoComplete="name" value={form.name} onChange={updateField} className={inputClass} required />
        </div>
        <div>
          <label htmlFor={formId + "-phone"} className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
          <input id={formId + "-phone"} name="phone" aria-invalid={error?.field === "phone"} aria-describedby={error?.field === "phone" ? formId + "-error" : undefined} type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={updateField} className={inputClass} placeholder="98765 43210 or +91 98765 43210" maxLength={24} required />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={formId + "-email"} className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input id={formId + "-email"} name="email" aria-invalid={error?.field === "email"} aria-describedby={error?.field === "email" ? formId + "-error" : undefined} type="email" maxLength={254} autoComplete="email" value={form.email} onChange={updateField} className={inputClass} />
        </div>
        <div>
          <label htmlFor={formId + "-service"} className="mb-1 block text-sm font-medium text-gray-700">Service *</label>
          <select id={formId + "-service"} name="service" aria-invalid={error?.field === "service"} aria-describedby={error?.field === "service" ? formId + "-error" : undefined} value={form.service} onChange={updateField} className={inputClass} required>
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
          <label htmlFor={formId + "-date"} className="mb-1 block text-sm font-medium text-gray-700">Event date</label>
          <input id={formId + "-date"} name="eventDate" type="date" value={form.eventDate} onChange={updateField} className={inputClass} />
        </div>
        <div>
          <label htmlFor={formId + "-address"} className="mb-1 block text-sm font-medium text-gray-700">Venue / city</label>
          <input id={formId + "-address"} name="eventAddress" maxLength={300} type="text" value={form.eventAddress} onChange={updateField} className={inputClass} placeholder="Event location" />
        </div>
      </div>

      <div>
        <label htmlFor={formId + "-message"} className="mb-1 block text-sm font-medium text-gray-700">Tell us more</label>
        <textarea id={formId + "-message"} name="message" maxLength={2000} value={form.message} onChange={updateField} className={`${inputClass} min-h-28 resize-y`} placeholder="Share your requirements, event type or package questions" />
      </div>

      {error && <p id={formId + "-error"} role="alert" className="text-sm font-medium text-red-600">{error.message}</p>}

      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#4D504A] px-6 py-3 font-semibold text-white transition hover:bg-[#343731] focus:outline-none focus:ring-2 focus:ring-[#4D504A] focus:ring-offset-2 sm:w-auto">
        <MessageCircle size={20} className="shrink-0" aria-hidden="true" focusable="false" />
        Continue on WhatsApp
      </button>
      <p className="text-xs text-gray-500">Your details will be added to a WhatsApp message. You can review it before sending.</p>
    </form>
  );
};

export default ContactForm;
