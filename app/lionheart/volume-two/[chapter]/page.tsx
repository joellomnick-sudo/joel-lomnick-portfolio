import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterExperience } from "@/components/lionheart/ChapterExperience";
import { getLionheartChapter, getLionheartDiscrepancies, getLionheartScenes, getLionheartPeople, getLionheartTimeline, getLionheartWorlds, getLionheartSources } from "@/lib/lionheart-airtable";

import { mentionsChapter } from "@/lib/lionheart-links";

type PageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function VolumeTwoChapterPage({ params }: PageProps) {
  const { chapter: chapterParam } = await params;
  const chapterNumber = Number(chapterParam);

  if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > 7) notFound();

  const [chapter, scenes, discrepancies, people, timeline, worlds, sources] = await Promise.all([
    getLionheartChapter(2, chapterNumber),
    getLionheartScenes(2, chapterNumber),
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
          <p className="lionheart-kicker">Volume Two · Chapter {chapterNumber}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">Private research connection required</h1>
          <p className="mt-5 leading-7">The protected chapter route is ready, but the chapter data connection is unavailable.</p>
          <Link href="/lionheart/volume-two" className="mt-8 inline-block font-bold text-softGold">← Back to Volume Two</Link>
        </div>
      </section>
    );
  }

  const chapterDiscrepancies = (discrepancies ?? []).filter((item) =>
    mentionsChapter(item.affectedChapters, 2, chapterNumber),
  );

  return (
    <ChapterExperience
      id={chapter.id}
      sources={(sources ?? []).filter(s => mentionsChapter(s.relatedChapters, 2, chapterNumber))}
      people={(people ?? []).filter(p => p.storyInclusion === "In story" && mentionsChapter(p.relatedChapters, 2, chapterNumber))}
      timeline={(timeline ?? []).filter(e => e.volume === 2 && e.chapter === chapterNumber)}
      worlds={(worlds ?? []).filter(w => mentionsChapter(w.relatedChapters, 2, chapterNumber))}
      volume={2}
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
      previousHref={chapterNumber > 1 ? `/lionheart/volume-two/${chapterNumber - 1}` : "/lionheart/volume-two/prologue"}
      previousLabel={chapterNumber > 1 ? `Chapter ${chapterNumber - 1}` : "Prologue"}
      nextHref={chapterNumber < 7 ? `/lionheart/volume-two/${chapterNumber + 1}` : "/lionheart/volume-two/epilogue"}
      nextLabel={chapterNumber < 7 ? `Chapter ${chapterNumber + 1}` : "Epilogue"}
    />
  );
}
