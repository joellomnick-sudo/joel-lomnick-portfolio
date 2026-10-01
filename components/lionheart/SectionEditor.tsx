"use client";
import { useEffect, useRef, useState } from "react";
import { ManuscriptText } from "./ManuscriptText";

type History = { id: string; label: string; date: string; text: string };
export function SectionEditor({ id, kind, text, notes = "", title }: { id: string; kind: "chapter" | "frontMatter"; text: string; notes?: string; title: string }) {
  const notesKey = kind === "chapter" ? "Draft Notes" : "Notes";
  const [draft, setDraft] = useState(text);
  const [editorNotes, setNotes] = useState(notes);
  const [mode, setMode] = useState("write");
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<History[] | null>(null);
  const [recovery, setRecovery] = useState<{ draft: string; notes: string } | null>(null);
  const baseline = useRef({ draft: text, notes });
  const ready = useRef(false);
  const dirty = draft !== baseline.current.draft || editorNotes !== baseline.current.notes;
  const endpoint = `/lionheart/api/edit/${kind}/${id}`;
  const cacheKey = `lionheart:working:${id}`;
  useEffect(() => {
    let cancelled = false;
    fetch(endpoint).then(async r => {
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      if (cancelled) return;
      setVersion(data.revision);
      baseline.current = { draft: data.fields["Draft Text"], notes: data.fields[notesKey] };
      setDraft(data.fields["Draft Text"]); setNotes(data.fields[notesKey]);
      try { const local = JSON.parse(localStorage.getItem(cacheKey) || "null"); if (local && (local.draft !== data.fields["Draft Text"] || local.notes !== data.fields[notesKey])) setRecovery(local); } catch { /* Local storage is optional. */ }
      ready.current = true;
    }).catch(error => { if (!cancelled) setMessage(error.message); });
    return () => { cancelled = true; };
  }, [endpoint, notesKey, cacheKey]);
  useEffect(() => {
    if (!ready.current || recovery) return;
    try { if (dirty) localStorage.setItem(cacheKey, JSON.stringify({ draft, notes: editorNotes })); else localStorage.removeItem(cacheKey); } catch { /* Save remains available without local storage. */ }
    const guard = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [draft, editorNotes, dirty, cacheKey, recovery]);
  async function save() {
    setBusy(true); setMessage("");
    try {
      const r = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revision: version, fields: { "Draft Text": draft, [notesKey]: editorNotes } }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error);
      baseline.current = { draft, notes: editorNotes }; setVersion(data.revision); setHistory(null);
      try { localStorage.removeItem(cacheKey); } catch { /* Optional. */ }
      setMessage("Saved to your private manuscript. The previous version is in history.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Save failed. Your draft is still here."); }
    finally { setBusy(false); }
  }
  async function openHistory() {
    setBusy(true);
    try { const r = await fetch(`${endpoint}?history=1`); const data = await r.json(); if (!r.ok) throw new Error(data.error); setHistory(data.history); setMode("history"); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to load versions."); } finally { setBusy(false); }
  }
  function recover(value: string) {
    try { const parsed = JSON.parse(value); if (parsed.fields) { setDraft(parsed.fields["Draft Text"] || draft); setNotes(parsed.fields[notesKey] || ""); } else setDraft(value); } catch { setDraft(value); }
    setMode("write"); setMessage("Version loaded into the editor. Review it, then Save to replace the current manuscript.");
  }
  function download() {
    const url = URL.createObjectURL(new Blob([`${title}\n\n${draft}\n\nEditorial notes\n${editorNotes}`], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `${title.replace(/[^a-z0-9 -]/gi, "")}.txt`; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="lh-editor" aria-label={`${title} editor`}>
    <div className="lh-toolbar"><div className="lh-tabs" role="group" aria-label="Manuscript view">
      <button aria-pressed={mode === "write"} onClick={() => setMode("write")}>Write</button>
      <button aria-pressed={mode === "read"} onClick={() => setMode("read")}>Read</button>
      <button aria-pressed={mode === "history"} disabled={busy} onClick={openHistory}>Versions</button>
    </div><div className="lh-save"><span>{draft.trim() ? draft.trim().split(/\s+/).length.toLocaleString() : 0} words · {dirty ? "Unsaved changes" : "Saved manuscript"}</span><button className="lh-primary" disabled={!version || busy || !dirty || !!recovery} onClick={save}>{busy ? "Working…" : "Save"}</button></div></div>
    {recovery && <div className="lh-notice"><p>An unsaved draft was found on this device.</p><button onClick={() => { setDraft(recovery.draft); setNotes(recovery.notes); setRecovery(null); }}>Recover draft</button><button onClick={() => { localStorage.removeItem(cacheKey); setRecovery(null); }}>Use saved manuscript</button></div>}
    <p className="lh-message" role="status" aria-live="polite">{message}</p>
    {mode === "write" && <><label className="lh-field">Manuscript<textarea className="lh-manuscript-input" value={draft} onChange={e => setDraft(e.target.value)} spellCheck disabled={!version || busy} /></label><label className="lh-field">Your editing notes<textarea rows={5} value={editorNotes} onChange={e => setNotes(e.target.value)} disabled={!version || busy} /></label></>}
    {mode === "read" && <div className="lh-reader"><ManuscriptText text={draft} /></div>}
    {mode === "history" && <div className="lh-version-list"><h2>Recover a previous version</h2><p>Loading a version puts it in the editor for review. It does not save over your manuscript.</p>{history?.length ? history.map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.date}</p><button onClick={() => recover(item.text)} disabled={!item.text}>Load into editor</button></article>) : <p>No saved versions yet.</p>}</div>}
    <button className="lh-download" onClick={download}>Download this draft</button>
  </section>;
}
