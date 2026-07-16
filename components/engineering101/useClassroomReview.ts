"use client";

import { useCallback, useEffect, useState } from "react";
import type { ClassroomDesign, DesignView } from "@/data/engineering101/design";
import { initialReviewState, type AssumptionStatus, type ClassroomReviewState, type DesignRedline, type RedlineCategory, type TeachBackResponse } from "@/data/engineering101/review";

const storageKey = "lomnickpro-engineering-101-review-v1";

function readReview(): ClassroomReviewState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { ...initialReviewState };
    const value = JSON.parse(raw) as Partial<ClassroomReviewState>;
    return {
      assumptions: Array.isArray(value.assumptions) ? value.assumptions.filter((item) => item && typeof item.id === "string" && typeof item.text === "string").slice(0, 100) : [],
      teachBack: value.teachBack && typeof value.teachBack === "object" ? value.teachBack : {},
      redlines: Array.isArray(value.redlines) ? value.redlines.filter((item) => item && typeof item.id === "string" && typeof item.x === "number" && typeof item.y === "number").slice(0, 100) : [],
      hintLevel: typeof value.hintLevel === "number" ? Math.max(0, Math.min(4, value.hintLevel)) : 0,
      hintUsage: typeof value.hintUsage === "number" ? Math.max(0, value.hintUsage) : 0,
      qcActive: Boolean(value.qcActive),
      qcStartedAt: typeof value.qcStartedAt === "string" ? value.qcStartedAt : "",
      baselineDesign: value.baselineDesign,
      correctedDesign: value.correctedDesign,
      correctedAt: typeof value.correctedAt === "string" ? value.correctedAt : "",
    };
  } catch {
    return { ...initialReviewState };
  }
}

export function useClassroomReview() {
  const [review, setReview] = useState<ClassroomReviewState>(initialReviewState);
  const [hydrated, setHydrated] = useState(false);
  const [compareMode, setCompareMode] = useState<"current" | "before" | "corrected">("current");

  useEffect(() => { setReview(readReview()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(review)); }, [hydrated, review]);

  const addAssumption = useCallback((text: string, status: AssumptionStatus) => {
    const trimmed = text.trim().slice(0, 280);
    if (!trimmed) return;
    setReview((current) => ({ ...current, assumptions: [...current.assumptions, { id: `assumption-${Date.now()}-${Math.random().toString(16).slice(2)}`, text: trimmed, status, createdAt: new Date().toISOString() }] }));
  }, []);
  const removeAssumption = useCallback((id: string) => setReview((current) => ({ ...current, assumptions: current.assumptions.filter((item) => item.id !== id) })), []);
  const saveTeachBack = useCallback((response: TeachBackResponse) => setReview((current) => ({ ...current, teachBack: { ...current.teachBack, [response.placementId]: { ...response, savedAt: new Date().toISOString() } } })), []);
  const nextHint = useCallback(() => setReview((current) => ({ ...current, hintLevel: Math.min(4, current.hintLevel + 1), hintUsage: current.hintUsage + 1 })), []);
  const resetHint = useCallback(() => setReview((current) => ({ ...current, hintLevel: 0 })), []);
  const startQc = useCallback((design: ClassroomDesign) => {
    setCompareMode("current");
    setReview((current) => ({ ...current, qcActive: true, qcStartedAt: new Date().toISOString(), baselineDesign: structuredClone(design), correctedDesign: undefined, correctedAt: "", redlines: [] }));
  }, []);
  const endQc = useCallback(() => setReview((current) => ({ ...current, qcActive: false })), []);
  const addRedline = useCallback((x: number, y: number, view: DesignView, category: RedlineCategory, consequence: string) => {
    const redline: DesignRedline = { id: `redline-${Date.now()}-${Math.random().toString(16).slice(2)}`, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)), view, category, consequence: consequence.trim().slice(0, 220) || "Review the consequence with the project team.", resolved: false };
    setReview((current) => ({ ...current, redlines: [...current.redlines, redline] }));
  }, []);
  const toggleRedline = useCallback((id: string) => setReview((current) => ({ ...current, redlines: current.redlines.map((item) => item.id === id ? { ...item, resolved: !item.resolved } : item) })), []);
  const removeRedline = useCallback((id: string) => setReview((current) => ({ ...current, redlines: current.redlines.filter((item) => item.id !== id) })), []);
  const saveCorrection = useCallback((design: ClassroomDesign) => {
    setCompareMode("corrected");
    setReview((current) => ({ ...current, correctedDesign: structuredClone(design), correctedAt: new Date().toISOString() }));
  }, []);

  return { review, hydrated, compareMode, setCompareMode, addAssumption, removeAssumption, saveTeachBack, nextHint, resetHint, startQc, endQc, addRedline, toggleRedline, removeRedline, saveCorrection };
}
