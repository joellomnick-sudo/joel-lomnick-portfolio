type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const headingColor = tone === "light" ? "text-ink" : "text-warmIvory";
  const bodyColor = tone === "light" ? "text-ink/82" : "text-warmIvory/84";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} w-full max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase text-mutedGold">{eyebrow}</p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-black text-balance sm:text-4xl lg:text-5xl ${headingColor}`}>
        {title}
        {accent ? <span className="font-serif text-mutedGold"> {accent}</span> : null}
      </h2>
      {body ? (
        <p className={`mt-5 text-base leading-8 text-pretty sm:text-lg ${bodyColor}`}>{body}</p>
      ) : null}
    </div>
  );
}
