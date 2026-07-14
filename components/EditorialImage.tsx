import Image from "next/image";
import { photoInventory } from "@/data/photos";

type Props = { filename: string; priority?: boolean; className?: string; sizes?: string };

export function EditorialImage({ filename, priority = false, className = "", sizes = "(min-width: 1024px) 46vw, 100vw" }: Props) {
  const photo = photoInventory.find((item) => item.filename === filename);
  if (!photo) return null;
  return (
    <figure className={`image-frame ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: photo.aspectRatio }}>
        <Image src={`/images/${photo.filename}`} alt={photo.alt} fill priority={priority} sizes={sizes} className={photo.objectFit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: photo.objectPosition }} />
      </div>
      <figcaption className="image-caption">{photo.caption}</figcaption>
    </figure>
  );
}
