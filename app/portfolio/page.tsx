import { PortfolioCard } from "@/components/PortfolioCard";
import { SectionHeading } from "@/components/SectionHeading";
import { portfolioCategories, portfolioItems } from "@/data/site";

export default function PortfolioPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-warmIvory/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Selected Work</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Selected Work
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/72 sm:text-xl">
            A connected body of work across creative services, community leadership, professional development, engineering communication, and storytelling.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-wrap gap-3">
          {portfolioCategories.map((category) => (
            <span key={category} className="rounded-md border border-mutedGold/25 bg-warmIvory/[0.055] px-4 py-2 text-sm font-bold text-warmIvory/82">
              {category}
            </span>
          ))}
        </div>

        <SectionHeading
          eyebrow="Portfolio"
          title="Work that makes missions easier to see."
          body="These tiles represent the kinds of systems, visuals, documents, and stories Joel helps build across technical, creative, and community contexts."
          className="mt-12"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
