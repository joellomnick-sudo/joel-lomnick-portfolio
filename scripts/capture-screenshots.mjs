import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3010";
const outputRoot = process.env.OUTPUT_DIR || "artifacts/screenshots/checkpoint-00/local";
const audit = process.env.AUDIT_QUERY ? `?audit=${encodeURIComponent(process.env.AUDIT_QUERY)}` : "";
const routeCatalog = [
  ["home", "/"], ["about", "/about"], ["engineering", "/engineering"], ["classroom-lab", "/engineering/classroom-lab"],
  ["lomnickpro", "/lomnickpro"], ["community-leadership", "/community-leadership"], ["lionheart", "/lionheart"],
  ["lionheart-volume-1-reader", "/lionheart/volume-1-preview"], ["lionheart-volume-2-reader", "/lionheart/volume-2-preview"], ["contact", "/contact"],
];
const requestedRoutes = new Set((process.env.ROUTES || "").split(",").map((route) => route.trim()).filter(Boolean));
const routes = requestedRoutes.size ? routeCatalog.filter(([, route]) => requestedRoutes.has(route)) : routeCatalog;

async function ready(page) {
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((resolve) => setTimeout(resolve, 120)); } });
  await page.waitForLoadState("networkidle");
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    })));
  });
  await page.evaluate(() => scrollTo(0, 0));
}

async function captureSet(browser, name, viewport) {
  const dir = join(outputRoot, name);
  await mkdir(dir, { recursive: true });
  const context = await browser.newContext({ viewport, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const [filename, route] of routes) {
    const response = await page.goto(`${baseURL}${route}${audit}`, { waitUntil: "domcontentloaded" });
    if (!response || response.status() !== 200) throw new Error(`${route} returned ${response?.status() || "no response"}`);
    await ready(page);
    await page.screenshot({ path: join(dir, `${filename}-${name}.png`), fullPage: true });
  }
  await context.close();
}

async function captureStates(browser) {
  const dir = join(outputRoot, "states");
  await mkdir(dir, { recursive: true });
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseURL}/${audit}`); await ready(mobilePage); await mobilePage.getByRole("button", { name: "Open navigation menu" }).click();
  await mobilePage.screenshot({ path: join(dir, "mobile-menu-open.png"), fullPage: true });
  await mobile.close();

  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${baseURL}/engineering/classroom-lab${audit}`); await ready(page); await page.screenshot({ path: join(dir, "classroom-lab-before.png"), fullPage: true });
  await page.getByRole("button", { name: "Enter Free Build" }).click(); await page.getByRole("button", { name: /Standard duplex receptacle/ }).click(); await page.getByTestId("classroom-canvas").click({ position: { x: 240, y: 220 } }); await page.screenshot({ path: join(dir, "classroom-lab-sample.png"), fullPage: true });
  await page.goto(`${baseURL}/lomnickpro${audit}`); await ready(page); await page.getByRole("button", { name: /Enlarge Real Estate/ }).click(); await page.screenshot({ path: join(dir, "case-study-lightbox.png"), fullPage: true });
  await page.goto(`${baseURL}/lionheart/volume-1-preview${audit}`); await ready(page); await page.getByRole("status").filter({ hasText: /Page 1 of 10 ready/i }).waitFor(); await page.screenshot({ path: join(dir, "lionheart-reader.png"), fullPage: true });
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Message sent." }) }));
  await page.goto(`${baseURL}/contact${audit}`); await ready(page); await page.locator('[name="name"]').fill("Visual Audit"); await page.locator('[name="email"]').fill("audit@example.com"); await page.locator('[name="inquiryType"]').selectOption("Other"); await page.locator('[name="message"]').fill("This is a safe mocked screenshot submission for the visual audit."); await page.getByRole("button", { name: "Send message" }).click(); await page.getByRole("status").filter({ hasText: /Message sent|Thank you/i }).waitFor(); await page.screenshot({ path: join(dir, "contact-success.png"), fullPage: true });
  await context.close();
}

const browser = await chromium.launch();
await captureSet(browser, "desktop", { width: 1440, height: 1200 });
await captureSet(browser, "mobile", { width: 390, height: 844 });
if (process.env.CAPTURE_STATES !== "0") await captureStates(browser);
await browser.close();
console.log(`Screenshots saved to ${outputRoot}`);
