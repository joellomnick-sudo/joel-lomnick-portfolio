"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/data/site";
import { ButtonLink } from "@/components/ButtonLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-warmIvory/10 bg-richBlack/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link href="/" className="group min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold">
          <span className="block font-serif text-xl font-bold leading-none text-warmIvory group-hover:text-mutedGold">
            Joel Lomnick
          </span>
          <span className="mt-1 block truncate text-xs font-semibold text-warmIvory/72">
            Engineer | Storyteller | Community Builder
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold ${
                  active ? "bg-warmIvory/10 text-mutedGold" : "text-warmIvory/72 hover:bg-warmIvory/8 hover:text-warmIvory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <ButtonLink href="/contact" className="px-4 py-2">
            Book a Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-warmIvory/15 text-warmIvory transition hover:border-mutedGold hover:text-mutedGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
            <span className={`h-0.5 rounded-full bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`border-t border-warmIvory/10 bg-richBlack lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold ${
                  active ? "bg-warmIvory/10 text-mutedGold" : "text-warmIvory/78 hover:bg-warmIvory/8 hover:text-warmIvory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ButtonLink href="/contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Book a Consultation
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
