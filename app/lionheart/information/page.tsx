import Link from "next/link";
import { getLionheartSources, getLionheartDiscrepancies } from "@/lib/lionheart-airtable";

export default async function InformationPage() {
  const [sources, discrepancies] = await Promise.all([getLionheartSources(), getLionheartDiscrepancies()]);
  const audits = sources?.filter(source => source.source.startsWith("Hourly audit ·"))
    .sort((a, b) => a.source.localeCompare(b.source, undefined, { numeric: true }));
  const open = discrepancies?.filter(item => item.status !== "Resolved" && item.status !== "Author Confirmed");
  return <div className="lh-workspace">
    <header className="lh-page-heading"><p className="lionheart-kicker">Private editorial desk</p><h1>Information</h1><p>Hourly findings, continuity decisions, and questions that still need evidence.</p></header>
    <section className="lh-context"><h2>Published audit records</h2><p>{audits?.length ?? 0} hourly reports available. Research reports preserve the original findings alongside their current reconciliation. They are research leads, not substitutes for original records.</p><p><Link href="/lionheart/facts">Review the timeline and story facts</Link> · <Link href="/lionheart/sources">Find supporting sources</Link></p></section>
    <div className="lh-facts-list">{audits?.map(audit => <article key={audit.id} id={audit.id}><h2>{audit.source}</h2><p>{audit.dateOrPeriod} · {audit.evidenceLevel}</p>{audit.relatedChapters && <p>{audit.relatedChapters}</p>}<details><summary>Published findings and original hourly report</summary><div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{audit.notes}</div></details></article>)}{!sources && <p>The audit connection is unavailable. Previously saved records remain intact.</p>}</div>
    <section className="lh-context"><h2>Open discrepancies</h2>{open?.map(item => <article key={item.id}><h3>{item.claim}</h3><p>{item.status} · {item.affectedChapters}</p><p>{item.resolution || item.evidenceNotes}</p></article>)}{!discrepancies && <p>The discrepancy connection is unavailable.</p>}</section>
  </div>;
}
