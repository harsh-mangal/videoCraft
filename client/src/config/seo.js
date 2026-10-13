import { managedImageUrl, resolveImage } from "../utils/images.js";
import { SITE_URL } from "./urls.js";
import { DEFAULT_IMAGE, SITE_LOGO, SITE_NAME } from "./brand.js";
import { PAGE_DESCRIPTIONS } from "./pageDescriptions.js";
import { seoLandingPages } from "../content/seoLandingPages.js";

export { SITE_URL } from "./urls.js";
export { DEFAULT_IMAGE, SITE_LOGO, SITE_NAME } from "./brand.js";

export const routeMeta = {
  "/": { label: "Home", title: "Wedding Photographers in Chandigarh | Videocrafts India", description: PAGE_DESCRIPTIONS["/"], pageType: "WebPage" },
  "/about": { label: "About us", title: "About Our Photography Studio | Videocrafts India", description: PAGE_DESCRIPTIONS["/about"], pageType: "AboutPage" },
  "/services": { label: "Photography services", title: "Photography Services in Chandigarh | Videocrafts India", description: PAGE_DESCRIPTIONS["/services"], pageType: "CollectionPage" },
  "/gallery": { label: "Photography gallery", title: "Wedding & Family Photography Gallery | Videocrafts India", description: PAGE_DESCRIPTIONS["/gallery"], pageType: "CollectionPage" },
  "/contact": { label: "Contact us", title: "Contact Videocrafts India | Chandigarh Photography Studio", description: PAGE_DESCRIPTIONS["/contact"], pageType: "ContactPage" },
  "/bridal-portraits": { label: "Bridal portraits", title: "Bridal Portrait Photography | Videocrafts India", description: PAGE_DESCRIPTIONS["/bridal-portraits"], pageType: "WebPage", serviceType: "Bridal portrait photography", areaServed: "Chandigarh and Tricity" },
  "/pre-wedding": { label: "Pre-wedding photography", title: "Pre-Wedding Photography | Videocrafts India Chandigarh", description: PAGE_DESCRIPTIONS["/pre-wedding"], pageType: "WebPage", serviceType: "Pre-wedding photography", areaServed: "Chandigarh and Tricity" },
  "/videocrafts-junior": { label: "Videocrafts Junior", title: "Newborn, Kids & Family Photography | Videocrafts Junior", description: PAGE_DESCRIPTIONS["/videocrafts-junior"], pageType: "WebPage", serviceType: "Newborn, children and family photography", areaServed: "Chandigarh and Tricity" },
  "/wedding-stories/tales-of-romance": { label: "Tales of Romance", title: "Tales of Romance: A Wedding Story | Videocrafts India", description: "Read Tales of Romance, a Videocrafts India wedding story exploring a couple's journey, celebration, ceremony and the moments worth remembering.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto", pageType: "Article" },
  "/wedding-stories/from-i-do-to-forever": { label: "From I Do to Forever", title: "From I Do to Forever: Wedding Story | Videocrafts India", description: "Explore From I Do to Forever, a wedding story from Videocrafts India about personal details, celebrations and the memories created with family and friends.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto", pageType: "Article" },
  "/wedding-stories/unforgettable-wedding-day": { label: "An Unforgettable Wedding Day", title: "An Unforgettable Wedding Day | Videocrafts India", description: "Discover a Videocrafts India wedding story about anticipation, heartfelt vows and spontaneous moments that turn a celebration into lasting memories.", image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?tr=w-1200,h-630,c-maintain_ratio,q-80,f-auto", pageType: "Article" },
  ...Object.fromEntries(Object.entries(seoLandingPages).map(([path, page]) => [path, {
    label: page.serviceType,
    title: page.title,
    description: page.description,
    image: page.hero,
    pageType: page.pageType || "WebPage",
    serviceType: page.pageType === "Article" ? undefined : page.serviceType,
    areaServed: page.areaServed,
  }])),
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
  const socialImage = resolveImage(page?.image || DEFAULT_IMAGE, media);
  return {
    path, title: page?.title || "Page Not Found | " + SITE_NAME,
    description: page?.description || "The requested page could not be found. Explore Videocrafts India photography or contact our studio.",
    canonical: page ? SITE_URL + path : null,
    image: new URL(managedImageUrl(socialImage, 1200), SITE_URL).href,
    robots: page ? "index, follow, max-image-preview:large" : "noindex, follow",
    label: page?.label || "Page not found",
    pageType: page?.pageType || "WebPage",
    serviceType: page?.serviceType || null,
    areaServed: page?.areaServed || null,
  };
}

export function structuredData(meta, media = {}) {
  if (!meta.canonical) return null;
  const businessId = SITE_URL + "/#business";
  const graph = [
    { "@type": "LocalBusiness", "@id": businessId, name: SITE_NAME, url: SITE_URL,
      image: new URL(managedImageUrl(resolveImage(DEFAULT_IMAGE, media), 1200), SITE_URL).href, logo: new URL(managedImageUrl(resolveImage(SITE_LOGO, media), 640), SITE_URL).href, telephone: "+91-98886-26212", email: "videocrafts95@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "First Floor, 56-57-58, Madhya Marg, Sector 9-D", addressLocality: "Chandigarh", postalCode: "160009", addressCountry: "IN" },
      sameAs: ["https://www.facebook.com/videocrafts9572", "https://www.instagram.com/videocrafts/", "https://www.youtube.com/@videocrafts84"] },
    { "@type": "WebSite", "@id": SITE_URL + "/#website", name: SITE_NAME, url: SITE_URL, publisher: { "@id": businessId }, inLanguage: "en-IN" },
    { "@type": meta.pageType === "Article" ? "WebPage" : meta.pageType, "@id": meta.canonical + "#webpage", url: meta.canonical, name: meta.title, description: meta.description, isPartOf: { "@id": SITE_URL + "/#website" }, about: { "@id": businessId }, inLanguage: "en-IN" },
  ];
  if (meta.serviceType) graph.push({ "@type": "Service", "@id": meta.canonical + "#service", name: meta.serviceType, description: meta.description,
    url: meta.canonical, image: meta.image, provider: { "@id": businessId }, areaServed: { "@type": "Place", name: meta.areaServed || "Chandigarh and Tricity" } });
  if (meta.pageType === "Article") graph.push({ "@type": "Article", "@id": meta.canonical + "#article", headline: meta.title,
    description: meta.description, image: meta.image, mainEntityOfPage: { "@id": meta.canonical + "#webpage" }, author: { "@id": businessId }, publisher: { "@id": businessId } });
  const landing = seoLandingPages[meta.path];
  if (landing?.faqs?.length) graph.push({ "@type": "FAQPage", "@id": meta.canonical + "#faq", mainEntity: landing.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) });
  if (meta.path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
    { "@type": "ListItem", position: 2, name: meta.label, item: meta.canonical },
  ] });
  return { "@context": "https://schema.org", "@graph": graph };
}
