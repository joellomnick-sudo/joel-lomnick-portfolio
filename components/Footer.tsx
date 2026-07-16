import Link from "next/link";
import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-mutedGold/25 bg-richBlack text-warmIvory">
      <div className="site-container grid items-start gap-7 py-8 md:grid-cols-[1fr_1.15fr_1.2fr] md:gap-9">
        <div>
          <p className="font-heading text-xl font-bold">Joel M. Lomnick</p>
          <p className="mt-2 max-w-sm text-[0.95rem] leading-6 text-warmIvory/80">
            Lomnick Professional Services / LomnickPro<br />
            Richmond, Virginia
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-base font-bold text-softGold">Explore</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex min-h-10 items-center text-[0.95rem] text-warmIvory hover:text-softGold focus-ring" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-base font-bold text-softGold">A warm place for useful work</p>
          <p className="mt-2 text-base leading-7 text-warmIvory/85">
            Built with purpose. Rooted in community. Made to help good work travel farther.
          </p>
          <p className="mt-4 text-sm text-warmIvory/70">
            Copyright {new Date().getFullYear()} Joel M. Lomnick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
