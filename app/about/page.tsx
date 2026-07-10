import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { aboutArc, beliefStatements } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">About Joel</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            The Builder Behind the Work
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            My life has trained me to turn survival, service, and technical discipline into useful systems.
          </p>
          <div className="mt-8">
            <ButtonLink href="/lionheart" variant="secondary">
              Read the Story Behind the Work
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Life arc"
            title="A public version of the story, held with structure."
            body="This page gives enough context to understand the man behind the systems without turning the portfolio into the full memoir."
            tone="light"
          />
          <div className="mt-10 grid gap-5">
            {aboutArc.map((section, index) => (
              <article
                key={section.title}
                className="grid overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium lg:grid-cols-[0.34fr_0.66fr]"
              >
                <VisualTile
                  title={section.title}
                  category={section.category}
                  visualLabel={section.visualLabel}
                  placeholderVariant={section.placeholderVariant}
                  aspect="landscape"
                  className="h-full rounded-none border-b lg:border-b-0 lg:border-r"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-black uppercase text-mutedBrown">
                    {String(index + 1).padStart(2, "0")} / {section.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-ink/74">{section.description}</p>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-2 text-sm font-semibold text-mutedBrown sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mutedGold" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-7xl px-5 py-16 text-ink sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="What I believe"
            title="Good work should be clear, useful, repeatable, and rooted in"
            accent="Purpose."
            tone="light"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beliefStatements.map((statement) => (
              <Card key={statement} className="border-l-4 border-l-mutedGold">
                <p className="text-lg font-black leading-7 text-ink">{statement}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="The full story has weight. The public page has structure."
        text="Lionheart carries the deeper testimony; this portfolio shows how that testimony became systems, service, and leadership."
        primaryLabel="Read the Story Behind the Work"
        primaryHref="/lionheart"
        secondaryLabel="Explore My Work"
        secondaryHref="/portfolio"
      />
    </>
  );
}
