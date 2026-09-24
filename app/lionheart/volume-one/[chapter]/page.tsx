import Link from "next/link";
import { notFound } from "next/navigation";
import { ManuscriptText } from "@/components/lionheart/ManuscriptText";
import { getLionheartChapter, getLionheartDiscrepancies, getLionheartScenes } from "@/lib/lionheart-airtable";

type PageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function VolumeOneChapterPage({ params }: PageProps) {
  const { chapter: chapterParam } = await params;
  const chapterNumber = Number(chapterParam);

  if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > 7) {
    notFound();
  }

  const [chapter, scenes, discrepancies] = await Promise.all([
    getLionheartChapter(1, chapterNumber),
    getLionheartScenes(1, chapterNumber),
    getLionheartDiscrepancies(),
  ]);

  if (!chapter) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Volume One · Chapter {chapterNumber}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">Private manuscript connection required</h1>
          <p className="mt-5 leading-7 text-warmIvory/75">
            The protected chapter route is ready, but the chapter manuscript can only load after the private Airtable token is configured in hosting secrets.
          </p>
          <Link href="/lionheart/volume-one" className="mt-8 inline-block font-bold text-softGold">← Back to Volume One</Link>
        </div>
      </section>
    );
  }

  const chapterDiscrepancies = (discrepancies ?? []).filter((item) =>
    (item.affectedChapters || "").toLowerCase().includes(`chapter ${chapterNumber}`),
  );

  const previous = chapterNumber > 1 ? chapterNumber - 1 : null;
  const next = chapterNumber < 7 ? chapterNumber + 1 : null;

  return (
    <div>
      <header className="border-b border-warmIvory/10 bg-richBlack px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/lionheart/volume-one" className="text-sm font-bold text-softGold">← Volume One</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-softGold">Chapter {chapter.chapter} · {chapter.years}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-6xl">{chapter.title}</h1>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-warmIvory/70">{chapter.status}</span>
            {chapter.wordCount ? <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-warmIvory/70">{chapter.wordCount.toLocaleString()} words</span> : null}
            <span className="rounded-full border border-mutedGold/35 px-3 py-1 text-softGold">Developmental draft · verification in progress</span>
          </div>
        </div>
      </header>

      <section className="bg-[#17100c] px-6 py-12 sm:py-16">
        {chapter.draftText ? (
          <ManuscriptText text={chapter.draftText} />
        ) : (
          <div className="mx-auto max-w-3xl rounded-2xl border border-mutedGold/25 bg-richBlack p-6">
            <p className="text-sm leading-6 text-warmIvory/70">No private draft text is currently stored for this chapter.</p>
          </div>
        )}
      </section>

      <section className="border-t border-warmIvory/10 bg-softBlack px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Research drawer</p>
          <h2 className="mt-3 font-serif text-3xl font-bold">What sits behind this draft</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-6 text-warmIvory/70">
            {chapter.workingSummary || "The chapter map will appear here as research is structured."}
          </p>

          {chapter.draftNotes ? (
            <div className="mt-6 rounded-2xl border border-mutedGold/25 bg-richBlack p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Draft provenance</p>
              <p className="mt-3 text-sm leading-6 text-warmIvory/70">{chapter.draftNotes}</p>
              {chapter.draftSource ? <p className="mt-3 text-xs text-warmIvory/50">Source: {chapter.draftSource}</p> : null}
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <h3 className="font-serif text-2xl font-bold">Scene and research leads</h3>
              <div className="mt-5 space-y-5">
                {scenes?.length ? scenes.map((scene) => (
                  <div key={scene.id} className="border-b border-warmIvory/10 pb-4 last:border-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="font-semibold text-warmIvory">{scene.scene.replace(/^\d+\.\d+\s+/, "")}</p>
                      <span className="text-xs font-bold text-softGold">{scene.sourceCoverage || "Unverified"}</span>
                    </div>
                    {scene.narrativeNotes ? <p className="mt-2 text-sm leading-6 text-warmIvory/65">{scene.narrativeNotes}</p> : null}
                  </div>
                )) : <p className="text-sm text-warmIvory/60">No scene leads are connected yet.</p>}
              </div>
            </article>

            <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <h3 className="font-serif text-2xl font-bold">Continuity flags</h3>
              <div className="mt-5 space-y-5">
                {chapterDiscrepancies.length ? chapterDiscrepancies.map((item) => (
                  <div key={item.id} className="border-b border-warmIvory/10 pb-4 last:border-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="font-semibold">{item.claim}</p>
                      <span className="text-xs font-bold text-softGold">{item.status || "Needs Evidence"}</span>
                    </div>
                    {item.resolution ? <p className="mt-2 text-sm leading-6 text-warmIvory/65">{item.resolution}</p> : null}
                    {!item.resolution && item.evidenceNotes ? <p className="mt-2 text-sm leading-6 text-warmIvory/65">{item.evidenceNotes}</p> : null}
                  </div>
                )) : <p className="text-sm text-warmIvory/60">No chapter-specific discrepancy is currently logged.</p>}
              </div>
            </article>
          </div>
        </div>
      </section>

      <nav className="border-t border-warmIvory/10 bg-richBlack px-6 py-8" aria-label="Chapter navigation">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            {previous ? <Link href={`/lionheart/volume-one/${previous}`} className="font-bold text-softGold">← Chapter {previous}</Link> : null}
          </div>
          <div>
            {next ? <Link href={`/lionheart/volume-one/${next}`} className="font-bold text-softGold">Chapter {next} →</Link> : <Link href="/lionheart/volume-two" className="font-bold text-softGold">Continue to Volume Two →</Link>}
          </div>
        </div>
      </nav>
    </div>
  );
}
