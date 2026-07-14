"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";

const volumes = [
  { title: "Volume 1 sneak preview", href: "/documents/lionheart-volume-1-sneak-preview.pdf" },
  { title: "Volume 2 sneak preview", href: "/documents/lionheart-volume-2-sneak-preview.pdf" },
] as const;

export function LionheartPreviews() {
  const [selected, setSelected] = useState<(typeof volumes)[number] | null>(null);
  return <div><div className="grid gap-6 md:grid-cols-2">{volumes.map((volume) => <article key={volume.href} className="border-t-4 border-mutedGold bg-warmIvory p-6 shadow-premium"><h3 className="subsection-title">{volume.title}</h3><p className="mt-3 text-base leading-7 text-mutedBrown">A public reading sample from the evolving Lionheart memoir project.</p><div className="button-row mt-5"><ButtonLink href={volume.href} target="_blank">Open PDF</ButtonLink><ButtonLink href={volume.href} download variant="secondary">Download</ButtonLink><button type="button" className="min-h-11 rounded-md border border-deepBrown/35 px-5 py-3 text-base font-bold focus-ring" onClick={() => setSelected(volume)}>Preview here</button></div></article>)}</div>{selected ? <section className="mt-10 hidden lg:block" aria-live="polite"><div className="mb-3 flex items-center justify-between gap-4"><h3 className="subsection-title">{selected.title}</h3><button className="min-h-11 font-bold text-link" onClick={() => setSelected(null)}>Close preview</button></div><iframe src={`${selected.href}#view=FitH`} title={selected.title} className="h-[75vh] w-full border border-deepBrown/20 bg-white" loading="lazy" /></section> : null}</div>;
}
