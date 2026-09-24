import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Chronology", body: "A year-by-year view of verified events connected to chapters, scenes, people, places, and sources." },
  { title: "Evidence status", body: "Events can distinguish author-confirmed facts, primary records, contemporaneous material, public context, and unresolved recollection." },
  { title: "Scene links", body: "Timeline entries will eventually jump directly into the manuscript scene where the event is used." },
];

export default function TimelinePage() {
  return <LionheartSectionPage eyebrow="Timeline" title="The chronology behind the narrative." intro="The timeline will separate remembered sequence from verified dates so the memoir can stay cinematic without getting careless with facts." cards={cards} />;
}
