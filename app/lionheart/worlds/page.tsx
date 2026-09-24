import Link from "next/link";
import { getLionheartWorlds } from "@/lib/lionheart-airtable";

export default async function WorldsPage() {
  const worlds = await getLionheartWorlds();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Worlds</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The systems and communities surrounding the story.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          These are context portals, not encyclopedia entries. They connect the memoir to the institutions, communities, projects, and public sites that matter to the narrative.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {worlds?.length ? worlds.map((item) => (
            <article key={item.id} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">{item.type || "World"}</p>
              <h2 className="mt-2 font-serif text-2xl font-bold">{item.world}</h2>
              {item.notes ? <p className="mt-3 text-sm leading-6 text-warmIvory/70">{item.notes}</p> : null}
              {item.relatedChapters ? <p className="mt-4 text-xs text-warmIvory/50">{item.relatedChapters}</p> : null}
              {item.publicLink ? (
                <Link href={item.publicLink} className="mt-5 inline-block text-sm font-bold text-softGold" target="_blank" rel="noreferrer">
                  Open related site ↗
                </Link>
              ) : null}
            </article>
          )) : (
            <div className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6 text-sm text-warmIvory/65">
              Live world links will appear after the private Airtable connection is available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
