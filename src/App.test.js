import { buildWhatsAppUrl, WHATSAPP_NUMBER } from "./utils/whatsapp";

test("builds the enquiry WhatsApp URL for the correct number", () => {
  const url = buildWhatsAppUrl("Hello Videocrafts India");
  expect(WHATSAPP_NUMBER).toBe("919888626212");
  expect(url).toContain("https://wa.me/919888626212");
  expect(url).toContain("Hello%20Videocrafts%20India");
});
