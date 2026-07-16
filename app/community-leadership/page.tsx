import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { communityStories } from "@/data/site";

export const metadata: Metadata = {
  title: "Community & Leadership",
  description: "Stories of engineering mentorship, fraternity and NPHC leadership, church service, cultural wellness, and community connection.",
};

export default function CommunityPage() {
  return (
    <>
      <section className="dark-hero editorial-section">
        <div className="site-container">
          <p className="eyebrow">Community & Leadership</p>
          <h1 className="display-title mt-5 max-w-[17ch]">The work has always been about people.</h1>
          <p className="prose-copy prose-copy-dark mt-7">Whether I am in a classroom, church balcony, chapter meeting, mentoring conversation, drum circle, or dance line, I show up to help people feel seen, supported, prepared, and connected.</p>
        </div>
      </section>

      {communityStories.map((story, index) => (
        <section key={story.title} className={`py-16 ${index % 2 ? "bg-parchment" : "bg-paper"}`}>
          <div className={`site-container grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] ${index % 2 ? "lg:[&>figure]:order-2" : ""}`}>
            <EditorialImage assetId={story.assetId} className={`mx-auto w-full ${story.imageClassName}`} />
            <div className="max-w-2xl">
              <p className="eyebrow">A service history</p>
              <h2 className="section-title mt-4">{story.title}</h2>
              <p className="prose-copy mt-5">{story.body}</p>
              <p className="mt-5 max-w-[35ch] font-serif text-[1.35rem] font-bold leading-8 text-mutedBrown">{story.caption}</p>
              {"href" in story && story.href ? (
                <a href={story.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-link focus-ring">
                  {story.linkLabel} <ExternalLink size={18} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
