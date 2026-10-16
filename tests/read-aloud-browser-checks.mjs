import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

export async function checkVoicePlayer(origin, cookie) {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addCookies([{ name: "lionheart_session", value: cookie, url: origin }]);
    await context.addInitScript(() => {
      const make = (name, lang = "en-US") => ({ name, lang, voiceURI: name, default: false, localService: true });
      const speech = new class extends EventTarget {
        voices = [
          ...["Alex", "Nathan (Premium)", "Evan (Enhanced)", "Ava (Premium)", "Allison (Enhanced)", "Samantha (Enhanced)"].map(n => make(n)),
          ...["Daniel (Premium)", "Oliver (Enhanced)", "Kate (Premium)", "Serena (Enhanced)"].map(n => make(n, "en-GB")),
          make("Fred"), make("Boing"), make("Samantha (Compact)"), make("Microsoft David Desktop"),
        ];
        spoken = [];
        current = null;
        getVoices() { return this.voices; }
        speak(u) { this.current = u; this.spoken.push(u); }
        resume() {}
        cancel() { const old = this.current; this.current = null; old?.onerror?.({ error: "canceled" }); }
      }();
      Object.defineProperty(window, "speechSynthesis", { value: speech });
      Object.defineProperty(window, "SpeechSynthesisUtterance", { value: class { constructor(text) { this.text = text; } } });
      window.__speech = speech;
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(origin + "/lionheart", { waitUntil: "domcontentloaded" });
    const player = page.locator("#read-aloud");
    await player.getByText("5 of 5 male · 5 of 5 female voices available here.", { exact: false }).waitFor();
    assert.equal(await player.locator("optgroup").count(), 2);
    assert.equal(await player.locator("option").count(), 16); // 10 voices, 6 speeds
    assert(!(await player.getByLabel("Voice", { exact: true }).textContent()).match(/Fred|Boing|Compact|Desktop/));
    const current = () => page.evaluate(() => {
      const u = window.__speech.current;
      return u ? { text: u.text, voice: u.voice?.name, rate: u.rate } : null;
    });
    await player.getByLabel("Voice", { exact: true }).selectOption("Ava (Premium)");
    await player.getByRole("button", { name: "Preview voice", exact: true }).click();
    assert.match((await current()).text, /preview of your reading voice/);
    assert.equal((await current()).voice, "Ava (Premium)");
    await player.getByRole("button", { name: "Stop preview", exact: true }).click();
    assert.equal(await current(), null);
    await player.getByRole("button", { name: "Listen to Volume I", exact: true }).click();
    const first = await current();
    await page.evaluate(() => window.__speech.current.onboundary({ charIndex: 4 }));
    await player.getByLabel("Voice", { exact: true }).selectOption("Daniel (Premium)");
    assert.equal((await current()).text, first.text.slice(4));
    assert.equal((await current()).voice, "Daniel (Premium)");
    await player.getByRole("button", { name: "Preview voice", exact: true }).click();
    await player.getByRole("button", { name: "Resume Volume I", exact: true }).click();
    assert.equal((await current()).text, first.text.slice(4));
    await player.getByLabel("Speed", { exact: true }).selectOption("1.5");
    assert.equal((await current()).rate, 1.5);
    await player.getByRole("button", { name: "Listen to Volume II", exact: true }).click();
    assert.match((await current()).text, /volume 2/i);
    await page.evaluate(() => { window.__speech.voices = []; });
    await player.getByRole("button", { name: "Refresh voices", exact: true }).click();
    await player.getByText("0 of 5 male · 0 of 5 female voices available here.", { exact: false }).waitFor();
    assert.equal(await current(), null);
    assert(await player.getByRole("button", { name: "Resume Volume II", exact: true }).isDisabled());
    await page.evaluate(() => {
      window.__speech.voices = [{ name: "Kate (Enhanced)", voiceURI: "Kate (Enhanced)", lang: "en-GB", localService: true, default: false }];
      window.__speech.dispatchEvent(new Event("voiceschanged"));
    });
    await player.getByText("0 of 5 male · 1 of 5 female voices available here.", { exact: false }).waitFor();
    await player.getByRole("button", { name: "Preview voice", exact: true }).click();
    await page.evaluate(() => window.__speech.current.onerror({ error: "synthesis-failed" }));
    await player.getByRole("alert").filter({ hasText: "This voice could not preview" }).waitFor();
    await player.getByRole("button", { name: "Resume Volume II", exact: true }).click();
    assert.equal((await current()).voice, "Kate (Enhanced)");
    assert.equal(await player.getByRole("alert").count(), 0);
    await player.getByRole("button", { name: "Stop", exact: true }).click();
    assert.equal(await current(), null);
    const box = await player.boundingBox();
    assert(box.x >= 0 && box.x + box.width <= 391, "Player overflows a phone viewport");
    const voiceBox = await player.getByLabel("Voice", { exact: true }).boundingBox();
    assert(voiceBox.x + voiceBox.width <= 391, "Voice menu overflows a phone viewport");
    assert.deepEqual(errors, []);
    console.log("Browser controls passed at 390px: 5+5 groups, robot exclusions, preview/stop/error, voice and speed changes, book switching, preserved position, refresh/voiceschanged, empty voice list and mobile width. Speech output was mocked; audio quality and iPhone playback require the actual device.");
  } finally { await browser.close(); }
}
