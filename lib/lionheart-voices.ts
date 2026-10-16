/**
 * Browser speech has no gender/quality fields. These conservative name mappings
 * use the Nuance and Microsoft voice catalogs; only actual getVoices() objects
 * are returned. This is a preference list, not an audio-quality guarantee.
 * https://docs.nuance.com/speech-suite/voc-dev/lang.html
 * https://learn.microsoft.com/azure/ai-services/speech-service/language-support
 */
export type VoiceGender = "male" | "female";
export type VoiceDetails = Pick<SpeechSynthesisVoice, "name" | "lang" | "voiceURI" | "localService" | "default">;
export type VoiceChoice<T extends VoiceDetails = SpeechSynthesisVoice> = {
  voice: T; gender: VoiceGender; accent: "US" | "UK"; quality: string; score: number; identity: string;
};
const systemNames = {
  "en-us": { male: ["Alex", "Nathan", "Evan", "Tom"], female: ["Ava", "Allison", "Samantha", "Zoe", "Susan"] },
  "en-gb": { male: ["Daniel", "Oliver", "Malcolm"], female: ["Kate", "Serena", "Stephanie"] },
} as const;
const microsoftNames = {
  "en-us": { male: ["Andrew", "Brian", "Guy", "Christopher", "Eric"], female: ["Ava", "Emma", "Jenny", "Aria", "Michelle"] },
  "en-gb": { male: ["Ryan", "Thomas"], female: ["Sonia", "Libby", "Maisie"] },
} as const;
function named(name: string, candidate: string) {
  return new RegExp("(^|[^a-z])" + candidate + "(?=$|[^a-z]|multilingual|neural)", "i").test(name);
}
function describe<T extends VoiceDetails>(voice: T): VoiceChoice<T> | null {
  const locale = voice.lang.replace(/_/g, "-").toLowerCase();
  if (locale !== "en-us" && locale !== "en-gb") return null;
  const text = voice.name + " " + voice.voiceURI;
  // Exclude explicit low-quality variants as well as legacy/sound-effect voices,
  // which are absent from the allowlists below.
  if (/compact|eloquence|espeak|festival|mbrola/i.test(text)) return null;
  const quality = /natural|neural/i.test(text) ? "Natural" : /premium/i.test(text) ? "Premium" : /enhanced/i.test(text) ? "Enhanced" : "";
  const microsoft = /microsoft/i.test(text);
  if (microsoft && !quality) return null;
  let gender: VoiceGender | undefined, identity = "", preference = 0;
  if (/^google uk english (male|female)$/i.test(voice.name) && locale === "en-gb") {
    gender = /female$/i.test(voice.name) ? "female" : "male";
    identity = "google-" + gender;
  } else {
    // Unknown labels (including numbered Siri voices) are not assigned a gender.
    const catalog = microsoft ? microsoftNames[locale] : systemNames[locale];
    for (const group of ["male", "female"] as const) {
      const index = catalog[group].findIndex(name => named(voice.name, name));
      if (index >= 0) {
        gender = group;
        identity = (microsoft ? "microsoft-" : "system-") + catalog[group][index].toLowerCase();
        preference = 20 - index;
        break;
      }
    }
  }
  if (!gender) return null;
  const qualityScore = quality === "Natural" ? 400 : quality === "Premium" ? 300 : quality === "Enhanced" ? 200 : 100;
  return { voice, gender, accent: locale === "en-gb" ? "UK" : "US", quality,
    score: qualityScore + preference + (identity === "system-alex" ? 25 : 0),
    identity: locale + "-" + identity };
}
export function curatedVoices<T extends VoiceDetails>(voices: readonly T[]): VoiceChoice<T>[] {
  const distinct = new Map<string, VoiceChoice<T>>();
  for (const voice of voices) {
    const choice = describe(voice);
    if (!choice) continue;
    const previous = distinct.get(choice.identity);
    if (!previous || choice.score > previous.score ||
        (choice.score === previous.score && choice.voice.voiceURI.localeCompare(previous.voice.voiceURI) < 0)) {
      distinct.set(choice.identity, choice);
    }
  }
  const rank = (a: VoiceChoice<T>, b: VoiceChoice<T>) =>
    b.score - a.score || a.voice.name.localeCompare(b.voice.name) || a.voice.voiceURI.localeCompare(b.voice.voiceURI);
  return (["male", "female"] as const).flatMap(gender => {
    const candidates = [...distinct.values()].filter(v => v.gender === gender).sort(rank);
    const selected = candidates.slice(0, 5);
    // Keep both accents represented when this device provides them.
    for (const accent of ["US", "UK"] as const) {
      if (selected.some(v => v.accent === accent)) continue;
      const alternate = candidates.find(v => v.accent === accent);
      if (alternate) selected.splice(Math.min(4, selected.length), 1, alternate);
    }
    return selected.sort(rank);
  });
}
export function voiceLabel(choice: VoiceChoice<VoiceDetails>) {
  return choice.voice.name + " · " + choice.accent +
    (choice.quality && !new RegExp(choice.quality, "i").test(choice.voice.name) ? " · " + choice.quality : "");
}
