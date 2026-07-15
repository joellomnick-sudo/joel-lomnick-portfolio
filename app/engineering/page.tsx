import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialImage } from "@/components/EditorialImage";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Electrical engineering coordination, technical communication, and public classroom teaching resources from Joel Maurice Lomnick, EIT.",
};

export default function EngineeringPage() {
  return (
    <>
      <section className="dark-hero editorial-section">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="eyebrow">Electrical engineering</p>
            <h1 className="display-title mt-5 max-w-[17ch]">Complex systems should become clear enough to build.</h1>
            <p className="prose-copy prose-copy-dark mt-7">My engineering work lives where power, lighting, communications, life safety, owners, consultants, and the field have to meet. The drawings matter. So do coordination, judgment, and the plain-language explanation that helps someone act with confidence.</p>
          </div>
          <EditorialImage filename="engineering-work-innovation.jpg" priority className="mx-auto w-full max-w-xl" />
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment">
        <div className="site-container grid items-center gap-9 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="eyebrow">Public Teaching Edition</p>
            <h2 className="section-title mt-4">Engineering 101: Designing a Modern Classroom</h2>
            <p className="prose-copy mt-5">A plain-language introduction to how electrical power, lighting controls, communications, life safety, classroom technology, energy requirements, and other building trades come together in one room.</p>
            <p className="mt-5 font-bold text-mutedBrown">Generic examples, not construction documents.</p>
            <div className="button-row mt-7">
              <ButtonLink href="/documents/engineering-101-modern-classroom.pdf" target="_blank">View guide</ButtonLink>
              <ButtonLink href="/documents/engineering-101-modern-classroom.pdf" download variant="secondary">Download PDF</ButtonLink>
              <ButtonLink href="/engineering/classroom-lab" variant="secondary">Launch interactive classroom</ButtonLink>
            </div>
          </div>
          <div className="border-l-4 border-mutedGold bg-warmIvory p-7">
            <h3 className="subsection-title">Inside the classroom</h3>
            <p className="mt-4 text-base leading-8 text-mutedBrown">Explore how distinct systems coordinate without becoming interchangeable. Place devices, review practical guidance, and compare a concept layout with your own.</p>
          </div>
        </div>
      </section>

      <section className="editorial-section-compact">
        <div className="site-container grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Engineering practice</p>
            <h2 className="section-title mt-4">Technical work is also communication.</h2>
          </div>
          <div className="prose-copy space-y-5">
            <p>I support electrical system coordination across power, lighting, controls, fire alarm, communications, utilities, RFIs, submittals, and field documentation. Public-sector and educational work requires attention to code, construction sequence, operations, and the people who will inherit the building.</p>
            <p>No confidential project names, drawings, schedules, specifications, or owner documents are shown here. The public examples focus on the thinking and teaching habits behind responsible project delivery.</p>
          </div>
        </div>
      </section>

      <section className="editorial-section-compact bg-richBlack text-warmIvory">
        <div className="site-container max-w-4xl">
          <p className="eyebrow">Engineering philosophy</p>
          <blockquote className="pull-quote mt-5">The math matters. The explanation matters too.</blockquote>
          <p className="prose-copy prose-copy-dark mt-6">Good engineering protects people, manages risk, respects public trust, and leaves a trail that the next person can understand.</p>
        </div>
      </section>
    </>
  );
}
