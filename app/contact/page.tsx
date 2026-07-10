import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { contactCards, contactCategories } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <section className="blueprint-panel border-b border-mutedGold/18">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase text-mutedGold">Contact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-balance text-warmIvory sm:text-6xl">
            Let's turn the rough idea into something clear, useful, and public-ready.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-warmIvory/76 sm:text-xl">
            Reach out for engineering clarity, creative services, leadership systems, speaking, mentoring, church/fraternity collaboration, or a Lionheart writing conversation.
          </p>
        </div>
      </section>

      <section className="paper-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <SectionHeading
              eyebrow="Reach out"
              title="Choose the lane. Bring the rough version."
              body="You do not need a perfect brief before the first conversation. You need enough clarity to name the kind of help you need."
              tone="light"
            />
            <div className="mt-8 grid gap-4">
              {contactCards.map((card) => (
                <Card key={card.title}>
                  <p className="text-sm font-bold uppercase text-mutedGold">{card.title}</p>
                  {card.href ? (
                    <a className="mt-2 block text-xl font-black text-ink underline-offset-4 hover:text-mutedBrown hover:underline" href={card.href}>
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-xl font-black text-ink">{card.value}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <Card className="p-7">
              <h2 className="text-2xl font-black text-ink">Good reasons to reach out</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contactCategories.map((category) => (
                  <div key={category} className="rounded-md border border-deepBrown/12 bg-white/55 px-4 py-3 text-sm font-bold leading-6 text-mutedBrown">
                    {category}
                  </div>
                ))}
              </div>
            </Card>

            <Card tone="light" className="p-7">
              <h2 className="text-2xl font-black text-ink">Project inquiry</h2>
              {/* Connect this form to Formspree, Netlify Forms, or another safe provider when a submission backend is selected. */}
              <form className="mt-5 grid gap-5" aria-label="Project inquiry form">
                <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="name">
                  Name
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="min-h-12 rounded-md border border-deepBrown/20 bg-white px-4 text-base font-medium text-ink focus:border-mutedGold focus:outline-none focus:ring-2 focus:ring-mutedGold/35"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="min-h-12 rounded-md border border-deepBrown/20 bg-white px-4 text-base font-medium text-ink focus:border-mutedGold focus:outline-none focus:ring-2 focus:ring-mutedGold/35"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="project-type">
                  Project Type
                  <select
                    id="project-type"
                    name="project-type"
                    className="min-h-12 rounded-md border border-deepBrown/20 bg-white px-4 text-base font-medium text-ink focus:border-mutedGold focus:outline-none focus:ring-2 focus:ring-mutedGold/35"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {contactCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="message">
                  Message
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="rounded-md border border-deepBrown/20 bg-white px-4 py-3 text-base font-medium text-ink focus:border-mutedGold focus:outline-none focus:ring-2 focus:ring-mutedGold/35"
                    placeholder="Tell me what you are trying to organize."
                  />
                </label>
                <div>
                  <button
                    type="button"
                    className="min-h-12 w-full rounded-md bg-deepBrown px-5 py-3 text-sm font-bold text-warmIvory transition hover:bg-richBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    Send a Message
                  </button>
                  <p className="mt-3 text-sm leading-6 text-ink/68">
                    This form is a contact placeholder. For now, please email or call directly.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
