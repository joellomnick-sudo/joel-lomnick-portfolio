"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserNarrator, type NarratorState } from "@/lib/browser-narrator";
import { narrationPassages } from "@/lib/lionheart-listening";
import { curatedVoices, voiceLabel } from "@/lib/lionheart-voices";

type Book = { volume: 1 | 2; title: string; text: string; complete: boolean };
const rates = [0.75, 1, 1.25, 1.5, 1.75, 2];
const buttonStyle = "min-h-12 rounded-lg border border-[#a99678] px-5 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export function SimpleBookReader({ books }: { books: Book[] }) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [state, setState] = useState<NarratorState>("ready");
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState("");
  const [part, setPart] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const engine = useRef<BrowserNarrator | null>(null);
  const active = useRef<1 | 2 | null>(null);
  const preview = useRef<SpeechSynthesisUtterance | null>(null);
  const choices = useMemo(() => curatedVoices(voices), [voices]);
  const choice = choices.find(v => v.voice.voiceURI === voiceURI) || choices[0];
  const male = choices.filter(v => v.gender === "male");
  const female = choices.filter(v => v.gender === "female");
  const parts = useMemo(() => books.map(b => ({ volume: b.volume, passages: narrationPassages(b.text) })), [books]);

  const stopPreview = useCallback(() => {
    if (preview.current) {
      preview.current = null;
      window.speechSynthesis.cancel();
    }
    setPreviewing(false);
  }, []);
  const refreshVoices = useCallback(() => {
    if ("speechSynthesis" in window) setVoices(window.speechSynthesis.getVoices());
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setAvailable(false);
      return;
    }
    setAvailable(true);
    const speech = window.speechSynthesis;
    engine.current = new BrowserNarrator(
      { synthesis: speech, utterance: text => new SpeechSynthesisUtterance(text) },
      (s, cursor, problem) => { setState(s); setPart(cursor.passage); if (problem) setError(problem); },
    );
    refreshVoices();
    speech.addEventListener("voiceschanged", refreshVoices);
    const exit = () => { stopPreview(); engine.current?.dispose(); };
    const restore = (event: PageTransitionEvent) => {
      if (event.persisted) { setState("paused"); refreshVoices(); }
    };
    window.addEventListener("pagehide", exit);
    window.addEventListener("pageshow", restore);
    return () => {
      stopPreview();
      engine.current?.dispose();
      engine.current = null;
      speech.removeEventListener("voiceschanged", refreshVoices);
      window.removeEventListener("pagehide", exit);
      window.removeEventListener("pageshow", restore);
    };
  }, [refreshVoices, stopPreview]);

  useEffect(() => {
    // Never let the browser silently substitute a filtered-out default voice.
    stopPreview();
    if (!choice) engine.current?.pause();
    engine.current?.configure(speed, choice?.voice || null);
  }, [speed, choice, stopPreview]);

  function listen(volume: 1 | 2) {
    if (!choice) return;
    stopPreview();
    setError("");
    setSelected(volume);
    if (active.current !== volume) {
      engine.current?.load(parts.find(p => p.volume === volume)?.passages || []);
      active.current = volume;
    }
    engine.current?.configure(speed, choice.voice);
    engine.current?.play();
  }

  function previewVoice() {
    if (!choice) return;
    stopPreview();
    engine.current?.pause();
    setError("");
    const utterance = new SpeechSynthesisUtterance("Welcome to Lionheart. Settle in, and enjoy the journey. This is a preview of your reading voice.");
    utterance.voice = choice.voice;
    utterance.lang = choice.voice.lang;
    utterance.rate = speed;
    const finish = () => {
      if (preview.current !== utterance) return false;
      preview.current = null;
      setPreviewing(false);
      return true;
    };
    utterance.onend = finish;
    utterance.onerror = () => { if (finish()) setError("This voice could not preview. Try another voice."); };
    preview.current = utterance;
    setPreviewing(true);
    try { window.speechSynthesis.resume(); window.speechSynthesis.speak(utterance); }
    catch { if (finish()) setError("This voice could not preview. Try another voice."); }
  }

  const book = books.find(b => b.volume === selected);
  const total = parts.find(b => b.volume === selected)?.passages.length || 0;
  return <section id="read-aloud" aria-label="Listen to Lionheart" className="my-6 rounded-xl border border-[#cdbd9f] bg-[#fffdf8] p-5 text-[#34271c]">
    <h2 className="font-serif text-2xl font-bold">Listen to your books</h2>
    <p className="my-3 leading-relaxed">Free read-aloud using your phone’s voices. Reads the current studio manuscripts; the PDF downloads remain the dated October 11 editions.</p>
    {available === false ? <p role="alert">Read-aloud is unavailable in this browser. Try Safari on your iPhone or Chrome on Android.</p> : <>
      <div className="my-4 flex flex-wrap gap-3">
        {books.map(b => <button key={b.volume} type="button" onClick={() => listen(b.volume)} disabled={!available || !choice || !b.complete || !b.text.trim()} className={buttonStyle + " bg-[#674329] font-semibold text-white"}>
          {active.current === b.volume && (state === "paused" || state === "error") ? "Resume" : "Listen to"} Volume {b.volume === 1 ? "I" : "II"}
        </button>)}
        <button type="button" onClick={() => engine.current?.pause()} disabled={state !== "playing"} className={buttonStyle}>Pause</button>
        <button type="button" onClick={() => { stopPreview(); engine.current?.load([]); active.current = null; setPart(0); setError(""); }} disabled={!active.current && !previewing} className={buttonStyle}>Stop</button>
      </div>
      <div className="my-4 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-2 font-semibold"><span id="book-reader-speed-label">Speed</span>
          <select aria-labelledby="book-reader-speed-label" value={speed} onChange={e => { stopPreview(); setSpeed(Number(e.target.value)); }} className="min-h-12 rounded-md border border-[#a99678] bg-white px-3 py-2">
            {rates.map(r => <option key={r} value={r}>{r}×</option>)}
          </select>
        </label>
        <label className="flex min-w-0 max-w-full flex-col gap-2 font-semibold"><span id="book-reader-voice-label">Voice</span>
          <select aria-labelledby="book-reader-voice-label" value={choice?.voice.voiceURI || ""} disabled={!choices.length} aria-describedby="voice-availability" onChange={e => { stopPreview(); setError(""); setVoiceURI(e.target.value); }} className="min-h-12 max-w-full rounded-md border border-[#a99678] bg-white px-3 py-2 disabled:opacity-50">
            {!choices.length && <option value="">No recommended voices available</option>}
            {male.length > 0 && <optgroup label="Male · US & UK">{male.map(v => <option key={v.voice.voiceURI} value={v.voice.voiceURI}>{voiceLabel(v)}</option>)}</optgroup>}
            {female.length > 0 && <optgroup label="Female · US & UK">{female.map(v => <option key={v.voice.voiceURI} value={v.voice.voiceURI}>{voiceLabel(v)}</option>)}</optgroup>}
          </select>
        </label>
        <button type="button" disabled={!choice || !available} onClick={previewing ? stopPreview : previewVoice} className={buttonStyle}>{previewing ? "Stop preview" : "Preview voice"}</button>
        <button type="button" disabled={!available} onClick={refreshVoices} className={buttonStyle}>Refresh voices</button>
      </div>
      <p id="voice-availability" className="text-sm leading-relaxed" aria-live="polite">
        {available === null ? "Loading your phone’s voices…" : male.length + " of 5 male · " + female.length + " of 5 female voices available here."}
        {" "}US and UK English only. Enhanced, Premium and Natural versions are preferred; novelty and older robotic voices are excluded. Preview to find your favorite.
      </p>
      <details className="my-4 rounded-lg border border-[#cdbd9f] p-3 text-sm leading-relaxed">
        <summary className="cursor-pointer font-semibold">Want more natural voices?</summary>
        <p className="mt-3">On iPhone, open Settings → Accessibility → Read &amp; Speak (called Spoken Content on some versions) → Voices → English. Download Enhanced or Premium versions if offered, then return here and tap Refresh voices. You may need to reopen this page.</p>
        <p className="mt-3">Voices to look for: male — Alex, Nathan, Evan (US), Daniel, Oliver (UK); female — Ava, Allison, Samantha (US), Kate, Serena (UK). Availability varies by phone. This player adds no voice subscription or narration fee.</p>
        <p className="mt-3">Your browser controls which installed voices it shares with this page. Some phones expose fewer than ten, and downloading a voice does not guarantee it will appear here. Only usable browser voices appear in the menu.</p>
        <a className="mt-3 inline-block underline" href="https://support.apple.com/guide/iphone/hear-whats-on-the-screen-or-typed-iph96b214f0/ios" target="_blank" rel="noopener noreferrer">Apple’s voice settings guide</a>
      </details>
      {active.current && <p role="status" aria-live="polite">{state === "playing" ? "Reading" : state === "paused" ? "Paused" : state === "finished" ? "Finished" : state === "error" ? "Speech stopped" : "Ready"} · Volume {selected === 1 ? "I" : "II"} · {book?.title}{state === "playing" || state === "paused" ? " · Passage " + (part + 1) + " of " + total : ""}</p>}
    </>}
    {books.filter(b => !b.complete).map(b => <p key={b.volume} role="alert">Volume {b.volume === 1 ? "I" : "II"} has missing manuscript text. Read-aloud is unavailable until its text is restored.</p>)}
    <p className="mt-4 text-sm leading-relaxed text-[#655443]">Keep this page open while listening. Your phone may pause speech when the screen locks; unlock it and tap Resume. Some voices need an internet connection. Stop or leaving this page ends the session.</p>
    {error && <p role="alert" className="mt-3 font-semibold text-[#922e20]">{error}</p>}
  </section>;
}
