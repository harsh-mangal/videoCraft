export const WHATSAPP_NUMBER = "919888626212";

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;

export const openWhatsApp = (message) => {
  window.dispatchEvent(new CustomEvent("vc:analytics", { detail: { event: "whatsapp_form_continue", details: { link_type: "whatsapp" } } }));
  window.location.assign(buildWhatsAppUrl(message));
};
