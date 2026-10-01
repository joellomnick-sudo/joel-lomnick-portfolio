import Link from "next/link";
import { SourceLibrary } from "@/components/lionheart/SourceLibrary";
import { getLionheartSources } from "@/lib/lionheart-airtable";
export default async function SourcesPage() {
  const sources = await getLionheartSources();
  return <div className="lh-workspace"><header className="lh-page-heading"><p className="lionheart-kicker">Sources</p><h1>The evidence behind your books</h1><p>Use your organized Dropbox material alongside the manuscript and story facts. Saved text and facts live in Airtable; source files remain in their original storage.</p></header>{sources ? <SourceLibrary sources={sources} /> : <p>The source index is unavailable.</p>}<details className="lh-context"><summary>Other reference tools</summary><div className="lh-secondary-links"><Link href="/lionheart/discrepancies">Unresolved claims</Link><Link href="/lionheart/archive">Archive</Link><Link href="/lionheart/story-studio">Source intake</Link><Link href="/lionheart/media-lab">Media references</Link></div></details><p className="lh-help">This index opens connected source files. It does not automatically import new Dropbox files or grant the website access to other connected apps.</p></div>;
}
