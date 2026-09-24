"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ManuscriptText } from "@/components/lionheart/ManuscriptText";

type Scene = {
  id: string;
  scene: string;
  narrativeNotes?: string;
  sourceCoverage?: string;
};

type Discrepancy = {
  id: string;
  claim: string;
  status?: string;
  resolution?: string;
  evidenceNotes?: string;
};

type ChapterExperienceProps = {
  volume: 1 | 2;
  chapter: number;
  title: string;
  years: string;
  status: string;
  wordCount?: number;
  draftText?: string;
  workingSummary?: string;
  draftNotes?: string;
  draftSource?: string;
  scenes: Scene[];
  discrepancies: Discrepancy[];
  previousHref?: string;
  previousLabel?: string;
  nextHref?: string;
  nextLabel?: string;
};

export function ChapterExperience(props: ChapterExperienceProps) {
  const [mode, setMode] = useState<"reading" | "research">("reading");
  const readingMinutes = useMemo(
    () => props.wordCount ? Math.max(1, Math.ceil(props.wordCount / 230)) : null,
    [props.wordCount],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem("lionheart:last-read", JSON.stringify({
        href: `/lionheart/volume-${props.volume === 1 ? "one" : "two"}/${props.chapter}`,
        title: props.title,
        volume: props.volume,
        chapter: props.chapter,
        years: props.years,
      }));
    } catch {
      // Reading progress is a convenience only.
    }
  }, [props.chapter, props.title, props.volume, props.years]);

  return (
    <div className="lionheart-chapter">
      <header className="lionheart-chapter-header">
        <div className="mx-auto max-w-4xl">
          <Link
            href={props.volume === 1 ? "/lionheart/volume-one" : "/lionheart/volume-two"}
            className="lionheart-back-link"
          >
            ← Volume {props.volume === 1 ? "One" : "Two"}
          </Link>
          <p className="lionheart-kicker mt-8">Chapter {props.chapter} · {props.years}</p>
          <h1>{props.title}</h1>
          <div className="lionheart-meta-row">
            <span>{props.status}</span>
            {props.wordCount ? <span>{props.wordCount.toLocaleString()} words</span> : null}
            {readingMinutes ? <span>About {readingMinutes} min</span> : null}
          </div>

          <div className="lionheart-mode-switch" role="group" aria-label="Chapter view">
            <button
              type="button"
              className={mode === "reading" ? "is-active" : ""}
              onClick={() => setMode("reading")}
            >
              Reading Mode
            </button>
            <button
              type="button"
              className={mode === "research" ? "is-active" : ""}
              onClick={() => setMode("research")}
            >
              Research Mode
            </button>
          </div>
        </div>
      </header>

      {mode === "reading" ? (
        <section className="lionheart-reading-surface">
          {props.draftText ? (
            <ManuscriptText text={props.draftText} />
          ) : (
            <div className="mx-auto max-w-3xl rounded-2xl border p-6">
              <p className="text-sm leading-6">
                The chapter has a developmental draft in the private source archive, but the full prose is not duplicated into the site yet.
              </p>
            </div>
          )}
        </section>
      ) : (
        <section className="lionheart-research-surface">
          <div className="mx-auto max-w-5xl">
            <p className="lionheart-kicker">Research drawer</p>
            <h2>What sits behind this draft</h2>
            <p className="lionheart-summary">
              {props.workingSummary || "The chapter map will appear here as research is structured."}
            </p>

            {props.draftNotes ? (
              <article className="lionheart-panel mt-6">
                <p className="lionheart-kicker">Draft provenance</p>
                <p className="mt-3 text-sm leading-6">{props.draftNotes}</p>
                {props.draftSource ? <p className="mt-3 text-xs opacity-65">Source: {props.draftSource}</p> : null}
              </article>
            ) : null}

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <article className="lionheart-panel">
                <h3>Scene and research leads</h3>
                <div className="mt-5 space-y-5">
                  {props.scenes.length ? props.scenes.map((scene) => (
                    <div key={scene.id} className="lionheart-research-item">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="font-semibold">{scene.scene.replace(/^\d+\.\d+\s+/, "")}</p>
                        <span className="lionheart-status-text">{scene.sourceCoverage || "Unverified"}</span>
                      </div>
                      {scene.narrativeNotes ? <p className="mt-2 text-sm leading-6 opacity-75">{scene.narrativeNotes}</p> : null}
                    </div>
                  )) : <p className="text-sm opacity-65">No scene leads are connected yet.</p>}
                </div>
              </article>

              <article className="lionheart-panel">
                <h3>Continuity flags</h3>
                <div className="mt-5 space-y-5">
                  {props.discrepancies.length ? props.discrepancies.map((item) => (
                    <div key={item.id} className="lionheart-research-item">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="font-semibold">{item.claim}</p>
                        <span className="lionheart-status-text">{item.status || "Needs Evidence"}</span>
                      </div>
                      {item.resolution ? <p className="mt-2 text-sm leading-6 opacity-75">{item.resolution}</p> : null}
                      {!item.resolution && item.evidenceNotes ? <p className="mt-2 text-sm leading-6 opacity-75">{item.evidenceNotes}</p> : null}
                    </div>
                  )) : <p className="text-sm opacity-65">No chapter-specific discrepancy is currently logged.</p>}
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      <nav className="lionheart-chapter-nav" aria-label="Chapter navigation">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>{props.previousHref ? <Link href={props.previousHref}>← {props.previousLabel}</Link> : null}</div>
          <div>{props.nextHref ? <Link href={props.nextHref}>{props.nextLabel} →</Link> : null}</div>
        </div>
      </nav>
    </div>
  );
}
