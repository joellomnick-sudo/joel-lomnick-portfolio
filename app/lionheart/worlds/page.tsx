import { LionheartSectionPage } from "@/components/lionheart/LionheartSectionPage";

const cards = [
  { title: "Engineering", body: "Connect memoir scenes to the professional world and related public work without turning the book into a résumé." },
  { title: "Community", body: "Link organizations, neighborhoods, faith spaces, brotherhood, culture, and chosen family to the chapters where they matter." },
  { title: "Creative work", body: "Connect Lionheart to other private and public projects while preserving the memoir as the narrative center." },
];

export default function WorldsPage() {
  return <LionheartSectionPage eyebrow="Worlds" title="The systems and communities surrounding the story." intro="Worlds organize recurring institutions, communities, projects, and cultural spaces without making the main manuscript read like an encyclopedia." cards={cards} />;
}
