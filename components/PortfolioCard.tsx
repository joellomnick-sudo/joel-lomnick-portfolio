import Image from "next/image";
import Link from "next/link";
import type { CardItem } from "@/data/site";

type PortfolioCardProps = {
  item: CardItem;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  const content = (
    <article className="group h-full overflow-hidden rounded-lg border border-warmIvory/10 bg-warmIvory/[0.055] shadow-premium transition hover:-translate-y-1 hover:border-mutedGold/60">
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-deepBrown">
          <Image
            src={item.image}
            alt={item.alt ?? `${item.title} placeholder image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-richBlack/70 via-transparent to-transparent" />
        </div>
      ) : null}
      <div className="p-6">
        {item.category ? (
          <p className="text-xs font-bold uppercase text-teal">{item.category}</p>
        ) : null}
        <h3 className="mt-3 text-xl font-black text-warmIvory">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-warmIvory/70">{item.description}</p>
        {item.href ? (
          <p className="mt-5 text-sm font-bold text-mutedGold">Explore related work</p>
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
