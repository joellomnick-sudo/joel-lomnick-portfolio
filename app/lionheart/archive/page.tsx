import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Manuscript versions", body: "Index older drafts, previews, clarifications, and reader editions without silently overwriting them." },
  { title: "Primary sources", body: "Reference private files in Drive, Dropbox, email, calendars, photographs, and recordings without copying sensitive originals into public source control." },
  { title: "Unintegrated material", body: "New journals, memories, interviews, and discoveries can wait here until they are reviewed and assigned." },
];

export default function ArchivePage() {
  return <LionheartSectionPage eyebrow="Archive" title="Keep the mess. Curate the canon." intro="The archive protects old versions and source material so the polished books never erase the record of how the story developed." cards={cards} />;
}
