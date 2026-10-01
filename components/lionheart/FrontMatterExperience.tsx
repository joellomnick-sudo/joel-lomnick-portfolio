import Link from "next/link";
import { SectionEditor } from "./SectionEditor";
import { getLionheartFrontMatterSection } from "@/lib/lionheart-airtable";

export async function FrontMatterExperience({ volume, type }: { volume: number; type: string }) {
  const section = await getLionheartFrontMatterSection(volume, type);
  return <div className="lh-workspace"><header className="lh-page-heading"><Link href="/lionheart">← Books</Link><p className="lionheart-kicker">Volume {volume} · {type}</p><h1>{section?.section || type}</h1><p>{section?.status || "Working manuscript"}</p></header>
    {section?.id ? <SectionEditor id={section.id} kind="frontMatter" title={section.section} text={section.draftText || ""} notes={section.notes} /> : <p>The manuscript connection is unavailable. No text has been removed.</p>}
    {section?.draftSource && <details className="lh-context"><summary>Source and editorial context</summary><p>{section.draftSource}</p>{section.sourceLink && <a href={section.sourceLink} target="_blank" rel="noreferrer">Open source</a>}</details>}
  </div>;
}
