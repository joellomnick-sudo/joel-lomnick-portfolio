"use client";
import Link from "next/link";
import { SectionEditor } from "./SectionEditor";
import type { LionheartPerson, LionheartTimelineEvent, LionheartWorld, LionheartSource } from "@/lib/lionheart-airtable";
type Props = {
  id: string; volume: 1 | 2; chapter: number; title: string; years: string; status: string;
  wordCount?: number; draftText?: string; workingSummary?: string; draftNotes?: string; draftSource?: string;
  scenes: Array<{ id: string; scene: string; narrativeNotes?: string; sourceCoverage?: string; sourceLinks?: string }>;
  discrepancies: Array<{ id: string; claim: string; status?: string; resolution?: string; evidenceNotes?: string }>;
  people: LionheartPerson[]; timeline: LionheartTimelineEvent[]; worlds: LionheartWorld[];
  sources: LionheartSource[];
  previousHref?: string; previousLabel?: string; nextHref?: string; nextLabel?: string;
};
export function ChapterExperience(props: Props) {
  return <div className="lh-workspace">
    <header className="lh-page-heading"><Link href="/lionheart">← Books</Link><p className="lionheart-kicker">Volume {props.volume} · Chapter {props.chapter} · {props.years}</p><h1>{props.title}</h1><p>{props.status}</p></header>
    <SectionEditor id={props.id} kind="chapter" title={props.title} text={props.draftText || ""} notes={props.draftNotes} />
    <details className="lh-context"><summary>People, dates, places & sources for this chapter</summary>
      <div className="lh-context-grid"><section><h2>People in the story</h2>{props.people.length ? props.people.map(person => <p key={person.id}><Link href={"/lionheart/facts#" + person.id}>{person.name}</Link> · {person.relationshipOrRole}</p>) : <p>No confirmed chapter links yet. Assign them in Story Facts.</p>}<Link href="/lionheart/facts">Edit story facts →</Link></section>
      <section><h2>Timeline</h2>{props.timeline.map(event => <p key={event.id}><strong>{event.dateOrPeriod}</strong> — {event.event}<br /><small>{event.evidenceLevel}</small></p>)}{!props.timeline.length && <p>No dated events assigned yet.</p>}</section>
      <section><h2>Places & things</h2>{props.worlds.map(world => <p key={world.id}>{world.world} · {world.type}</p>)}{!props.worlds.length && <p>No chapter links assigned yet.</p>}</section>
      <section><h2>Source context</h2><p>{props.draftSource}</p>{props.sources.map(source => <p key={source.id}>{source.sourceLink && /^https?:\/\//.test(source.sourceLink) ? <a href={source.sourceLink} target="_blank" rel="noreferrer">{source.source}</a> : source.source} · {source.evidenceLevel || "Evidence status not assigned"}</p>)}<Link href="/lionheart/sources">Find original sources →</Link></section></div>
      <h2>Unresolved claims</h2>{props.discrepancies.map(item => <article key={item.id}><h3>{item.claim}</h3><p>{item.status} · {item.resolution || item.evidenceNotes}</p></article>)}{!props.discrepancies.length && <p>No volume-specific flags linked. Unassigned flags remain in Sources.</p>}
      <details><summary>Scene research notes</summary>{props.scenes.map(scene => <article key={scene.id}><h3>{scene.scene}</h3><p>{scene.sourceCoverage} · {scene.narrativeNotes}</p><p>{scene.sourceLinks}</p></article>)}</details>
    </details>
    <nav className="lh-section-nav" aria-label="Chapter navigation">{props.previousHref && <Link href={props.previousHref}>← {props.previousLabel}</Link>}{props.nextHref && <Link href={props.nextHref}>{props.nextLabel} →</Link>}</nav>
  </div>;
}
