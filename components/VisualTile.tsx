import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageFit, PlaceholderVariant } from "@/data/site";

type VisualAspect = "wide" | "landscape" | "portrait" | "book" | "square";

type VisualTileProps = {
  title: string;
  category?: string;
  image?: string;
  alt?: string;
  imageFit?: ImageFit;
  imageType?: ImageFit;
  visualLabel?: string;
  placeholderVariant?: PlaceholderVariant;
  aspect?: VisualAspect;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const aspectClasses: Record<VisualAspect, string> = {
  wide: "aspect-[16/10]",
  landscape: "aspect-[16/9]",
  portrait: "aspect-[4/5]",
  book: "aspect-[2/3]",
  square: "aspect-square",
};

const imageFitClasses: Record<ImageFit, string> = {
  cover: "object-cover object-center",
  contain: "object-contain object-center p-3",
  portrait: "object-cover object-center",
  landscape: "object-cover object-center",
  "group-photo": "object-cover object-center",
  screenshot: "object-contain object-center p-3",
  "book-cover": "object-contain object-center p-2",
  "branded-placeholder": "object-contain object-center",
};

const variantStyles: Record<PlaceholderVariant, CSSProperties> = {
  engineering: { "--tile-accent": "#C9A24A", "--tile-wash": "#EFE4CF" } as CSSProperties,
  creative: { "--tile-accent": "#A87734", "--tile-wash": "#FBF6EA" } as CSSProperties,
  leadership: { "--tile-accent": "#7B4D2D", "--tile-wash": "#EFE4CF" } as CSSProperties,
  story: { "--tile-accent": "#C9A24A", "--tile-wash": "#F7F1E5" } as CSSProperties,
  community: { "--tile-accent": "#9A6A35", "--tile-wash": "#FBF6EA" } as CSSProperties,
  document: { "--tile-accent": "#5A3A24", "--tile-wash": "#EFE4CF" } as CSSProperties,
};

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function VisualTile({
  title,
  category,
  image,
  alt,
  imageFit = "branded-placeholder",
  imageType,
  visualLabel,
  placeholderVariant = "creative",
  aspect = "wide",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: VisualTileProps) {
  const fit = imageType ?? imageFit;

  if (image) {
    return (
      <div
        className={`relative overflow-hidden rounded-t-lg border-b border-deepBrown/10 bg-parchment ${aspectClasses[aspect]} ${className}`}
      >
        <Image
          src={image}
          alt={alt ?? `${title} visual`}
          fill
          priority={priority}
          sizes={sizes}
          className={imageFitClasses[fit]}
        />
      </div>
    );
  }

  return (
    <div
      className={`branded-placeholder ${aspectClasses[aspect]} ${className}`}
      style={variantStyles[placeholderVariant]}
      aria-label={`${title} visual placeholder`}
      role="img"
    >
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-md border border-deepBrown/15 bg-white/45 px-3 py-1 text-[0.68rem] font-black uppercase tracking-normal text-mutedBrown">
            {category ?? placeholderVariant}
          </span>
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--tile-accent)" }}
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="font-serif text-4xl font-black leading-none text-ink">
            {visualLabel ?? getInitials(title)}
          </p>
          <div className="mt-4 grid gap-2" aria-hidden="true">
            <span className="h-1.5 w-4/5 rounded-full bg-deepBrown/18" />
            <span className="h-1.5 w-2/3 rounded-full bg-deepBrown/12" />
            <span
              className="h-1.5 w-1/2 rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--tile-accent) 60%, transparent)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
