import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutSections, beliefStatements } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-warmIvory/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">About Joel</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            About Joel
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/72 sm:text-xl">
            Joel Maurice Lomnick is an Electrical Engineer-in-Training, project engineer, creative strategist, author, mentor, fraternity leader, church servant, and cultural arts participant based in Richmond, Virginia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {aboutSections.map((section) => (
            <Card key={section.title}>
              <h2 className="text-2xl font-black text-warmIvory">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-warmIvory/72">{section.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-6xl px-5 py-16 text-ink sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="What I believe"
            title="Good work should be clear, useful, repeatable, and rooted in"
            accent="Purpose."
            className="[&_h2]:text-ink [&_p]:text-ink/70"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beliefStatements.map((statement) => (
              <div key={statement} className="rounded-lg border border-deepBrown/15 bg-white/45 p-5 text-lg font-black text-ink">
                {statement}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Built from survival. Designed with purpose."
        text="Creating systems, stories, and spaces that help people rise."
        primaryLabel="Explore the Work"
        primaryHref="/portfolio"
        secondaryLabel="Contact Joel"
        secondaryHref="/contact"
      />
    </>
  );
}
