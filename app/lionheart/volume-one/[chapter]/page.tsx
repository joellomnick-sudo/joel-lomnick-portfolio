import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterExperience } from "@/components/lionheart/ChapterExperience";
import { getLionheartChapter, getLionheartDiscrepancies, getLionheartScenes } from "@/lib/lionheart-airtable";

type PageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function VolumeOneChapterPage({ params }: PageProps) {
  const { chapter: chapterParam } = await params;
  const chapterNumber = Number(chapterParam);

  if (!Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > 7) notFound();

  const [chapter, scenes, discrepancies] = await Promise.all([
    getLionheartChapter(1, chapterNumber),
    getLionheartScenes(1, chapterNumber),
    getLionheartDiscrepancies(),
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
    (item.affectedChapters || "").toLowerCase().includes(`chapter ${chapterNumber}`),
  );

  return (
    <ChapterExperience
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
      previousHref={chapterNumber > 1 ? `/lionheart/volume-one/${chapterNumber - 1}` : undefined}
      previousLabel={chapterNumber > 1 ? `Chapter ${chapterNumber - 1}` : undefined}
      nextHref={chapterNumber < 7 ? `/lionheart/volume-one/${chapterNumber + 1}` : "/lionheart/volume-two"}
      nextLabel={chapterNumber < 7 ? `Chapter ${chapterNumber + 1}` : "Continue to Volume Two"}
    />
  );
}
