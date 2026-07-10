type CardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "outlined";
};

const toneClasses = {
  dark: "border-warmIvory/10 bg-warmIvory/[0.055] text-warmIvory shadow-premium",
  light: "border-deepBrown/15 bg-paper text-ink shadow-premium",
  outlined: "border-mutedGold/25 bg-richBlack/55 text-warmIvory shadow-gold",
};

export function Card({ children, className = "", tone = "dark" }: CardProps) {
  return (
    <article
      className={`rounded-lg border p-6 transition duration-200 hover:-translate-y-1 hover:border-mutedGold/55 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </article>
  );
}
