import type { Metadata } from "next";
import { EditorialImage } from "@/components/EditorialImage";
import { LionheartPreviews } from "@/components/LionheartPreviews";

export const metadata: Metadata = {
  title: "Lionheart",
  description: "Lionheart is Joel Maurice Lomnick's memoir project about family, survival, identity, faith, engineering, culture, mentorship, and becoming.",
};

export default function LionheartPage() {
  return (
    <>
      <section className="bg-softBlack text-warmIvory">
        <div className="site-container grid min-h-[640px] items-center gap-10 py-14 lg:grid-cols-[.7fr_1.3fr] lg:py-16">
          <EditorialImage assetId="lionheart-cover" priority className="mx-auto w-full max-w-sm" />
          <div>
            <p className="eyebrow">Lionheart</p>
            <h1 className="display-title mt-5 max-w-[16ch] font-serif">The story behind the builder.</h1>
            <p className="prose-copy prose-copy-dark mt-7">A memoir about survival, family, identity, faith, engineering, Black belonging, culture, reinvention, mentorship, and the unfinished work of becoming.</p>
          </div>
        </div>
      </section>

      <section className="editorial-section-compact bg-paper">
        <div className="site-container grid items-start gap-9 lg:grid-cols-[.75fr_1.25fr]">
          <blockquote className="pull-quote">Memory does not arrive as a neat timeline. It arrives as weather, rhythm, rooms, and the people whose voices stay with us.</blockquote>
          <div className="prose-copy space-y-5">
            <p>Lionheart holds the private and public parts of a life in the same frame: family and career, grief and humor, Black masculinity and tenderness, faith and doubt, technical ambition and the need to belong.</p>
            <p>The previews below are invitations into the work, not substitutes for the full story.</p>
          </div>
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment">
        <div className="site-container">
          <div className="max-w-4xl">
            <p className="eyebrow">Reading previews</p>
            <h2 className="section-title mt-4">Two volumes. One life still unfolding.</h2>
          </div>
          <div className="mt-8"><LionheartPreviews /></div>
        </div>
      </section>
    </>
  );
}
