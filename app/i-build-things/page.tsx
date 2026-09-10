import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CaseStudyGallery } from "@/components/CaseStudyGallery";
import { publicAssetPath } from "@/data/publicAssets";

export const metadata: Metadata = {
  title: "I Build Things",
  description: "The websites, guides, visuals, proposals, training materials, and public-facing systems Joel M. Lomnick builds for meaningful work.",
};

export default function IBuildThingsPage() {
  return (
    <>
      <section className="dark-hero editorial-section">
        <div className="site-container">
          <p className="eyebrow">I Build Things</p>
          <h1 className="display-title mt-5 max-w-[18ch]">I turn rough ideas into things people can use.</h1>
          <p className="prose-copy prose-copy-dark mt-7">
            I build websites, guides, graphics, proposals, presentations, training tools, and communication systems for work that deserves to be understood. Some projects begin with a clear brief. Many begin with scattered notes, screenshots, a deadline, and a feeling that the work matters too much to stay messy.
          </p>
          <div className="button-row mt-8"><ButtonLink href="/connect">Start a conversation</ButtonLink></div>
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment" aria-labelledby="professional-documents-heading">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">My professional record</p>
            <h2 id="professional-documents-heading" className="section-title mt-4">A closer look at my experience.</h2>
            <p className="prose-copy mt-5">These public-safe editions give a fuller view of my engineering, project coordination, creative strategy, leadership, mentoring, and community work. Personal contact information has been removed from the website copies.</p>
          </div>
          <div className="mt-8 grid gap-8 border-t border-deepBrown/15 pt-8 md:grid-cols-2">
            <div>
              <h3 className="subsection-title">Comprehensive Resume</h3>
              <div className="button-row mt-4">
                <ButtonLink href={publicAssetPath("public-resume")} target="_blank">View Resume</ButtonLink>
              </div>
            </div>
            <div className="border-t border-deepBrown/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <h3 className="subsection-title">Comprehensive Cover Letter</h3>
              <div className="button-row mt-4">
                <ButtonLink href={publicAssetPath("public-cover-letter")} target="_blank">View Cover Letter</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section-compact paper-grid">
        <div className="site-container">
          <div className="grid items-end gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-title mt-4">Four ways clarity can strengthen public trust.</h2>
            </div>
            <p className="prose-copy">These anonymous examples protect client and organization privacy while showing the practical shape of my work: organize the message, build useful materials, and make it easier for people to understand what comes next.</p>
          </div>
          <div className="mt-10"><CaseStudyGallery /></div>
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment">
        <div className="site-container max-w-4xl text-center">
          <h2 className="section-title mx-auto">You do not need a perfect brief.</h2>
          <p className="prose-copy mx-auto mt-5">Bring the mission, the audience, the deadline, and whatever rough material already exists. I can help find the clearest path from there.</p>
          <div className="button-row mt-7 justify-center"><ButtonLink href="/connect">Start a conversation</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
