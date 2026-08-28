import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../../", import.meta.url));
const groups = {
  About: ["About"], Banner: ["Home"], HeroSection: ["Home", "Services"], WeddingSection: ["Home", "Portfolios"],
  WeddingStories: ["Home", "Wedding stories"], LegacySection: ["Home", "About"], ClientFeedback: ["Home", "Reviews"],
  ReviewsSection: ["Home", "Reviews"], Gallery: ["Gallery"], BridalPortraits: ["Bridal portraits"], PreWedding: ["Pre-wedding"],
  VideoCraftsJunior: ["Junior"], OurServices: ["Services"], ContactUs: ["Contact"], InstagramSection: ["Shared", "Instagram"],
  Navbar: ["Shared", "Branding"], Footer: ["Shared", "Branding"], seo: ["SEO", "Branding"],
  TalesOfRomance: ["Wedding stories"], WeddingStory2: ["Wedding stories"], WeddingStory3: ["Wedding stories"],
};
const names = {
  "banner.jpg": "Home hero / default social preview", "logo.png": "Studio logo · navigation and footer",
  "logo__1_-removebg-preview.png": "Home hero logo", "about-banner.jpg": "About hero", "bg.jpg": "Services hero",
  "gallery-banner-1.jpg": "Gallery hero", "contact.jpg": "Contact photograph", "3-1.jpg": "Pre-wedding hero",
  "vc-junior.jpg": "Junior hero", "bridal-portraits-4.jpg": "Bridal portraits hero", "wp-3.jpg": "Tales of Romance cover",
  "wp-1.jpg": "From I Do to Forever cover", "wp.jpg": "Unforgettable Wedding Day cover", "award.jpg": "Award certificate",
  "fatherson": "Father and son portrait", "Untitled-design-8.jpg": "Home background · enjoy your day",
  "455841250_18292334629201135_8028869471403628683_n.jpg": "About background photograph",
};
const dimensions = JSON.parse(await readFile(path.join(root, "client/src/config/imageDimensions.json"), "utf8"));
const catalog = new Map();
const counts = {};
const files = (await readdir(path.join(root, "client/src"), { recursive: true })).filter(file => /\.(jsx|js)$/.test(file) && !file.includes(".test."));
for (const file of files.sort()) {
  const source = await readFile(path.join(root, "client/src", file), "utf8");
  const component = path.basename(file).replace(/\.(jsx|js)$/, "");
  for (const match of source.matchAll(/https:\/\/ik\.imagekit\.io\/[^\s"'`<>]+/g)) {
    const src = match[0];
    const key = src.split("?")[0];
    const basename = decodeURIComponent(new URL(key).pathname.split("/").pop());
    let item = catalog.get(key);
    if (!item) {
      counts[component] = (counts[component] || 0) + 1;
      const [width, height] = dimensions[key] || [];
      if (!width || !height) throw new Error("Missing measured dimensions: " + key);
      item = { id: createHash("sha256").update(key).digest("hex").slice(0, 16), key, src, width, height,
        label: names[basename] || (/^\d{7,}/.test(basename) ? component.replace(/([a-z])([A-Z])/g, "$1 $2") + " photograph " + counts[component] : basename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")),
        groups: [], usedIn: [] };
      catalog.set(key, item);
    }
    const usedGroups = component === "seo" && basename !== "logo.png" ? ["SEO"] : groups[component] || [component];
    item.groups = [...new Set([...item.groups, ...usedGroups])];
    item.usedIn = [...new Set([...item.usedIn, component])];
  }
}
catalog.set("/brand-icon.png", { id: "site-icon", key: "/brand-icon.png", src: "/brand-icon.png", width: 192, height: 192, label: "Browser icon / app icon", groups: ["Shared", "Branding"], usedIn: ["Browser tab", "App manifest"] });
await mkdir(path.join(root, "shared"), { recursive: true });
await writeFile(path.join(root, "shared/media-catalog.json"), JSON.stringify([...catalog.values()], null, 2) + "\n");
await writeFile(path.join(root, "shared/media-defaults.json"), JSON.stringify(Object.fromEntries([...catalog.values()].map(({ key, id, width, height }) => [key, { id, width, height }])), null, 2) + "\n");
console.log("Registered " + catalog.size + " editable images, including the browser icon.");
