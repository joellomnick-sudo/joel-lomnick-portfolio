import type { SectionItem } from "@/data/site";

type TimelineProps = {
  items: SectionItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative grid gap-5">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-mutedGold/30 sm:block" />
      {items.map((item) => (
        <article
          key={item.title}
          className="relative rounded-lg border border-warmIvory/10 bg-warmIvory/[0.055] p-6 shadow-premium sm:ml-10"
        >
          <span className="absolute -left-[3.15rem] top-7 hidden h-3 w-3 rounded-full border border-mutedGold bg-richBlack sm:block" />
          <h3 className="text-xl font-black text-warmIvory">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-warmIvory/70">{item.description}</p>
          {item.bullets ? (
            <ul className="mt-5 grid gap-2 text-sm text-warmIvory/72 sm:grid-cols-2">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mutedGold" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
