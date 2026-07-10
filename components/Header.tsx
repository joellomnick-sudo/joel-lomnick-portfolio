"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { navLinks } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 border-b border-mutedGold/18 bg-richBlack shadow-gold">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link href="/" className="group min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold">
          <span className="block font-serif text-xl font-bold leading-none text-warmIvory group-hover:text-mutedGold">
            Joel Maurice Lomnick, EIT
          </span>
          <span className="mt-1 block truncate text-sm font-semibold text-warmIvory/86">
            Engineer • Creative Strategist • Storyteller
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-[0.95rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold ${
                  active ? "bg-warmIvory/10 text-softGold" : "text-warmIvory/90 hover:bg-warmIvory/8 hover:text-warmIvory"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-warmIvory/35 text-warmIvory transition hover:border-softGold hover:text-softGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold lg:hidden"
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
        className={`border-t border-mutedGold/18 bg-richBlack lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mutedGold ${
                  active ? "bg-warmIvory/10 text-softGold" : "text-warmIvory/90 hover:bg-warmIvory/8 hover:text-warmIvory"
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
