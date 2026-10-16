import { getLionheartChapters, getLionheartFrontMatter } from "@/lib/lionheart-airtable";
import { narrationPassages } from "@/lib/lionheart-listening";

export async function listeningSections() {
  const [chapters, front] = await Promise.all([getLionheartChapters(), getLionheartFrontMatter()]);
  if (!chapters || !front) throw new Error("The manuscript connection is unavailable.");
  return [1, 2].flatMap(volume => [
    ...front.filter(s => s.volume === volume && s.type === "Prologue").map(s => ({ id: s.id, volume, title: "Prologue · " + s.section, text: s.draftText || "" })),
    ...chapters.filter(c => c.volume === volume).sort((a, b) => a.chapter - b.chapter).map(c => ({ id: c.id, volume, title: "Chapter " + c.chapter + " · " + c.title, text: c.draftText || "" })),
    ...front.filter(s => s.volume === volume && s.type === "Epilogue").map(s => ({ id: s.id, volume, title: "Epilogue · " + s.section, text: s.draftText || "" })),
  ]).map(s => ({ ...s, parts: s.text.trim() ? narrationPassages(s.title + ". " + s.text, 18000) : [] }));
}

export async function speechifyRequest(path: string, init?: RequestInit) {
  return fetch("https://api.speechify.ai/v1/" + path, {
    ...init, cache: "no-store",
    headers: { Authorization: "Bearer " + process.env.SPEECHIFY_API_KEY, "Speechify-Version": "2026-10-16", ...init?.headers },
    signal: init?.signal || AbortSignal.timeout(240000),
  });
}

export function speechifyProblem(status: number) {
  if (status === 401 || status === 403) return "Speechify could not authorize this connection. Check the API key in hosting settings.";
  if (status === 402) return "Speechify API credit is exhausted or this feature needs another API plan. Check Speechify billing before trying again.";
  if (status === 429) return "Speechify is at its request limit. Wait a moment before trying again.";
  return "Speechify could not finish the audio. Please try again later.";
}
