import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterExperience } from "@/components/lionheart/ChapterExperience";
import { getLionheartChapter, getLionheartDiscrepancies, getLionheartScenes, getLionheartPeople, getLionheartTimeline, getLionheartWorlds, getLionheartSources } from "@/lib/lionheart-airtable";

import { mentionsChapter } from "@/lib/lionheart-links";

type PageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function VolumeOneChapterPage({ params }: PageProps) {
  const { chapter: chapterParam } = await params;
  const chapterNumber = Number(chapterParam);

  if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > 7) notFound();

  const [chapter, scenes, discrepancies, people, timeline, worlds, sources] = await Promise.all([
    getLionheartChapter(1, chapterNumber),
    getLionheartScenes(1, chapterNumber),
    getLionheartDiscrepancies(),
    getLionheartPeople(),
    getLionheartTimeline(),
    getLionheartWorlds(),
    getLionheartSources(),
  ]);

  if (!chapter) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="lionheart-kicker">Volume One · Chapter {chapterNumber}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">Private manuscript connection required</h1>
          <p className="mt-5 leading-7">The protected chapter route is ready, but the manuscript connection is unavailable.</p>
          <Link href="/lionheart/volume-one" className="mt-8 inline-block font-bold text-softGold">← Back to Volume One</Link>
        </div>
      </section>
    );
  }

  const chapterDiscrepancies = (discrepancies ?? []).filter((item) =>
    !/resolved|closed/i.test(item.status || "") && mentionsChapter(item.affectedChapters, 1, chapterNumber),
  );

  return (
    <ChapterExperience
      id={chapter.id}
      sources={(sources ?? []).filter(s => s.chapterRecordIds?.length ? s.chapterRecordIds.includes(chapter.id) : mentionsChapter(s.relatedChapters, 1, chapterNumber))}
      people={(people ?? []).filter(p => p.storyInclusion === "In story" && mentionsChapter(p.relatedChapters, 1, chapterNumber))}
      timeline={(timeline ?? []).filter(e => e.volume === 1 && e.chapter === chapterNumber)}
      worlds={(worlds ?? []).filter(w => mentionsChapter(w.relatedChapters, 1, chapterNumber))}
      volume={1}
      chapter={chapter.chapter}
      title={chapter.title}
      years={chapter.years}
      status={chapter.status}
      wordCount={chapter.wordCount}
      draftText={chapter.draftText}
      workingSummary={chapter.workingSummary}
      draftNotes={chapter.draftNotes}
      draftSource={chapter.draftSource}
      scenes={scenes ?? []}
      discrepancies={chapterDiscrepancies}
      previousHref={chapterNumber > 1 ? `/lionheart/volume-one/${chapterNumber - 1}` : "/lionheart/volume-one/prologue"}
      previousLabel={chapterNumber > 1 ? `Chapter ${chapterNumber - 1}` : "Prologue"}
      nextHref={chapterNumber < 7 ? `/lionheart/volume-one/${chapterNumber + 1}` : "/lionheart/volume-one/epilogue"}
      nextLabel={chapterNumber < 7 ? `Chapter ${chapterNumber + 1}` : "Epilogue"}
    />
  );
}
