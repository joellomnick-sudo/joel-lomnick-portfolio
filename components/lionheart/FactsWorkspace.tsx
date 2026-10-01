"use client";
import Link from "next/link";
import { useState } from "react";
import { FactEditor } from "./FactEditor";
import type { LionheartPerson, LionheartTimelineEvent, LionheartWorld } from "@/lib/lionheart-airtable";

export function FactsWorkspace({ people, timeline, worlds }: { people: LionheartPerson[]; timeline: LionheartTimelineEvent[]; worlds: LionheartWorld[] }) {
  const [tab, setTab] = useState("people");
  const [query, setQuery] = useState("");
  const [inclusion, setInclusion] = useState("In story");
  const matches = (values: unknown[]) => values.join(" ").toLowerCase().includes(query.toLowerCase());
  return <><div className="lh-tabs" role="group" aria-label="Story facts"><button aria-pressed={tab === "people"} onClick={() => setTab("people")}>People</button><button aria-pressed={tab === "timeline"} onClick={() => setTab("timeline")}>Timeline</button><button aria-pressed={tab === "worlds"} onClick={() => setTab("worlds")}>Places & things</button></div>
    <label className="lh-field">Find a fact<input type="search" value={query} onChange={e => setQuery(e.target.value)} /></label>
    {tab === "people" && <><label className="lh-field">Show people<select value={inclusion} onChange={e => setInclusion(e.target.value)}><option>In story</option><option>Needs Joel&apos;s review</option><option>Source only</option><option>All people</option></select></label><p className="lh-help">You decide who belongs in the book. A contact or email mention alone does not establish story relevance.</p>
      <div className="lh-facts-list">{people.filter(p => (inclusion === "All people" || (p.storyInclusion || "Needs Joel's review") === inclusion) && matches([p.name, p.relationshipOrRole, p.relatedChapters, p.notes])).map(person => <article key={person.id} id={person.id}><h2>{person.name}</h2><p>{person.relationshipOrRole}</p><p><strong>Birth date:</strong> {person.birthDate || "Not established"} · {person.birthDateStatus || "Needs verification"}</p><p><strong>Chapter references:</strong> {person.relatedChapters || "Not assigned"}</p><p><strong>Source:</strong> {person.sourceBasis || "No source recorded"}</p>{person.notes && <details><summary>Notes</summary><p>{person.notes}</p></details>}<FactEditor kind="person" id={person.id} title={person.name} /></article>)}</div></>}
    {tab === "timeline" && <div className="lh-facts-list">{timeline.filter(e => matches([e.dateOrPeriod, e.event, e.place, e.sourceNotes])).map(event => <article key={event.id}><p className="lionheart-kicker">{event.dateOrPeriod}</p><h2>{event.event}</h2><p>{event.place}</p><p>{event.evidenceLevel} · {event.status}</p><p>{event.sourceNotes}</p>{event.volume > 0 && event.chapter > 0 && <Link href={`/lionheart/volume-${event.volume === 1 ? "one" : "two"}/${event.chapter}`}>Volume {event.volume}, Chapter {event.chapter} →</Link>}<FactEditor kind="event" id={event.id} title="timeline entry" /></article>)}</div>}
    {tab === "worlds" && <div className="lh-facts-list">{worlds.filter(w => matches([w.world, w.type, w.notes])).map(world => <article key={world.id}><h2>{world.world}</h2><p>{world.type}</p><p>{world.relatedChapters}</p><p>{world.notes}</p><FactEditor kind="world" id={world.id} title="place or thing" /></article>)}</div>}
  </>;
}
