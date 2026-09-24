import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Conflicting claims", body: "Track disagreements between manuscripts, memories, documents, dates, names, places, and outside sources." },
  { title: "Resolution status", body: "Use clear states such as unresolved, needs evidence, author confirmed, corrected, or intentionally ambiguous." },
  { title: "Affected narrative", body: "Every discrepancy can point to the chapters and scenes that need review before a factual change is made." },
];

export default function DiscrepanciesPage() {
  return <LionheartSectionPage eyebrow="Discrepancy Desk" title="Contradictions become work items instead of silent edits." intro="This is where factual conflicts stay visible until there is enough evidence or author confirmation to resolve them responsibly." cards={cards} />;
}
