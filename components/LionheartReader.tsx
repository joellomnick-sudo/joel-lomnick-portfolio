"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import type { LionheartVolume } from "@/data/lionheart";

const toolClass = "reader-tool focus-ring";

export function LionheartReader({ volume, pdfUrl }: { volume: LionheartVolume; pdfUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [renderedScale, setRenderedScale] = useState(1);
  const [fitWidth, setFitWidth] = useState(true);
  const [viewerWidth, setViewerWidth] = useState(0);
  const [readerStatus, setReaderStatus] = useState("Loading preview...");
  const [readerError, setReaderError] = useState("");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const currentSection = volume.sections[sectionIndex];

  const moveToPage = useCallback((nextPage: number) => {
    const bounded = Math.min(Math.max(nextPage, 1), pageCount || 1);
    setPageNumber(bounded);
    const matchingSection = volume.sections.findIndex((section) => section.page === bounded);
    if (matchingSection >= 0) setSectionIndex(matchingSection);
  }, [pageCount, volume.sections]);

  const moveToSection = useCallback((nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), volume.sections.length - 1);
    setSectionIndex(bounded);
    setPageNumber(volume.sections[bounded].page);
  }, [volume.sections]);

  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;
    const updateWidth = () => setViewerWidth(element.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: ReturnType<(typeof import("pdfjs-dist"))["getDocument"]> | undefined;

    async function loadDocument() {
      try {
        setReaderStatus("Loading preview...");
        const pdfjs = await import("pdfjs-dist/webpack.mjs");
        loadingTask = pdfjs.getDocument(pdfUrl);
        const document = await loadingTask.promise;
        if (cancelled) {
          await document.destroy();
          return;
        }
        documentRef.current = document;
        setPageCount(document.numPages);
        setReaderStatus(`Preview loaded. Page 1 of ${document.numPages}.`);
      } catch (error) {
        if (cancelled) return;
        setReaderError(error instanceof Error ? error.message : "The preview could not be loaded.");
        setReaderStatus("Preview unavailable.");
      }
    }

    void loadDocument();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      void loadingTask?.destroy();
      void documentRef.current?.destroy();
      documentRef.current = null;
    };
  }, [pdfUrl]);

  useEffect(() => {
    const document = documentRef.current;
    const canvas = canvasRef.current;
    if (!document || !canvas || !viewerWidth) return;
    let cancelled = false;

    async function renderPage() {
      try {
        renderTaskRef.current?.cancel();
        setReaderStatus(`Rendering page ${pageNumber}...`);
        const pdfPage = await document!.getPage(pageNumber);
        if (cancelled) return;
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const nextScale = fitWidth ? Math.max(0.5, Math.min((viewerWidth - 32) / baseViewport.width, 2.25)) : zoom;
        const viewport = pdfPage.getViewport({ scale: nextScale });
        const context = canvas!.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas rendering is not available in this browser.");
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        canvas!.width = Math.floor(viewport.width * outputScale);
        canvas!.height = Math.floor(viewport.height * outputScale);
        canvas!.style.width = `${Math.floor(viewport.width)}px`;
        canvas!.style.height = `${Math.floor(viewport.height)}px`;
        const renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        });
        renderTaskRef.current = renderTask;
        await renderTask.promise;
        if (cancelled) return;
        setRenderedScale(nextScale);
        setReaderStatus(`Page ${pageNumber} of ${document!.numPages} ready.`);
      } catch (error) {
        if (cancelled || (error instanceof Error && error.name === "RenderingCancelledException")) return;
        setReaderError(error instanceof Error ? error.message : "This page could not be rendered.");
        setReaderStatus("Page rendering failed.");
      }
    }

    void renderPage();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [fitWidth, pageNumber, viewerWidth, zoom, pageCount]);

  const enterFullscreen = async () => {
    if (!readerRef.current?.requestFullscreen) {
      setAnnouncement("Full screen is not available in this browser.");
      return;
    }
    await readerRef.current.requestFullscreen();
  };

  return (
    <div ref={readerRef} className="bg-parchment py-8 text-ink" onKeyDown={(event) => {
      if ((event.target as HTMLElement).closest("button, a, input, select, textarea")) return;
      if (event.key === "ArrowLeft") moveToPage(pageNumber - 1);
      if (event.key === "ArrowRight") moveToPage(pageNumber + 1);
    }}>
      <div className="site-container">
        <div className="border-b border-deepBrown/20 pb-6">
          <div>
            <p className="eyebrow">Lionheart responsive reader</p>
            <h1 className="section-title mt-3">{volume.title} Preview</h1>
            <p className="prose-copy mt-3">{volume.description}</p>
          </div>
        </div>

        <div data-testid="lionheart-reader-layout" className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(18rem,1fr)]">
          <article className="order-2 overflow-hidden rounded-md bg-richBlack text-warmIvory shadow-premium xl:order-1" aria-label="PDF preview reader">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-warmIvory/15 p-3">
              <div className="flex flex-wrap items-center gap-2" aria-label="Page navigation">
                <button type="button" className={toolClass} onClick={() => moveToPage(pageNumber - 1)} disabled={pageNumber <= 1} title="Previous PDF page"><ChevronLeft size={18} aria-hidden="true" /> Previous</button>
                <span className="min-w-[7rem] text-center font-ui text-[0.95rem]" aria-live="polite">Page {pageNumber} of {pageCount || "..."}</span>
                <button type="button" className={toolClass} onClick={() => moveToPage(pageNumber + 1)} disabled={!pageCount || pageNumber >= pageCount} title="Next PDF page">Next <ChevronRight size={18} aria-hidden="true" /></button>
              </div>
              <div className="flex flex-wrap items-center gap-2" aria-label="View controls">
                <button type="button" className={toolClass} onClick={() => { setFitWidth(false); setZoom(Math.max(0.5, renderedScale - 0.15)); }} title="Zoom out"><ZoomOut size={18} aria-hidden="true" /><span className="sr-only">Zoom out</span></button>
                <output className="min-w-[3.5rem] text-center font-ui text-sm">{Math.round(renderedScale * 100)}%</output>
                <button type="button" className={toolClass} onClick={() => { setFitWidth(false); setZoom(Math.min(2.5, renderedScale + 0.15)); }} title="Zoom in"><ZoomIn size={18} aria-hidden="true" /><span className="sr-only">Zoom in</span></button>
                <button type="button" className={toolClass} onClick={() => setFitWidth(true)} aria-pressed={fitWidth} title="Fit page to reader width"><Maximize2 size={18} aria-hidden="true" /> Fit width</button>
                <button type="button" className={toolClass} onClick={() => void enterFullscreen()} title="Open reader full screen"><Maximize2 size={18} aria-hidden="true" /> Full screen</button>
              </div>
            </div>
            <div ref={viewerRef} className="relative grid min-h-[28rem] max-h-[75vh] place-items-start justify-center overflow-auto bg-softBlack p-4" tabIndex={0} aria-label="PDF canvas. Use Left and Right Arrow keys to change pages.">
              <canvas ref={canvasRef} className="block max-w-none bg-white shadow-premium" role="img" aria-label={`${volume.title}, PDF page ${pageNumber} of ${pageCount || 10}`} />
              {readerStatus.includes("Loading") || readerStatus.includes("Rendering") ? <div className="absolute inset-0 grid place-items-center bg-softBlack/75 font-ui text-base" role="status">{readerStatus}</div> : null}
            </div>
            <p className="border-t border-warmIvory/15 px-4 py-3 font-ui text-sm text-warmIvory/80" role="status">{readerStatus}</p>
            {readerError ? <div className="border-t border-alertRed bg-warmIvory p-5 text-ink" role="alert"><p className="font-semibold">The embedded reader could not load this preview.</p><p className="mt-2 text-base text-mutedBrown">{readerError}</p><a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="reader-tool focus-ring mt-4">Open original PDF <ExternalLink size={18} aria-hidden="true" /></a></div> : null}
          </article>

          <aside className="order-1 border-t-4 border-mutedGold bg-warmIvory p-5 shadow-premium xl:order-2" aria-label="Preview sections">
            <h2 className="subsection-title">Preview sections</h2>

            <div className="mt-6 border-t border-deepBrown/15 pt-5">
              <p className="font-ui text-sm font-semibold text-mutedBrown">Section {sectionIndex + 1} of {volume.sections.length}</p>
              <h3 className="mt-2 font-heading text-xl font-bold leading-tight">{currentSection.title}</h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" className={toolClass} onClick={() => moveToSection(sectionIndex - 1)} disabled={sectionIndex === 0} title="Previous text section"><ChevronLeft size={18} aria-hidden="true" /> Previous section</button>
                <button type="button" className={toolClass} onClick={() => moveToSection(sectionIndex + 1)} disabled={sectionIndex === volume.sections.length - 1} title="Next text section">Next section <ChevronRight size={18} aria-hidden="true" /></button>
              </div>
              <p className="mt-4 text-sm leading-6 text-mutedBrown" role="status" aria-live="polite">{announcement}</p>
            </div>
          </aside>
        </div>

        <div className="sr-only" data-testid="lionheart-accessible-source" aria-label={`${volume.title} accessible preview text`}>
          {volume.sections.map((section) => <section key={section.page} aria-labelledby={`section-${section.page}`}><p>PDF page {section.page}</p><h2 id={`section-${section.page}`}>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-deepBrown/20 pt-5">
          <div>
            <p className="text-base text-mutedBrown">Prefer your browser&apos;s own PDF tools?</p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="reader-tool focus-ring mt-3">Open original PDF <ExternalLink size={18} aria-hidden="true" /></a>
          </div>
          <Link href="/lionheart" data-testid="lionheart-return" className="reader-tool focus-ring"><ChevronLeft size={18} aria-hidden="true" /> Return to Lionheart</Link>
        </div>
      </div>
    </div>
  );
}
