import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { publicAssets, publicAssetPath } from "@/data/publicAssets";

const routes = ["/", "/about", "/engineering", "/engineering/classroom-lab", "/lomnickpro", "/community-leadership", "/lionheart", "/lionheart/volume-1-preview", "/lionheart/volume-2-preview", "/contact"];
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
    await expect(page.locator("body")).not.toContainText("Joel Maurice Lomnick");
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

test("classroom quest foundation and SVG device library expose a guided learning path", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto("/engineering/classroom-lab");
  await expect(page.getByRole("heading", { name: "Classroom Design Quest" })).toBeVisible();
  await expect(page.getByText("Learn the map. Build the systems. Explain the design.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Start Guided Journey" })).toBeVisible();
  await page.getByRole("button", { name: "Start Guided Journey" }).click();
  await expect(page.getByText("Guided Journey", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Five stages. One method." })).toBeVisible();
  await expect(page.locator(".quest-stage-button")).toHaveCount(5);
  await expect(page.getByTestId("device-library-item")).toHaveCount(31);
  await expect(page.locator(".device-library-button svg[role='img']")).toHaveCount(31);
  await expect(page.locator(".device-tooltip")).toHaveCount(31);
  await expect(page.locator(".device-library-button[data-locked='true']")).toHaveCount(31);
  await page.getByRole("button", { name: "Enter Free Build" }).click();
  await expect(page.locator(".device-library-button[data-locked='true']")).toHaveCount(0);
  const filters = page.getByLabel("Filter device library");
  await filters.getByRole("button", { name: /Division 28/ }).click();
  await expect(page.getByTestId("device-library-item")).toHaveCount(5);
  await page.getByRole("button", { name: /Conditional smoke detector/ }).click();
  await expect(page.locator(".device-conditional")).toContainText("Use only when required by the project, system design, and governing criteria.");
  await filters.getByRole("button", { name: /Division 27/ }).click();
  await expect(page.getByTestId("device-library-item")).toHaveCount(11);
  await page.getByRole("button", { name: /Data outlet/ }).click();
  await expect(page.getByLabel("Mentor, quest, and device information")).toContainText("not to a classroom branch panel");
  await expect(page.getByRole("link", { name: "Open the Engineering 101 Guide" })).toHaveAttribute("href", publicAssetPath("engineering-guide"));
  await expect(page.getByText(/Educational concept only/i)).toBeVisible();
});

