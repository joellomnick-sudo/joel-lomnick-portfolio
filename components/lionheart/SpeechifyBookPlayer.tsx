"use client";
import { useCallback, useEffect, useRef, useState } from "react";
type Voice = { id: string; display_name: string; locale: string; gender: string };
type Section = { id: string; volume: number; title: string; available: boolean; characters: number };
const button = "min-h-12 rounded-lg border border-[#a99678] px-5 py-3 font-semibold disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
export function SpeechifyBookPlayer() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [voice, setVoice] = useState("");
  const [section, setSection] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [received, setReceived] = useState(0);
  const [audio, setAudio] = useState<{ url: string; title: string; voice: string; filename: string } | null>(null);
  const [rate, setRate] = useState(1);
  const player = useRef<HTMLAudioElement>(null);
  const pending = useRef<AbortController | null>(null);
  const currentUrl = useRef("");
  const mounted = useRef(false);
  const connect = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/lionheart/api/speechify", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not connect to Speechify.");
      if (!mounted.current) return;
      setConfigured(data.configured); setVoices(data.voices); setSections(data.sections);
      setVoice(v => data.voices.some((item: Voice) => item.id === v) ? v : data.voices[0]?.id || "");
      setSection(s => data.sections.some((item: Section) => item.id === s && item.available) ? s : data.sections.find((item: Section) => item.available)?.id || "");
    } catch (e) { if (mounted.current) setError(e instanceof Error ? e.message : "Could not connect to Speechify."); }
  }, []);
  useEffect(() => {
    mounted.current = true; void connect();
    return () => { mounted.current = false; pending.current?.abort(); if (currentUrl.current) URL.revokeObjectURL(currentUrl.current); };
  }, [connect]);
  useEffect(() => { if (player.current) player.current.playbackRate = rate; }, [rate, audio]);
  useEffect(() => {
    if (!audio || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title: audio.title, artist: audio.voice, album: "Lionheart" });
    const element = player.current;
    navigator.mediaSession.setActionHandler("play", () => { void element?.play().catch(() => setError("Tap Play to continue listening.")); });
    navigator.mediaSession.setActionHandler("pause", () => element?.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => { if (element) element.currentTime = Math.max(0, element.currentTime - 15); });
    navigator.mediaSession.setActionHandler("seekforward", () => { if (element && Number.isFinite(element.duration)) element.currentTime = Math.min(element.duration, element.currentTime + 15); });
    return () => {
      for (const action of ["play", "pause", "seekbackward", "seekforward"] as const) navigator.mediaSession.setActionHandler(action, null);
      navigator.mediaSession.metadata = null;
    };
  }, [audio]);
  async function prepare() {
    const chosen = sections.find(s => s.id === section);
    if (!chosen || !voice || busy) return;
    player.current?.pause(); setBusy(true); setError(""); setReceived(0);
    const controller = new AbortController(); pending.current = controller;
    try {
      const response = await fetch("/lionheart/api/speechify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ section, voice }), signal: controller.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || "Could not prepare audio."); }
      if (!response.body || !response.headers.get("content-type")?.startsWith("audio/")) throw new Error("Speechify returned no audio.");
      const reader = response.body.getReader(); const chunks: Uint8Array<ArrayBuffer>[] = []; let bytes = 0;
      for (;;) {
        const { value, done } = await reader.read(); if (done) break;
        chunks.push(new Uint8Array(value)); bytes += value.byteLength;
        if (bytes > 100 * 1024 * 1024) { controller.abort(); throw new Error("This audio file is too large to prepare on this device."); }
        if (mounted.current) setReceived(bytes);
      }
      if (!bytes) throw new Error("Speechify returned an empty file.");
      if (!mounted.current) return;
      const url = URL.createObjectURL(new Blob(chunks, { type: "audio/mpeg" }));
      if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
      currentUrl.current = url;
      setAudio({ url, title: "Volume " + chosen.volume + " · " + chosen.title, voice: voices.find(v => v.id === voice)?.display_name || voice, filename: ("Lionheart-Volume-" + chosen.volume + "-" + chosen.title).replace(/[^a-zA-Z0-9-]+/g, "-") + ".mp3" });
    } catch (e) { if (mounted.current) setError(controller.signal.aborted ? "Preparation stopped. Previously generated audio may still count toward API usage." : e instanceof Error ? e.message : "Audio preparation failed. Please try again."); }
    finally { if (mounted.current) setBusy(false); pending.current = null; }
  }
  return <section aria-labelledby="speechify-heading" className="my-6 rounded-xl border border-[#cdbd9f] bg-[#fffdf8] p-5 text-[#34271c]">
    <h2 id="speechify-heading" className="font-serif text-2xl font-bold">Listen with Speechify</h2>
    <p className="my-3 leading-relaxed">Choose a section and narrator, prepare the audio, then tap Play. Download the MP3 to keep it for your commute. Audio uses the current studio manuscript.</p>
    {configured === false ? <p role="status" className="my-3">Speechify setup is pending. The private API connection needs to be configured before voices and audio can load.</p> : configured === null && !error ? <p role="status">Connecting to Speechify…</p> : <>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-2 font-semibold">Book section<select value={section} disabled={busy || !sections.length} onChange={e => setSection(e.target.value)} className="min-h-12 w-full rounded-md border border-[#a99678] bg-white p-3">{[1, 2].map(v => <optgroup key={v} label={"Volume " + (v === 1 ? "I" : "II")}>{sections.filter(s => s.volume === v).map(s => <option key={s.id} value={s.id} disabled={!s.available}>{s.title}{!s.available ? " (text unavailable)" : ""}</option>)}</optgroup>)}</select></label>
        <label className="flex min-w-0 flex-col gap-2 font-semibold">Speechify voice<select value={voice} disabled={busy || !voices.length} onChange={e => setVoice(e.target.value)} className="min-h-12 w-full rounded-md border border-[#a99678] bg-white p-3">{voices.map(v => <option key={v.id} value={v.id}>{v.display_name} · {v.locale}</option>)}</select></label>
      </div>
      <p className="my-3 text-sm leading-relaxed">Preparing audio uses Speechify API credit, separate from your reading subscription. This section contains approximately {(sections.find(s => s.id === section)?.characters || 0).toLocaleString()} characters. Each new preparation generates audio again. Available API voices may differ from the Speechify app.</p>
      <div className="flex flex-wrap gap-3"><button type="button" onClick={() => void prepare()} disabled={busy || !voice || !section || !configured} className={button + " bg-[#674329] text-white"}>{busy ? "Preparing audio…" : "Prepare section audio"}</button>{busy && <button type="button" onClick={() => pending.current?.abort()} className={button}>Cancel</button>}</div>
    </>}
    {busy && <p role="status" className="mt-3">Keep this page open while preparing. Received {(received / 1048576).toFixed(1)} MB. Long chapters can take a few minutes.</p>}
    {audio && <div className="mt-5 rounded-lg border border-[#cdbd9f] p-4"><p className="mb-3 font-semibold">{audio.title} · {audio.voice}</p><audio ref={player} src={audio.url} controls preload="metadata" className="w-full" onPlay={() => { window.speechSynthesis?.cancel(); if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing"; }} onPause={() => { if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused"; }} onError={() => setError("This browser could not play the audio. Download the MP3 and open it in your audio app.")} /><div className="mt-4 flex flex-wrap items-center gap-4"><label className="flex items-center gap-2">Playback speed<select value={rate} onChange={e => setRate(Number(e.target.value))} className="min-h-12 rounded-md border border-[#a99678] bg-white p-2">{[0.75, 1, 1.25, 1.5, 1.75, 2].map(r => <option key={r} value={r}>{r}×</option>)}</select></label><a href={audio.url} download={audio.filename} className={button + " inline-flex items-center underline"}>Download MP3</a></div></div>}
    <p className="mt-4 text-sm leading-relaxed">Once prepared, audio plays from a complete file on your phone. Try locking the screen after tapping Play. If your browser pauses it, use the downloaded MP3 in your audio app. Keep or download prepared audio before leaving this page.</p>
    {error && <p role="alert" className="mt-3 font-semibold text-[#922e20]">{error}</p>}
    {!busy && <button type="button" onClick={() => void connect()} className="mt-4 min-h-12 underline">Refresh Speechify connection</button>}
  </section>;
}
