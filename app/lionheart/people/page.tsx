import { PeopleDirectory } from "@/components/lionheart/PeopleDirectory";
import { getLionheartPeople } from "@/lib/lionheart-airtable";

export default async function PeoplePage() {
  const people = await getLionheartPeople();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="lionheart-kicker">People</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          Everybody enters the story for a reason.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 opacity-70">
          This private cast index follows people across both books and the supplemental archive. Full names, roles, chapter
          connections, birth dates, privacy, and source confidence stay visible without pretending every old detail is equally verified.
        </p>

        {people?.length ? (
          <PeopleDirectory people={people} />
        ) : (
          <div className="lionheart-panel mt-10">
            <p className="text-sm opacity-65">No people profiles are connected yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
