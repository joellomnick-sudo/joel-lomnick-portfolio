import { defineConfig, devices } from "@playwright/test";

const node = "C:\\Users\\joell\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3010", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: `"${node}" node_modules/next/dist/bin/next dev -p 3010`, url: "http://127.0.0.1:3010", timeout: 180_000, reuseExistingServer: true },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
