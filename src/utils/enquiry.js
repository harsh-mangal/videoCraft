export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accept a 10-digit local number or a +-prefixed international number (10–15 digits).
export function normalizePhone(value) {
  const input = value.trim();
  if (!/^\+?[\d(][\d ()-]*[\d)]$/.test(input) || input.includes("--")) return null;
  if (/[()]/.test(input.replace(/\(\d+\)/g, ""))) return null;
  const digits = input.replace(/\D/g, "");
  if (input.startsWith("+")) return /^[1-9]\d{9,14}$/.test(digits) ? "+" + digits : null;
  return /^[1-9]\d{9}$/.test(digits) ? digits : null;
}

export function validateEnquiry(form) {
  if (!form.name.trim()) return { field: "name", message: "Please enter your name." };
  if (!normalizePhone(form.phone)) return { field: "phone", message: "Enter a 10-digit number, or an international number starting with + (10–15 digits)." };
  if (!form.service) return { field: "service", message: "Please select a service." };
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) return { field: "email", message: "Please enter a valid email address." };
  return null;
}

export function buildEnquiryMessage(form) {
  return [
    "Hello Videocrafts India, I would like to enquire about your photography services.", "",
    "Name: " + form.name.trim(), "Phone: " + normalizePhone(form.phone),
    "Email: " + (form.email.trim() || "Not provided"), "Service: " + form.service,
    "Event date: " + (form.eventDate || "Not decided"),
    "Venue / city: " + (form.eventAddress.trim() || "Not provided"),
    "Message: " + (form.message.trim() || "Please share availability and package details."),
  ].join("\n");
}
