import { defineConfig } from "vite";

export default defineConfig({
  test: { include: ["src/**/*.test.{js,jsx}"], environment: "jsdom", setupFiles: "./src/setupTests.js", globals: true, restoreMocks: true },
});
