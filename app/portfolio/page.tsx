import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { portfolioCategories, portfolioItems } from "@/data/site";

export default function PortfolioPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Selected Work</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Evidence of the systems I have built across multiple worlds.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            This is a curated body of work across engineering, creative strategy, fraternity leadership, church media, coalition support, storytelling, mentorship, and cultural wellness.
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap gap-3">
            {portfolioCategories.map((category) => (
              <span key={category} className="rounded-md border border-deepBrown/12 bg-paper/85 px-4 py-2 text-sm font-bold text-mutedBrown">
                {category}
              </span>
            ))}
          </div>

          <SectionHeading
            eyebrow="Case studies"
            title="Not a scrapbook. A record of systems, roles, and outcomes."
            body="Each case study names the role, the system built, the method, and what the work proves."
            className="mt-12"
            tone="light"
          />

          <div className="mt-10 grid gap-6">
            {portfolioItems.map((item) => (
              <article
                key={item.title}
                className="grid overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium lg:grid-cols-[0.34fr_0.66fr]"
              >
                <VisualTile
                  title={item.title}
                  category={item.category}
                  visualLabel={item.visualLabel}
                  placeholderVariant={item.placeholderVariant}
                  aspect="landscape"
                  className="h-full rounded-none border-b lg:border-b-0 lg:border-r"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-black uppercase text-mutedBrown">{item.category}</p>
                  <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl">{item.title}</h2>
                  <p className="mt-4 text-base leading-8 text-ink/74">{item.description}</p>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase text-mutedGold">Role</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-ink/78">{item.role}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-mutedGold">Tools / methods</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-ink/78">{item.methods}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-mutedGold">What I built</p>
                      <p className="mt-2 text-sm leading-6 text-ink/74">{item.whatBuilt}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-mutedGold">What it proves</p>
                      <p className="mt-2 text-sm leading-6 text-ink/74">{item.whatItProves}</p>
                    </div>
                  </div>

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-7 inline-flex min-h-11 items-center rounded-md bg-buttonGold px-5 py-3 text-sm font-black text-richBlack transition hover:bg-softGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      {item.ctaLabel ?? "Explore Related Work"}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="See a project pattern that fits what you are building?"
        text="The next conversation can be about engineering clarity, creative visibility, leadership systems, church media support, or a writing project."
        primaryLabel="Book a Consultation"
        primaryHref="/contact"
      />
    </>
  );
}
