type LionheartSectionPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: Array<{ title: string; body: string }>;
};

export function LionheartSectionPage({ eyebrow, title, intro, cards }: LionheartSectionPageProps) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-warmIvory/75">{intro}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-warmIvory/10 bg-richBlack p-6">
              <h2 className="font-serif text-2xl font-bold text-warmIvory">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-warmIvory/70">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
