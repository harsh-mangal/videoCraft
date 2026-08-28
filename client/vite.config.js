import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://127.0.0.1:3001", "/media": "http://127.0.0.1:3001" } },
  ssr: { noExternal: true },
  build: { outDir: "build", sourcemap: false, target: "es2020" },
  test: { include: ["src/**/*.test.{js,jsx}"], environment: "jsdom", setupFiles: "./src/setupTests.js", globals: true, restoreMocks: true },
});
