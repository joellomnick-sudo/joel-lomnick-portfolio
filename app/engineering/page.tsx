import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialImage } from "@/components/EditorialImage";
import { publicAssetPath } from "@/data/publicAssets";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Electrical engineering coordination, technical communication, and public classroom teaching resources from Joel M. Lomnick.",
};

export default function EngineeringPage() {
  const classroomQuestPublic = process.env.CLASSROOM_QUEST_PUBLIC === "true";

  return (
    <>
      <section className="dark-hero editorial-section-compact">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.18fr_.82fr]">
          <div>
            <p className="eyebrow">Electrical engineering</p>
            <h1 className="display-title mt-5 max-w-[17ch]">Complex systems should become clear enough to build.</h1>
            <p className="prose-copy prose-copy-dark mt-7">My engineering work lives where power, lighting, communications, life safety, owners, consultants, and the field have to meet. The drawings matter. So do coordination, judgment, and the plain-language explanation that helps someone act with confidence.</p>
          </div>
          <EditorialImage assetId="engineering-coordination" priority className="mx-auto w-full max-w-[30rem]" />
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment">
        <div className="site-container grid items-center gap-9 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="eyebrow">Public Teaching Edition</p>
            <h2 className="section-title mt-4">
              Engineering 101:{" "}
              <span className="block">From Beginner to Modern Classroom Designer</span>
            </h2>
            <p className="prose-copy mt-5">A plain-language introduction to how electrical power, lighting controls, communications, life safety, classroom technology, energy requirements, and other building trades come together in one room.</p>
            <p className="mt-5 font-bold text-mutedBrown">Generic examples, not construction documents.</p>
            <div className="button-row mt-7">
              <ButtonLink href={publicAssetPath("engineering-guide")} target="_blank">View the Engineering 101 Guide</ButtonLink>
              <ButtonLink href={publicAssetPath("engineering-guide")} variant="secondary" download="engineering-101-modern-classroom.pdf">Download PDF</ButtonLink>
            </div>
          </div>
          <div className="border-l-4 border-mutedGold bg-warmIvory p-7">
            <h3 className="subsection-title">What the guide helps you see</h3>
            <p className="mt-4 text-base leading-8 text-mutedBrown">A classroom is not one drawing or one discipline. It is a coordinated set of systems, decisions, standards, and people working toward a room that is safe, useful, and ready to teach.</p>
          </div>
        </div>
      </section>

      {/* The Classroom Design Quest remains available for private development but is temporarily removed from public promotion. */}
      {classroomQuestPublic ? <section className="editorial-section-compact paper-grid">
        <div className="site-container grid items-center gap-9 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="eyebrow">Classroom Design Quest</p>
            <h2 className="section-title mt-4">Learn the room one system at a time.</h2>
            <p className="prose-copy mt-5">Use a guided journey or an open design workspace to recognize devices, separate design layers, coordinate a classroom concept, and explain why each decision belongs.</p>
            <div className="button-row mt-7">
              <ButtonLink href="/engineering/classroom-lab">Launch Classroom Design Quest</ButtonLink>
            </div>
          </div>
          <div className="border-l border-deepBrown/20 pl-7">
            <h3 className="subsection-title">Built to support the learning process</h3>
            <p className="prose-copy mt-4">Start with the vocabulary. Follow the systems. Make a first attempt. The workspace is designed to make engineering judgment easier to practice and easier to explain.</p>
          </div>
        </div>
      </section> : null}

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
