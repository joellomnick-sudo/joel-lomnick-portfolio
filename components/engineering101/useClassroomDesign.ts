"use client";

import { useCallback, useEffect, useState } from "react";
import { initialLayers, type ClassroomDesign, type DesignLayerId, type DevicePlacement } from "@/data/engineering101/design";

const storageKey = "lomnickpro-engineering-101-design-v1";
const emptyDesign: ClassroomDesign = { placements: [], layers: initialLayers };

function isPlacement(value: unknown): value is DevicePlacement {
  if (!value || typeof value !== "object") return false;
  const placement = value as Partial<DevicePlacement>;
  return typeof placement.instanceId === "string" && typeof placement.deviceId === "string" && typeof placement.x === "number" && typeof placement.y === "number" && typeof placement.rotation === "number" && ["floor", "ceiling", "elevation"].includes(placement.view ?? "") && ["lighting", "power", "communications", "life-safety", "coordination"].includes(placement.layer ?? "");
}

function readDesign(): ClassroomDesign {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { placements: [], layers: { ...initialLayers } };
    const value = JSON.parse(raw) as Partial<ClassroomDesign>;
    const placements = Array.isArray(value.placements) ? value.placements.filter(isPlacement).map((placement) => ({ ...placement, x: Math.max(2, Math.min(98, placement.x)), y: Math.max(2, Math.min(98, placement.y)) })) : [];
    const layers = Object.fromEntries(Object.entries(initialLayers).map(([id, defaults]) => {
      const saved = value.layers?.[id as DesignLayerId];
      return [id, {
        visible: typeof saved?.visible === "boolean" ? saved.visible : defaults.visible,
        locked: typeof saved?.locked === "boolean" ? saved.locked : defaults.locked,
        opacity: typeof saved?.opacity === "number" ? Math.max(0.25, Math.min(1, saved.opacity)) : defaults.opacity,
      }];
    })) as ClassroomDesign["layers"];
    return { placements, layers };
  } catch {
    return { placements: [], layers: { ...initialLayers } };
  }
}

export function useClassroomDesign() {
  const [design, setDesign] = useState<ClassroomDesign>(emptyDesign);
  const [past, setPast] = useState<ClassroomDesign[]>([]);
  const [future, setFuture] = useState<ClassroomDesign[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("");

  useEffect(() => { setDesign(readDesign()); setHydrated(true); }, []);

  const writeDesign = useCallback((value: ClassroomDesign) => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    setLastSavedAt(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()));
  }, []);

  useEffect(() => { if (hydrated) writeDesign(design); }, [design, hydrated, writeDesign]);

  const commit = useCallback((update: (current: ClassroomDesign) => ClassroomDesign) => {
    setDesign((current) => {
      const next = update(current);
      if (next === current) return current;
      setPast((items) => [...items.slice(-29), current]);
      setFuture([]);
      return next;
    });
  }, []);

  const addPlacement = useCallback((placement: DevicePlacement) => commit((current) => ({ ...current, placements: [...current.placements, placement] })), [commit]);
  const updatePlacement = useCallback((instanceId: string, changes: Partial<DevicePlacement>) => commit((current) => ({ ...current, placements: current.placements.map((placement) => placement.instanceId === instanceId ? { ...placement, ...changes } : placement) })), [commit]);
  const deletePlacement = useCallback((instanceId: string) => commit((current) => ({ ...current, placements: current.placements.filter((placement) => placement.instanceId !== instanceId) })), [commit]);
  const duplicatePlacement = useCallback((instanceId: string) => commit((current) => {
    const source = current.placements.find((placement) => placement.instanceId === instanceId);
    if (!source) return current;
    return { ...current, placements: [...current.placements, { ...source, instanceId: `${source.deviceId}-${Date.now()}-${Math.random().toString(16).slice(2)}`, x: Math.min(96, source.x + 4), y: Math.min(96, source.y + 4) }] };
  }), [commit]);
  const clearLayer = useCallback((layer: DesignLayerId) => commit((current) => current.layers[layer].locked ? current : ({ ...current, placements: current.placements.filter((placement) => placement.layer !== layer) })), [commit]);
  const clearAll = useCallback(() => commit((current) => ({ ...current, placements: current.placements.filter((placement) => current.layers[placement.layer].locked) })), [commit]);
  const updateLayer = useCallback((layer: DesignLayerId, changes: Partial<ClassroomDesign["layers"][DesignLayerId]>) => commit((current) => ({ ...current, layers: { ...current.layers, [layer]: { ...current.layers[layer], ...changes } } })), [commit]);
  const isolateLayer = useCallback((layer: DesignLayerId) => commit((current) => ({ ...current, layers: Object.fromEntries(Object.entries(current.layers).map(([id, state]) => [id, { ...state, visible: id === layer }])) as ClassroomDesign["layers"] })), [commit]);
  const showAllLayers = useCallback(() => commit((current) => ({ ...current, layers: Object.fromEntries(Object.entries(current.layers).map(([id, state]) => [id, { ...state, visible: true }])) as ClassroomDesign["layers"] })), [commit]);

  const undo = useCallback(() => {
    setPast((items) => {
      const previous = items.at(-1);
      if (!previous) return items;
      setFuture((nextItems) => [design, ...nextItems.slice(0, 29)]);
      setDesign(previous);
      return items.slice(0, -1);
    });
  }, [design]);

  const redo = useCallback(() => {
    setFuture((items) => {
      const next = items[0];
      if (!next) return items;
      setPast((previousItems) => [...previousItems.slice(-29), design]);
      setDesign(next);
      return items.slice(1);
    });
  }, [design]);

  const saveNow = useCallback(() => writeDesign(design), [design, writeDesign]);
  const restoreSaved = useCallback(() => commit(() => readDesign()), [commit]);

  return { design, hydrated, lastSavedAt, canUndo: past.length > 0, canRedo: future.length > 0, addPlacement, updatePlacement, deletePlacement, duplicatePlacement, clearLayer, clearAll, updateLayer, isolateLayer, showAllLayers, undo, redo, saveNow, restoreSaved };
}
