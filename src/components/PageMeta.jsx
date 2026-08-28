import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Videocrafts India";

const routeMeta = {
  "/": {
    title: "Wedding Photographers in Chandigarh | Videocrafts India",
    description:
      "Wedding, pre-wedding, maternity, newborn, product and food photography by Videocrafts India in Chandigarh.",
  },
  "/about": {
    title: "About Videocrafts India | Photography Studio Chandigarh",
    description:
      "Discover the story, team, mission and creative approach behind Videocrafts India.",
  },
  "/services": {
    title: "Photography Services in Chandigarh | Videocrafts India",
    description:
      "Explore wedding, pre-wedding, maternity, newborn, product and food photography services in Chandigarh.",
  },
  "/gallery": {
    title: "Photography Gallery | Videocrafts India",
    description:
      "Browse wedding, pre-wedding, family, maternity and newborn photographs captured by Videocrafts India.",
  },
  "/contact": {
    title: "Contact Videocrafts India | Book a Photography Session",
    description:
      "Share your event details and connect with Videocrafts India on WhatsApp for availability and packages.",
  },
  "/bridal-portraits": {
    title: "Bridal Portraits | Videocrafts India",
    description: "View bridal portrait photography by Videocrafts India.",
  },
  "/pre-wedding": {
    title: "Pre-Wedding Photography | Videocrafts India",
    description: "View pre-wedding photography by Videocrafts India.",
  },
  "/videocrafts-junior": {
    title: "Kids and Family Photography | Videocrafts Junior",
    description: "View newborn, kids and family photography by Videocrafts Junior.",
  },
  "/wedding-stories/tales-of-romance": {
    title: "Tales of Romance | Videocrafts Wedding Stories",
    description: "A wedding story captured by Videocrafts India.",
  },
  "/wedding-stories/from-i-do-to-forever": {
    title: "From I Do to Forever | Videocrafts Wedding Stories",
    description: "A unique wedding experience captured by Videocrafts India.",
  },
  "/wedding-stories/unforgettable-wedding-day": {
    title: "An Unforgettable Wedding Day | Videocrafts Wedding Stories",
    description: "An unforgettable wedding celebration captured by Videocrafts India.",
  },
};

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
};

const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] || {
      title: `Page Not Found | ${SITE_NAME}`,
      description: "The requested page could not be found.",
    };

    const baseUrl = window.location.origin;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', `${baseUrl}${pathname}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${baseUrl}${pathname}`);
  }, [pathname]);

  return null;
};

export default PageMeta;
