import Link from "next/link";
import type { CardItem } from "@/data/site";
import { VisualTile } from "@/components/VisualTile";

type PortfolioCardProps = {
  item: CardItem;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  const content = (
    <article className="group h-full overflow-hidden rounded-lg border border-deepBrown/12 bg-paper shadow-premium transition hover:-translate-y-1 hover:border-mutedGold/65">
      <VisualTile
        title={item.title}
        category={item.category}
        image={item.image}
        alt={item.alt}
        imageFit={item.imageFit}
        imageType={item.imageType}
        visualLabel={item.visualLabel}
        placeholderVariant={item.placeholderVariant}
      />
      <div className="p-6">
        {item.category ? (
          <p className="text-xs font-black uppercase text-mutedBrown">{item.category}</p>
        ) : null}
        <h3 className="mt-3 text-xl font-black text-ink">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-ink/72">{item.description}</p>
        {item.href ? (
          <p className="mt-5 text-sm font-bold text-mutedBrown group-hover:text-richBlack">
            {item.ctaLabel ?? "Explore related work"}
          </p>
        ) : null}
      </div>
    </article>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Link href={item.href} className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold">
      {content}
    </Link>
  );
}
