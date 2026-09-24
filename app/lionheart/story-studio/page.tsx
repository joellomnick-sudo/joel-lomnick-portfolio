import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Researching", body: "Gather scenes, sources, questions, and missing context before prose is treated as settled." },
  { title: "Drafting", body: "Move chapters through rough draft, developmental draft, fact check, continuity check, personal review, and locked status." },
  { title: "Revision queue", body: "Keep proposed changes visible before replacing canonical prose so edits remain deliberate and reversible." },
];

export default function StoryStudioPage() {
  return <LionheartSectionPage eyebrow="Story Studio" title="The editorial operating room." intro="Story Studio is the working side of Lionheart: drafting, source review, chapter status, continuity, unresolved questions, and controlled revisions." cards={cards} />;
}
