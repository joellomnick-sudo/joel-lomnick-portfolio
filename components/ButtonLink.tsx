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
    "bg-mutedGold text-richBlack hover:bg-warmIvory focus-visible:ring-mutedGold",
  secondary:
    "border border-mutedGold/60 bg-warmIvory/10 text-warmIvory hover:border-mutedGold hover:bg-mutedGold/15 focus-visible:ring-mutedGold",
  ghost:
    "border border-warmIvory/15 bg-transparent text-warmIvory hover:border-teal hover:text-teal focus-visible:ring-teal",
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
