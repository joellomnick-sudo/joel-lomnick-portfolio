import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { serviceCards } from "@/data/site";

export default function CreativeServicesPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
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

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Lomnick Professional Services"
          title="Structure for the message, polish for the public moment."
          body="The goal is not decoration. The goal is to help people understand what you do, why it matters, and how to take the next step."
          tone="light"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <Card key={service.title} className="overflow-hidden p-0">
              <VisualTile
                title={service.title}
                category={service.category}
                image={service.image}
                alt={service.alt}
                imageFit={service.imageFit}
                imageType={service.imageType}
                visualLabel={service.visualLabel}
                placeholderVariant={service.placeholderVariant}
                aspect="landscape"
              />
              <div className="p-6">
                <p className="text-xs font-black uppercase text-mutedBrown">{service.category}</p>
                <h3 className="mt-3 text-xl font-black text-ink">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/72">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
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
