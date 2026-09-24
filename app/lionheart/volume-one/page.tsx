import { getLionheartChapters, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

const fallback = [
  ["The First Blueprint", "1981–1988"],
  ["Back to Rochester, Back to the Rules", "1988–1995"],
  ["The Night Childhood Ended", "1995–1997"],
  ["Most Likely to Succeed", "1997–1999"],
  ["Trash Bags and Mini-Fridges", "1999–2001"],
  ["The Rooms That Kept Me Alive", "2001–2005"],
  ["The Promised Land Never Arrived", "2005–2007"],
] as const;

export default async function VolumeOnePage() {
  const allChapters = await getLionheartChapters();
  const chapters = allChapters?.filter((chapter) => chapter.volume === 1) ?? null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Volume One</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The Making of Lionheart</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          1981–2007. Seven chapters tracing the survival system before it had a name.
        </p>

        <div className="mt-10 grid gap-5">
          {(chapters ?? fallback.map(([title, years], index) => ({
            id: `fallback-${index}`,
            title,
            volume: 1,
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
