export const WHATSAPP_NUMBER = "919888626212";

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;

export const openWhatsApp = (message) => {
  window.location.assign(buildWhatsAppUrl(message));
};
