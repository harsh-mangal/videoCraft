import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta, structuredData, SITE_NAME } from "../config/seo";

function setMeta(attribute, name, content) {
  let element = document.head.querySelector('meta[' + attribute + '="' + name + '"]');
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    for (const [name, content] of Object.entries({ description: meta.description, robots: meta.robots, "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": meta.image })) setMeta("name", name, content);
    for (const [name, content] of Object.entries({ "og:title": meta.title, "og:description": meta.description, "og:url": meta.canonical || "", "og:image": meta.image, "og:type": "website", "og:site_name": SITE_NAME, "og:locale": "en_IN" })) setMeta("property", name, content);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (meta.canonical) {
      if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = meta.canonical;
    } else canonical?.remove();

    let schema = document.getElementById("site-schema");
    const data = structuredData(meta);
    if (data) {
      if (!schema) { schema = document.createElement("script"); schema.id = "site-schema"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
      schema.textContent = JSON.stringify(data);
    } else schema?.remove();
  }, [pathname]);
  return null;
}
