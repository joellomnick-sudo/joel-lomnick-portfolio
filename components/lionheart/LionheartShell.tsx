import Link from "next/link";
import type { ReactNode } from "react";

const privateNav = [
  { label: "Home", href: "/lionheart" },
  { label: "Volume One", href: "/lionheart/volume-one" },
  { label: "Volume Two", href: "/lionheart/volume-two" },
  { label: "Timeline", href: "/lionheart/timeline" },
  { label: "People", href: "/lionheart/people" },
  { label: "Worlds", href: "/lionheart/worlds" },
  { label: "Archive", href: "/lionheart/archive" },
  { label: "Discrepancies", href: "/lionheart/discrepancies" },
  { label: "Story Studio", href: "/lionheart/story-studio" },
  { label: "Media Lab", href: "/lionheart/media-lab" },
] as const;

export function LionheartShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#120d09] text-warmIvory">
      <div className="border-b border-mutedGold/20 bg-richBlack">
        <div className="site-container py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-softGold">Private Story Studio</p>
              <p className="mt-1 font-serif text-2xl font-bold">Lionheart</p>
            </div>
            <form action="/api/lionheart/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-warmIvory/20 px-4 py-2 text-sm font-semibold text-warmIvory transition hover:border-softGold hover:text-softGold"
              >
                Lock studio
              </button>
            </form>
          </div>
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Lionheart private navigation">
            {privateNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-warmIvory/15 px-4 py-2 text-sm font-semibold text-warmIvory/80 transition hover:border-mutedGold hover:text-softGold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