test("desktop header stays balanced without wrapping or collisions", async ({ page }) => {
  for (const width of [1280, 1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/lomnickpro");
    const metrics = await page.locator("header").evaluate((header) => {
      const brand = header.querySelector<HTMLElement>(".brand-lockup")!;
      const navigation = header.querySelector<HTMLElement>('nav[aria-label="Primary navigation"]')!;
      const consultation = header.querySelector<HTMLElement>(".header-consultation")!;
      const links = [...navigation.querySelectorAll<HTMLElement>("a")];
      const boxes = [brand, navigation, consultation].map((element) => element.getBoundingClientRect());
      return {
        headerHeight: header.getBoundingClientRect().height,
        brandLines: brand.getClientRects().length,
        navigationVisible: getComputedStyle(navigation).display !== "none",
        wrappedLinks: links.some((link) => link.getClientRects().length !== 1 || link.scrollWidth > link.clientWidth + 1),
        collisions: boxes.some((box, index) => boxes.slice(index + 1).some((other) => box.right > other.left && other.right > box.left && box.bottom > other.top && other.bottom > box.top)),
        consultationHeight: consultation.getBoundingClientRect().height,
      };
    });
    expect(metrics.navigationVisible).toBe(true);
    expect(metrics.headerHeight).toBeGreaterThanOrEqual(72);
    expect(metrics.headerHeight).toBeLessThanOrEqual(76);
    expect(metrics.brandLines).toBe(1);
    expect(metrics.wrappedLinks).toBe(false);
    expect(metrics.collisions).toBe(false);
    expect(metrics.consultationHeight).toBeGreaterThanOrEqual(44);
  }
});

test("public identity, font roles, document actions, and compact footer are consistent", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/");
  await expect(page.getByLabel("Joel M. Lomnick home")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Joel Maurice Lomnick");
  const fontRoles = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
  }));
  expect(fontRoles.body).toContain("Open Sans");
  expect(fontRoles.heading).toContain("Montserrat");
  const footerHeight = await page.locator("footer").evaluate((footer) => footer.getBoundingClientRect().height);
  expect(footerHeight).toBeLessThanOrEqual(360);

  await page.goto("/engineering/classroom-lab");
  const uiFont = await page.locator(".quest-panel-kicker").first().evaluate((element) => getComputedStyle(element).fontFamily);
  expect(uiFont).toContain("Roboto");

  await page.goto("/lomnickpro");
  await expect(page.getByRole("link", { name: "View Resume" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "View Cover Letter" })).toHaveCount(1);
  await page.goto("/engineering");
  await expect(page.getByRole("link", { name: "View the Engineering 101 Guide" })).toHaveCount(1);
  await page.goto("/lionheart");
  await expect(page.getByRole("link", { name: "Read Volume 1 Preview" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Read Volume 2 Preview" })).toHaveCount(1);
});

test("professional documents belong near the top of LomnickPro only", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "Professional Documents" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /View (Resume|Cover Letter)/ })).toHaveCount(0);

  await page.goto("/lomnickpro");
  const sections = page.locator("main > section");
  await expect(sections).toHaveCount(4);
  await expect(sections.nth(1).getByRole("heading", { name: "A closer look at my experience." })).toBeVisible();
  await expect(sections.nth(2).getByRole("heading", { name: "Four ways clarity can strengthen public trust." })).toBeVisible();
  for (const name of ["View Resume", "View Cover Letter"]) {
    const action = page.getByRole("link", { name, exact: true });
    await expect(action).toHaveCount(1);
    await expect(action).toHaveAttribute("target", "_blank");
    await expect(action).toHaveAttribute("rel", /noopener/);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const documentCards = sections.nth(1).locator(".border-t > div");
  const boxes = await documentCards.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect()));
  expect(boxes[1].top).toBeGreaterThan(boxes[0].bottom);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
});

test("new-tab links protect the opener and rendered images are not distorted", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const unsafeLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links.filter((link) => {
      const tokens = new Set((link.getAttribute("rel") || "").split(/\s+/));
      return !tokens.has("noopener") || !tokens.has("noreferrer");
    }).length);
    expect(unsafeLinks, route).toBe(0);
    const distorted = await page.locator("img").evaluateAll((images) => (images as HTMLImageElement[]).filter((image) => {
      const style = getComputedStyle(image);
      if (["cover", "contain", "scale-down"].includes(style.objectFit)) return false;
      const rect = image.getBoundingClientRect();
      if (!image.naturalWidth || !image.naturalHeight || !rect.width || !rect.height) return false;
      return Math.abs((rect.width / rect.height) / (image.naturalWidth / image.naturalHeight) - 1) > 0.06;
    }).length);
    expect(distorted, route).toBe(0);
  }
});

