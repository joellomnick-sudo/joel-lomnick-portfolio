import Link from "next/link";
import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-mutedGold/25 bg-richBlack text-warmIvory">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.15fr_1fr_1.1fr]">
        <div>
          <p className="font-serif text-2xl font-bold">Joel Maurice Lomnick, EIT</p>
          <p className="mt-4 max-w-sm text-base leading-7 text-warmIvory/80">
            Lomnick Professional Services / LomnickPro<br />
            Richmond, Virginia
          </p>
          <a className="mt-4 inline-block text-base font-bold text-softGold underline-offset-4 hover:underline focus-ring" href="https://lomnickpro.com">
            lomnickpro.com
          </a>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-base font-bold text-softGold">Explore</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex min-h-11 items-center text-base text-warmIvory hover:text-softGold focus-ring" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-base font-bold text-softGold">A warm place for useful work</p>
          <p className="mt-4 text-lg leading-8 text-warmIvory/85">
            Built with purpose. Rooted in community. Made to help good work travel farther.
          </p>
          <p className="mt-8 text-base text-warmIvory/70">
            Copyright {new Date().getFullYear()} Joel Maurice Lomnick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
