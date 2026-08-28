const widths = [320, 480, 640, 960, 1280, 1600];

export function imageUrl(src, width = 960) {
  if (!src?.startsWith("https://ik.imagekit.io/")) return src;
  const url = new URL(src);
  url.searchParams.set("tr", "w-" + width + ",q-80,f-auto");
  return url.href;
}

export function imageSrcSet(src, maxWidth = 1600) {
  if (!src?.startsWith("https://ik.imagekit.io/")) return undefined;
  return [...new Set([...widths.filter(width => width < maxWidth), maxWidth])]
    .map(width => imageUrl(src, width) + " " + width + "w").join(", ");
}
