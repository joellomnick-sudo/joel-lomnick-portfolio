import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { lionheartThemes } from "@/data/site";

export default function LionheartPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:py-24">
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
              Lionheart: The Joel Lomnick Story
            </h1>
            <p className="mt-5 font-serif text-2xl font-bold text-mutedGold">
              Survival. Family. Career. Identity. Ministry. Mentorship. Legacy.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-warmIvory/72">
              Lionheart is my personal testimony of becoming whole while still building. It is a story of family, faith, engineering, Black identity, resilience, mentorship, and learning how to carry strength without turning into stone.
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Themes"
          title="A story with weight, structure, and room to breathe."
          body="The page keeps the testimony powerful but professional, avoiding long traumatic details while naming the themes that give the work its shape."
          tone="light"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {lionheartThemes.map((theme) => (
            <Card key={theme} className="flex min-h-28 items-center justify-center text-center">
              <h3 className="font-serif text-2xl font-bold text-mutedGold">{theme}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center text-ink sm:px-8 lg:py-20">
          <p className="font-serif text-3xl font-bold leading-tight text-balance sm:text-5xl">
            "The lion is not just about roaring. It is patience, protection, posture. And heart is not weakness. It is resilience."
          </p>
        </div>
      </section>
    </>
  );
}
