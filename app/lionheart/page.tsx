import Link from "next/link";

const workspaces = [
  {
    title: "Volume One",
    href: "/lionheart/volume-one",
    body: "Seven chapter slots for the first volume. The manuscript itself will stay in a private content source rather than this public repository.",
  },
  {
    title: "Volume Two",
    href: "/lionheart/volume-two",
    body: "Seven chapter slots for the second volume, ready for private manuscript content when the secure source is connected.",
  },
  {
    title: "Story Studio",
    href: "/lionheart/story-studio",
    body: "Track chapter status, unintegrated memories, research questions, continuity review, and revision work.",
  },
  {
    title: "Discrepancy Desk",
    href: "/lionheart/discrepancies",
    body: "Track conflicting dates, names, locations, versions, evidence, author confirmations, and unresolved facts.",
  },
  {
    title: "Archive",
    href: "/lionheart/archive",
    body: "A future index of source manuscripts, journals, photographs, correspondence, and prior versions without copying private files into public source control.",
  },
  {
    title: "Media Lab",
    href: "/lionheart/media-lab",
    body: "Organize archival media, restored images, audio, and clearly labeled generated reconstructions.",
  },
] as const;

export default function LionheartHomePage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Owner workspace</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-6xl">The story, the evidence, and the work behind both.</h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-warmIvory/75">
          This is the private Lionheart backbone. The interface is now separated from the public portfolio so future manuscript text, research notes, source links, and editorial decisions can be connected without placing private material in the public GitHub repository.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.href}
              href={workspace.href}
              className="group rounded-2xl border border-warmIvory/10 bg-richBlack p-6 transition hover:border-mutedGold"
            >
              <h2 className="font-serif text-2xl font-bold group-hover:text-softGold">{workspace.title}</h2>
              <p className="mt-3 text-sm leading-6 text-warmIvory/70">{workspace.body}</p>
              <span className="mt-6 inline-block text-sm font-bold text-softGold">Open workspace →</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-mutedGold/25 bg-[#1b130e] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-softGold">Security boundary</p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-warmIvory/70">
            No full Lionheart manuscript text belongs in this public repository. Private chapters, source documents, journals, correspondence, and archival media should be connected from private storage after authentication.
          </p>
        </div>
      </div>
    </section>
  );
}
