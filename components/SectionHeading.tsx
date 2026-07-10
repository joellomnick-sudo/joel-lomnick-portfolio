type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase text-mutedGold">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-black text-balance text-warmIvory sm:text-4xl lg:text-5xl">
        {title}
        {accent ? <span className="font-serif text-mutedGold"> {accent}</span> : null}
      </h2>
      {body ? (
        <p className="mt-5 text-base leading-8 text-pretty text-warmIvory/72 sm:text-lg">{body}</p>
      ) : null}
    </div>
  );
}
