import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialImage } from "@/components/EditorialImage";

const worldLanes = [
  {
    title: "The Engineer",
    href: "/engineering",
    body: "Power, buildings, fieldwork, technical judgment, and the discipline to make complicated systems understandable.",
  },
  {
    title: "The Storyteller",
    href: "/lionheart",
    body: "Lionheart, memoir, family history, humor, grief, imagination, and the unfinished work of becoming.",
  },
  {
    title: "The Community Builder",
    href: "/my-community",
    body: "NSBE, Iota, NPHC, church, mentoring, Richmond, and the Black community spaces that shaped how I lead.",
  },
  {
    title: "The Creative Operator",
    href: "/i-build-things",
    body: "Websites, guides, visuals, proposals, training tools, and practical systems that help meaningful work travel farther.",
  },
  {
    title: "The Culture Lover",
    href: "/my-community",
    body: "Line dance, West African drum and dance, gospel, karaoke, festivals, games, movement, rhythm, and joy.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="dark-hero">
        <div className="site-container grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.16fr_.84fr] lg:py-14">
          <div>
            <p className="eyebrow">Joel M. Lomnick</p>
            <h1 className="display-title mt-5 max-w-[18ch] lg:max-w-none lg:text-[3.625rem]">
              <span className="lg:block lg:whitespace-nowrap">I build systems,</span>
              <span className="lg:block lg:whitespace-nowrap"> tell stories,</span>
              <span className="lg:block lg:whitespace-nowrap"> and share my world.</span>
            </h1>
            <p className="prose-copy prose-copy-dark mt-7">
              I am a proud Black man, electrical engineer, storyteller, mentor, and community builder. My world moves between engineering offices, church balconies, fraternity meetings, mentoring conversations, creative projects, dance floors, cultural spaces, and notebooks full of unfinished chapters. What connects it all is simple: I help people turn complicated ideas, hard-earned experience, and meaningful work into something clear, useful, and strong enough to share.
            </p>
            <div className="button-row mt-8">
              <ButtonLink href="/my-story">Start with my story</ButtonLink>
              <ButtonLink href="/connect" variant="quiet">Connect with me</ButtonLink>
            </div>
          </div>
          <EditorialImage assetId="home-headshot" priority className="mx-auto w-full max-w-md" />
        </div>
      </section>

      <section className="paper-grid py-12">
        <div className="site-container grid items-start gap-9 lg:grid-cols-[.78fr_1.22fr]">
          <p className="pull-quote">The many lanes are not a contradiction. They are the map.</p>
          <div>
            <h2 className="section-title">Step into my world.</h2>
            <p className="prose-copy mt-5">
              This site is not a box I am trying to fit inside. It is a guided walk through the rooms that made me: <Link className="text-link" href="/engineering">engineering</Link>, <Link className="text-link" href="/my-community">Black community</Link>, faith, brotherhood, culture, mentoring, creative work, and <Link className="text-link" href="/lionheart">Lionheart</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-14">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">A guided tour</p>
            <h2 className="section-title mt-4">The Many Joels Are One Joel.</h2>
            <p className="prose-copy mt-5">Each doorway shows a different part of my life, but the pattern is the same: build with care, tell the truth, serve people, and leave something clearer than I found it.</p>
          </div>
          <div className="world-grid mt-10">
            {worldLanes.map((lane) => (
              <article key={lane.title} className="world-card">
                <h3>{lane.title}</h3>
                <p>{lane.body}</p>
                <Link href={lane.href} className="focus-ring">Enter this lane</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-12">
        <div className="site-container max-w-4xl text-center">
          <h2 className="section-title mx-auto">Bring the rough version.</h2>
          <p className="prose-copy mx-auto mt-5">Tell me what you are trying to build, organize, explain, or improve. I can help shape the next step from there.</p>
          <div className="button-row mt-7 justify-center">
            <ButtonLink href="/i-build-things">See what I build</ButtonLink>
            <ButtonLink href="/connect" variant="secondary">Connect with me</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
