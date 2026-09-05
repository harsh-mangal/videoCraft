const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const sourceLimit = 50 * 1024 * 1024;
const outputLimit = 10 * 1024 * 1024;
const maxDimension = 2400;

export function webpName(name) {
  const base = name.replace(/\.[^.]+$/, "").trim() || "website-image";
  return base + ".webp";
}

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function fittedDimensions(width, height, limit = maxDimension) {
  const scale = Math.min(1, limit / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

async function loadImage(file) {
  if (typeof createImageBitmap === "function") {
    try { return await createImageBitmap(file, { imageOrientation: "from-image" }); }
    catch { return createImageBitmap(file); }
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return image;
  } finally { URL.revokeObjectURL(url); }
}

const encodeWebp = (canvas, quality) => new Promise((resolve, reject) => {
  canvas.toBlob(blob => blob?.type === "image/webp" ? resolve(blob) : reject(new Error("This browser cannot create WebP images. Update the browser and try again.")), "image/webp", quality);
});

export async function compressImage(source) {
  if (!acceptedTypes.has(source?.type)) throw new Error("Choose a JPEG, PNG or WebP image.");
  if (source.size > sourceLimit) throw new Error("Choose an image up to 50 MB. It will be compressed before upload.");
  const image = await loadImage(source);
  try {
    const dimensions = fittedDimensions(image.width, image.height);
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("Image compression is unavailable in this browser.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    let quality = 0.86;
    let blob = await encodeWebp(canvas, quality);
    while (blob.size > outputLimit && quality > 0.6) {
      quality = Math.max(0.6, quality - 0.08);
      blob = await encodeWebp(canvas, quality);
    }
    if (blob.size > outputLimit) throw new Error("This image is still too large after compression. Choose a smaller image.");
    return {
      file: new File([blob], webpName(source.name), { type: "image/webp", lastModified: Date.now() }),
      originalBytes: source.size,
      compressedBytes: blob.size,
      width: dimensions.width,
      height: dimensions.height,
    };
  } finally { image.close?.(); }
}
