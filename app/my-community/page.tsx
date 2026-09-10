import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { EditorialImage } from "@/components/EditorialImage";
import { communityStories } from "@/data/site";

export const metadata: Metadata = {
  title: "My Community",
  description: "Joel M. Lomnick's first-person stories of Black engineering mentorship, fraternity and NPHC leadership, church service, cultural wellness, and community connection.",
};

export default function MyCommunityPage() {
  return (
    <>
      <section className="dark-hero editorial-section">
        <div className="site-container">
          <p className="eyebrow">My Community</p>
          <h1 className="display-title mt-5 max-w-[17ch]">My world has always been built with people.</h1>
          <p className="prose-copy prose-copy-dark mt-7">
            I am a proud Black man shaped by engineering rooms, church balconies, fraternity meetings, mentoring tables, dance floors, choirs, festivals, and cultural spaces. These are not side interests. They are the communities that taught me how to serve, lead, listen, move, build, and come back with something useful.
          </p>
        </div>
      </section>

      {communityStories.map((story, index) => (
        <section key={story.title} className={`py-16 ${index % 2 ? "bg-parchment" : "bg-paper"}`}>
          <div className={`site-container grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] ${index % 2 ? "lg:[&>figure]:order-2" : ""}`}>
            <EditorialImage assetId={story.assetId} className={`mx-auto w-full ${story.imageClassName}`} />
            <div className="max-w-2xl">
              <p className="eyebrow">One of my worlds</p>
              <h2 className="section-title mt-4">{story.title}</h2>
              <p className="prose-copy mt-5">{story.body}</p>
              <p className="mt-5 max-w-[35ch] font-serif text-[1.35rem] font-bold leading-8 text-mutedBrown">{story.caption}</p>
              {"href" in story && story.href ? (
                <a href={story.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-link focus-ring">
                  Step into this world <ExternalLink size={18} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
