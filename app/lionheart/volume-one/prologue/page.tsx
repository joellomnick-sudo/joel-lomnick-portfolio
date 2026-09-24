import Link from "next/link";
import { ManuscriptText } from "@/components/lionheart/ManuscriptText";
import { getLionheartFrontMatterSection } from "@/lib/lionheart-airtable";

export default async function VolumeOneProloguePage() {
  const section = await getLionheartFrontMatterSection(1, "Prologue");

  return (
    <div>
      <header className="border-b border-warmIvory/10 bg-richBlack px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/lionheart/volume-one" className="text-sm font-bold text-softGold">← Volume One</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-softGold">Front Matter</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-6xl">Prologue</h1>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-warmIvory/70">{section?.status || "Developmental Draft"}</span>
            {section?.wordCount ? <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-warmIvory/70">{section.wordCount.toLocaleString()} words</span> : null}
          </div>
        </div>
      </header>
      <section className="bg-[#17100c] px-6 py-12 sm:py-16">
        {section?.draftText ? <ManuscriptText text={section.draftText} /> : (
          <div className="mx-auto max-w-3xl rounded-2xl border border-mutedGold/25 bg-richBlack p-6">
            <p className="text-sm leading-6 text-warmIvory/70">The private prologue will appear after the Airtable connection is configured.</p>
          </div>
        )}
      </section>
      <footer className="border-t border-warmIvory/10 bg-richBlack px-6 py-8">
        <div className="mx-auto flex max-w-4xl justify-end">
          <Link href="/lionheart/volume-one/1" className="font-bold text-softGold">Begin Chapter 1 →</Link>
        </div>
      </footer>
    </div>
  );
}
