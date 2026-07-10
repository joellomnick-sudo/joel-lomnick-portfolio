import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { PortfolioCard } from "@/components/PortfolioCard";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredWork, homeLanes, identityLabels } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:py-20">
          <div>
            <p className="circuit-line inline-flex pb-3 text-sm font-bold uppercase text-mutedGold">
              Engineer meets storyteller meets community architect.
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight text-balance text-warmIvory sm:text-6xl lg:text-7xl">
              Joel Maurice Lomnick, EIT
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-warmIvory/84">
              Electrical Engineer • Creative Strategist • Author • Mentor • Community Builder
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-warmIvory/68">
              I help people, projects, and organizations move from scattered ideas to clear systems, polished visuals, and meaningful impact.
            </p>
            <div className="mt-6 max-w-2xl rounded-lg border border-mutedGold/20 bg-richBlack/58 p-4">
              <p className="text-xs font-bold uppercase text-teal">LomnickPro services</p>
              <p className="mt-2 text-sm leading-6 text-warmIvory/74">
                Practical websites, resumes, branding, project planning, and community strategy for mission-driven people and organizations.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/portfolio">View My Work</ButtonLink>
              <ButtonLink href="/lionheart" variant="secondary">
                Read Lionheart
              </ButtonLink>
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
          eyebrow="More than one lane"
          title="Technical discipline, creative communication, and community leadership."
          body="My work sits at the intersection of technical discipline, creative communication, faith-rooted service, cultural memory, and community leadership."
          tone="light"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeLanes.map((lane) => (
            <Card key={lane.title}>
              <h3 className="text-xl font-black text-ink">{lane.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink/72">{lane.description}</p>
            </Card>
          ))}
        </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Featured work"
            title="Systems, stories, and public presence built with purpose."
            tone="light"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWork.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Need clarity, structure, or a polished public presence?"
        text="Whether it is a project, resume, website, event, organization, or personal story, I help turn rough ideas into something usable."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
