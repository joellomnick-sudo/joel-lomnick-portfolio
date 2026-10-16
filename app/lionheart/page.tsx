import Link from "next/link";
import { SpeechifyBookPlayer } from "@/components/lionheart/SpeechifyBookPlayer";
import { cookies } from "next/headers";
import { LIONHEART_SESSION_COOKIE, verifyLionheartSessionToken } from "@/lib/lionheart-auth";
import { getLionheartChapters, getLionheartFrontMatter } from "@/lib/lionheart-airtable";
import { BookCovers } from "@/components/lionheart/BookCovers";
import { bookEditions } from "@/lib/lionheart-book-download";
const countWords = (text?: string) => text?.trim() ? text.replace(/^## /gm, "").trim().split(/\s+/).length : 0;
export default async function LionheartPage() {
  const session = (await cookies()).get(LIONHEART_SESSION_COOKIE)?.value;
  if (!verifyLionheartSessionToken(session)) return null;
  const [chapters, sections] = await Promise.all([getLionheartChapters(), getLionheartFrontMatter()]);
  return <div className="lh-workspace"><header className="lh-page-heading"><p className="lionheart-kicker">Your writing desk</p><h1>Make room for the whole story.</h1><p>Choose a section to write, read, or recover an earlier version. Save when you are ready to update the private manuscript.</p></header>
    <p className="lh-edition-note">Book baseline: October 11, 2026 · Both PDFs retain the original front and back covers. Studio edits made after synchronization do not automatically change these dated downloads.</p>
    {process.env.SPEECHIFY_API_KEY && <SpeechifyBookPlayer />}
    {!chapters || !sections ? <p>The manuscript connection is unavailable. Your saved books remain in Airtable.</p> : <div className="lh-books">{[1, 2].map(volume => <section className="lh-book" key={volume}><header><p className="lionheart-kicker">Volume {volume === 1 ? "I" : "II"}</p><h2>{bookEditions[volume === 1 ? "one" : "two"].title}</h2><p>{(chapters.filter(c => c.volume === volume).reduce((sum, c) => sum + countWords(c.draftText), 0) + sections.filter(s => s.volume === volume && (s.type === "Prologue" || s.type === "Epilogue")).reduce((sum, s) => sum + countWords(s.draftText), 0)).toLocaleString()} manuscript words · 55,500 target</p><BookCovers volume={volume === 1 ? "one" : "two"} title={bookEditions[volume === 1 ? "one" : "two"].title} /><a className="lh-edition-download" href={`/lionheart/books/${volume === 1 ? "one" : "two"}`} download>Download Volume {volume === 1 ? "I" : "II"} PDF · October 11, 2026</a></header><ol className="lh-section-list">
      {sections.filter(s => s.volume === volume && s.type === "Prologue").map(s => <li key={s.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/" + s.type?.toLowerCase()}><span>{s.type}</span><strong>{s.section}</strong><small>{countWords(s.draftText).toLocaleString()} words · {s.type === "Prologue" ? "2,000" : "1,000"} target</small></Link></li>)}
      {chapters.filter(c => c.volume === volume).sort((a, b) => a.chapter - b.chapter).map(c => <li key={c.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/" + c.chapter}><span>Chapter {c.chapter} · {c.years}</span><strong>{c.title}</strong><small>{countWords(c.draftText).toLocaleString()} words · 7,500 target</small></Link></li>)}
      {sections.filter(s => s.volume === volume && s.type === "Epilogue").map(s => <li key={s.id}><Link href={"/lionheart/volume-" + (volume === 1 ? "one" : "two") + "/epilogue"}><span>Epilogue</span><strong>{s.section}</strong><small>{countWords(s.draftText).toLocaleString()} words · {s.type === "Prologue" ? "2,000" : "1,000"} target</small></Link></li>)}
    </ol></section>)}</div>}
  </div>;
}
