import { FlatCompat } from "@eslint/eslintrc";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const virtualConfig = readdirSync(join(import.meta.dirname, "node_modules/.pnpm")).find((name) => name.startsWith("eslint-config-next@"));
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: virtualConfig ? join(import.meta.dirname, "node_modules/.pnpm", virtualConfig, "node_modules") : import.meta.dirname,
});

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "playwright-report/**", "test-results/**", "review-screenshots/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
