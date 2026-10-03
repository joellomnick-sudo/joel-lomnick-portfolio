"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function LionheartNav() {
  const path = usePathname();
  const group = path === "/lionheart/information" ? "Information" : path.startsWith("/lionheart/volume-") || path === "/lionheart" ? "Books" : /\/facts|\/people|\/timeline|\/worlds/.test(path) ? "Story Facts" : "Sources";
  return <nav className="lionheart-nav" aria-label="Lionheart studio">{[{label:"Books",href:"/lionheart"},{label:"Story Facts",href:"/lionheart/facts"},{label:"Sources",href:"/lionheart/sources"},{label:"Information",href:"/lionheart/information"}].map(item => <Link key={item.href} href={item.href} aria-current={group === item.label ? "page" : undefined} className={"lionheart-nav-link " + (group === item.label ? "is-active" : "")}>{item.label}</Link>)}</nav>;
}
