import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.videocraftsindia.com",
  output: "static",
  trailingSlash: "never",
  outDir: "./build",
  compressHTML: true,
  server: { host: "127.0.0.1", port: 5173 },
  integrations: [react(), sitemap({ filter: page => !page.endsWith("/404/") && !page.endsWith("/404") })],
  vite: {
    plugins: [tailwindcss()],
    build: { target: "es2020", sourcemap: false },
  },
});
