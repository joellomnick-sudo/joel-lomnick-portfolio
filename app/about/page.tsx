import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { aboutArc, aboutPhotos, beliefStatements } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">About Joel</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            The Builder Behind the Work
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/84 sm:text-xl">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-20">
          <div>
            <SectionHeading
              eyebrow="Life arc"
              title="A public version of the story, told with care."
              body="This is not the full memoir. It is the thread that helps explain why my work keeps returning to structure, service, communication, and legacy."
              tone="light"
            />
            <blockquote className="mt-8 border-l-4 border-mutedGold bg-paper/72 px-6 py-5 text-ink shadow-sm">
              <p className="font-serif text-2xl font-bold leading-9">
                I am interested in work that makes people clearer, stronger, and better held by the systems around them.
              </p>
            </blockquote>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {aboutPhotos.map((photo) => (
                <figure key={photo.title} className="overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium">
                  <VisualTile
                    title={photo.title}
                    category={photo.category}
                    image={photo.image}
                    alt={photo.alt}
                    imageFit={photo.imageFit}
                    imageType={photo.imageType}
                    aspect="landscape"
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 30vw, 90vw"
                  />
                  <figcaption className="p-4">
                    <p className="text-sm font-black uppercase text-mutedBrown">{photo.category}</p>
                    <p className="mt-1 text-base font-semibold leading-7 text-ink/82">{photo.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-deepBrown/12 bg-paper/88 p-6 shadow-premium sm:p-8">
            <ol className="grid gap-7">
              {aboutArc.map((section) => (
                <li key={section.title} className="grid gap-4 border-b border-deepBrown/10 pb-7 last:border-b-0 last:pb-0 sm:grid-cols-[4rem_1fr]">
                  <span className="font-serif text-3xl font-black text-mutedGold">{section.category}</span>
                  <div>
                    <h2 className="text-2xl font-black text-ink">{section.title}</h2>
                    <p className="mt-3 text-base leading-8 text-ink/82 sm:text-lg">{section.description}</p>
                    {section.bullets ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="rounded-md border border-deepBrown/12 bg-parchment/70 px-3 py-1.5 text-sm font-bold text-mutedBrown">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
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
        secondaryHref="/work"
      />
    </>
  );
}
