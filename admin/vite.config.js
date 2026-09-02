import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative assets let the same build run at admin.videocraftsindia.com/ and at /admin/ during local backend checks.
  base: "./",
  plugins: [react()],
  server: { port: 5174, strictPort: true, proxy: { "/api": "http://127.0.0.1:4691", "/media": "http://127.0.0.1:4691", "/brand-icon.png": "http://127.0.0.1:4691" } },
  build: { outDir: "dist", sourcemap: false },
  test: { environment: "jsdom", setupFiles: "./src/setupTests.js", restoreMocks: true },
});
