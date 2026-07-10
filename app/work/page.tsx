import Link from "next/link";
import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { leadershipSections, portfolioCategories, portfolioItems, serviceCards } from "@/data/site";

const creativePhotoCards = serviceCards.filter((item) => item.image);
const creativeTextCards = serviceCards.filter((item) => !item.image);

export default function WorkPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Work & Leadership</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            The work is different. The pattern is the same.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/84 sm:text-xl">
            Across engineering, creative strategy, fraternity leadership, church media, NPHC collaboration, mentoring, storytelling, and cultural wellness, the work comes back to the same discipline: clarify the mission, build the structure, document the next move, and leave people stronger than before.
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <SectionHeading
              eyebrow="Creative Strategy & LomnickPro"
              title="I help mission-driven people look as organized as their work actually is."
              body="The creative work is not decoration. It is structure, visibility, clarity, and trust for people whose message deserves to be understood."
              tone="light"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {creativePhotoCards.map((service) => (
                <Card key={service.title} className="overflow-hidden p-0">
                  <VisualTile
                    title={service.title}
                    category={service.category}
                    image={service.image}
                    alt={service.alt}
                    imageFit={service.imageFit}
                    imageType={service.imageType}
                    aspect="landscape"
                    priority
                    sizes="(min-width: 1024px) 28vw, 90vw"
                  />
                  <div className="p-6">
                    <p className="text-sm font-black uppercase text-mutedBrown">{service.category}</p>
                    <h2 className="mt-3 text-xl font-black text-ink">{service.title}</h2>
                    <p className="mt-4 text-base leading-8 text-ink/82">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {creativeTextCards.map((service) => (
              <Card key={service.title} className="border-l-4 border-l-mutedGold">
                <p className="text-sm font-black uppercase text-mutedBrown">{service.category}</p>
                <h2 className="mt-3 text-xl font-black text-ink">{service.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink/82">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Chapter, Council & Community Systems"
            title="Leadership is not a title. It is the system you leave behind."
            body="This work stays professional, positive, and relationship-protective. It emphasizes service, documentation, training, succession, public visibility, coalition trust, and care for the people who inherit the structure."
            tone="light"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {leadershipSections.map((section) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium"
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
                  priority
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 90vw"
                  className="rounded-none"
                />
                <div className="p-6">
                  <p className="text-sm font-black uppercase text-mutedBrown">{section.category}</p>
                  <h2 className="mt-3 text-2xl font-black text-ink">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-ink/82">{section.description}</p>
                  <div className="mt-5 border-t border-deepBrown/10 pt-5">
                    <p className="text-sm font-black uppercase text-mutedGold">System built</p>
                    <p className="mt-2 text-base leading-7 text-ink/82">{section.system}</p>
                  </div>
                  {section.principle ? (
                    <p className="mt-4 rounded-md border border-mutedGold/25 bg-parchment/70 px-4 py-3 text-sm font-bold leading-6 text-mutedBrown">
                      {section.principle}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap gap-3">
            {portfolioCategories.map((category) => (
              <span key={category} className="rounded-md border border-deepBrown/12 bg-paper/88 px-4 py-2 text-sm font-bold text-mutedBrown">
                {category}
              </span>
            ))}
          </div>

          <SectionHeading
            eyebrow="Selected case studies"
            title="A record of systems, roles, and outcomes."
            body="Compact notes on what was built, what role I played, and what the work proves."
            className="mt-12"
            tone="light"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {portfolioItems.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-deepBrown/12 bg-paper/90 p-6 shadow-premium sm:p-7"
              >
                <p className="text-sm font-black uppercase text-mutedBrown">{item.category}</p>
                <h2 className="mt-3 text-2xl font-black text-ink">{item.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink/82">{item.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-black uppercase text-mutedGold">Role</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-ink/84">{item.role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-mutedGold">What I built</p>
                    <p className="mt-2 text-base leading-7 text-ink/82">{item.whatBuilt}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm font-black uppercase text-mutedGold">What it proves</p>
                    <p className="mt-2 text-base leading-7 text-ink/82">{item.whatItProves}</p>
                  </div>
                </div>

                <Link
                  href={item.href ?? "/contact"}
                  className="mt-6 inline-flex min-h-11 items-center rounded-md bg-buttonGold px-5 py-3 text-[0.95rem] font-black text-richBlack transition hover:bg-softGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {item.ctaLabel ?? "Start the Conversation"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="See a project pattern that fits what you are building?"
        text="The next conversation can be about engineering clarity, creative visibility, leadership systems, church media support, mentoring, cultural wellness, or a writing project."
        primaryLabel="Book a Consultation"
        primaryHref="/contact"
        secondaryLabel="Read the Story Behind the Work"
        secondaryHref="/lionheart"
      />
    </>
  );
}
