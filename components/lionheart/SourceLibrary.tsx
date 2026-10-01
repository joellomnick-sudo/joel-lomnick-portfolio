"use client";
import { useState } from "react";
import { FactEditor } from "./FactEditor";
import type { LionheartSource } from "@/lib/lionheart-airtable";
export function SourceLibrary({ sources }: { sources: LionheartSource[] }) {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("folders");
  return <><div className="lh-tabs" role="group" aria-label="Source collection"><button aria-pressed={scope === "folders"} onClick={() => setScope("folders")}>Organized folders</button><button aria-pressed={scope === "manuscripts"} onClick={() => setScope("manuscripts")}>Manuscripts & guidance</button><button aria-pressed={scope === "all"} onClick={() => setScope("all")}>All sources</button></div><label className="lh-field">Find a source<input type="search" value={query} onChange={e => setQuery(e.target.value)} /></label><div className="lh-facts-list">{sources.filter(s => (scope === "all" || (scope === "folders" ? /Dropbox collection|People references/.test(s.source) : /Lionheart|Master|Book Updates|Author-approved|Preface/.test(s.source))) && [s.source, s.type, s.notes, s.evidenceLevel].join(" ").toLowerCase().includes(query.toLowerCase())).map(source => <article key={source.id} id={source.id}><h2>{source.source}</h2><p>{[source.type, source.dateOrPeriod, source.evidenceLevel].filter(Boolean).join(" · ")}</p>{source.relatedChapters && <p><strong>Chapter references:</strong> {source.relatedChapters}</p>}<details><summary>Source notes & chapter links</summary><p>{source.notes}</p><FactEditor kind="source" id={source.id} title="source reference" /></details>{source.sourceLink && /^https?:\/\//.test(source.sourceLink) && <a href={source.sourceLink} target="_blank" rel="noreferrer">Open source →</a>}</article>)}</div></>;
}
