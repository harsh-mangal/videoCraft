(() => {
  window.dataLayer = window.dataLayer || [];
  const record = (event, details = {}) => window.dataLayer.push({ event, page_path: location.pathname, ...details });
  document.addEventListener("click", event => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) record("phone_click", { link_type: "telephone" });
    else if (href.startsWith("mailto:")) record("email_click", { link_type: "email" });
    else if (href.includes("wa.me/") || href.includes("api.whatsapp.com/")) record("whatsapp_start", { link_type: "whatsapp" });
  }, { capture: true });
  window.addEventListener("vc:analytics", event => record(event.detail?.event || "site_interaction", event.detail?.details));
})();

