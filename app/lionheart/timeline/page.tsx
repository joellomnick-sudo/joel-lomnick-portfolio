import Link from "next/link";
import { getLionheartChapters, getLionheartScenes } from "@/lib/lionheart-airtable";

export default async function TimelinePage() {
  const [chapters, scenes] = await Promise.all([getLionheartChapters(), getLionheartScenes()]);
  const ordered = chapters ?? [];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Timeline</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The chronology behind the narrative.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          This view follows the locked 1981–August 2026 structure. Research leads are counted separately from verified facts so chronology does not become certainty by repetition.
        </p>

        <div className="relative mt-12 border-l border-mutedGold/35 pl-7">
          {ordered.length ? ordered.map((chapter) => {
            const count = (scenes ?? []).filter((scene) => scene.volume === chapter.volume && scene.chapter === chapter.chapter).length;
            const href = chapter.volume === 1 ? `/lionheart/volume-one/${chapter.chapter}` : `/lionheart/volume-two/${chapter.chapter}`;
            return (
              <article key={chapter.id} className="relative mb-9 rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
                <span className="absolute -left-[2.15rem] top-7 h-3 w-3 rounded-full bg-softGold" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Volume {chapter.volume} · Chapter {chapter.chapter} · {chapter.years}</p>
                <h2 className="mt-2 font-serif text-2xl font-bold">{chapter.title}</h2>
                {chapter.workingSummary ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-warmIvory/70">{chapter.workingSummary}</p> : null}
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-warmIvory/50">
                  <span>{chapter.status}</span>
                  <span>{count} scene/research leads</span>
                </div>
                <Link href={href} className="mt-5 inline-block text-sm font-bold text-softGold">Open chapter →</Link>
              </article>
            );
          }) : (
            <div className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6 text-sm text-warmIvory/65">
              Live chronology will appear after the private Airtable connection is available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
