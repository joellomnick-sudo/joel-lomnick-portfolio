import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with Joel M. Lomnick about engineering, building useful things, mentorship, community, church, Black cultural work, or Lionheart.",
};

const worlds = [
  {
    title: "Engineering and Technical Clarity",
    body: "I care about power, buildings, field conditions, coordination, and the plain-language explanations that help people make responsible decisions.",
  },
  {
    title: "NSBE and Black Engineering Belonging",
    body: "NSBE is part of how I learned that technical excellence and Black community responsibility can strengthen each other instead of competing for space.",
    href: "https://nsbe.org/",
  },
  {
    title: "Iota Phi Theta and Brotherhood",
    body: "Iota is where service, succession, accountability, leadership development, and brotherhood become daily practice instead of abstract words.",
    href: "https://www.rvaiotas.org/",
  },
  {
    title: "NPHC of Metro Richmond",
    body: "Coalition work lets me help Divine Nine leaders communicate clearly, preserve relationships, and show what Black civic collaboration can look like.",
    href: "https://nphcmr.org/",
  },
  {
    title: "Church, Media, and Mentoring",
    body: "Church has shaped my service through worship support, youth mentoring, media ministry, visual communication, and the steady work of being useful behind the scenes.",
    href: "https://www.thirdstreetbethel.org/",
  },
  {
    title: "Culture, Dance, Music, and Joy",
    body: "Line dance, West African drum and dance, gospel, karaoke, festivals, and creative rooms remind me that joy is not extra. It is one way community stays alive.",
    href: "https://www.breakitdownrva.com/",
  },
] as const;

export default function ConnectPage() {
  return (
    <>
      <section className="dark-hero editorial-section-compact">
        <div className="site-container">
          <p className="eyebrow">Connect</p>
          <h1 className="display-title mt-5">Step into my world.</h1>
          <p className="prose-copy prose-copy-dark mt-6">
            You do not need a perfect brief before reaching out. Tell me what you are trying to build, organize, explain, improve, or understand. My work usually starts with context, and context is welcome here.
          </p>
        </div>
      </section>

      <section className="editorial-section-compact bg-parchment">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">Where I show up</p>
            <h2 className="section-title mt-4">These are not outside links. These are parts of my life.</h2>
            <p className="prose-copy mt-5">
              My communities are not decorative affiliations at the bottom of a page. They are places where I have learned, led, served, mentored, worshiped, danced, built systems, and grown into a fuller version of myself.
            </p>
          </div>
          <div className="world-grid mt-10">
            {worlds.map((world) => (
              <article key={world.title} className="world-card">
                <h3>{world.title}</h3>
                <p>{world.body}</p>
                {"href" in world && world.href ? (
                  <a href={world.href} target="_blank" rel="noopener noreferrer" className="focus-ring">
                    Continue exploring <ExternalLink size={17} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section-compact paper-grid">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <p className="eyebrow">A private conversation</p>
            <h2 className="section-title mt-4">Let&apos;s begin with context.</h2>
            <p className="prose-copy mt-5">Messages are delivered privately. No personal email address or phone number is published on this site.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
