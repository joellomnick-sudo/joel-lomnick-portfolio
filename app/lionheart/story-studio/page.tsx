import { getLionheartChapters, getLionheartInbox, getLionheartSources, getLionheartVersions } from "@/lib/lionheart-airtable";

export default async function StoryStudioPage() {
  const [chapters, inbox, sources, versions] = await Promise.all([
    getLionheartChapters(),
    getLionheartInbox(),
    getLionheartSources(),
    getLionheartVersions(),
  ]);

  const statusCounts = (chapters ?? []).reduce<Record<string, number>>((counts, chapter) => {
    counts[chapter.status] = (counts[chapter.status] || 0) + 1;
    return counts;
  }, {});

  const stats = [
    { label: "Chapters", value: chapters?.length ?? 14 },
    { label: "Sources indexed", value: sources?.length ?? 0 },
    { label: "Versions tracked", value: versions?.length ?? 0 },
    { label: "Inbox items", value: inbox?.filter((item) => item.status !== "Integrated" && item.status !== "Archive Only").length ?? 0 },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Story Studio</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">The editorial operating room.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">
          Drafting, source review, continuity, memory intake, and version control live here without silently rewriting the canonical memoir.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-warmIvory/55">{stat.label}</p>
              <p className="mt-2 font-serif text-4xl font-bold text-softGold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
            <h2 className="font-serif text-2xl font-bold">Chapter pipeline</h2>
            <div className="mt-5 space-y-3">
              {Object.keys(statusCounts).length ? Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between border-b border-warmIvory/10 pb-3 text-sm">
                  <span className="text-warmIvory/75">{status}</span>
                  <span className="font-bold text-softGold">{count}</span>
                </div>
              )) : <p className="text-sm text-warmIvory/60">Live chapter status will appear once Airtable is connected to the site.</p>}
            </div>
          </article>

          <article className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
            <h2 className="font-serif text-2xl font-bold">Unintegrated memories</h2>
            <div className="mt-5 space-y-4">
              {inbox?.length ? inbox.slice(0, 6).map((item) => (
                <div key={item.id} className="border-b border-warmIvory/10 pb-4">
                  <p className="font-semibold">{item.item}</p>
                  <p className="mt-1 text-xs text-warmIvory/55">{item.type || "Memory"} · {item.status || "New"}{item.suggestedChapter ? ` · ${item.suggestedChapter}` : ""}</p>
                </div>
              )) : <p className="text-sm text-warmIvory/60">The Memory Inbox is empty.</p>}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
