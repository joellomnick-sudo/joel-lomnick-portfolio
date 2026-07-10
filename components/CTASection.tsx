import { ButtonLink } from "@/components/ButtonLink";

type CTASectionProps = {
  eyebrow?: string;
  headline: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  eyebrow = "Next move",
  headline,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="blueprint-panel overflow-hidden rounded-lg border border-mutedGold/25 bg-richBlack shadow-gold">
        <div className="paper-surface p-8 text-ink sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-deepBrown">{eyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black text-balance sm:text-4xl">
              {headline}
            </h2>
            <p className="mt-4 text-base leading-8 text-ink/78 sm:text-lg">{text}</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            {secondaryLabel && secondaryHref ? (
              <ButtonLink href={secondaryHref} variant="ghost" className="border-ink/20 text-ink hover:text-emerald focus-visible:ring-offset-paper">
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
