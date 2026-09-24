import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = Array.from({ length: 7 }, (_, index) => ({
  title: `Chapter ${index + 1}`,
  body: "Private manuscript content will load here only from the secured Lionheart content source. This public codebase stores the interface, not the chapter text.",
}));

export default function VolumeOnePage() {
  return (
    <LionheartSectionPage
      eyebrow="Volume One"
      title="Seven chapters. One protected manuscript."
      intro="This view is the reading and editing backbone for Volume One. Chapter titles, prose, notes, source links, and revision history will be connected from private storage rather than committed to the public portfolio repository."
      cards={cards}
    />
  );
}
