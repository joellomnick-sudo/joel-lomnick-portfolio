import Link from "next/link";
import { getLionheartPeople } from "@/lib/lionheart-airtable";

export default async function PeoplePage() {
  const people = await getLionheartPeople();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">People</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The cast of a real life, without flattening anybody into a character.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          This private index tracks recurring people, their narrative roles, where they enter the story, and what still needs verification. It deliberately avoids dumping contact details or pretending one memory settles another person's perspective.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {people?.length ? people.map((person) => (
            <article key={person.id} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-bold">{person.name}</h2>
                  {person.relationshipOrRole ? <p className="mt-2 text-sm text-warmIvory/70">{person.relationshipOrRole}</p> : null}
                </div>
                {person.privacy ? (
                  <span className="rounded-full border border-mutedGold/30 px-3 py-1 text-xs font-bold text-softGold">{person.privacy}</span>
                ) : null}
              </div>

              {person.firstAppears ? (
                <p className="mt-5 text-sm leading-6 text-warmIvory/70"><strong>First appears:</strong> {person.firstAppears}</p>
              ) : null}
              {person.relatedChapters ? (
                <p className="mt-2 text-sm leading-6 text-warmIvory/70"><strong>Story arc:</strong> {person.relatedChapters}</p>
              ) : null}
              {person.notes ? <p className="mt-4 text-sm leading-6 text-warmIvory/60">{person.notes}</p> : null}
              {person.publicLink ? (
                <Link href={person.publicLink} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-bold text-softGold">
                  Open public context ↗
                </Link>
              ) : null}
            </article>
          )) : (
            <div className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6 text-sm text-warmIvory/65">
              Live people records will appear after the private Airtable connection is available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
