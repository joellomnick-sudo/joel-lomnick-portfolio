import { getLionheartChapters, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

const fallback = [
  ["The Chrysalis", "2007–2008"],
  ["Grief Learned to Dance", "2008–2011"],
  ["Brotherhood Became Work", "2011–2014"],
  ["The Floor Vanished", "2014–2016"],
  ["The House Inside Me", "2016–2020"],
  ["The Builder Became Visible", "2020–2024"],
  ["The Backup Generator Trips", "2024–August 2026"],
] as const;

export default async function VolumeTwoPage() {
  const allChapters = await getLionheartChapters();
  const chapters = allChapters?.filter((chapter) => chapter.volume === 2) ?? null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Volume Two</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The Cost of Being Lionheart</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          2007–August 2026. The adult story of what happens when survival becomes a permanent operating system.
        </p>

        <div className="mt-10 grid gap-5">
          {(chapters ?? fallback.map(([title, years], index) => ({
            id: `fallback-${index}`,
            title,
            volume: 2,
            chapter: index + 1,
            years,
            status: "Researching",
          }))).map((chapter) => (
            <article key={chapter.id} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-softGold">Chapter {chapter.chapter} · {chapter.years}</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold">{chapter.title}</h2>
                </div>
                <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-xs font-bold text-warmIvory/70">{chapter.status}</span>
              </div>
              {chapter.workingSummary ? <p className="mt-4 text-sm leading-6 text-warmIvory/75">{chapter.workingSummary}</p> : null}
              {chapter.wordCount ? <p className="mt-4 text-xs text-warmIvory/55">{chapter.wordCount.toLocaleString()} words</p> : null}
            </article>
          ))}
        </div>

        {!isLionheartAirtableConfigured() ? (
          <p className="mt-8 text-sm text-warmIvory/55">Live editorial status will appear here after the private Airtable token is added to hosting secrets.</p>
        ) : null}
      </div>
    </section>
  );
}
