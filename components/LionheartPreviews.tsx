import { ButtonLink } from "@/components/ButtonLink";
import { publicAssetPath } from "@/data/publicAssets";

const volumes = [
  { title: "Volume 1 sneak preview", action: "Read Volume 1 Preview", href: publicAssetPath("lionheart-volume-1-preview") },
  { title: "Volume 2 sneak preview", action: "Read Volume 2 Preview", href: publicAssetPath("lionheart-volume-2-preview") },
] as const;

export function LionheartPreviews() {
  return <div className="grid gap-6 md:grid-cols-2">{volumes.map((volume) => <article key={volume.href} className="border-t-4 border-mutedGold bg-warmIvory p-6 shadow-premium"><h3 className="subsection-title">{volume.title}</h3><p className="mt-3 text-base leading-7 text-mutedBrown">A public reading sample from the evolving Lionheart memoir project.</p><div className="button-row mt-5"><ButtonLink href={volume.href} target="_blank">{volume.action}</ButtonLink></div></article>)}</div>;
}
