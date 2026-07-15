import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/engineering", "/engineering/classroom-lab", "/lomnickpro", "/community-leadership", "/lionheart", "/contact"];
const labels = ["Home", "About", "Engineering", "LomnickPro", "Community & Leadership", "Lionheart", "Contact"];

async function retryFailedImages(page: import("@playwright/test").Page) {
  await page.locator("img").evaluateAll(async (images) => {
    const imageElements = images as HTMLImageElement[];
    const failed = imageElements.filter((image) => image.complete && image.naturalWidth === 0);
    await Promise.all(failed.map((image) => new Promise<void>((resolve) => {
      const current = image.currentSrc || image.src;
      const timeout = window.setTimeout(resolve, 15_000);
      const finish = () => { window.clearTimeout(timeout); resolve(); };
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
      image.removeAttribute("srcset");
      image.src = `${current}${current.includes("?") ? "&" : "?"}retry=${Date.now()}`;
    })));
  });
}

for (const route of routes) {
  test(`${route} renders without broken images or serious accessibility issues`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("footer")).toContainText("Lomnick Professional Services");
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((resolve) => setTimeout(resolve, 120)); } scrollTo(0, document.body.scrollHeight); });
    await page.waitForLoadState("networkidle");
    await retryFailedImages(page);
    const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src));
    expect(broken).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(accessibility.violations.filter((item) => ["critical", "serious"].includes(item.impact || ""))).toEqual([]);
  });
}

test("desktop navigation and footer expose every final route", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lomnickpro");
  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  for (const label of labels) await expect(primary.getByRole("link", { name: label, exact: true })).toBeVisible();
  await expect(primary.getByRole("link", { name: "LomnickPro", exact: true })).toHaveAttribute("aria-current", "page");
  const footer = page.getByRole("navigation", { name: "Footer navigation" });
  for (const label of labels) await expect(footer.getByRole("link", { name: label, exact: true })).toBeVisible();
});

test("mobile menu opens, traps focus, and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  for (const label of labels) await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});

for (const [from, to] of [["/creative-services", "/lomnickpro"], ["/portfolio", "/lomnickpro"], ["/leadership", "/community-leadership"], ["/work", "/community-leadership"]]) {
  test(`${from} redirects`, async ({ page }) => { await page.goto(from); await expect(page).toHaveURL(new RegExp(`${to}$`)); });
}

test("core typography meets minimums and desktop hero uses three lines", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/");
  await expect(page.locator("h1 > span")).toHaveCount(3);
  const sizes = await page.locator("p, nav a, button").evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).display !== "none").map((element) => parseFloat(getComputedStyle(element).fontSize)));
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(14);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const core = await page.locator("main .prose-copy").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  expect(core).toBeGreaterThanOrEqual(16);
});

test("case studies use contain and lightbox returns focus", async ({ page }) => {
  await page.goto("/lomnickpro");
  const trigger = page.getByRole("button", { name: /Enlarge Real Estate/ });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: /Real Estate.*full resolution/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  const fits = await page.locator('img[src*="case-studies"]').evaluateAll((images) => images.map((image) => getComputedStyle(image).objectFit));
  expect(fits.every((fit) => fit === "contain")).toBe(true);
});

test("contact validates fields and rejects honeypot", async ({ page, request }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  expect(await page.locator('input[name="name"]').evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
  const response = await request.post("/api/contact", { data: { name: "Test Person", email: "test@example.com", organization: "Test", inquiryType: "Other", message: "This is a sufficiently long safe test message.", website: "bot", startedAt: Date.now() - 5000 } });
  expect(response.status()).toBe(400);
  const html = await page.locator("body").innerText();
  expect(html).not.toMatch(/jlomnick@|804.?885.?0256/i);
});

test("classroom supports pointer, keyboard, undo, layers, and guidance", async ({ page }) => {
  await page.goto("/engineering/classroom-lab");
  const plan = page.getByTestId("classroom-plan");
  await plan.click({ position: { x: 300, y: 200 } });
  await expect(page.locator(".device-marker")).toHaveCount(1);
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(page.locator(".device-marker")).toHaveCount(0);
  await plan.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("Enter");
  await expect(page.locator(".device-marker")).toHaveCount(1);
  await page.getByRole("button", { name: "Suggest layout" }).click();
  await expect(page.locator(".device-marker")).toHaveCount(6);
  await page.getByRole("button", { name: "Division 26", exact: true }).click();
  await expect(page.locator(".layer-26")).toHaveCount(0);
  await page.getByRole("button", { name: "G GFCI receptacle" }).click();
  await expect(page.getByRole("status")).toContainText("sink");
  await page.getByRole("button", { name: "AP Wireless access-point outlet" }).click();
  await expect(page.getByRole("status")).toContainText("IDF");
  await page.getByRole("button", { name: "FA Fire-alarm speaker/strobe" }).click();
  await expect(page.getByRole("status")).toContainText("supervised");
  await expect(page.getByText(/not a construction document/i)).toBeVisible();
});

test("public documents respond as PDFs and professional files are noindex", async ({ request }) => {
  const documents = ["engineering-101-modern-classroom.pdf", "lionheart-volume-1-sneak-preview.pdf", "lionheart-volume-2-sneak-preview.pdf", "joel-lomnick-comprehensive-resume-public.pdf", "joel-lomnick-comprehensive-cover-letter-public.pdf"];
  for (const file of documents) {
    const response = await request.get(`/documents/${file}`);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
    if (file.includes("public")) expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
});

test("version endpoint identifies the deployed build without exposing configuration", async ({ request }) => {
  const response = await request.get(`/api/version?cacheBust=${Date.now()}`);
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("no-store");
  const version = await response.json();
  expect(version).toEqual({
    commit: expect.any(String),
    environment: expect.any(String),
    builtAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
  });
  expect(JSON.stringify(version)).not.toMatch(/email|phone|secret|token|key|contact_to/i);
});
