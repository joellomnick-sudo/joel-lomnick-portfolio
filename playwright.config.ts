import { defineConfig, devices } from "@playwright/test";

const node = process.execPath;
const externalServer = process.env.PLAYWRIGHT_EXTERNAL_SERVER === "1";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3010", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: externalServer ? undefined : { command: `"${node}" node_modules/next/dist/bin/next start -p 3010`, url: "http://127.0.0.1:3010", timeout: 180_000, reuseExistingServer: true },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
