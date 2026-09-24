import { getLionheartPeople } from "@/lib/lionheart-airtable";

export default async function PeoplePage() {
  const people = await getLionheartPeople();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="lionheart-kicker">People</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          The cast of a real life, without flattening anybody into a character.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 opacity-70">
          These profiles track who appears in Lionheart, where they enter the story, and what still requires privacy,
          consent, chronology, or evidence review. They are editorial records, not public biographies.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {people?.length ? people.map((person) => (
            <article key={person.id} className="lionheart-panel">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="lionheart-kicker">{person.relationshipOrRole || "Story figure"}</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold">{person.name}</h2>
                </div>
                {person.privacy ? (
                  <span className="rounded-full border border-[#c89a32]/45 px-3 py-1 text-xs font-bold">
                    {person.privacy}
                  </span>
                ) : null}
              </div>

              {person.firstAppears ? (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">First appears</p>
                  <p className="mt-1 text-sm leading-6 opacity-75">{person.firstAppears}</p>
                </div>
              ) : null}

              {person.relatedChapters ? (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">Related chapters</p>
                  <p className="mt-1 text-sm leading-6 opacity-75">{person.relatedChapters}</p>
                </div>
              ) : null}

              {person.notes ? (
                <p className="mt-5 border-t border-[#1f5e99]/15 pt-4 text-sm leading-6 opacity-70">
                  {person.notes}
                </p>
              ) : null}
            </article>
          )) : (
            <div className="lionheart-panel md:col-span-2 xl:col-span-3">
              <p className="text-sm opacity-65">No people profiles are connected yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
