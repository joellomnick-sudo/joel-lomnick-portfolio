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
          <p className="text-sm font-bold uppercase text-mutedGold">Lomnick Professional Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            I help mission-driven people look as organized as their work actually is.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            Creative work is not decoration. It is structure, visibility, clarity, and trust for people whose message deserves to be understood.
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Creative services"
            title="Structure for the message, polish for the public moment."
            body="Websites, branding, flyers, presentations, resumes, public-facing messaging, and program strategy all become stronger when the mission has a system around it."
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
                  <h2 className="mt-3 text-xl font-black text-ink">{service.title}</h2>
                  <p className="mt-4 text-base leading-7 text-ink/74">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:py-20">
          {["Clarity before polish", "Systems before sparkle", "Trust before traffic"].map((principle) => (
            <Card key={principle} className="border-l-4 border-l-mutedGold">
              <p className="font-serif text-2xl font-black text-ink">{principle}</p>
              <p className="mt-4 text-base leading-8 text-ink/72">
                The visible deliverable should make the work easier to understand, share, repeat, and trust.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <CTASection
        headline="Have a mission that needs a clearer public presence?"
        text="Bring the website, brand, resume, event, chapter initiative, church communication need, or public-facing project. We will shape the next usable version."
        primaryLabel="Start a Creative Project"
        primaryHref="/contact"
      />
    </>
  );
}
