import { Card } from "@/components/Card";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { VisualTile } from "@/components/VisualTile";
import { engineeringCards, engineeringSkills } from "@/data/site";

export default function EngineeringPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Engineering & Infrastructure</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            I make complex electrical systems understandable, coordinated, and buildable.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            The work is real construction documentation: electrical systems coordination, public-sector infrastructure, owner-facing communication, and field-aware technical support.
          </p>
        </div>
      </section>

      <section className="soft-cream-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
          <div>
            <SectionHeading
              eyebrow="Professional proof"
              title="Code-aware support for projects that have to be built."
              body="Power, lighting, fire alarm, low-voltage, utility coordination, RFIs, submittals, field documentation, and plain-language owner communication all live inside the same discipline: make the work clear enough to act on."
              tone="light"
            />
            <div className="mt-8 overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium">
              <VisualTile
                title="Engineering project coordination"
                category="Electrical Systems"
                image="/images/engineering-project.jpg"
                alt="Engineering project coordination illustration representing electrical systems and construction documentation."
                imageFit="contain"
                imageType="contain"
                aspect="landscape"
                sizes="(min-width: 1024px) 38vw, 90vw"
              />
              <div className="border-t border-deepBrown/10 p-5">
                <p className="text-sm font-bold text-mutedBrown">
                  Visual anchor only. Sensitive project drawings and private documents are not displayed.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {engineeringCards.map((item) => (
              <Card key={item.title} className="border-l-4 border-l-mutedGold">
                <h2 className="text-xl font-black text-ink">{item.title}</h2>
                <p className="mt-3 text-base leading-8 text-ink/74">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-surface border-y border-deepBrown/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Technical vocabulary"
            title="The coordination habits behind buildable clarity."
            body="The page should make one thing obvious: this is practical engineering communication grounded in real project delivery."
            tone="light"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringSkills.map((skill) => (
              <div key={skill} className="rounded-md border border-deepBrown/12 bg-paper/90 px-4 py-4 text-sm font-bold text-mutedBrown shadow-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <Card tone="outlined" className="text-center">
          <p className="text-sm font-bold uppercase text-mutedGold">Engineering philosophy</p>
          <h2 className="mt-4 text-3xl font-black text-warmIvory">
            The math matters. The explanation matters too.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-warmIvory/78">
            I approach engineering as service, risk management, stewardship, and public trust. Good technical work should be coordinated enough for the field and clear enough for the owner.
          </p>
        </Card>
      </section>

      <CTASection
        headline="Need engineering communication that people can actually use?"
        text="Bring the coordination problem, public-facing project, or technical story that needs structure."
        primaryLabel="Connect About Engineering"
        primaryHref="/contact"
      />
    </>
  );
}
