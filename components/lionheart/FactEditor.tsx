"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FactEditor({ kind, id, title }: { kind: "person" | "event" | "world" | "source"; id: string; title: string }) {
  const router = useRouter();
  const [fields, setFields] = useState<Record<string, string> | null>(null);
  const [revision, setRevision] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [versions, setVersions] = useState<Array<{ id: string; label: string; text: string }> | null>(null);
  const endpoint = `/lionheart/api/edit/${kind}/${id}`;
  async function open() {
    setBusy(true);
    try { const r = await fetch(endpoint); const data = await r.json(); if (!r.ok) throw new Error(data.error); setFields(data.fields); setRevision(data.revision); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to open record."); } finally { setBusy(false); }
  }
  async function save() {
    setBusy(true); setMessage("");
    try { const r = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields, revision }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error); setFields(data.fields); setRevision(data.revision); setDirty(false); setVersions(null); setMessage("Saved. The directory and chapter references are refreshing."); router.refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Save failed."); } finally { setBusy(false); }
  }
  async function history() {
    setBusy(true);
    try { const r = await fetch(`${endpoint}?history=1`); const data = await r.json(); if (!r.ok) throw new Error(data.error); setVersions(data.history); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to open history."); } finally { setBusy(false); }
  }
  const choices: Record<string, string[]> = {
    "Story Inclusion": ["In story", "Needs Joel's review", "Source only"],
    "Birth Date Status": ["Exact in Source", "Month/Day Only", "Approximate", "Needs Verification", "Not Found"],
  };
  return <div className="lh-fact-editor">
    {!fields ? <button onClick={open} disabled={busy}>Edit {title}</button> : <>
      {Object.entries(fields).map(([key, value]) => <label className="lh-field" key={key}>{key}{choices[key] ? <select value={value} disabled={busy} onChange={e => { setFields({ ...fields, [key]: e.target.value }); setDirty(true); }}><option value="">Choose…</option>{choices[key].map(item => <option key={item}>{item}</option>)}</select> : <textarea rows={/Notes|Basis/.test(key) ? 4 : 2} value={value} disabled={busy} onChange={e => { const next = { ...fields, [key]: e.target.value }; if (key === "Birth Date") next["Birth Date Status"] = "Needs Verification"; setFields(next); setDirty(true); }} />}</label>)}
      <p className="lh-help">Record the source for a correction. Changing a birth date marks it for verification until you choose its evidence status. Fact edits do not silently rewrite manuscript sentences.</p>
      <div className="lh-tabs"><button className="lh-primary" disabled={busy || !dirty} onClick={save}>Save fact</button><button disabled={busy} onClick={history}>Versions</button><button disabled={busy} onClick={() => { if (!dirty || window.confirm("Discard unsaved changes to this fact?")) { setFields(null); setDirty(false); } }}>Close</button></div>
      {versions && <div>{versions.length ? versions.map(item => <article key={item.id}><p>{item.label}</p><button onClick={() => { try { const snapshot = JSON.parse(item.text); if (snapshot.fields) { setFields(snapshot.fields); setDirty(true); setMessage("Previous facts loaded for review. Save when ready."); } } catch { setMessage("This version contains manuscript text, not a fact record."); } }}>Load previous facts</button></article>) : <p>No earlier fact edits saved yet.</p>}</div>}
    </>}
    <p role="status">{message}</p>
  </div>;
}
