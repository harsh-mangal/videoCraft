import { resolveImage } from "../utils/images.js";
import { SITE_URL } from "./urls.js";

export { SITE_URL } from "./urls.js";
export const SITE_NAME = "Videocrafts India";
export const SITE_LOGO = "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025";
export const DEFAULT_IMAGE = "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/banner.jpg?updatedAt=1758019513834&tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto";

export const routeMeta = {
  "/": { label: "Home", title: "Wedding Photographers in Chandigarh | Videocrafts India", description: "Wedding, pre-wedding, maternity, newborn and commercial photography in Chandigarh. Explore Videocrafts India's work and enquire about your event." },
  "/about": { label: "About us", title: "About Our Photography Studio | Videocrafts India", description: "Meet Videocrafts India, a father-and-son photography studio in Chandigarh. Discover our story, creative approach and commitment to preserving memories." },
  "/services": { label: "Photography services", title: "Photography Services in Chandigarh | Videocrafts India", description: "Explore wedding, pre-wedding, maternity, newborn, product and food photography services. Contact our Chandigarh studio for availability and packages." },
  "/gallery": { label: "Photography gallery", title: "Wedding & Family Photography Gallery | Videocrafts India", description: "Browse wedding celebrations, bridal portraits, pre-wedding sessions and family photography from Videocrafts India's portfolio in Chandigarh." },
  "/contact": { label: "Contact us", title: "Contact Videocrafts India | Chandigarh Photography Studio", description: "Plan your photography session with Videocrafts India in Sector 9-D, Chandigarh. Call our studio or share your event details through our WhatsApp enquiry form." },
  "/bridal-portraits": { label: "Bridal portraits", title: "Bridal Portrait Photography | Videocrafts India", description: "Explore bridal portraits by Videocrafts India, capturing wedding details, expressions and celebrations. Enquire about photography for your wedding." },
  "/pre-wedding": { label: "Pre-wedding photography", title: "Pre-Wedding Photography | Videocrafts India Chandigarh", description: "Discover pre-wedding photographs by Videocrafts India. Explore our couples' portfolio and contact our Chandigarh studio to plan your photography session." },
  "/videocrafts-junior": { label: "Videocrafts Junior", title: "Newborn, Kids & Family Photography | Videocrafts Junior", description: "Explore newborn, children and family photography from Videocrafts Junior. Contact Videocrafts India in Chandigarh to plan a session for your family." },
  "/wedding-stories/tales-of-romance": { label: "Tales of Romance", title: "Tales of Romance: A Wedding Story | Videocrafts India", description: "Read Tales of Romance, a Videocrafts India wedding story exploring a couple's journey, celebration, ceremony and the moments worth remembering.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto" },
  "/wedding-stories/from-i-do-to-forever": { label: "From I Do to Forever", title: "From I Do to Forever: Wedding Story | Videocrafts India", description: "Explore From I Do to Forever, a wedding story from Videocrafts India about personal details, celebrations and the memories created with family and friends.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto" },
  "/wedding-stories/unforgettable-wedding-day": { label: "An Unforgettable Wedding Day", title: "An Unforgettable Wedding Day | Videocrafts India", description: "Discover a Videocrafts India wedding story about anticipation, heartfelt vows and spontaneous moments that turn a celebration into lasting memories.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto" },
};

export const legacyRoutes = {
  "/bridal-potraits": "/bridal-portraits",
  "/video-craft-junion": "/videocrafts-junior",
  "/tales-off-romance": "/wedding-stories/tales-of-romance",
  "/from-‘i-do’-to forever": "/wedding-stories/from-i-do-to-forever",
  "/unforgettable-wedding-day": "/wedding-stories/unforgettable-wedding-day",
};

export function normalizePath(pathname) {
  let path = pathname;
  try { path = decodeURIComponent(path); } catch { /* Invalid encodings remain a 404. */ }
  path = path.replace(/\/+$/, "").toLowerCase() || "/";
  return legacyRoutes[path] || path;
}

export function getPageMeta(pathname, media = {}) {
  const path = normalizePath(pathname);
  const page = routeMeta[path];
  return {
    path, title: page?.title || "Page Not Found | " + SITE_NAME,
    description: page?.description || "The requested page could not be found. Explore Videocrafts India photography or contact our studio.",
    canonical: page ? SITE_URL + path : null,
    image: new URL(resolveImage(page?.image || DEFAULT_IMAGE, media).src, SITE_URL).href,
    robots: page ? "index, follow, max-image-preview:large" : "noindex, follow",
    label: page?.label || "Page not found",
  };
}

export function structuredData(meta, media = {}) {
  if (!meta.canonical) return null;
  const businessId = SITE_URL + "/#business";
  const graph = [
    { "@type": "LocalBusiness", "@id": businessId, name: SITE_NAME, url: SITE_URL,
      image: new URL(resolveImage(DEFAULT_IMAGE, media).src, SITE_URL).href, logo: new URL(resolveImage(SITE_LOGO, media).src, SITE_URL).href, telephone: "+91-98886-26212", email: "videocrafts95@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "First Floor, 56-57-58, Madhya Marg, Sector 9-D", addressLocality: "Chandigarh", postalCode: "160009", addressCountry: "IN" },
      sameAs: ["https://www.facebook.com/videocrafts9572", "https://www.instagram.com/videocrafts/", "https://www.youtube.com/@videocrafts84"] },
    { "@type": "WebSite", "@id": SITE_URL + "/#website", name: SITE_NAME, url: SITE_URL, publisher: { "@id": businessId }, inLanguage: "en-IN" },
    { "@type": "WebPage", "@id": meta.canonical + "#webpage", url: meta.canonical, name: meta.title, description: meta.description, isPartOf: { "@id": SITE_URL + "/#website" }, about: { "@id": businessId }, inLanguage: "en-IN" },
  ];
  if (meta.path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
    { "@type": "ListItem", position: 2, name: meta.label, item: meta.canonical },
  ] });
  return { "@context": "https://schema.org", "@graph": graph };
}
