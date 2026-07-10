import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { homeLanes, identityLabels } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
          <div>
            <p className="circuit-line inline-flex pb-3 text-sm font-bold uppercase text-mutedGold">
              Engineer meets storyteller meets community architect.
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight text-balance text-warmIvory sm:text-6xl lg:text-7xl">
              I build systems, stories, leaders, and infrastructure.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-warmIvory/86">
              Joel Maurice Lomnick, EIT
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-warmIvory/74">
              Electrical Engineer. Creative Strategist. Author. Mentor. Community Builder. Built from survival, designed with purpose, and focused on work that helps people rise.
            </p>
            <div className="mt-6 max-w-2xl rounded-lg border border-mutedGold/25 bg-softBlack/55 p-4 shadow-gold">
              <p className="text-xs font-bold uppercase text-mutedGold">Command center</p>
              <p className="mt-2 text-sm leading-6 text-warmIvory/78">
                Engineering documentation, LomnickPro creative strategy, Lionheart storytelling, Iota/NPHC leadership, church media, mentoring, and cultural wellness in one connected portfolio.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/portfolio">Explore My Work</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Book a Consultation
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -inset-3 rounded-lg border border-mutedGold/20" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-lg border border-mutedGold/35 bg-deepBrown shadow-gold">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/professional-headshot.jpg"
                  alt="Joel Maurice Lomnick professional portrait."
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover object-[center_top]"
                />
              </div>
              <div className="border-t border-mutedGold/25 bg-richBlack/92 p-4">
                <p className="text-sm font-semibold text-warmIvory/78">
                  Richmond-based engineer, storyteller, and systems builder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Professional identity" className="border-b border-deepBrown/10 bg-parchment">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-5 py-5 sm:px-8">
          {identityLabels.map((label) => (
            <span key={label} className="rounded-md border border-deepBrown/15 bg-paper/70 px-4 py-2 text-sm font-bold text-mutedBrown">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Orientation"
            title="Five lanes, one operating system."
            body="The work spans different rooms, but the pattern is consistent: clarify the mission, build the structure, document the next move, and leave people stronger than before."
            tone="light"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {homeLanes.map((lane) => (
              <Link
                key={lane.title}
                href={lane.href ?? "/portfolio"}
                className="group block overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium transition hover:-translate-y-1 hover:border-mutedGold/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold"
              >
                <VisualTile
                  title={lane.title}
                  category={lane.category}
                  visualLabel={lane.visualLabel}
                  placeholderVariant={lane.placeholderVariant}
                  aspect="square"
                />
                <div className="p-5">
                  <h2 className="text-lg font-black text-ink">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/74">{lane.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Need the work to become clear, useful, and public-ready?"
        text="Start with the portfolio, then bring the rough idea when it is time to turn it into a system, story, document, website, or next move."
        primaryLabel="View Case Studies"
        primaryHref="/portfolio"
        secondaryLabel="Book a Consultation"
        secondaryHref="/contact"
      />
    </>
  );
}
