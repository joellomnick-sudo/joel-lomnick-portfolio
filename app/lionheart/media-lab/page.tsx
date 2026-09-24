import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Archival", body: "Original photographs, scans, recordings, documents, and video stay clearly labeled as real source media." },
  { title: "Restored", body: "Cleaned or enhanced archival media remains tied to its original so restoration never becomes historical substitution." },
  { title: "Generated reconstruction", body: "Runway or other generated media must be visibly labeled as reconstruction rather than archival evidence." },
];

export default function MediaLabPage() {
  return <LionheartSectionPage eyebrow="Media Lab" title="Real archive first. Reconstruction clearly labeled." intro="The media workflow can support restoration, narration, audio, and cinematic interpretation without confusing generated material with historical documentation." cards={cards} />;
}
