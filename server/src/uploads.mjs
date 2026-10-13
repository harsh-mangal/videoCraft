import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink, readdir, stat } from "node:fs/promises";
import path from "node:path";

export const uploadLimit = 12 * 1024 * 1024;
export async function createImageVariants(buffer, directory, maxStorageBytes, remoteStorage = null, namePrefix = "image") {
  const jpeg = buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
  const png = buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const webp = buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  if (!jpeg && !png && !webp) throw Object.assign(new Error("Only valid JPEG, PNG and WebP files are accepted."), { status: 422 });
  if (!remoteStorage) await mkdir(directory, { recursive: true, mode: 0o700 });
  let metadata;
  try { metadata = await sharp(buffer, { limitInputPixels: 40_000_000, failOn: "warning" }).metadata(); }
  catch { throw Object.assign(new Error("That file is not a valid image, or exceeds 40 megapixels."), { status: 422 }); }
  if (!["jpeg", "png", "webp"].includes(metadata.format) || (metadata.pages || 1) > 1) throw Object.assign(new Error("Upload a still JPEG, PNG or WebP image. SVG and animated files are not accepted."), { status: 422 });
  if (!remoteStorage) {
    const used = (await Promise.all((await readdir(directory)).map(async file => (await stat(path.join(directory, file))).size))).reduce((sum, size) => sum + size, 0);
    if (used + buffer.length * 2 > maxStorageBytes) throw Object.assign(new Error("Image storage is full. Ask the server owner to increase storage or archive unused versions."), { status: 507 });
  }
  const token = randomUUID();
  const safePrefix = namePrefix.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "image";
  const files = [], variants = [];
  try {
    // Decode once, apply EXIF orientation, resize and strip private metadata before storage.
    const normalized = await sharp(buffer, { limitInputPixels: 40_000_000, failOn: "warning" }).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 86 }).toBuffer({ resolveWithObject: true });
    const widths = [...new Set([320, 640, 960, 1200, 1600, normalized.info.width].filter(width => width <= normalized.info.width))].sort((a, b) => a - b);
    for (const width of widths) {
      for (const format of ["avif", "webp"]) {
        const name = safePrefix + "-" + token + "-" + width + "." + format;
        const pipeline = sharp(normalized.data).resize({ width, withoutEnlargement: true });
        const data = format === "avif" ? await pipeline.avif({ quality: 58, effort: 4 }).toBuffer() : width === normalized.info.width ? normalized.data : await pipeline.webp({ quality: 82 }).toBuffer();
        if (remoteStorage) {
          variants.push({ width, format, src: await remoteStorage.upload(name, data, "image/" + format) });
          files.push(name);
        } else {
          const destination = path.join(directory, name);
          await writeFile(destination, data, { flag: "wx", mode: 0o600 });
          files.push(destination);
          variants.push({ width, format, src: "/media/" + name });
        }
      }
    }
    const cleanup = remoteStorage ? () => Promise.all(files.map(file => remoteStorage.remove(file).catch(() => {}))) : () => Promise.all(files.map(file => unlink(file).catch(() => {})));
    return { image: { src: variants.filter(variant => variant.format === "webp").at(-1).src, width: normalized.info.width, height: normalized.info.height, variants }, cleanup };
  } catch (error) {
    if (remoteStorage) await Promise.all(files.map(file => remoteStorage.remove(file).catch(() => {})));
    else await Promise.all(files.map(file => unlink(file).catch(() => {})));
    if (error.status) throw error;
    throw Object.assign(new Error("The image could not be processed. Try a smaller JPEG, PNG or WebP."), { status: 422 });
  }
}
