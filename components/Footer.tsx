import Link from "next/link";
import { footerValues, navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-mutedGold/18 bg-richBlack">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-bold text-warmIvory">
            Joel Maurice Lomnick, EIT
          </p>
          <p className="mt-3 text-sm leading-7 text-warmIvory/70">
            Lomnick Professional Services / LomnickPro
            <br />
            Richmond, Virginia
          </p>
          <div className="mt-5 space-y-2 text-sm text-warmIvory/75">
            <p>
              Email:{" "}
              <a className="text-mutedGold underline-offset-4 hover:underline" href="mailto:jlomnick@lomnickpro.com">
                jlomnick@lomnickpro.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a className="text-mutedGold underline-offset-4 hover:underline" href="tel:+18048850256">
                (804) 885-0256
              </a>
            </p>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <p className="text-sm font-bold uppercase text-mutedGold">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-warmIvory/72">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="underline-offset-4 hover:text-mutedGold hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold uppercase text-mutedGold">Values</p>
          <p className="mt-4 text-sm leading-7 text-warmIvory/72">
            {footerValues.join(" • ")}
          </p>
          <p className="mt-6 text-sm font-semibold text-warmIvory">
            Built with purpose. Refined through service.
          </p>
        </div>
      </div>
    </footer>
  );
}
