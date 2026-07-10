import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { leadershipSections } from "@/data/site";

export default function LeadershipPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Leadership & Community Systems</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Leadership is not a title. It is the system you leave behind.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            Fraternity, NPHC, church, STEM, mentoring, and cultural work all ask the same question: did the service become clearer, stronger, and easier to continue?
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Leadership case studies"
            title="Service-rooted systems, not personal clout."
            body="Every public-facing section keeps sensitive fraternity, intake, church, and coalition context professional, screenshot-safe, and relationship-protective."
            tone="light"
          />

          <div className="mt-10 grid gap-8">
            {leadershipSections.map((section, index) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium"
              >
                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
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
                    sizes="(min-width: 1024px) 42vw, 90vw"
                    className="h-full rounded-none border-b lg:border-b-0 lg:border-r"
                  />
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-black uppercase text-mutedBrown">
                      {String(index + 1).padStart(2, "0")} / {section.category}
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl">{section.title}</h2>
                    <p className="mt-4 text-lg font-semibold leading-8 text-mutedBrown">{section.description}</p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                      <div>
                        <p className="text-xs font-black uppercase text-mutedGold">Challenge</p>
                        <p className="mt-2 text-sm leading-6 text-ink/74">{section.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-mutedGold">Joel's role</p>
                        <p className="mt-2 text-sm leading-6 text-ink/74">{section.role}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-mutedGold">System built</p>
                        <p className="mt-2 text-sm leading-6 text-ink/74">{section.system}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-mutedGold">What changed</p>
                        <p className="mt-2 text-sm leading-6 text-ink/74">{section.outcome}</p>
                      </div>
                    </div>

                    {section.principle ? (
                      <div className="mt-6 rounded-lg border border-mutedGold/25 bg-richBlack px-5 py-4 text-warmIvory">
                        <p className="text-xs font-black uppercase text-mutedGold">Principle served</p>
                        <p className="mt-2 text-base font-semibold leading-7 text-warmIvory/84">{section.principle}</p>
                      </div>
                    ) : null}

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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Building leaders means building systems around them."
        text="Mentoring, chapter operations, church service, council visibility, and cultural wellness all need structure that survives the meeting."
        primaryLabel="Connect About Leadership"
        primaryHref="/contact"
      />
    </>
  );
}
