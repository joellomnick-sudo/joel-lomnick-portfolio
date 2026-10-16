import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LIONHEART_SESSION_COOKIE, verifyLionheartSessionToken } from "@/lib/lionheart-auth";
import { listeningSections, speechifyProblem, speechifyRequest } from "@/lib/lionheart-speechify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;
const privateHeaders = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: privateHeaders });
async function authorized() {
  return verifyLionheartSessionToken((await cookies()).get(LIONHEART_SESSION_COOKIE)?.value);
}
type Voice = { id: string; display_name: string; locale: string; gender: string };
async function voices() {
  const result: Voice[] = [];
  let cursor = "";
  do {
    const query = new URLSearchParams({ locale: "en", model: "simba-3.2", limit: "200" });
    if (cursor) query.set("cursor", cursor);
    const response = await speechifyRequest("voices?" + query);
    if (!response.ok) throw new Error(speechifyProblem(response.status));
    const data = await response.json();
    if (!Array.isArray(data.voices)) throw new Error("Speechify returned an unexpected voice list.");
    result.push(...data.voices.filter((v: Voice) => typeof v.id === "string" && typeof v.display_name === "string").map((v: Voice) => ({ id: v.id, display_name: v.display_name, locale: v.locale, gender: v.gender })));
    const next = data.has_more && typeof data.next_cursor === "string" ? data.next_cursor : "";
    if (next === cursor && next) throw new Error("Speechify could not complete the voice list.");
    cursor = next;
  } while (cursor);
  return result;
}
export async function GET() {
  if (!await authorized()) return json({ error: "Unlock Lionheart to listen." }, 401);
  if (!process.env.SPEECHIFY_API_KEY) return json({ configured: false, voices: [], sections: [] });
  try {
    const [available, sections] = await Promise.all([voices(), listeningSections()]);
    return json({ configured: true, voices: available, sections: sections.map(s => ({ id: s.id, volume: s.volume, title: s.title, available: s.parts.length > 0, characters: s.parts.reduce((n, p) => n + p.length, 0) })) });
  } catch (error) { return json({ error: error instanceof Error ? error.message : "The audio connection is unavailable." }, 502); }
}
export async function POST(request: Request) {
  if (!await authorized()) return json({ error: "Your studio session expired. Unlock Lionheart again." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "Open this request from Lionheart." }, 403);
  if (!process.env.SPEECHIFY_API_KEY) return json({ error: "Speechify has not been connected yet." }, 503);
  if (Number(request.headers.get("content-length") || 0) > 2048) return json({ error: "Invalid audio request." }, 400);
  const body = await request.json().catch(() => null);
  if (typeof body?.section !== "string" || body.section.length > 100 || typeof body?.voice !== "string" || body.voice.length > 100) return json({ error: "Choose a section and voice." }, 400);
  try {
    const [available, sections] = await Promise.all([voices(), listeningSections()]);
    if (!available.some(v => v.id === body.voice)) return json({ error: "Choose a currently available English voice." }, 400);
    const section = sections.find(s => s.id === body.section);
    if (!section?.parts.length) return json({ error: "This section has no manuscript text available." }, 400);
    const abort = new AbortController();
    const signal = AbortSignal.any([request.signal, abort.signal, AbortSignal.timeout(270000)]);
    const generate = (input: string) => speechifyRequest("audio/stream", { method: "POST", signal, headers: { "Content-Type": "application/json", Accept: "audio/mpeg" }, body: JSON.stringify({ input, voice_id: body.voice, model: "simba-3.2" }) });
    // Get a valid first response before committing to an audio response.
    const first = await generate(section.parts[0]);
    if (!first.ok || !first.body) return json({ error: speechifyProblem(first.status) }, 502);
    let index = 0;
    let reader = first.body.getReader();
    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          let next = await reader.read();
          while (next.done) {
            reader.releaseLock();
            index += 1;
            if (index >= section.parts.length) { controller.close(); return; }
            const response = await generate(section.parts[index]);
            if (!response.ok || !response.body) throw new Error("Audio generation interrupted.");
            reader = response.body.getReader();
            next = await reader.read();
          }
          controller.enqueue(next.value);
        } catch { abort.abort(); controller.error(new Error("Audio generation interrupted. No complete file was prepared.")); }
      },
      async cancel() { abort.abort(); await reader.cancel().catch(() => undefined); },
    });
    return new Response(stream, { headers: { ...privateHeaders, "Content-Type": "audio/mpeg", "Content-Disposition": 'attachment; filename="Lionheart-Volume-' + section.volume + '.mp3"' } });
  } catch (error) { return json({ error: error instanceof Error ? error.message : "The audio connection is unavailable." }, 502); }
}
