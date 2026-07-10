type CardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "outlined";
};

const toneClasses = {
  dark: "border-mutedGold/18 bg-deepBrown text-warmIvory shadow-premium",
  light: "border-deepBrown/12 bg-paper text-ink shadow-premium",
  outlined: "border-mutedGold/28 bg-deepBrown text-warmIvory shadow-gold",
};

export function Card({ children, className = "", tone = "light" }: CardProps) {
  return (
    <article
      className={`rounded-lg border p-6 transition duration-200 hover:-translate-y-1 hover:border-mutedGold/55 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </article>
  );
}
