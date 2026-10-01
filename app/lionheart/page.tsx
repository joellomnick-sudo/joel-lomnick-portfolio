import Link from "next/link";
import { cookies } from "next/headers";
import { LIONHEART_SESSION_COOKIE, verifyLionheartSessionToken } from "@/lib/lionheart-auth";
import { getLionheartChapters, getLionheartFrontMatter } from "@/lib/lionheart-airtable";
export default async function LionheartPage() {
  const session = (await cookies()).get(LIONHEART_SESSION_COOKIE)?.value;
  if (!verifyLionheartSessionToken(session)) return null;
  const [chapters, sections] = await Promise.all([getLionheartChapters(), getLionheartFrontMatter()]);
  return <div className="lh-workspace"><header className="lh-page-heading"><p className="lionheart-kicker">Your writing desk</p><h1>Make room for the whole story.</h1><p>Choose a section to write, read, or recover an earlier version. Save when you are ready to update the private manuscript.</p></header>
    {!chapters || !sections ? <p>The manuscript connection is unavailable. Your saved books remain in Airtable.</p> : <div className="lh-books">{[1, 2].map(volume => <section className="lh-book" key={volume}><header><p className="lionheart-kicker">Volume {volume}</p><h2>{volume === 1 ? "Becoming Lionheart" : "The Cost of Being Lionheart"}</h2><p>{chapters.filter(c => c.volume === volume).reduce((sum, c) => sum + (c.wordCount || 0), 0).toLocaleString()} chapter words</p></header><ol className="lh-section-list">
      {sections.filter(s => s.volume === volume && s.type !== "Epilogue").map(s => <li key={s.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/" + s.type?.toLowerCase()}><span>{s.type}</span><strong>{s.section}</strong><small>{s.wordCount?.toLocaleString()} words</small></Link></li>)}
      {chapters.filter(c => c.volume === volume).sort((a, b) => a.chapter - b.chapter).map(c => <li key={c.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/" + c.chapter}><span>Chapter {c.chapter} · {c.years}</span><strong>{c.title}</strong><small>{c.wordCount?.toLocaleString()} words</small></Link></li>)}
      {sections.filter(s => s.volume === volume && s.type === "Epilogue").map(s => <li key={s.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/epilogue"}><span>Epilogue</span><strong>{s.section}</strong><small>{s.wordCount?.toLocaleString()} words</small></Link></li>)}
    </ol></section>)}</div>}
  </div>;
}
