import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.tsx"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  globalIgnores([
    ".astro/**",
    ".wrangler/**",
    "dist/**",
    "output/**",
    "tmp/**",
    "node_modules/**",
    "src/worker-configuration.d.ts",
  ]),
]);
