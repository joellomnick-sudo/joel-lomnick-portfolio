import { getLionheartDiscrepancies, isLionheartAirtableConfigured } from "@/lib/lionheart-airtable";

export default async function DiscrepanciesPage() {
  const discrepancies = await getLionheartDiscrepancies();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Discrepancy Desk</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Contradictions become work items instead of silent edits.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          Conflicting dates, names, places, relationships, versions, and evidence stay visible until they are responsibly resolved.
        </p>

        <div className="mt-10 grid gap-5">
          {discrepancies?.length ? discrepancies.map((item) => (
            <article key={item.id} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-softGold">{item.category || "Discrepancy"}</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold">{item.claim}</h2>
                </div>
                <span className="rounded-full border border-warmIvory/15 px-3 py-1 text-xs font-bold text-warmIvory/70">{item.status || "Needs Evidence"}</span>
              </div>
              {item.conflictingSources ? <p className="mt-4 text-sm leading-6 text-warmIvory/75"><strong>Conflict:</strong> {item.conflictingSources}</p> : null}
              {item.affectedChapters ? <p className="mt-3 text-sm leading-6 text-warmIvory/70"><strong>Affects:</strong> {item.affectedChapters}</p> : null}
              {item.resolution ? <p className="mt-3 text-sm leading-6 text-warmIvory/70"><strong>Resolution:</strong> {item.resolution}</p> : null}
              {item.evidenceNotes ? <p className="mt-3 text-sm leading-6 text-warmIvory/60">{item.evidenceNotes}</p> : null}
            </article>
          )) : (
            <div className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <p className="text-sm leading-6 text-warmIvory/70">
                {isLionheartAirtableConfigured() ? "No unresolved discrepancies are currently recorded." : "Live discrepancies will appear after the private Airtable token is added to hosting secrets."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
