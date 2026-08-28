import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return <a
    href={buildWhatsAppUrl("Hello Videocrafts India, I would like to enquire about your photography services.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp (opens in a new tab)"
    title="Chat on WhatsApp"
    className="whatsapp-button"
  >
    <SiWhatsapp size={28} aria-hidden="true" focusable="false" title="" />
  </a>;
}
