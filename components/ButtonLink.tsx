import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

const variantClasses = {
  primary:
    "bg-buttonGold text-richBlack hover:bg-softGold focus-visible:ring-mutedGold",
  secondary:
    "border border-mutedGold/65 bg-warmIvory/10 text-warmIvory hover:border-softGold hover:bg-mutedGold/18 focus-visible:ring-mutedGold",
  ghost:
    "border border-warmIvory/18 bg-transparent text-warmIvory hover:border-softGold hover:text-softGold focus-visible:ring-mutedGold",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-richBlack ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
