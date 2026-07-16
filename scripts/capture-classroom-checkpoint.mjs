import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3010";
const outputRoot = process.env.OUTPUT_DIR || "artifacts/screenshots/classroom-checkpoint/local";
const startServer = process.env.START_SERVER === "1";
let server;

async function waitForServer() {
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseURL}/api/version`, { cache: "no-store" });
      if (response.ok) return;
    } catch {
      // The local server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${baseURL}.`);
}

async function place(page, name, position) {
  await page.getByRole("button", { name: new RegExp(name, "i") }).first().click();
  await page.getByTestId("classroom-canvas").click({ position });
}

async function prepare(page) {
  const response = await page.goto(`${baseURL}/engineering/classroom-lab`, { waitUntil: "domcontentloaded" });
  if (!response?.ok()) throw new Error(`Classroom route returned ${response?.status() || "no response"}.`);
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "Enter Free Build" }).click();
}

async function settle(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    scrollTo(0, 0);
  });
}

async function captureDesktop(browser) {
  const dir = join(outputRoot, "desktop");
  await mkdir(dir, { recursive: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await context.newPage();
  await prepare(page);
  await place(page, "2 x 4 LED ceiling fixture", { x: 180, y: 140 });
  await place(page, "Occupancy or vacancy sensor", { x: 390, y: 180 });
  await place(page, "Standard duplex receptacle", { x: 150, y: 250 });
  await place(page, "Data outlet", { x: 390, y: 250 });
  await place(page, "Fire-alarm speaker/strobe", { x: 550, y: 180 });
  await page.getByRole("button", { name: "Composite", exact: true }).click();
  await settle(page);
  await page.screenshot({ path: join(dir, "classroom-builder-composite-desktop.png"), fullPage: true });
  await page.getByRole("button", { name: "System paths", exact: true }).click();
  await page.screenshot({ path: join(dir, "classroom-builder-system-paths-desktop.png"), fullPage: true });
  await context.close();
}

async function captureMobile(browser) {
  const dir = join(outputRoot, "mobile");
  await mkdir(dir, { recursive: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await context.newPage();
  await prepare(page);
  await place(page, "Standard duplex receptacle", { x: 115, y: 145 });
  await place(page, "Data outlet", { x: 235, y: 185 });
  await place(page, "Conditional smoke detector", { x: 185, y: 125 });
  await page.getByRole("button", { name: "Composite", exact: true }).click();
  await settle(page);
  await page.screenshot({ path: join(dir, "classroom-builder-composite-mobile.png"), fullPage: true });
  await context.close();
}

try {
  if (startServer) {
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3010"], { env: process.env, stdio: "ignore", windowsHide: true });
  }
  await waitForServer();
  const browser = await chromium.launch();
  try {
    await captureDesktop(browser);
    await captureMobile(browser);
  } finally {
    await browser.close();
  }
  console.log(`Classroom screenshots saved to ${outputRoot}`);
} finally {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await Promise.race([once(server, "exit"), new Promise((resolve) => setTimeout(resolve, 5_000))]);
    if (server.exitCode === null) server.kill("SIGKILL");
  }
}
