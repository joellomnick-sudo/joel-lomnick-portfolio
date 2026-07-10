import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { lionheartThemes } from "@/data/site";

export default function LionheartPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-24">
          <div className="mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-lg border border-mutedGold/35 bg-deepBrown shadow-gold">
              <div className="relative aspect-[2/3]">
                <Image
                  src="/images/lionheart-cover.jpg"
                  alt="Cover of Lionheart: The Joel Lomnick Story, Volume 1."
                  fill
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-mutedGold">Lionheart</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
              This is the story behind the builder.
            </h1>
            <p className="mt-5 font-serif text-2xl font-bold text-softGold">
              Survival. Family. Identity. Career. Faith. Mentorship. Legacy.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-warmIvory/76">
              Lionheart is a memoir project about becoming whole while still building. It holds Black masculinity, family, faith, engineering, healing, mentorship, and legacy with emotional weight and professional restraint.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/lionheart">Explore the Story</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Invite Me to Speak
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Discuss a Writing Project
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Memoir themes"
            title="A literary project with structure, testimony, and room to breathe."
            body="The page names the themes without trying to tell the whole book online. The deeper work belongs in the manuscript, in conversation, and in the rooms where the story can be held responsibly."
            tone="light"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {lionheartThemes.map((theme) => (
              <Card key={theme} className="flex min-h-28 items-center justify-center border-l-4 border-l-mutedGold text-center">
                <h2 className="font-serif text-2xl font-bold text-ink">{theme}</h2>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 text-ink sm:px-8 lg:grid-cols-2 lg:py-20">
          <blockquote className="rounded-lg border border-deepBrown/12 bg-paper/85 p-8 shadow-premium">
            <p className="font-serif text-3xl font-bold leading-tight text-balance">
              "The lion is not just about roaring. It is patience, protection, posture."
            </p>
          </blockquote>
          <blockquote className="rounded-lg border border-deepBrown/12 bg-paper/85 p-8 shadow-premium">
            <p className="font-serif text-3xl font-bold leading-tight text-balance">
              "Heart is not weakness. It is resilience with somewhere to go."
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
