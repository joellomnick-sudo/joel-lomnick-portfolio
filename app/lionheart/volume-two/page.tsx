import Link from "next/link";
import { getLionheartChapters, getLionheartFrontMatter, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

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
  const [allChapters, frontMatter] = await Promise.all([
    getLionheartChapters(),
    getLionheartFrontMatter(2),
  ]);
  const chapters = allChapters?.filter((chapter) => chapter.volume === 2) ?? null;
  const preface = frontMatter?.find((item) => item.type === "Preface") ?? null;

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
          2007–August 2026. The adult story of what happens when survival becomes a permanent operating system. The numbered chapters are currently research builds under the August 2026 structure; the existing preface is preserved as developmental prose.
        </p>

        <div className="mt-10 grid gap-5">
          <Link
            href="/lionheart/volume-two/preface"
            className="group rounded-2xl border border-mutedGold/30 bg-[#1b130e] p-6 transition hover:border-softGold"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-softGold">Front Matter</p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">Tired of Almost</h2>
                <p className="mt-2 text-sm text-warmIvory/65">Preface</p>
              </div>
              <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-xs font-bold text-warmIvory/70">{preface?.status || "Developmental Draft"}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-warmIvory/55">
              {preface?.wordCount ? <span>{preface.wordCount.toLocaleString()} words</span> : null}
              <span className="font-bold text-softGold">Read preface →</span>
            </div>
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
              <div className="mt-5 text-xs font-bold text-softGold">Open research build →</div>
            </Link>
          ))}
        </div>

        {!isLionheartAirtableConfigured() ? (
          <p className="mt-8 text-sm text-warmIvory/55">Live private front matter and research data appear after the Airtable token is added to hosting secrets.</p>
        ) : null}
      </div>
    </section>
  );
}
