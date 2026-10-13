import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadConfig, root, serverRoot } from "../src/config.mjs";
import { createMediaStorage } from "../src/media-storage.mjs";
import { createImageVariants } from "../src/uploads.mjs";
import { Store } from "../src/store.mjs";

const config = loadConfig();
if (!config.r2) throw new Error("Configure the R2_* variables and MEDIA_PUBLIC_ORIGIN before migrating media.");
const storage = createMediaStorage(config);
const store = await Store.connect(config);
const catalog = JSON.parse(await readFile(path.join(serverRoot, "shared/media-catalog.json"), "utf8"));

try {
  let migrated = 0, skipped = 0;
  for (const item of catalog) {
    const current = await store.image(item.id);
    if (current.value?.src?.startsWith(config.r2.publicOrigin + "/")) { skipped++; continue; }
    // Download the canonical source, not a display URL that may contain an
    // ImageKit resize transform. This preserves the best available original
    // before generating the R2 AVIF/WebP set.
    const source = item.key.startsWith("http") ? item.key : item.src;
    const buffer = source.startsWith("http")
      ? Buffer.from(await (async () => { const response = await fetch(source); if (!response.ok) throw new Error(`Unable to download ${source}: HTTP ${response.status}`); return response.arrayBuffer(); })())
      : await readFile(path.join(root, "client/public", source.replace(/^\//, "")));
    const generated = await createImageVariants(buffer, config.dataDir, config.maxStorageBytes, storage, item.label);
    try {
      await store.saveImage(item.id, { ...generated.image, alt: current.value?.alt || null }, current.version, "r2-media-migration");
      migrated++;
      console.log(`[${migrated + skipped}/${catalog.length}] ${item.label}`);
    } catch (error) { await generated.cleanup(); throw error; }
  }
  console.log(`R2 migration complete: ${migrated} migrated, ${skipped} already present. Rebuild the Astro client with MEDIA_MANIFEST_URL set.`);
} finally {
  await store.close();
}
