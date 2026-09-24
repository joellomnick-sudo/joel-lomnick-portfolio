import { getLionheartInbox, getLionheartLegacyCrosswalk, getLionheartSources, getLionheartVersions } from "@/lib/lionheart-airtable";

export default async function ArchivePage() {
  const [sources, versions, inbox, crosswalk] = await Promise.all([
    getLionheartSources(),
    getLionheartVersions(),
    getLionheartInbox(),
    getLionheartLegacyCrosswalk(),
  ]);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Archive</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Keep the mess. Curate the canon.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          Old drafts, evidence, and incoming material remain visible instead of being silently absorbed into the current books.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Versions</p>
            <p className="mt-2 font-serif text-4xl font-bold">{versions?.length ?? 0}</p>
            <div className="mt-5 space-y-4">
              {versions?.slice(0,8).map((item) => (
                <div key={item.id} className="border-b border-warmIvory/10 pb-4 last:border-0">
                  <p className="font-semibold">{item.version}</p>
                  <p className="mt-1 text-xs text-warmIvory/55">{item.scope || "Version"} · {item.status || "Reference"}{item.date ? ` · ${item.date}` : ""}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Sources</p>
            <p className="mt-2 font-serif text-4xl font-bold">{sources?.length ?? 0}</p>
            <div className="mt-5 space-y-4">
              {sources?.slice(0,8).map((item) => (
                <div key={item.id} className="border-b border-warmIvory/10 pb-4 last:border-0">
                  <p className="font-semibold">{item.source}</p>
                  <p className="mt-1 text-xs text-warmIvory/55">{item.type || "Source"} · {item.storage || "Archive"} · {item.evidenceLevel || "Unclassified"}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Memory Inbox</p>
            <p className="mt-2 font-serif text-4xl font-bold">{inbox?.length ?? 0}</p>
            <div className="mt-5 space-y-4">
              {inbox?.slice(0,8).map((item) => (
                <div key={item.id} className="border-b border-warmIvory/10 pb-4 last:border-0">
                  <p className="font-semibold">{item.item}</p>
                  <p className="mt-1 text-xs text-warmIvory/55">{item.type || "Memory"} · {item.status || "New"}{item.suggestedChapter ? ` · ${item.suggestedChapter}` : ""}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-10 rounded-2xl border border-mutedGold/25 bg-[#1b130e] p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-softGold">Legacy crosswalk</p>
              <h2 className="mt-2 font-serif text-3xl font-bold">Old v1 → current architecture</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-warmIvory/70">
                Every legacy section has a destination and an editorial action. This prevents useful scenes from disappearing while keeping the old table of contents from controlling the new books.
              </p>
            </div>
            <p className="font-serif text-4xl font-bold text-softGold">{crosswalk?.length ?? 0}</p>
          </div>

          <div className="mt-8 space-y-4">
            {crosswalk?.map((item) => (
              <article key={item.id} className="rounded-xl border border-warmIvory/10 bg-richBlack p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-warmIvory/50">{item.legacyPart || "Legacy manuscript"}{item.timeFrame ? ` · ${item.timeFrame}` : ""}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold">{item.legacySection}</h3>
                  </div>
                  <span className="rounded-full border border-mutedGold/30 px-3 py-1 text-xs font-bold text-softGold">{item.action || "Review"}</span>
                </div>
                {item.target ? <p className="mt-3 text-sm font-semibold text-warmIvory/80">→ {item.target}</p> : null}
                {item.notes ? <p className="mt-2 text-sm leading-6 text-warmIvory/60">{item.notes}</p> : null}
              </article>
            )) ?? <p className="text-sm text-warmIvory/60">No legacy crosswalk is connected yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
