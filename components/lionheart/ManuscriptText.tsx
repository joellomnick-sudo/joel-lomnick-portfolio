type ManuscriptTextProps = {
  text: string;
};

function isLikelyHeading(block: string) {
  const value = block.trim();
  if (!value || value.length > 90 || value.includes("\n")) return false;
  return !/[.!?]["']?$/.test(value);
}

export function ManuscriptText({ text }: ManuscriptTextProps) {
  const blocks = text.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl">
      {blocks.map((block, index) =>
        isLikelyHeading(block) ? (
          <h2 key={`${index}-heading`} className="mb-5 mt-12 font-serif text-2xl font-bold text-softGold sm:text-3xl">
            {block}
          </h2>
        ) : (
          <p key={`${index}-paragraph`} className="mb-6 text-[1.05rem] leading-8 text-warmIvory/90 sm:text-[1.1rem]">
            {block}
          </p>
        ),
      )}
    </article>
  );
}
