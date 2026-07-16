"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Pause,
  Play,
  Square,
  Volume2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import type { LionheartVolume } from "@/data/lionheart";

type SpeechState = "idle" | "playing" | "paused";

const toolClass = "reader-tool focus-ring";

export function LionheartReader({ volume, pdfUrl }: { volume: LionheartVolume; pdfUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [renderedScale, setRenderedScale] = useState(1);
  const [fitWidth, setFitWidth] = useState(true);
  const [viewerWidth, setViewerWidth] = useState(0);
  const [readerStatus, setReaderStatus] = useState("Loading preview...");
  const [readerError, setReaderError] = useState("");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [speechRate, setSpeechRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const currentSection = volume.sections[sectionIndex];

  const stopNarration = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeechState("idle");
  }, []);

  const moveToPage = useCallback((nextPage: number) => {
    const bounded = Math.min(Math.max(nextPage, 1), pageCount || 1);
    setPageNumber(bounded);
    const matchingSection = volume.sections.findIndex((section) => section.page === bounded);
    if (matchingSection >= 0) setSectionIndex(matchingSection);
    stopNarration();
  }, [pageCount, stopNarration, volume.sections]);

  const moveToSection = useCallback((nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), volume.sections.length - 1);
    setSectionIndex(bounded);
    setPageNumber(volume.sections[bounded].page);
    stopNarration();
  }, [stopNarration, volume.sections]);

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

  useEffect(() => {
    const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSpeechSupported(supported);
    if (!supported) return;
    const updateVoices = () => setVoices(window.speechSynthesis.getVoices());
    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const playNarration = () => {
    if (!speechSupported) return;
    stopNarration();
    const utterance = new SpeechSynthesisUtterance(`${currentSection.title}. ${currentSection.paragraphs.join(" ")}`);
    utterance.rate = speechRate;
    const selectedVoice = voices.find((voice) => voice.voiceURI === voiceURI);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onend = () => setSpeechState("idle");
    utterance.onerror = () => {
      setSpeechState("idle");
      setAnnouncement("Narration stopped because the browser voice could not continue.");
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeechState("playing");
    setAnnouncement(`Reading ${currentSection.title}.`);
  };

  const pauseNarration = () => {
    if (speechState !== "playing") return;
    window.speechSynthesis.pause();
    setSpeechState("paused");
    setAnnouncement("Narration paused.");
  };

  const resumeNarration = () => {
    if (speechState !== "paused") return;
    window.speechSynthesis.resume();
    setSpeechState("playing");
    setAnnouncement("Narration resumed.");
  };

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
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-deepBrown/20 pb-6">
          <div>
            <p className="eyebrow">Lionheart responsive reader</p>
            <h1 className="section-title mt-3">{volume.title} Preview</h1>
            <p className="prose-copy mt-3">{volume.description}</p>
          </div>
          <Link href="/lionheart" className="reader-tool focus-ring"><ChevronLeft size={18} aria-hidden="true" /> Return to Lionheart</Link>
        </div>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(21rem,.65fr)]">
          <article className="overflow-hidden rounded-md bg-richBlack text-warmIvory shadow-premium" aria-label="PDF preview reader">
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

          <aside className="border-t-4 border-mutedGold bg-warmIvory p-5 shadow-premium" aria-label="Read-aloud and text companion">
            <div className="flex items-center gap-3"><Volume2 size={24} aria-hidden="true" /><h2 className="subsection-title">Listen to this preview</h2></div>
            <p className="mt-3 text-base leading-7 text-mutedBrown">Narration uses a voice already available in your browser. It never starts automatically.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" className={toolClass} onClick={playNarration} disabled={!speechSupported} title="Play current section"><Play size={18} aria-hidden="true" /> Play</button>
              <button type="button" className={toolClass} onClick={pauseNarration} disabled={speechState !== "playing"} title="Pause narration"><Pause size={18} aria-hidden="true" /> Pause</button>
              <button type="button" className={toolClass} onClick={resumeNarration} disabled={speechState !== "paused"} title="Resume narration"><Play size={18} aria-hidden="true" /> Resume</button>
              <button type="button" className={toolClass} onClick={stopNarration} disabled={speechState === "idle"} title="Stop narration"><Square size={17} aria-hidden="true" /> Stop</button>
            </div>
            {!speechSupported ? <p className="mt-3 text-sm text-alertRed" role="status">Read-aloud is not available in this browser. The full text companion remains available below.</p> : null}

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <label className="font-ui text-base font-semibold text-mutedBrown">Reading speed
                <select className="mt-1 min-h-11 w-full rounded-md border border-deepBrown/30 bg-white px-3 font-ui text-base" value={speechRate} onChange={(event) => setSpeechRate(Number(event.target.value))}>
                  <option value="0.75">0.75x</option><option value="1">1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="1.75">1.75x</option>
                </select>
              </label>
              <label className="font-ui text-base font-semibold text-mutedBrown">Voice
                <select className="mt-1 min-h-11 w-full rounded-md border border-deepBrown/30 bg-white px-3 font-ui text-base" value={voiceURI} onChange={(event) => setVoiceURI(event.target.value)}>
                  <option value="">Default system voice</option>
                  {voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
                </select>
              </label>
            </div>

            <div className="mt-6 border-t border-deepBrown/15 pt-5">
              <div className="flex items-center justify-between gap-3">
                <button type="button" className={toolClass} onClick={() => moveToSection(sectionIndex - 1)} disabled={sectionIndex === 0} title="Previous text section"><ChevronLeft size={18} aria-hidden="true" /><span className="sr-only">Previous section</span></button>
                <p className="text-center font-ui text-sm font-semibold">Section {sectionIndex + 1} of {volume.sections.length}</p>
                <button type="button" className={toolClass} onClick={() => moveToSection(sectionIndex + 1)} disabled={sectionIndex === volume.sections.length - 1} title="Next text section"><span className="sr-only">Next section</span><ChevronRight size={18} aria-hidden="true" /></button>
              </div>
              <p className="eyebrow mt-5">{currentSection.kicker}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold leading-tight">{currentSection.title}</h3>
              <div className="mt-4 space-y-4 text-base leading-7 text-mutedBrown">{currentSection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </aside>
        </div>

        <details className="mt-6 border-t border-deepBrown/20 py-5">
          <summary className="cursor-pointer font-heading text-xl font-bold focus-ring">Open full accessible text companion</summary>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {volume.sections.map((section) => <article key={section.page} aria-labelledby={`section-${section.page}`} className="border-l-2 border-mutedGold pl-5"><p className="eyebrow">PDF page {section.page}</p><h2 id={`section-${section.page}`} className="mt-2 font-heading text-2xl font-bold">{section.title}</h2><div className="mt-4 space-y-4 text-base leading-7 text-mutedBrown">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}
          </div>
        </details>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-deepBrown/20 pt-5">
          <p className="text-base text-mutedBrown">Prefer your browser&apos;s own PDF tools?</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="reader-tool focus-ring">Open original PDF <ExternalLink size={18} aria-hidden="true" /></a>
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </div>
  );
}
