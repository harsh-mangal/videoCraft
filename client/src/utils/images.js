import defaults from "../../../shared/media-defaults.json" with { type: "json" };

const widths = [320, 480, 640, 960, 1280, 1600];

export function resolveImage(src, media = {}) {
  const original = defaults[src?.split("?")[0]];
  const replacement = original && media[original.id];
  return { ...original, src, ...replacement, replaced: !!replacement?.src };
}

export function managedImageUrl(image, width = 960) {
  if (!image.variants?.length) return imageUrl(image.src, width);
  const variants = image.variants.filter(variant => !variant.format || variant.format === "webp");
  return (variants.find(variant => variant.width >= width) || variants.at(-1) || image.variants.at(-1)).src;
}

export function managedImageSrcSet(image, width = 1600, format = "webp") {
  if (!image.variants?.length) return imageSrcSet(image.src, width);
  const variants = image.variants.filter(variant => format === "webp" ? (!variant.format || variant.format === "webp") : variant.format === format);
  if (!variants.length) return undefined;
  const selected = variants.filter(variant => variant.width <= width);
  const larger = variants.find(variant => variant.width > width);
  if (larger) selected.push(larger);
  return selected.map(variant => variant.src + " " + variant.width + "w").join(", ");
}

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
