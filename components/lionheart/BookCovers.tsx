"use client";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export function BookCovers({ volume, title }: { volume: "one" | "two"; title: string }) {
  const front = useRef<HTMLCanvasElement>(null);
  const back = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Loading original covers…");
  useEffect(() => {
    let cancelled = false;
    let document: PDFDocumentProxy | undefined;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`/lionheart/books/${volume}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Download unavailable");
        const data = new Uint8Array(await response.arrayBuffer());
        const pdfjs = await import("pdfjs-dist/webpack.mjs");
        document = await pdfjs.getDocument({ data }).promise;
        if (cancelled) return;
        for (const [ref, number] of [[front, 1], [back, document.numPages]] as const) {
          if (cancelled || !ref.current) return;
          const page = await document.getPage(number);
          const viewport = page.getViewport({ scale: 0.8 });
          const canvas = ref.current;
          canvas.width = viewport.width; canvas.height = viewport.height;
          const context = canvas.getContext("2d");
          if (context) await page.render({ canvasContext: context, viewport }).promise;
        }
        if (!cancelled) setStatus("");
      } catch { if (!cancelled) setStatus("Covers will appear when the book connection is available."); }
    }
    void load();
    return () => { cancelled = true; controller.abort(); void document?.destroy(); };
  }, [volume]);
  return <div className="lh-book-covers"><figure><canvas ref={front} role="img" aria-label={`${title}, original front cover`} /><figcaption>Front cover</figcaption></figure><figure><canvas ref={back} role="img" aria-label={`${title}, original back cover`} /><figcaption>Back cover</figcaption></figure>{status && <p role="status">{status}</p>}</div>;
}
