import Link from "next/link";
import { getLionheartChapters, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

const fallback = [
  ["Troy: Building a Home Beyond Rochester", "2007–2008"],
  ["Life After Cathy: Grief, Rhythm, and Chosen Family", "2008–2011"],
  ["Becoming an Iota, Building a Brotherhood", "2011–2014"],
  ["Richmond: Losing the Ground, Finding My Footing", "2014–2016"],
  ["Love, Home, and the Family We Choose", "2016–2020"],
  ["Rebuilding Connection, Rediscovering Myself", "2020–2024"],
  ["Forty-Five: Sharing the Load, Choosing My Own Life", "2024–October 2026"],
] as const;

export default async function VolumeTwoPage() {
  const allChapters = await getLionheartChapters();
  const chapters = allChapters?.filter((chapter) => chapter.volume === 2) ?? null;

  const displayChapters = chapters ?? fallback.map(([title, years], index) => ({
    id: `fallback-${index}`,
    title,
    volume: 2,
    chapter: index + 1,
    years,
    status: "Researching",
    workingSummary: undefined,
    wordCount: undefined,
  }));

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Volume Two</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The Cost of Being Lionheart</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          2007–October 2026. The adult story of what happens when survival becomes a permanent operating system. The refreshed private edition now carries the research timeline beyond the August 2026 Okinawa assignment into September and early October, while keeping new findings separated by evidence status across the prologue, seven chapters, and epilogue.
        </p>

        <div className="mt-10 grid gap-5">
          <Link href="/lionheart/volume-two/prologue" className="group rounded-2xl border border-mutedGold/30 bg-[#1b130e] p-6 transition hover:border-softGold">
            <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">Prologue</h2>
            <p className="mt-3 text-sm text-warmIvory/65">Read the Volume Two prologue →</p>
          </Link>

          {displayChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/lionheart/volume-two/${chapter.chapter}`}
              className="group rounded-2xl border border-warmIvory/10 bg-richBlack p-6 transition hover:border-mutedGold"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-softGold">Chapter {chapter.chapter} · {chapter.years}</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold group-hover:text-softGold">{chapter.title}</h2>
                </div>
                <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-xs font-bold text-warmIvory/70">{chapter.status}</span>
              </div>
              {chapter.workingSummary ? <p className="mt-4 whitespace-pre-line text-sm leading-6 text-warmIvory/75">{chapter.workingSummary}</p> : null}
              <div className="mt-5 text-xs font-bold text-softGold">Read chapter →</div>
            </Link>
          ))}

          <Link href="/lionheart/volume-two/epilogue" className="group rounded-2xl border border-mutedGold/30 bg-[#1b130e] p-6 transition hover:border-softGold">
            <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">Epilogue</h2>
            <p className="mt-3 text-sm text-warmIvory/65">Read the Volume Two epilogue →</p>
          </Link>
        </div>

        {!isLionheartAirtableConfigured() ? (
          <p className="mt-8 text-sm text-warmIvory/55">Live private front matter and research data appear after the Airtable token is added to hosting secrets.</p>
        ) : null}
      </div>
    </section>
  );
}
