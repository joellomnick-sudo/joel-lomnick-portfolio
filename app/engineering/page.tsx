import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { VisualTile } from "@/components/VisualTile";
import { engineeringCards, engineeringSkills } from "@/data/site";

export default function EngineeringPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Engineering & Project Coordination</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Engineering & Project Coordination
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/72 sm:text-xl">
            Joel brings 20+ years of engineering, technical design, building systems, construction documentation, and owner-facing communication experience.
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:py-20">
          <div>
            <SectionHeading
              eyebrow="Professional experience"
              title="Electrical systems work with public trust in view."
              body="The work lives in the details: clear drawings, responsive coordination, practical documentation, and communication that keeps owners, consultants, and construction teams aligned."
              tone="light"
            />
            <div className="mt-8 overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium">
              <VisualTile
                title="Engineering project coordination"
                category="Electrical Systems"
                image="/images/engineering-project.jpg"
                alt="Engineering project coordination illustration representing electrical systems and construction documentation."
                imageFit="contain"
                imageType="contain"
                aspect="landscape"
                sizes="(min-width: 1024px) 38vw, 90vw"
              />
            </div>
          </div>
          <Timeline items={engineeringCards} />
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading eyebrow="Skills" title="Technical strengths and coordination habits." tone="light" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringSkills.map((skill) => (
              <div key={skill} className="rounded-md border border-deepBrown/12 bg-paper/80 px-4 py-4 text-sm font-bold text-mutedBrown">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
        <Card className="text-center">
          <p className="text-sm font-bold uppercase text-mutedGold">Engineering philosophy</p>
          <h2 className="mt-4 text-3xl font-black text-ink">
            Service, communication, stewardship, and public trust.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-ink/74">
            I approach engineering as service, communication, risk management, stewardship, and public trust. The math matters, but so does the explanation.
          </p>
        </Card>
      </section>

      <CTASection
        headline="Need an engineer who can translate complexity?"
        text="I bring a practical eye for scope, coordination, documentation, and the people who have to use the information."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
