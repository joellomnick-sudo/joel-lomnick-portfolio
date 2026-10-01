import { FactsWorkspace } from "@/components/lionheart/FactsWorkspace";
import { getLionheartPeople, getLionheartTimeline, getLionheartWorlds } from "@/lib/lionheart-airtable";
export default async function FactsPage() {
  const [people, timeline, worlds] = await Promise.all([getLionheartPeople(), getLionheartTimeline(), getLionheartWorlds()]);
  return <div className="lh-workspace"><header className="lh-page-heading"><p className="lionheart-kicker">Story facts</p><h1>Keep the story consistent</h1><p>People, dates, places, and the evidence behind them.</p></header>{people && timeline && worlds ? <FactsWorkspace people={people} timeline={timeline} worlds={worlds} /> : <p>The facts connection is unavailable. Try again before making changes.</p>}</div>;
}
