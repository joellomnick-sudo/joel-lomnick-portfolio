import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = Array.from({ length: 7 }, (_, index) => ({
  title: `Chapter ${index + 1}`,
  body: "Private manuscript content will load here only from the secured Lionheart content source. This public codebase stores the interface, not the chapter text.",
}));

export default function VolumeTwoPage() {
  return (
    <LionheartSectionPage
      eyebrow="Volume Two"
      title="The second half of the story stays private by design."
      intro="This view will hold the second volume, with chapter navigation, sources, notes, continuity checks, and version history once the private manuscript source is connected."
      cards={cards}
    />
  );
}
