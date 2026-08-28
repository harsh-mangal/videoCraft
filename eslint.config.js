import js from "@eslint/js";
import globals from "globals";
import hooks from "eslint-plugin-react-hooks";
import a11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["build/**", ".cache/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": hooks, "jsx-a11y": a11y },
    rules: {
      ...a11y.flatConfigs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z]", argsIgnorePattern: "^[A-Z_]" }],
    },
  },
  { files: ["src/**/*.test.{js,jsx}", "src/setupTests.js"], languageOptions: { globals: { ...globals.vitest } } },
];
