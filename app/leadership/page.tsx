import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { leadershipSections } from "@/data/site";

export default function LeadershipPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-warmIvory/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Leadership & Community</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Leadership & Community
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/72 sm:text-xl">
            Leadership is not just visibility. It is documentation, succession, accountability, emotional intelligence, and developing the next person.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:py-20">
        <div>
          <SectionHeading
            eyebrow="Service ecosystem"
            title="Community work with structure and continuity."
            body="The common thread is preparation: creating documentation, mentoring successors, building public presence, and leaving the work easier to continue."
          />
          <div className="mt-8 overflow-hidden rounded-lg border border-mutedGold/25 bg-deepBrown shadow-gold">
            <div className="relative aspect-[16/11]">
              <Image
                src="/images/mentoring-work.jpg"
                alt="Placeholder for mentoring and community leadership work"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <Timeline items={leadershipSections} />
      </section>

      <CTASection
        headline="Building leaders means building systems around them."
        text="Mentoring, chapter operations, church service, and community visibility all need structure that survives the meeting."
        primaryLabel="Connect About Leadership"
        primaryHref="/contact"
      />
    </>
  );
}
