"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { navLinks } from "@/data/site";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-container flex min-h-[74px] items-center justify-between gap-3 py-2">
        <Link href="/" className="brand-lockup focus-ring" aria-label="Joel M. Lomnick home">
          <span className="brand-name">Joel M. Lomnick</span>
          <span className="brand-subtitle">Engineer | Storyteller | Community Builder</span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-end xl:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className="nav-link focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 xl:block">
          <ButtonLink href="/contact" size="compact" className="header-consultation">Book a Consultation</ButtonLink>
        </div>

        <button
          type="button"
          className="icon-button focus-ring xl:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" size={24} />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[90] bg-softBlack/70 xl:hidden" aria-hidden="false">
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-richBlack px-6 py-5 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-warmIvory/15 pb-5">
              <div>
                <p className="font-serif text-2xl font-bold text-warmIvory">LomnickPro</p>
                <p className="mt-1 text-base text-warmIvory/75">Joel M. Lomnick</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="icon-button focus-ring"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" size={26} />
              </button>
            </div>
            <nav className="grid gap-1 py-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="mobile-nav-link focus-ring"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ButtonLink href="/contact" className="mt-auto w-full" onClick={() => setOpen(false)}>
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
