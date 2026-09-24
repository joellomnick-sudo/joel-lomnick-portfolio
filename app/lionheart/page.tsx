import Link from "next/link";
import { ContinueReading } from "@/components/lionheart/ContinueReading";
import {
  getLionheartChapters,
  getLionheartDiscrepancies,
  getLionheartInbox,
  getLionheartSources,
  getLionheartVersions,
} from "@/lib/lionheart-airtable";

function draftedCount(chapters: Awaited<ReturnType<typeof getLionheartChapters>>, volume: number) {
  return (chapters ?? []).filter((chapter) => chapter.volume === volume && chapter.status !== "Researching").length;
}

export default async function LionheartHomePage() {
  const [chapters, discrepancies, inbox, sources, versions] = await Promise.all([
    getLionheartChapters(),
    getLionheartDiscrepancies(),
    getLionheartInbox(),
    getLionheartSources(),
    getLionheartVersions(),
  ]);

  const volumeOneDrafted = draftedCount(chapters, 1);
  const volumeTwoDrafted = draftedCount(chapters, 2);
  const openDiscrepancies = (discrepancies ?? []).filter((item) => item.status !== "Resolved" && item.status !== "Author Confirmed");
  const openInbox = (inbox ?? []).filter((item) => item.status !== "Integrated" && item.status !== "Archive Only");

  return (
    <section className="lionheart-dashboard">
      <div className="mx-auto max-w-6xl">
        <div className="lionheart-dashboard-hero">
          <div>
            <p className="lionheart-kicker">Owner workspace</p>
            <h1>The story, the evidence, and the work behind both.</h1>
            <p>
              Read the books, review continuity, track source evidence, and decide what belongs in the definitive Lionheart narrative.
            </p>
          </div>
          <ContinueReading />
        </div>

        <div className="lionheart-stats-grid">
          <article>
            <p>Chapters</p>
            <strong>{chapters?.length ?? 14}</strong>
            <span>across two volumes</span>
          </article>
          <article>
            <p>Open discrepancies</p>
            <strong>{openDiscrepancies.length}</strong>
            <span>awaiting evidence or a decision</span>
          </article>
          <article>
            <p>Memory inbox</p>
            <strong>{openInbox.length}</strong>
            <span>not yet integrated</span>
          </article>
          <article>
            <p>Sources indexed</p>
            <strong>{sources?.length ?? 0}</strong>
            <span>{versions?.length ?? 0} versions tracked</span>
          </article>
        </div>

        <div className="lionheart-volume-grid">
          <Link href="/lionheart/volume-one" className="lionheart-volume-card">
            <p className="lionheart-kicker">Volume One · 1981–2007</p>
            <h2>The Making of Lionheart</h2>
            <p>Seven chapters tracing how usefulness, competence, humor, faith, and adaptability became a survival system.</p>
            <div className="lionheart-progress-label"><span>Developmental draft coverage</span><strong>{volumeOneDrafted}/7</strong></div>
            <div className="lionheart-progress-track"><span style={{ width: `${Math.min(100, (volumeOneDrafted / 7) * 100)}%` }} /></div>
            <span className="lionheart-card-link">Open Volume One →</span>
          </Link>

          <Link href="/lionheart/volume-two" className="lionheart-volume-card">
            <p className="lionheart-kicker">Volume Two · 2007–August 2026</p>
            <h2>The Cost of Being Lionheart</h2>
            <p>The adult story of what happens when the same survival system becomes leadership, labor, visibility, and exhaustion.</p>
            <div className="lionheart-progress-label"><span>Developmental draft coverage</span><strong>{volumeTwoDrafted}/7</strong></div>
            <div className="lionheart-progress-track"><span style={{ width: `${Math.min(100, (volumeTwoDrafted / 7) * 100)}%` }} /></div>
            <span className="lionheart-card-link">Open Volume Two →</span>
          </Link>
        </div>

        <div className="lionheart-work-grid">
          <Link href="/lionheart/discrepancies" className="lionheart-panel-link">
            <p className="lionheart-kicker">Continuity</p>
            <h2>Discrepancy Desk</h2>
            <p>{openDiscrepancies.length} unresolved items currently need evidence, clarification, or an author decision.</p>
          </Link>
          <Link href="/lionheart/archive" className="lionheart-panel-link">
            <p className="lionheart-kicker">Archive</p>
            <h2>Versions and legacy material</h2>
            <p>Recover useful scenes without allowing older tables of contents to control the current books.</p>
          </Link>
          <Link href="/lionheart/story-studio" className="lionheart-panel-link">
            <p className="lionheart-kicker">Editorial</p>
            <h2>Story Studio</h2>
            <p>Review chapter status, source coverage, memory intake, and the editorial pipeline.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
