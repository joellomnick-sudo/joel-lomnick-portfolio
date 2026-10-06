import Link from "next/link";
import { getLionheartSources, getLionheartDiscrepancies, getLionheartChapters, getLionheartFrontMatter, getLionheartInbox } from "@/lib/lionheart-airtable";

const countWords = (text?: string) => text?.trim() ? text.trim().split(/\s+/).length : 0;

export default async function InformationPage() {
  const [sources, discrepancies, chapters, frontMatter, inbox] = await Promise.all([
    getLionheartSources(), getLionheartDiscrepancies(), getLionheartChapters(), getLionheartFrontMatter(), getLionheartInbox()
  ]);
  const controls = sources?.filter(source => source.source.startsWith("Revision control"));
  const audits = sources?.filter(source => /audit/i.test(source.source))
    .sort((a, b) => b.dateOrPeriod?.localeCompare(a.dateOrPeriod || "") || a.source.localeCompare(b.source, undefined, { numeric: true }));
  const open = discrepancies?.filter(item => item.status !== "Resolved" && item.status !== "Author Confirmed");
  return <div className="lh-workspace">
    <header className="lh-page-heading"><p className="lionheart-kicker">Private editorial desk</p><h1>Information</h1><p>Current manuscripts, revision decisions, research findings, and work still pending.</p></header>
    <section className="lh-context"><h2>55,500 words per book</h2><p>About 2,000 words in the prologue, 7,500 in each of seven chapters, and 1,000 in the epilogue. Totals below count saved manuscript text, including the prologue and epilogue. The retired preface is excluded.</p><p><Link href="/lionheart/facts">Review story facts</Link> · <Link href="/lionheart/sources">Find supporting sources</Link> · <Link href="/lionheart">Open the books</Link></p></section>
    {!chapters || !frontMatter ? <p>The manuscript connection is unavailable. Counts are not shown as zero.</p> : <div className="lh-facts-list">{[1, 2].map(volume => {
      const rows = [
        ...frontMatter.filter(s => s.volume === volume && s.type === "Prologue").map(s => ({ id: s.id, title: s.section, words: countWords(s.draftText), target: 2000, notes: s.notes })),
        ...chapters.filter(c => c.volume === volume).map(c => ({ id: c.id, title: c.title, words: countWords(c.draftText), target: 7500, notes: c.draftNotes })),
        ...frontMatter.filter(s => s.volume === volume && s.type === "Epilogue").map(s => ({ id: s.id, title: s.section, words: countWords(s.draftText), target: 1000, notes: s.notes }))
      ];
      const total = rows.reduce((sum, row) => sum + row.words, 0);
      return <article key={volume}><h2>Volume {volume}: {total.toLocaleString()} / 55,500 words</h2><p>{rows.length} active sections. Word count alone does not confirm that relationship coverage or source review is complete.</p><div style={{ overflowX: "auto" }}><table><thead><tr><th scope="col">Section</th><th scope="col">Saved words</th><th scope="col">Target</th><th scope="col">Difference</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row" style={{ textAlign: "left", padding: "0.6rem" }}>{row.title}</th><td>{row.words.toLocaleString()}</td><td>{row.target.toLocaleString()}</td><td>{(row.words - row.target).toLocaleString()}</td></tr>)}</tbody></table></div>{rows.filter(row => row.notes).map(row => <details key={row.id}><summary>{row.title}: editorial status</summary><div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{row.notes}</div></details>)}</article>;
    })}</div>}
    <section className="lh-context"><h2>Revision checkpoints</h2>{controls?.map(control => <article key={control.id}><h3>{control.source}</h3><div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{control.notes}</div></article>)}{!sources && <p>The source connection is unavailable.</p>}</section>
    <section className="lh-context"><h2>Research queue</h2><p>Items remain pending until the original evidence and its incorporation into the manuscript have been checked.</p>{inbox?.map(item => <details key={item.id}><summary>{item.item} · {item.status || "Pending"}</summary><p>{item.suggestedChapter}</p><div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{item.notes}</div></details>)}{!inbox && <p>The queue connection is unavailable.</p>}</section>
    <section className="lh-context"><h2>Saved audit reports</h2><p>{audits?.length ?? 0} reports accessible here. Saved reports do not establish that every scheduled run has been imported or applied. Each report retains its original findings and reconciliation.</p></section>
    <div className="lh-facts-list">{audits?.map(audit => <article key={audit.id} id={audit.id}><h2>{audit.source}</h2><p>{audit.dateOrPeriod} · {audit.evidenceLevel}</p>{audit.relatedChapters && <p>{audit.relatedChapters}</p>}<details><summary>Findings and reconciliation</summary><div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{audit.notes}</div></details></article>)}</div>
    <section className="lh-context"><h2>Open discrepancies</h2>{open?.map(item => <article key={item.id}><h3>{item.claim}</h3><p>{item.status} · {item.affectedChapters}</p><p>{item.resolution || item.evidenceNotes}</p></article>)}{!discrepancies && <p>The discrepancy connection is unavailable.</p>}</section>
  </div>;
}