test("page proportions and engineering learning path stay intentional", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto("/");
  const homeMetrics = await page.evaluate(() => ({
    titleSize: Number.parseFloat(getComputedStyle(document.querySelector("h1")!).fontSize),
    portraitWidth: document.querySelector("main figure")!.getBoundingClientRect().width,
  }));
  expect(homeMetrics.titleSize).toBeLessThanOrEqual(58);
  expect(homeMetrics.portraitWidth).toBeLessThanOrEqual(448);

  await page.goto("/about");
  const aboutWidths = await page.locator("main figure").evaluateAll((figures) => figures.map((figure) => Math.round(figure.getBoundingClientRect().width)));
  expect(aboutWidths).toHaveLength(4);
  expect(aboutWidths[0]).toBeLessThanOrEqual(352);
  expect(aboutWidths[3]).toBeLessThanOrEqual(352);
  expect(Math.max(...aboutWidths)).toBeLessThanOrEqual(480);

  await page.goto("/community-leadership");
  const communityWidths = await page.locator("main figure").evaluateAll((figures) => figures.map((figure) => Math.round(figure.getBoundingClientRect().width)));
  expect(communityWidths).toHaveLength(7);
  expect(communityWidths[2]).toBeLessThanOrEqual(320);
  expect(communityWidths[5]).toBeLessThanOrEqual(336);
  expect(Math.max(...communityWidths)).toBeLessThanOrEqual(480);

  await page.goto("/engineering");
  const sectionHeadings = await page.locator("main section").evaluateAll((sections) => sections.map((section) => section.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim()).filter(Boolean));
  expect(sectionHeadings).toEqual([
    "Complex systems should become clear enough to build.",
    "Engineering 101: From Beginner to Modern Classroom Designer",
    "Learn the room one system at a time.",
    "Technical work is also communication.",
  ]);
  await expect(page.getByRole("link", { name: "View the Engineering 101 Guide" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Launch Classroom Design Quest" })).toBeVisible();
});

test("public-facing language stays warm and educational", async ({ page }) => {
  const disallowed = /\b(command center|mission control|tactical|weapon|battle|dominate|war room|prove yourself)\b/i;
  for (const route of routes) {
    await page.goto(route);
    expect(await page.locator("main").innerText(), route).not.toMatch(disallowed);
  }
});

test("Lionheart readers render PDFs, navigate accessibly, and expose a text companion", async ({ page }) => {
  for (const [route, title] of [
    ["/lionheart/volume-1-preview", "Lionheart Volume 1 Preview"],
    ["/lionheart/volume-2-preview", "Lionheart Volume 2 Preview"],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: title, level: 1 })).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "Page 1 of 10 ready." })).toBeVisible({ timeout: 20_000 });
    const canvas = page.getByRole("img", { name: new RegExp(`${title.replace(" Preview", "")}, PDF page 1 of 10`) });
    await expect(canvas).toBeVisible();
    const canvasMetrics = await canvas.evaluate((element) => {
      const canvasElement = element as HTMLCanvasElement;
      const context = canvasElement.getContext("2d");
      const pixels = context?.getImageData(0, 0, Math.min(canvasElement.width, 32), Math.min(canvasElement.height, 32)).data || [];
      return { width: canvasElement.width, height: canvasElement.height, hasInk: Array.from(pixels).some((value, index) => index % 4 !== 3 && value < 245) };
    });
    expect(canvasMetrics.width).toBeGreaterThan(300);
    expect(canvasMetrics.height).toBeGreaterThan(300);
    expect(canvasMetrics.hasInk).toBe(true);

    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByText("Page 2 of 10", { exact: true })).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "Page 2 of 10 ready." })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText("Before the", { exact: false }).first()).toBeVisible();
    await page.getByRole("button", { name: "Fit width" }).click();
    await expect(page.getByRole("button", { name: "Fit width" })).toHaveAttribute("aria-pressed", "true");
    const fittedScale = Number.parseInt((await page.locator("output").textContent()) || "0", 10);
    await page.getByRole("button", { name: "Zoom in" }).click();
    await expect.poll(async () => Number.parseInt((await page.locator("output").textContent()) || "0", 10)).toBeGreaterThan(fittedScale);
    await expect(page.getByText("Open full accessible text companion")).toBeVisible();
    await expect(page.getByRole("link", { name: "Open original PDF" }).last()).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("Lionheart narration controls use browser speech without autoplay", async ({ page }) => {
  await page.addInitScript(() => {
    class MockUtterance {
      text: string; rate = 1; voice: SpeechSynthesisVoice | null = null; onend: (() => void) | null = null; onerror: (() => void) | null = null;
      constructor(text: string) { this.text = text; }
    }
    const mockVoice = { default: true, lang: "en-US", localService: true, name: "Test Voice", voiceURI: "test-voice" } as SpeechSynthesisVoice;
    const speech = {
      speaking: false, paused: false, pending: false,
      speak(utterance: MockUtterance) { (window as Window & { __spokenText?: string }).__spokenText = utterance.text; this.speaking = true; },
      cancel() { this.speaking = false; this.paused = false; },
      pause() { this.paused = true; }, resume() { this.paused = false; },
      getVoices() { return [mockVoice]; }, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
    };
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: MockUtterance });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: speech });
  });
  await page.goto("/lionheart/volume-1-preview");
  expect(await page.evaluate(() => (window as Window & { __spokenText?: string }).__spokenText)).toBeUndefined();
  await page.getByRole("button", { name: "Play", exact: true }).click();
  expect(await page.evaluate(() => (window as Window & { __spokenText?: string }).__spokenText)).toContain("Before the Roar");
  await expect(page.getByRole("button", { name: "Pause" })).toBeEnabled();
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Resume" })).toBeEnabled();
  await page.getByRole("button", { name: "Resume" }).click();
  await page.getByRole("button", { name: "Stop" }).click();
  await expect(page.getByRole("button", { name: "Stop" })).toBeDisabled();
  await expect(page.getByLabel("Reading speed")).toHaveValue("1");
  await expect(page.getByLabel("Voice")).toContainText("Test Voice");
});

