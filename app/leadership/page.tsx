import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { leadershipSections } from "@/data/site";

export default function LeadershipPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
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

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Service ecosystem"
            title="Community work with structure and continuity."
            body="The common thread is preparation: creating documentation, mentoring successors, building public presence, and leaving the work easier to continue."
            tone="light"
          />

          <div className="mt-10 grid gap-6">
            {leadershipSections.map((section) => (
              <article
                key={section.title}
                className="grid overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium lg:grid-cols-[0.9fr_1.1fr]"
              >
                <VisualTile
                  title={section.title}
                  category={section.category}
                  image={section.image}
                  alt={section.alt}
                  imageFit={section.imageFit}
                  imageType={section.imageType}
                  visualLabel={section.visualLabel}
                  placeholderVariant={section.placeholderVariant}
                  aspect={section.imageFit === "portrait" ? "portrait" : "landscape"}
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="h-full rounded-none border-b lg:border-b-0 lg:border-r"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-black uppercase text-mutedBrown">{section.category}</p>
                  <h2 className="mt-3 text-2xl font-black text-ink">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-ink/72">{section.description}</p>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-2 text-sm text-ink/74 sm:grid-cols-2">
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

      <CTASection
        headline="Building leaders means building systems around them."
        text="Mentoring, chapter operations, church service, and community visibility all need structure that survives the meeting."
        primaryLabel="Connect About Leadership"
        primaryHref="/contact"
      />
    </>
  );
}
