"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
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

function active(pathname: string, href: string) {
  if (href === "/lionheart") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LionheartNav() {
  const pathname = usePathname();

  return (
    <nav className="lionheart-nav" aria-label="Lionheart private navigation">
      {items.map((item) => {
        const selected = active(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={selected ? "page" : undefined}
            className={selected ? "lionheart-nav-link is-active" : "lionheart-nav-link"}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
