"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/site";

export function CaseStudyGallery() {
  const [active, setActive] = useState<(typeof caseStudies)[number] | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'));
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); triggerRef.current?.focus(); };
  }, [active]);

  return <>
    <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
      {caseStudies.map((study) => <article key={study.id} className="min-w-0">
        <button type="button" className="group flex w-full justify-center overflow-hidden rounded-md border border-deepBrown/20 bg-richBlack text-left shadow-premium focus-ring" onClick={(event) => { triggerRef.current = event.currentTarget; setActive(study); }} aria-label={`Enlarge ${study.title}`}>
          <Image src={study.image} alt={study.alt} width={1103} height={1426} sizes="(min-width: 768px) 43vw, 100vw" className="h-auto max-h-[38rem] w-auto max-w-full object-contain transition duration-300 group-hover:opacity-90" />
        </button>
        <h2 className="subsection-title mt-5">{study.title}</h2>
        <p className="mt-3 max-w-2xl text-[1.05rem] leading-8 text-mutedBrown">{study.summary}</p>
        <details className="mt-5 border-t border-deepBrown/20 pt-4"><summary className="cursor-pointer font-bold text-mutedBrown">Read accessible case-study transcript</summary><div className="mt-4 space-y-4 text-base leading-7"><p><strong>The need:</strong> {study.transcript.need}</p><p><strong>What was built:</strong> {study.transcript.built}</p><p><strong>Key deliverables:</strong> {study.transcript.deliverables.join(", ")}.</p><p><strong>Community impact:</strong> {study.transcript.impact}</p></div></details>
      </article>)}
    </div>
    {active ? <div className="fixed inset-0 z-[120] flex items-center justify-center bg-softBlack/95 p-3 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}><div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`${active.title} full resolution`} className="relative max-h-[94vh] w-full max-w-5xl overflow-auto rounded-md bg-richBlack p-3 text-warmIvory sm:p-5"><div className="mb-3 flex items-center justify-between gap-4"><h2 className="text-xl font-bold">{active.title}</h2><button ref={closeRef} type="button" className="icon-button focus-ring" aria-label="Close case study" onClick={() => setActive(null)}><X aria-hidden="true" /></button></div><Image src={active.image} alt={active.alt} width={1103} height={1426} priority className="mx-auto h-auto max-h-[78vh] w-auto object-contain" /><a href={active.image} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-softGold underline underline-offset-4 focus-ring">Open full-resolution image <ExternalLink size={18} aria-hidden="true" /></a></div></div> : null}
  </>;
}
