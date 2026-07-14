"use client";

type Props = { src: string; poster: string; label: string; caption?: string };

export function ShortLoopVideo({ src, poster, label, caption }: Props) {
  if (!src || !poster) return null;
  return <figure><video className="w-full rounded-md" autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={label}><source src={src} /></video>{caption ? <figcaption className="image-caption">{caption}</figcaption> : null}</figure>;
}
