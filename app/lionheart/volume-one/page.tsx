import Link from "next/link";
import { getLionheartChapters, getLionheartFrontMatter, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

const fallback = [
  ["A Family Scattered, a Boy Taking Root", "1981–1988"],
  ["Rochester Raised Me: Rules, Wonder, and Belonging", "1988–1995"],
  ["Sterling Street: The Boy Who Became a Protector", "1995–1997"],
  ["Edison Tech: Big Dreams and a Life Beyond the Grades", "1997–1999"],
  ["RIT: Finding My People, Losing My Certainty", "1999–2001"],
  ["Finding My Rhythm, Earning My Place", "2001–2005"],
  ["Corn Hill: A Degree, a Home, and the Need to Leave", "2005–2007"],
] as const;

export default async function VolumeOnePage() {
  const [allChapters, frontMatter] = await Promise.all([
    getLionheartChapters(),
    getLionheartFrontMatter(1),
  ]);
  const chapters = allChapters?.filter((chapter) => chapter.volume === 1) ?? null;
  const prologue = frontMatter?.find((item) => item.type === "Prologue") ?? null;

  const displayChapters = chapters ?? fallback.map(([title, years], index) => ({
    id: `fallback-${index}`,
    title,
    volume: 1,
    chapter: index + 1,
    years,
    status: "Researching",
    workingSummary: undefined,
    wordCount: undefined,
  }));

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Volume One</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The Making of Lionheart</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          1981–2007. Seven chapters tracing the survival system before it had a name. Each chapter opens into a protected reading page with its research trail kept separate from the prose.
        </p>

        <div className="mt-10 grid gap-5">
          <Link
            href="/lionheart/volume-one/prologue"
            className="group rounded-2xl border border-mutedGold/30 bg-[#1b130e] p-6 transition hover:border-softGold"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-softGold">Front Matter</p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">Prologue</h2>
              <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-xs font-bold text-warmIvory/70">{prologue?.status || "Developmental Draft"}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-warmIvory/55">
              {prologue?.wordCount ? <span>{prologue.wordCount.toLocaleString()} words</span> : null}
              <span className="font-bold text-softGold">Read prologue →</span>
            </div>
          </Link>

          {displayChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/lionheart/volume-one/${chapter.chapter}`}
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
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-warmIvory/55">
                {chapter.wordCount ? <span>{chapter.wordCount.toLocaleString()} words</span> : null}
                <span className="font-bold text-softGold">Read chapter →</span>
              </div>
            </Link>
          ))}

          <Link href="/lionheart/volume-one/epilogue" className="group rounded-2xl border border-mutedGold/30 bg-[#1b130e] p-6 transition hover:border-softGold">
            <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">Epilogue</h2>
            <p className="mt-3 text-sm text-warmIvory/65">Read the Volume One epilogue →</p>
          </Link>
        </div>

        {!isLionheartAirtableConfigured() ? (
          <p className="mt-8 text-sm text-warmIvory/55">The chapter index is available, but private manuscript text appears only after the Airtable token is added to hosting secrets.</p>
        ) : null}
      </div>
    </section>
  );
}
