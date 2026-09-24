import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "People index", body: "One private profile per recurring person, connected to chapters, events, places, photos, correspondence, and open questions." },
  { title: "Perspective", body: "Profiles can preserve what Joel remembers, what another person remembers, and what contemporaneous evidence supports without forcing false agreement." },
  { title: "Privacy controls", body: "Contact details and sensitive source material stay outside the public codebase. The site stores only the metadata needed for the story." },
];

export default function PeoplePage() {
  return <LionheartSectionPage eyebrow="People" title="The cast of a real life, without flattening anybody into a character." intro="People pages will help track relationships across decades while keeping source evidence and private information separate from the narrative." cards={cards} />;
}
