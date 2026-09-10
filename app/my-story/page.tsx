import type { Metadata } from "next";
import { EditorialImage } from "@/components/EditorialImage";
import type { PublicAssetId } from "@/data/publicAssets";

export const metadata: Metadata = {
  title: "My Story",
  description: "Joel M. Lomnick's first-person story of engineering, writing, mentorship, Black community, faith, culture, and becoming.",
};

const movements = [
  {
    title: "Rochester, family, and learning to read a room",
    assetId: "about-family-legacy",
    imageClassName: "max-w-[22rem]",
    body: "I grew up learning that care is practical. Family, survival, faith, and the example of Cathy Lomnick taught me to notice what a room needed before anyone named it. Responsibility arrived early. So did the instinct to protect, translate, encourage, and make space for someone else to breathe.",
  },
  {
    title: "RIT, engineering, NSBE, and Gospel",
    assetId: "about-gospel-ensemble",
    imageClassName: "max-w-[30rem]",
    body: "Engineering school sharpened my thinking and tested my confidence. At RIT, Black belonging mattered as much as academic preparation. NSBE leadership and Gospel Ensemble helped me understand that technical excellence and community service were not competing identities. They could strengthen one another.",
  },
  {
    title: "Troy, Albany, culture, grief, and brotherhood",
    assetId: "about-african-dance-albany",
    imageClassName: "max-w-[30rem]",
    body: "Leaving Rochester opened a demanding chapter of corporate engineering, grief, church, brotherhood, and reinvention. West African drum and dance returned rhythm to my body. Iota Phi Theta gave service and accountability a living structure. The Capital Region taught me that rebuilding rarely happens in a straight line.",
  },
  {
    title: "Richmond and the work of rebuilding",
    assetId: "about-richmond-rebuild",
    imageClassName: "max-w-[22rem]",
    body: "Richmond became a place where the different parts of my life finally started speaking to one another. Engineering work, church media, mentoring, NPHC service, line dance, cultural spaces, and LomnickPro all became part of the same larger calling: build what helps people feel prepared, connected, seen, and able to move forward.",
  },
] as const;

export default function MyStoryPage() {
  return (
    <>
      <section className="dark-hero editorial-section">
        <div className="site-container">
          <p className="eyebrow">My Story</p>
          <h1 className="display-title mt-5 max-w-[18ch]">I learned early how to read a room.</h1>
          <p className="prose-copy prose-copy-dark mt-7">
            Later, engineering taught me how to read a system. Most of my life has been the work of bringing those two skills together: listening closely, finding the pattern, and making room for a better next step.
          </p>
        </div>
      </section>

      {movements.map((movement, index) => (
        <section key={movement.title} className={`py-16 ${index % 2 ? "bg-parchment" : "bg-paper"}`}>
          <div className={`site-container grid items-center gap-10 lg:grid-cols-[.72fr_1.28fr] ${index % 2 ? "lg:[&>figure]:order-2" : ""}`}>
            <EditorialImage assetId={movement.assetId as PublicAssetId} className={`mx-auto w-full ${movement.imageClassName}`} />
            <div className="max-w-2xl">
              <p className="eyebrow">A life in motion</p>
              <h2 className="section-title mt-4">{movement.title}</h2>
              <p className="prose-copy mt-5">{movement.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="editorial-section-compact bg-richBlack text-warmIvory">
        <div className="site-container grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
          <p className="eyebrow">Present and future</p>
          <div>
            <blockquote className="pull-quote">I am more interested in becoming than pretending everything is finished.</blockquote>
            <p className="prose-copy prose-copy-dark mt-6">
              The present work includes professional licensure, Lionheart, teaching, mentoring, cultural joy, and building work that can outlive my direct involvement. The goal is not to become less multidimensional. It is to make those dimensions more honest, disciplined, generous, and unmistakably mine.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
