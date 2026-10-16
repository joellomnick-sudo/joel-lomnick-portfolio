import test from "node:test";
import assert from "node:assert/strict";
import { curatedVoices, voiceLabel } from "../lib/lionheart-voices.ts";
const voice = (name, lang = "en-US", voiceURI = name) => ({ name, lang, voiceURI, localService: true, default: false });
test("only actual US/UK voices are returned, with no novelty or unknown-gender fallbacks", () => {
  const real = voice("Daniel", "en-GB");
  const result = curatedVoices([voice("Fred"), voice("Boing"), voice("Microsoft David Desktop"), voice("eSpeak English"),
    voice("Samantha (Compact)"), voice("Samantha", "en-AU"), voice("Siri Voice 1"), real]);
  assert.equal(result.length, 1);
  assert.equal(result[0].voice, real);
  assert.equal(result[0].gender, "male");
  assert.equal(result[0].accent, "UK");
  assert.deepEqual(curatedVoices([]), []);
});
test("five distinct voices per gender, with both accents and strongest duplicate variant", () => {
  const premium = voice("Daniel (Premium)", "en-GB");
  const voices = ["Alex", "Nathan", "Evan", "Tom", "Ava", "Allison", "Samantha", "Zoe", "Susan"].map(n => voice(n));
  voices.push(...["Daniel", "Daniel (Enhanced)", "Oliver", "Malcolm", "Kate", "Serena", "Stephanie"].map(n => voice(n, "en-GB")), premium);
  const result = curatedVoices(voices);
  for (const gender of ["male", "female"]) {
    const group = result.filter(v => v.gender === gender);
    assert.equal(group.length, 5);
    assert(group.some(v => v.accent === "US"));
    assert(group.some(v => v.accent === "UK"));
  }
  assert.equal(result.find(v => v.identity.endsWith("system-daniel")).voice, premium);
  assert.equal(new Set(result.map(v => v.identity)).size, 10);
  assert(result.every(v => voices.includes(v.voice)));
  assert.match(voiceLabel(result.find(v => v.voice === premium)), /UK/);
});
test("Microsoft natural names and Google explicit gender labels are supported", () => {
  const result = curatedVoices([voice("Microsoft Andrew Online (Natural) - English (United States)"),
    voice("Microsoft Ava Online (Natural) - English (United States)"),
    voice("Microsoft Sonia Online (Natural) - English (United Kingdom)", "en-GB"),
    voice("Microsoft Ryan Online (Natural) - English (United Kingdom)", "en-GB"),
    voice("Google UK English Male", "en-GB"), voice("Google UK English Female", "en-GB")]);
  assert.equal(result.length, 6);
  assert.equal(result.filter(v => v.gender === "male").length, 3);
  assert.equal(result.filter(v => v.gender === "female").length, 3);
});
test("quality preference precedes catalog order and results do not depend on enumeration order", () => {
  const voices = ["Alex", "Nathan", "Evan", "Tom"].map(n => voice(n));
  voices.push(voice("Oliver (Enhanced)", "en-GB"), voice("Malcolm (Premium)", "en-GB"));
  const result = curatedVoices(voices);
  assert.equal(result[0].voice.name, "Malcolm (Premium)");
  assert.deepEqual(curatedVoices([...voices].reverse()), result);
});
test("never mistakes a female label for male or invents choices when only one voice exists", () => {
  const result = curatedVoices([voice("Google UK English Female", "en_GB")]);
  assert.equal(result.length, 1);
  assert.equal(result[0].gender, "female");
  assert.deepEqual(curatedVoices([voice("Anonymous English Voice")]), []);
});
