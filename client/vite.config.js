import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  ssr: { noExternal: true },
  build: { outDir: "build", sourcemap: false, target: "es2020" },
  test: { include: ["src/**/*.test.{js,jsx}"], environment: "jsdom", setupFiles: "./src/setupTests.js", globals: true, restoreMocks: true },
});
