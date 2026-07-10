import Image from "next/image";
import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { serviceCards } from "@/data/site";

export default function CreativeServicesPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-warmIvory/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Creative Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Creative Services
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/72 sm:text-xl">
            Lomnick Professional Services helps mission-driven people and organizations turn scattered ideas into professional visibility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Lomnick Professional Services"
          title="Structure for the message, polish for the public moment."
          body="The goal is not decoration. The goal is to help people understand what you do, why it matters, and how to take the next step."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <Card key={service.title} className="overflow-hidden p-0">
              {service.image ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-deepBrown">
                  <Image
                    src={service.image}
                    alt={service.alt ?? `${service.title} placeholder image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-black text-warmIvory">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-warmIvory/70">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <CTASection
        headline="Have an idea but do not know how to organize it?"
        text="Bring the rough idea, event, resume, website, chapter initiative, or public-facing project. We will shape the next usable version."
        primaryLabel="Let's Figure It Out"
        primaryHref="/contact"
      />
    </>
  );
}