test("Lionheart mobile reader fits the viewport and supports keyboard paging", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lionheart/volume-2-preview");
  await expect(page.getByRole("status").filter({ hasText: "Page 1 of 10 ready." })).toBeVisible({ timeout: 20_000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  const viewer = page.getByLabel("PDF canvas. Use Left and Right Arrow keys to change pages.");
  await viewer.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Page 2 of 10", { exact: true })).toBeVisible();
  await expect(page.getByText("Before the Road Opens Again").first()).toBeVisible();
  await page.getByLabel("Reading speed").focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByText("Page 2 of 10", { exact: true })).toBeVisible();
});

test("twenty-quest progression unlocks once, awards milestones, persists, and resets", async ({ page }) => {
  await page.goto("/engineering/classroom-lab");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Start Guided Journey" }).click();
  const stageOne = page.getByLabel("Stage 1 quests");
  await expect(stageOne.getByRole("button", { name: /Joel's Engineering-Learning Testimony/ })).not.toHaveAttribute("aria-disabled", "true");
  await expect(stageOne.getByRole("button", { name: /What an Electrical Designer Actually Does/ })).toHaveAttribute("aria-disabled", "true");

  for (const title of [
    "What an Electrical Designer Actually Does",
    "How to Learn Technical Material Without Drowning",
    "How to Read a Floor Plan",
  ]) {
    await page.getByRole("button", { name: "Complete learning checkpoint" }).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
  await page.getByRole("button", { name: "Complete learning checkpoint" }).click();
  await expect(page.getByText("Plan Reader", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Earned educational badges")).toContainText("Map Reader");
  await expect(page.getByRole("progressbar", { name: "Journey progress" })).toHaveAttribute("aria-valuenow", "4");

  await page.reload();
  await expect(page.getByRole("button", { name: "Continue Journey" })).toBeVisible();
  await expect(page.getByRole("progressbar", { name: "Journey progress" })).toHaveAttribute("aria-valuenow", "4");
  await expect(page.getByLabel("Earned educational badges").getByText("Map Reader", { exact: true })).toHaveCount(1);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset progress" }).click();
  await expect(page.getByRole("progressbar", { name: "Journey progress" })).toHaveAttribute("aria-valuenow", "0");
  await expect(page.getByRole("button", { name: "Start Guided Journey" })).toBeVisible();
});

test("all twenty quest titles and guide pages match the Engineering 101 map", async ({ page }) => {
  const expected = [
    "Joel's Engineering-Learning Testimony", "What an Electrical Designer Actually Does", "How to Learn Technical Material Without Drowning", "How to Read a Floor Plan",
    "Symbols, Legends, Notes, Schedules, and Details", "Electricity Fundamentals", "Sources, Loads, Circuits, Panels, and Pathways", "Codes, Specifications, and Owner Standards",
    "Division 26 Fundamentals", "Division 27 Fundamentals", "Division 28 Fundamentals", "Interdisciplinary Coordination",
    "Small Placement Exercises", "Classroom Requirements and Assumptions", "Separate the Design Layers", "Combine the Layers",
    "Quality-Control Review", "Suggested Solution and Alternatives", "RFIs, Submittals, Field Changes, Testing, and Commissioning", "Final Teach-Back and Reflection",
  ];
  await page.goto("/engineering/classroom-lab");
  for (let stage = 0; stage < 5; stage += 1) {
    await page.locator(".quest-stage-button").nth(stage).click();
    await expect(page.locator(".quest-list-button strong")).toHaveText(expected.slice(stage * 4, stage * 4 + 4));
    const pages = await page.locator(".quest-list-button small").allTextContents();
    expect(pages.map((text) => Number(text.match(/Guide page (\d+)/)?.[1]))).toEqual([3, 5, 7, 9].map((offset) => offset + stage * 8));
  }
});

test("classroom builder places, edits, layers, saves, and restores devices", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/engineering/classroom-lab");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Enter Free Build" }).click();

  const canvas = page.getByTestId("classroom-canvas");
  await page.getByRole("button", { name: /2 x 4 LED ceiling fixture/ }).click();
  await canvas.click({ position: { x: 180, y: 120 } });
  await expect(page.getByRole("button", { name: /Select placed 2 x 4 LED ceiling fixture/ })).toHaveCount(1);

  const firstPosition = await page.locator(".placed-device").first().getAttribute("style");
  await page.getByRole("button", { name: "Move" }).click();
  await canvas.click({ position: { x: 360, y: 220 } });
  await expect(page.locator(".placed-device").first()).not.toHaveAttribute("style", firstPosition || "");
  await page.getByRole("button", { name: "Rotate" }).click();
  await expect(page.locator(".placed-device").first()).toHaveAttribute("style", /rotate\(45deg\)/);
  await page.getByRole("button", { name: "Duplicate" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(2);
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(1);
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(2);
  await page.getByRole("button", { name: "Redo" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(1);

  await page.getByRole("button", { name: "Hide Lighting and controls" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(0);
  await page.getByRole("button", { name: "Show Lighting and controls" }).click();
  await expect(page.locator(".placed-device")).toHaveCount(1);

  await page.getByRole("button", { name: "Floor plan", exact: true }).click();
  await page.getByLabel("Filter device library").getByRole("button", { name: /Division 27/ }).click();
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
  await page.getByRole("button", { name: /Data outlet/ }).dispatchEvent("dragstart", { dataTransfer });
  await canvas.scrollIntoViewIfNeeded();
  const canvasBox = await canvas.boundingBox();
  expect(canvasBox).not.toBeNull();
  const dropPoint = { clientX: (canvasBox?.x || 0) + 480, clientY: (canvasBox?.y || 0) + 260 };
  await canvas.dispatchEvent("dragover", { dataTransfer, ...dropPoint });
  await canvas.dispatchEvent("drop", { dataTransfer, ...dropPoint });
  await expect(page.getByRole("button", { name: /Select placed Data outlet/ })).toHaveCount(1);
  await page.getByRole("button", { name: "System paths" }).click();
  await expect(page.locator(".system-path")).toHaveCount(2);

  await page.getByRole("button", { name: "Save design draft" }).click();
  await page.reload();
  const savedPlacements = await page.evaluate(() => JSON.parse(window.localStorage.getItem("lomnickpro-engineering-101-design-v1") || "{}").placements?.length);
  expect(savedPlacements).toBe(2);
  await page.getByRole("button", { name: "System paths" }).click();
  await expect(page.locator(".system-path")).toHaveCount(2);
});

test("mobile classroom builder supports tap placement without page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/engineering/classroom-lab");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Enter Free Build" }).click();
  await page.getByRole("button", { name: /Standard duplex receptacle/ }).click();
  await page.getByTestId("classroom-canvas").click({ position: { x: 130, y: 150 } });
  await expect(page.getByRole("button", { name: /Select placed Standard duplex receptacle/ })).toHaveCount(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test("feedback, assumptions, mentor hints, QC redlines, and teach-back persist", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/engineering/classroom-lab");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await page.getByRole("button", { name: "Enter Free Build" }).click();
  const canvas = page.getByTestId("classroom-canvas");

  await page.getByRole("button", { name: /Data outlet/ }).click();
  await canvas.click({ position: { x: 170, y: 180 } });
  await expect(page.getByText("ASSUMPTION NEEDED", { exact: true })).toBeVisible();
  await expect(page.getByText("TEACH-BACK INCOMPLETE", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Open Mentor Hint" }).click();
  await expect(page.getByText(/Hint 1 of 4: Guiding question/)).toBeVisible();
  await page.getByRole("button", { name: "Next hint" }).click();
  await expect(page.getByText(/Hint 2 of 4: Relevant zone/)).toBeVisible();

  await page.getByLabel("Design assumption").fill("Owner technology standard is pending confirmation.");
  await page.locator(".assumption-form select").selectOption("Owner decision");
  await page.getByRole("button", { name: "Add assumption" }).click();
  await expect(page.getByText("Owner technology standard is pending confirmation.")).toBeVisible();

  await page.getByLabel("It is served from").selectOption("Classroom panel branch circuit");
  await page.getByLabel("It is located here because").fill("The connection is useful near the teaching position.");
  await page.getByLabel("It coordinates with").fill("Furniture, power, and the communications pathway.");
  await page.getByLabel("The remaining assumption is").fill("The owner port count remains pending.");
  await page.getByLabel("It is tested or commissioned by").fill("The technology contractor and owner team.");
  await page.getByRole("button", { name: "Save teach-back" }).click();
  await expect(page.getByText("SYSTEM-PATH ERROR", { exact: true })).toBeVisible();
  await expect(page.getByText("Communications source is incorrect")).toBeVisible();

  await page.getByRole("button", { name: /Fire-alarm speaker\/strobe device preview/ }).click();
  await canvas.click({ position: { x: 260, y: 160 } });
  await page.getByLabel("It is served from").selectOption("Ordinary branch circuit");
  await page.getByLabel("It uses this pathway").selectOption("Ordinary branch-circuit conductors");
  await page.getByLabel("It is located here because").fill("The appliance can be seen and heard from the occupied room.");
  await page.getByLabel("It coordinates with").fill("Coverage, wall devices, and the selected life-safety system.");
  await page.getByLabel("The remaining assumption is").fill("Final system criteria remain pending.");
  await page.getByLabel("It is tested or commissioned by").fill("The responsible life-safety system team.");
  await page.getByRole("button", { name: "Save teach-back" }).click();
  await expect(page.getByText("Life-safety pathway is incorrect")).toBeVisible();

  await page.getByRole("button", { name: /Floor box device preview/ }).click();
  const conflictCanvas = await canvas.boundingBox();
  expect(conflictCanvas).not.toBeNull();
  await canvas.click({ position: { x: (conflictCanvas?.width || 500) * .7, y: (conflictCanvas?.height || 300) * .75 } });
  await expect(page.getByText("Device overlaps sink or casework")).toBeVisible();

  await page.getByRole("button", { name: "Enter QC Challenge" }).click();
  await expect(page.getByTestId("qc-planted-issue")).toHaveCount(3);
  await page.getByLabel("Likely consequence").fill("The entry and maintenance access could be blocked.");
  await page.getByRole("button", { name: "Add redline" }).click();
  await canvas.click({ position: { x: 420, y: 240 } });
  await expect(page.locator(".redline-marker")).toHaveCount(1);
  await page.locator(".redline-marker").click();
  await expect(page.locator(".redline-marker")).toHaveClass(/is-resolved/);
  await page.getByRole("button", { name: "Save corrected plan" }).click();
  await page.getByRole("button", { name: "Before review" }).click();
  await page.getByRole("button", { name: "Corrected plan", exact: true }).click();

  await page.reload();
  await expect(page.getByText("Owner technology standard is pending confirmation.")).toBeVisible();
  await expect(page.locator(".redline-marker")).toHaveCount(1);
  await expect(page.getByText(/Hint 2 of 4: Relevant zone/)).toBeVisible();
  expect((await page.locator("main").innerText()).toLowerCase()).not.toMatch(/code approved|code compliant/);
});

test("public documents respond as PDFs and professional files are noindex", async ({ request }) => {
  const documents = publicAssets.filter((asset) => asset.status === "active" && asset.type === "pdf");
  for (const document of documents) {
    const response = await request.get(publicAssetPath(document.id));
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
    if (["public-resume", "public-cover-letter"].includes(document.id)) expect(response.headers()["x-robots-tag"]).toContain("noindex");
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
    assetManifest: {
      version: expect.any(String),
      hash: expect.stringMatching(/^[a-f0-9]{64}$/),
      activeCount: 24,
      documents: expect.arrayContaining([
        expect.objectContaining({ id: "engineering-guide", pageCount: 43 }),
        expect.objectContaining({ id: "lionheart-volume-1-preview", pageCount: 10 }),
        expect.objectContaining({ id: "lionheart-volume-2-preview", pageCount: 10 }),
      ]),
    },
  });
  expect(JSON.stringify(version)).not.toMatch(/email|phone|secret|token|key|contact_to/i);
});
