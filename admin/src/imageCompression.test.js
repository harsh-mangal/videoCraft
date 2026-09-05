import { afterEach, expect, test, vi } from "vitest";
import { compressImage, fittedDimensions, formatBytes, webpName } from "./imageCompression";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("compression helpers create WebP names and proportional dimensions", () => {
  expect(webpName("engagement.photo.PNG")).toBe("engagement.photo.webp");
  expect(webpName("untitled")).toBe("untitled.webp");
  expect(fittedDimensions(4000, 2000)).toEqual({ width: 2400, height: 1200 });
  expect(fittedDimensions(800, 600)).toEqual({ width: 800, height: 600 });
  expect(formatBytes(1536)).toBe("1.5 KB");
  expect(formatBytes(2 * 1024 * 1024)).toBe("2.0 MB");
});

test("source images larger than 50 MB are rejected before decoding", async () => {
  await expect(compressImage({ type: "image/jpeg", size: 50 * 1024 * 1024 + 1, name: "too-large.jpg" })).rejects.toThrow("up to 50 MB");
});

test("compressImage resizes, encodes, renames and closes the decoded image", async () => {
  const bitmap = { width: 4000, height: 2000, close: vi.fn() };
  const drawImage = vi.fn();
  const canvas = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => ({ drawImage, imageSmoothingEnabled: false, imageSmoothingQuality: "low" })),
    toBlob: vi.fn(callback => callback(new Blob([new Uint8Array(512)], { type: "image/webp" }))),
  };
  vi.stubGlobal("createImageBitmap", vi.fn(async () => bitmap));
  vi.spyOn(document, "createElement").mockReturnValue(canvas);
  const source = new File([new Uint8Array(2048)], "wedding.cover.png", { type: "image/png" });
  const result = await compressImage(source);
  expect(result.file.name).toBe("wedding.cover.webp");
  expect(result.file.type).toBe("image/webp");
  expect(result.compressedBytes).toBe(512);
  expect({ width: result.width, height: result.height }).toEqual({ width: 2400, height: 1200 });
  expect(drawImage).toHaveBeenCalledWith(bitmap, 0, 0, 2400, 1200);
  expect(canvas.toBlob).toHaveBeenCalledWith(expect.any(Function), "image/webp", 0.86);
  expect(bitmap.close).toHaveBeenCalledOnce();
});
