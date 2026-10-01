"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ManuscriptText } from "./ManuscriptText";
import { compareManuscripts, wordCount } from "@/lib/manuscript-review";

type History = { id: string; label: string; date: string; text: string };
export function SectionEditor({ id, kind, text, notes = "", title }: { id: string; kind: "chapter" | "frontMatter"; text: string; notes?: string; title: string }) {
  const notesKey = kind === "chapter" ? "Draft Notes" : "Notes";
  const [draft, setDraft] = useState(text);
  const [editorNotes, setNotes] = useState(notes);
  const [authorNotes, setAuthorNotes] = useState("");
  const [selectedPassage, setSelectedPassage] = useState("");
  const [passageNote, setPassageNote] = useState("");
  const manuscriptInput = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState("write");
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<History[] | null>(null);
  const [recovery, setRecovery] = useState<{ draft: string; notes: string; authorNotes?: string } | null>(null);
  const [savedText, setSavedText] = useState(text);
  const [reviewedDraft, setReviewedDraft] = useState<string | null>(null);
  const [showUnchanged, setShowUnchanged] = useState(false);
  const changes = useMemo(() => compareManuscripts(savedText, draft), [savedText, draft]);
  const removed = changes.filter(change => change.type === "removed");
  const added = changes.filter(change => change.type === "added");
  const manuscriptChanged = draft !== savedText;
  const baseline = useRef({ draft: text, notes, authorNotes: "" });
  const ready = useRef(false);
  const dirty = draft !== baseline.current.draft || editorNotes !== baseline.current.notes || authorNotes !== baseline.current.authorNotes;
  const endpoint = `/lionheart/api/edit/${kind}/${id}`;
  const cacheKey = `lionheart:working:${id}`;
  useEffect(() => {
    let cancelled = false;
    fetch(endpoint).then(async r => {
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      if (cancelled) return;
      setVersion(data.revision);
      setSavedText(data.fields["Draft Text"]);
      baseline.current = { draft: data.fields["Draft Text"], notes: data.fields[notesKey], authorNotes: data.fields["Author Notes"] || "" };
      setAuthorNotes(data.fields["Author Notes"] || "");
      setDraft(data.fields["Draft Text"]); setNotes(data.fields[notesKey]);
      try { const local = JSON.parse(localStorage.getItem(cacheKey) || "null"); if (local && (local.draft !== data.fields["Draft Text"] || local.notes !== data.fields[notesKey] || (local.authorNotes || "") !== (data.fields["Author Notes"] || ""))) setRecovery(local); } catch { /* Local storage is optional. */ }
      ready.current = true;
    }).catch(error => { if (!cancelled) setMessage(error.message); });
    return () => { cancelled = true; };
  }, [endpoint, notesKey, cacheKey]);
  useEffect(() => {
    if (!ready.current || recovery) return;
    try { if (dirty) localStorage.setItem(cacheKey, JSON.stringify({ draft, notes: editorNotes, authorNotes })); else localStorage.removeItem(cacheKey); } catch { /* Save remains available without local storage. */ }
    const guard = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [draft, editorNotes, authorNotes, dirty, cacheKey, recovery]);
  async function save() {
    if (draft !== savedText && reviewedDraft !== draft) { setMode("review"); setMessage("Review the removed and added paragraphs before saving."); return; }
    setBusy(true); setMessage("");
    try {
      const r = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revision: version, fields: { "Draft Text": draft, [notesKey]: editorNotes, "Author Notes": authorNotes } }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error);
      baseline.current = { draft, notes: editorNotes, authorNotes }; setVersion(data.revision); setHistory(null);
      setSavedText(draft); setReviewedDraft(null);
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
    try { const parsed = JSON.parse(value); if (parsed.fields) { setDraft(parsed.fields["Draft Text"] || draft); if (typeof parsed.fields["Author Notes"] === "string") setAuthorNotes(parsed.fields["Author Notes"]); } else setDraft(value); } catch { setDraft(value); }
    setMode("review"); setReviewedDraft(null); setMessage("Version loaded as a working draft. Compare it with the saved manuscript before saving.");
  }
  function download() {
    const url = URL.createObjectURL(new Blob([`${title}\n\n${draft}\n\nAuthor notes\n${authorNotes}\n\nSource history\n${editorNotes}`], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `${title.replace(/[^a-z0-9 -]/gi, "")}.txt`; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="lh-editor" aria-label={`${title} editor`}>
    <div className="lh-toolbar"><div className="lh-tabs" role="group" aria-label="Manuscript view">
      <button aria-pressed={mode === "write"} onClick={() => setMode("write")}>Write</button>
      <button aria-pressed={mode === "read"} onClick={() => setMode("read")}>Read</button>
      <button aria-pressed={mode === "review"} onClick={() => setMode("review")}>Review changes{manuscriptChanged ? ` (${removed.length + added.length})` : ""}</button>
    </div><div className="lh-save"><span>{draft.trim() ? draft.trim().split(/\s+/).length.toLocaleString() : 0} words · {dirty ? "Unsaved changes" : "Saved manuscript"}</span><button className="lh-primary" disabled={!version || busy || !dirty || !!recovery} onClick={save}>{busy ? "Working…" : "Save"}</button></div></div>
    {recovery && <div className="lh-notice"><p>An unsaved draft was found on this device.</p><button onClick={() => { setDraft(recovery.draft); setNotes(recovery.notes); setAuthorNotes(recovery.authorNotes || ""); setRecovery(null); }}>Recover draft</button><button onClick={() => { localStorage.removeItem(cacheKey); setRecovery(null); }}>Use saved manuscript</button></div>}
    <p className="lh-message" role="status" aria-live="polite">{message}</p>
    {mode === "write" && <><label className="lh-field">Manuscript<textarea ref={manuscriptInput} className="lh-manuscript-input" value={draft} onChange={e => setDraft(e.target.value)} spellCheck disabled={!version || busy} /></label><button disabled={!version || busy} onClick={() => { const input = manuscriptInput.current; if (!input) return; const passage = draft.slice(input.selectionStart, input.selectionEnd); setSelectedPassage(passage); if (!passage) setMessage("Select a passage in the manuscript, then add a note."); }}>Add a note to selected passage</button>{selectedPassage && <div className="lh-passage-note"><blockquote>{selectedPassage}</blockquote><label className="lh-field">Your note<textarea rows={3} value={passageNote} onChange={e => setPassageNote(e.target.value)} /></label><button disabled={!passageNote.trim()} onClick={() => { setAuthorNotes(current => `${current ? current + "\n\n" : ""}Passage: ${selectedPassage}\n\nNote: ${passageNote.trim()}`); setSelectedPassage(""); setPassageNote(""); setMessage("Passage note added to your working draft. Save to keep it."); }}>Keep this note</button><button onClick={() => { setSelectedPassage(""); setPassageNote(""); }}>Cancel note</button></div>}<label className="lh-field">Your editorial notes<textarea rows={5} value={authorNotes} onChange={e => setAuthorNotes(e.target.value)} disabled={!version || busy} /></label><details><summary>Source history</summary><p>Earlier research instructions are kept separately from your own notes and manuscript.</p><p className="lh-source-history">{editorNotes || "No source history recorded."}</p></details></>}
    {mode === "read" && <div className="lh-reader"><ManuscriptText text={draft} /></div>}
    {mode === "review" && <div className="lh-review"><h2>Review your revision</h2><p>Saved: {wordCount(savedText).toLocaleString()} words. Working draft: {wordCount(draft).toLocaleString()} words. {removed.length} paragraphs removed or rewritten; {added.length} added or rewritten.</p><p>A rewritten paragraph appears once as removed and once as added. Check that its people, events, and details are preserved.</p>{removed.length > 0 && <p className="lh-notice">Removed wording is shown in full below. Saving keeps the previous manuscript in Versions.</p>}<label className="lh-review-toggle"><input type="checkbox" checked={showUnchanged} onChange={e => setShowUnchanged(e.target.checked)} /> Show unchanged paragraphs</label>{changes.filter(change => showUnchanged || change.type !== "kept").map((change, index) => <article className={`lh-change lh-change-${change.type}`} key={index}><strong>{change.type === "removed" ? "Removed from saved manuscript" : change.type === "added" ? "Added to working draft" : "Unchanged"}</strong><p>{change.text}</p></article>)}{!manuscriptChanged && <p>The manuscript text has no unsaved changes.</p>}{manuscriptChanged && <label className="lh-review-toggle"><input type="checkbox" checked={reviewedDraft === draft} onChange={e => setReviewedDraft(e.target.checked ? draft : null)} /> I have reviewed the removed and added material.</label>}<button onClick={() => setMode("write")}>Continue editing</button></div>}
    {mode === "history" && <div className="lh-version-list"><h2>Recover a previous version</h2><p>Loading a version puts it in the editor for review. It does not save over your manuscript.</p>{history?.length ? history.map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.date}</p><button onClick={() => recover(item.text)} disabled={!item.text}>Load into editor</button></article>) : <p>No saved versions yet.</p>}</div>}
    <details className="lh-draft-tools"><summary>Versions and download</summary><button disabled={busy} onClick={openHistory}>Open saved versions</button><button className="lh-download" onClick={download}>Download this draft</button></details>
  </section>;
}
