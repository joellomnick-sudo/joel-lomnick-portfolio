import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3010";
const outputFile = resolve(
  process.env.OUTPUT_FILE || "artifacts/audits/checkpoint-00-local.json",
);
const strict = process.env.STRICT_AUDIT === "1";
const routeCatalog = [
  ["home", "/"],
  ["about", "/about"],
  ["engineering", "/engineering"],
  ["classroom-lab", "/engineering/classroom-lab"],
  ["lomnickpro", "/lomnickpro"],
  ["community-leadership", "/community-leadership"],
  ["lionheart", "/lionheart"],
  ["contact", "/contact"],
];
const requestedRoutes = new Set(
  (process.env.ROUTES || "")
    .split(",")
    .map((route) => route.trim())
    .filter(Boolean),
);
const routes = requestedRoutes.size
  ? routeCatalog.filter(([, route]) => requestedRoutes.has(route))
  : routeCatalog;
const viewports = [
  ["desktop", { width: 1440, height: 1200 }],
  ["mobile", { width: 390, height: 844 }],
];
const navLabels = [
  "Home",
  "About",
  "Engineering",
  "LomnickPro",
  "Community & Leadership",
  "Lionheart",
  "Contact",
];

async function settle(page) {
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
  });
  await page.waitForLoadState("networkidle");
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolveImage) => {
          image.addEventListener("load", resolveImage, { once: true });
          image.addEventListener("error", resolveImage, { once: true });
        });
      }),
    );
  });
  await page.evaluate(() => scrollTo(0, 0));
}

function addWarning(warnings, condition, message) {
  if (condition) warnings.push(message);
}

