import catalog from "../../../shared/media-catalog.json";

let mediaPromise;

const routeGroups = {
  "/": ["Home"],
  "/about": ["About"],
  "/services": ["Services"],
  "/gallery": ["Gallery"],
  "/contact": ["Contact"],
  "/bridal-portraits": ["Bridal portraits"],
  "/pre-wedding": ["Pre-wedding"],
  "/videocrafts-junior": ["Junior"],
  "/wedding-stories/tales-of-romance": ["Wedding stories"],
  "/wedding-stories/from-i-do-to-forever": ["Wedding stories"],
  "/wedding-stories/unforgettable-wedding-day": ["Wedding stories"],
};

function selectMedia(media, predicate) {
  return Object.fromEntries(catalog.filter(predicate).flatMap(item => media[item.id] ? [[item.id, media[item.id]]] : []));
}

export const mediaForRoute = (media, pathname) => {
  const groups = routeGroups[pathname] || [];
  return selectMedia(media, item => item.groups.some(group => groups.includes(group)));
};

export const mediaForUsage = (media, usage) => selectMedia(media, item => item.usedIn.includes(usage));

export async function loadPublishedMedia() {
  if (mediaPromise) return mediaPromise;
  mediaPromise = (async () => {
    const endpoint = import.meta.env.MEDIA_MANIFEST_URL;
    if (!endpoint) return {};
    try {
      const response = await fetch(endpoint, { headers: { accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const payload = await response.json();
      return payload?.images && typeof payload.images === "object" ? payload.images : {};
    } catch (error) {
      throw new Error("Published media could not be embedded from " + endpoint + ": " + error.message);
    }
  })();
  return mediaPromise;
}
