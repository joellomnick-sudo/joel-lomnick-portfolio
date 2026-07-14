import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  size?: "default" | "compact";
  className?: string;
  onClick?: () => void;
  download?: boolean | string;
  target?: string;
};

const variants = {
  primary: "border-buttonGold bg-buttonGold text-richBlack hover:border-softGold hover:bg-softGold",
  secondary: "border-deepBrown/35 bg-transparent text-ink hover:border-mutedGold hover:bg-mutedGold/10",
  quiet: "border-warmIvory/35 bg-transparent text-warmIvory hover:border-softGold hover:text-softGold",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  download,
  target,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      download={download}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border font-bold transition focus-ring ${
        size === "compact" ? "px-4 py-2 text-[0.95rem]" : "px-5 py-3 text-base"
      } ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