const browser = await chromium.launch();
const results = [];
const hardFailures = [];

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();

  for (const [name, route] of routes) {
    const response = await page.goto(`${baseURL}${route}`, {
      waitUntil: "domcontentloaded",
    });
    await settle(page);
    const snapshot = await page.evaluate(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      };
      const sizes = (selector) =>
        Array.from(document.querySelectorAll(selector))
          .filter(visible)
          .map((element) => Number.parseFloat(getComputedStyle(element).fontSize));
      const minOrNull = (selector) => {
        const values = sizes(selector);
        return values.length ? Math.min(...values) : null;
      };
      const imageDetails = Array.from(document.images).map((image) => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        renderedWidth: image.getBoundingClientRect().width,
        renderedHeight: image.getBoundingClientRect().height,
        alt: image.getAttribute("alt"),
        objectFit: getComputedStyle(image).objectFit,
      }));
      const imageCounts = imageDetails.reduce((counts, image) => {
        counts[image.src] = (counts[image.src] || 0) + 1;
        return counts;
      }, {});
      const tallSections = Array.from(document.querySelectorAll("main section"))
        .map((section, index) => {
          const rect = section.getBoundingClientRect();
          const last = section.lastElementChild?.getBoundingClientRect();
          return {
            index: index + 1,
            height: Math.round(rect.height),
            trailingSpace: last ? Math.round(rect.bottom - last.bottom) : 0,
          };
        })
        .filter((section) => section.height > innerHeight * 1.25 || section.trailingSpace > 160);
      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        h1Size: minOrNull("h1"),
        bodySize: Number.parseFloat(getComputedStyle(document.body).fontSize),
        proseSize: minOrNull("main .prose-copy"),
        navSize: minOrNull('nav[aria-label="Primary navigation"] a'),
        buttonSize: minOrNull("main button, main a.inline-flex"),
        formLabelSize: minOrNull("main label"),
        captionSize: minOrNull("main .image-caption, main figcaption"),
        footerLinkSize: minOrNull("footer a"),
        classroomControlSize: minOrNull("main .lab-tool"),
        horizontalOverflow:
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        brokenImages: imageDetails.filter(
          (image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0,
        ),
        coverFitImages: imageDetails.filter(
          (image) =>
            /case-studies|lionheart-cover/i.test(image.src) && image.objectFit === "cover",
        ),
        distortedImages: imageDetails.filter((image) => {
          if (!image.naturalWidth || !image.naturalHeight || !image.renderedWidth || !image.renderedHeight) return false;
          if (["contain", "cover", "scale-down"].includes(image.objectFit)) return false;
          const naturalRatio = image.naturalWidth / image.naturalHeight;
          const renderedRatio = image.renderedWidth / image.renderedHeight;
          return Math.abs(renderedRatio / naturalRatio - 1) > 0.06;
        }),
        duplicateImages: Object.entries(imageCounts)
          .filter(([, count]) => count > 1)
          .map(([src, count]) => ({ src, count })),
        imagesWithoutAlt: imageDetails.filter((image) => image.alt === null),
        tallSections,
        publicContactLinks: Array.from(document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]')).map(
          (link) => link.getAttribute("href"),
        ),
      };
    });

    if (!response || response.status() !== 200) {
      hardFailures.push(`${viewportName} ${route}: HTTP ${response?.status() || "no response"}`);
    }
    if (snapshot.h1Count !== 1) hardFailures.push(`${viewportName} ${route}: expected one H1`);
    if (snapshot.horizontalOverflow) hardFailures.push(`${viewportName} ${route}: horizontal overflow`);
    if (snapshot.brokenImages.length) hardFailures.push(`${viewportName} ${route}: broken image`);
    if (snapshot.distortedImages.length) hardFailures.push(`${viewportName} ${route}: distorted image`);
    if (snapshot.imagesWithoutAlt.length) hardFailures.push(`${viewportName} ${route}: image missing alt`);
    if (snapshot.publicContactLinks.length) hardFailures.push(`${viewportName} ${route}: public contact link`);

    if (viewportName === "desktop") {
      const nav = page.getByRole("navigation", { name: "Primary navigation" });
      for (const label of navLabels) {
        if (!(await nav.getByRole("link", { name: label, exact: true }).isVisible())) {
          hardFailures.push(`desktop ${route}: hidden navigation label ${label}`);
        }
      }
    } else {
      const menuButton = page.getByRole("button", { name: "Open navigation menu" });
      if (await menuButton.isVisible()) {
        await menuButton.click();
        const dialog = page.getByRole("dialog", { name: "Site navigation" });
        for (const label of navLabels) {
          if (!(await dialog.getByRole("link", { name: label, exact: true }).isVisible())) {
            hardFailures.push(`mobile ${route}: hidden navigation label ${label}`);
          }
        }
        await page.keyboard.press("Escape");
      } else {
        hardFailures.push(`mobile ${route}: menu trigger is hidden`);
      }
    }

    const warnings = [];
    const isMobile = viewportName === "mobile";
    addWarning(warnings, snapshot.bodySize < (isMobile ? 17 : 18), `body text is ${snapshot.bodySize}px`);
    addWarning(warnings, snapshot.proseSize !== null && snapshot.proseSize < (isMobile ? 17 : 18), `prose is ${snapshot.proseSize}px`);
    addWarning(warnings, !isMobile && snapshot.navSize !== null && snapshot.navSize < 16, `navigation is ${snapshot.navSize}px`);
    addWarning(warnings, snapshot.buttonSize !== null && snapshot.buttonSize < 15, `button text is ${snapshot.buttonSize}px`);
    addWarning(warnings, snapshot.formLabelSize !== null && snapshot.formLabelSize < 16, `form labels are ${snapshot.formLabelSize}px`);
    addWarning(warnings, snapshot.captionSize !== null && snapshot.captionSize < 14, `captions are ${snapshot.captionSize}px`);
    addWarning(warnings, snapshot.footerLinkSize !== null && snapshot.footerLinkSize < 15, `footer links are ${snapshot.footerLinkSize}px`);
    addWarning(warnings, snapshot.classroomControlSize !== null && snapshot.classroomControlSize < 15, `classroom controls are ${snapshot.classroomControlSize}px`);
    addWarning(warnings, snapshot.h1Size !== null && snapshot.h1Size > (isMobile ? 54 : 68), `H1 is ${snapshot.h1Size}px`);
    addWarning(warnings, snapshot.coverFitImages.length > 0, "an infographic or cover uses object-fit: cover");
    addWarning(warnings, snapshot.duplicateImages.length > 0, "an image is repeated on the page");
    addWarning(warnings, snapshot.tallSections.length > 0, "a section needs manual empty-space review");
    results.push({ viewport: viewportName, name, route, ...snapshot, warnings });
  }
  await context.close();
}

await browser.close();
await mkdir(dirname(outputFile), { recursive: true });
await writeFile(
  outputFile,
  `${JSON.stringify({ auditedAt: new Date().toISOString(), baseURL, strict, hardFailures, results }, null, 2)}\n`,
  "utf8",
);

const warningCount = results.reduce((count, result) => count + result.warnings.length, 0);
console.log(`Audit saved to ${outputFile}`);
console.log(`${hardFailures.length} hard failures; ${warningCount} refinement warnings.`);
if (hardFailures.length || (strict && warningCount)) process.exitCode = 1;
