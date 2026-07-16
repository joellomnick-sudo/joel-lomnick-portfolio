"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Copy, Eye, EyeOff, Focus, Grip, Layers3, Lightbulb, Lock, Minus, Move, Plus, Redo2, RotateCw, Save, Trash2, Undo2, Unlock } from "lucide-react";
import { useMemo, useState } from "react";
import { DeviceSymbol } from "@/components/engineering101/DeviceSymbol";
import { ClassroomReviewPanel } from "@/components/engineering101/ClassroomReviewPanel";
import { useClassroomDesign } from "@/components/engineering101/useClassroomDesign";
import { useClassroomReview } from "@/components/engineering101/useClassroomReview";
import { runDesignChecks } from "@/data/engineering101/checkRules";
import { designLayerCatalog, designViews, layerForDevice, placementViewFor, type DesignView } from "@/data/engineering101/design";
import { engineeringDevices, type EngineeringDevice } from "@/data/engineering101/devices";
import type { RedlineCategory } from "@/data/engineering101/review";

type ClassroomCanvasProps = {
  selectedDevice: EngineeringDevice;
  placementEnabled: boolean;
  onDeviceSelected: (deviceId: string) => void;
  onStatus: (message: string) => void;
};

function snapPosition(device: EngineeringDevice, x: number, y: number, view: "floor" | "ceiling" | "elevation") {
  if (view === "ceiling") return { x: Math.max(8, Math.min(92, Math.round(x / 8) * 8)), y: Math.max(10, Math.min(90, Math.round(y / 10) * 10)), note: "Snapped to the ceiling grid." };
  if (view === "floor" && device.defaultMountingSurface === "wall") {
    const edges = [{ x: 6, y, distance: x }, { x: 94, y, distance: 100 - x }, { x, y: 10, distance: y }, { x, y: 92, distance: 100 - y }];
    const nearest = edges.sort((a, b) => a.distance - b.distance)[0];
    return { x: Math.max(6, Math.min(94, nearest.x)), y: Math.max(10, Math.min(92, nearest.y)), note: "Snapped to the nearest wall." };
  }
  return { x: Math.max(4, Math.min(96, Math.round(x))), y: Math.max(6, Math.min(94, Math.round(y))), note: "Placed on the drawing grid." };
}

function BaseDrawing({ view, coordinationVisible }: { view: DesignView; coordinationVisible: boolean }) {
  if (view === "system") return <svg viewBox="0 0 100 62" className="classroom-base" role="img" aria-label="System path diagram with separate panel, IDF, and fire-alarm sources">
    <path className="base-room" d="M9 7h82v48H9z" />
    <rect className="system-source source-power" x="1" y="23" width="12" height="12" /><text x="7" y="30" textAnchor="middle">PANEL</text>
    <rect className="system-source source-data" x="87" y="8" width="12" height="12" /><text x="93" y="15" textAnchor="middle">IDF</text>
    <rect className="system-source source-fire" x="87" y="42" width="12" height="12" /><text x="93" y="49" textAnchor="middle">FACP</text>
    <text x="50" y="4" textAnchor="middle">CLASSROOM SYSTEM PATHS</text>
  </svg>;

  if (view === "elevation") return <svg viewBox="0 0 100 62" className="classroom-base" role="img" aria-label="Teaching-wall elevation with display, whiteboards, casework, and teacher station">
    <path className="base-room" d="M6 7h88v49H6z" />
    <rect className="base-display" x="36" y="15" width="28" height="20" /><text x="50" y="26" textAnchor="middle">DISPLAY</text>
    <rect className="base-furniture" x="12" y="17" width="20" height="16" /><rect className="base-furniture" x="68" y="17" width="20" height="16" />
    <rect className="base-casework" x="69" y="40" width="20" height="12" /><text x="79" y="47" textAnchor="middle">CASEWORK</text>
    <rect className="base-teacher" x="12" y="41" width="18" height="10" /><text x="21" y="47" textAnchor="middle">TEACHER</text>
    <path className="base-dimension" d="M6 59h88M6 57v4M94 57v4" /><text x="50" y="61" textAnchor="middle">32&apos;-0&quot; TEACHING WALL</text>
  </svg>;

  if (view === "ceiling") return <svg viewBox="0 0 100 62" className="classroom-base" role="img" aria-label="Reflected ceiling plan with ceiling grid and coordination objects">
    <path className="base-room" d="M6 6h88v50H6z" />
    {[14, 22, 30, 38, 46, 54, 62, 70, 78, 86].map((x) => <path key={`x-${x}`} className="ceiling-grid-line" d={`M${x} 6v50`} />)}
    {[14, 22, 30, 38, 46].map((y) => <path key={`y-${y}`} className="ceiling-grid-line" d={`M6 ${y}h88`} />)}
    {coordinationVisible && <>
      <rect className="coord-hvac" x="19" y="17" width="8" height="8" /><path className="coord-hvac" d="M19 17l8 8M27 17l-8 8" />
      <rect className="coord-hvac" x="73" y="33" width="8" height="8" /><path className="coord-hvac" d="M73 33l8 8M81 33l-8 8" />
      <circle className="coord-sprinkler" cx="50" cy="13" r="2" /><circle className="coord-sprinkler" cx="50" cy="49" r="2" />
      <rect className="coord-obstruction" x="43" y="27" width="14" height="8" />
    </>}
    <text x="50" y="4" textAnchor="middle">9&apos;-6&quot; CEILING - 2&apos; x 2&apos; GRID</text>
  </svg>;

  return <svg viewBox="0 0 100 62" className="classroom-base" role="img" aria-label="Classroom floor plan with door, windows, teacher station, student furniture, casework, sink, dimensions, north arrow, and corridor">
    <path className="base-room" d="M6 6h88v50H6z" />
    <path className="base-door" d="M79 56V46M79 46a10 10 0 0 1 10 10" />
    <path className="base-window" d="M94 16v9M94 29v9" />
    <rect className="base-display" x="34" y="8" width="32" height="4" /><text x="50" y="11" textAnchor="middle">TEACHING WALL</text>
    <rect className="base-teacher" x="12" y="40" width="16" height="10" /><text x="20" y="46" textAnchor="middle">TEACHER</text>
    <rect className="base-casework" x="65" y="41" width="12" height="10" /><text x="71" y="47" textAnchor="middle">SINK</text>
    {[0, 1, 2].flatMap((row) => [0, 1, 2, 3].map((column) => <rect key={`${row}-${column}`} className="base-furniture" x={35 + column * 10} y={21 + row * 8} width="7" height="4" />))}
    {coordinationVisible && <><circle className="coord-plumbing" cx="71" cy="43" r="1.5" /><rect className="coord-equipment" x="82" y="18" width="7" height="8" /></>}
    <path className="base-north" d="M11 24V14M11 14l-2 4M11 14l2 4" /><text x="11" y="12" textAnchor="middle">N</text>
    <path className="base-dimension" d="M6 59h88M6 57v4M94 57v4" /><text x="50" y="61" textAnchor="middle">32&apos;-0&quot; - SCALE 1/4&quot; = 1&apos;-0&quot;</text>
    <text x="2" y="33" textAnchor="middle" transform="rotate(-90 2 33)">CORRIDOR</text><text x="9" y="9">ROOM 101 - 28 STUDENTS</text>
  </svg>;
}

export function ClassroomCanvas({ selectedDevice, placementEnabled, onDeviceSelected, onStatus }: ClassroomCanvasProps) {
  const classroom = useClassroomDesign();
  const reviewTools = useClassroomReview();
  const [activeView, setActiveView] = useState<DesignView>("floor");
  const [selectedPlacementId, setSelectedPlacementId] = useState<string>();
  const [moveArmed, setMoveArmed] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [redlineArmed, setRedlineArmed] = useState(false);
  const [redlineCategory, setRedlineCategory] = useState<RedlineCategory>("Coordination");
  const [redlineConsequence, setRedlineConsequence] = useState("");

  const selectedPlacement = classroom.design.placements.find((placement) => placement.instanceId === selectedPlacementId);
  const selectedPlacementDevice = selectedPlacement ? engineeringDevices.find((device) => device.id === selectedPlacement.deviceId) : undefined;
  const displayDesign = reviewTools.compareMode === "before" && reviewTools.review.baselineDesign ? reviewTools.review.baselineDesign : reviewTools.compareMode === "corrected" && reviewTools.review.correctedDesign ? reviewTools.review.correctedDesign : classroom.design;
  const visiblePlacements = useMemo(() => displayDesign.placements.filter((placement) => {
    if (!displayDesign.layers[placement.layer].visible) return false;
    return activeView === "composite" || activeView === "system" || placement.view === activeView;
  }), [activeView, displayDesign]);
  const findings = useMemo(() => runDesignChecks(classroom.design, reviewTools.review, activeView), [activeView, classroom.design, reviewTools.review]);

  function coordinateFromClient(clientX: number, clientY: number, element: HTMLDivElement) {
    const rect = element.getBoundingClientRect();
    return { x: ((clientX - rect.left) / rect.width) * 100, y: ((clientY - rect.top) / rect.height) * 100 };
  }

  function placeOrMove(x: number, y: number, deviceOverride?: EngineeringDevice) {
    if (activeView === "system") { onStatus("System Paths is a review view. Place devices in a plan or elevation view."); return; }
    if (moveArmed && selectedPlacement && selectedPlacementDevice) {
      if (classroom.design.layers[selectedPlacement.layer].locked) { onStatus("This layer is locked. Unlock it before moving the device."); return; }
      const snapped = snapPosition(selectedPlacementDevice, x, y, selectedPlacement.view);
      classroom.updatePlacement(selectedPlacement.instanceId, { x: snapped.x, y: snapped.y });
      setMoveArmed(false); onStatus(`${selectedPlacementDevice.name} moved. ${snapped.note}`); return;
    }
    if (!placementEnabled) { onStatus("Device placement unlocks through the Guided Journey, or you can enter Free Build."); return; }
    reviewTools.setCompareMode("current");
    const deviceToPlace = deviceOverride ?? selectedDevice;
    const layer = layerForDevice(deviceToPlace);
    if (classroom.design.layers[layer].locked) { onStatus(`${designLayerCatalog.find((item) => item.id === layer)?.label} is locked.`); return; }
    const view = placementViewFor(deviceToPlace, activeView);
    const snapped = snapPosition(deviceToPlace, x, y, view);
    const instanceId = `${deviceToPlace.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    classroom.addPlacement({ instanceId, deviceId: deviceToPlace.id, x: snapped.x, y: snapped.y, rotation: 0, view, layer });
    setSelectedPlacementId(instanceId);
    if (activeView !== "composite" && activeView !== view) setActiveView(view);
    onStatus(`${deviceToPlace.name} placed on the ${view === "ceiling" ? "reflected ceiling plan" : view}. ${snapped.note}`);
  }

  function onCanvasPointer(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    const point = coordinateFromClient(event.clientX, event.clientY, event.currentTarget);
    if (reviewTools.review.qcActive && redlineArmed) {
      reviewTools.addRedline(point.x, point.y, activeView, redlineCategory, redlineConsequence);
      setRedlineConsequence("");
      onStatus(`${redlineCategory} redline added to the ${activeView} view.`);
      return;
    }
    setCursor(point); placeOrMove(point.x, point.y);
  }

  function onCanvasDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const point = coordinateFromClient(event.clientX, event.clientY, event.currentTarget);
    const fallbackPayload = event.dataTransfer.getData("text/plain");
    const placementId = event.dataTransfer.getData("application/x-classroom-placement") || (fallbackPayload.startsWith("placement:") ? fallbackPayload.slice(10) : "");
    if (placementId) {
      const placement = classroom.design.placements.find((item) => item.instanceId === placementId);
      const device = placement ? engineeringDevices.find((item) => item.id === placement.deviceId) : undefined;
      if (!placement || !device || classroom.design.layers[placement.layer].locked) return;
      const snapped = snapPosition(device, point.x, point.y, placement.view);
      classroom.updatePlacement(placementId, { x: snapped.x, y: snapped.y }); setSelectedPlacementId(placementId); onStatus(`${device.name} moved. ${snapped.note}`); return;
    }
    const deviceId = event.dataTransfer.getData("application/x-engineering-device") || (fallbackPayload.startsWith("device:") ? fallbackPayload.slice(7) : "");
    const device = engineeringDevices.find((item) => item.id === deviceId);
    if (device) { onDeviceSelected(device.id); placeOrMove(point.x, point.y, device); }
  }

  function onCanvasKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const amount = event.shiftKey ? 8 : 2;
    if (event.key === "ArrowLeft") { event.preventDefault(); setCursor((value) => ({ ...value, x: Math.max(4, value.x - amount) })); }
    if (event.key === "ArrowRight") { event.preventDefault(); setCursor((value) => ({ ...value, x: Math.min(96, value.x + amount) })); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCursor((value) => ({ ...value, y: Math.max(6, value.y - amount) })); }
    if (event.key === "ArrowDown") { event.preventDefault(); setCursor((value) => ({ ...value, y: Math.min(94, value.y + amount) })); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); placeOrMove(cursor.x, cursor.y); }
    if (event.key === "Delete" && selectedPlacement) { event.preventDefault(); classroom.deletePlacement(selectedPlacement.instanceId); setSelectedPlacementId(undefined); onStatus("Selected device deleted."); }
  }

  function nudge(dx: number, dy: number) {
    if (!selectedPlacement || classroom.design.layers[selectedPlacement.layer].locked) return;
    classroom.updatePlacement(selectedPlacement.instanceId, { x: Math.max(3, Math.min(97, selectedPlacement.x + dx)), y: Math.max(4, Math.min(96, selectedPlacement.y + dy)) });
    onStatus("Selected device moved one grid step.");
  }

  return <section className="classroom-builder" aria-labelledby="classroom-builder-heading">
    <div className="classroom-builder-heading">
      <div><p className="quest-panel-kicker">Classroom canvas</p><h2 id="classroom-builder-heading">Build one layer at a time.</h2></div>
      <p><Save aria-hidden="true" /> {classroom.hydrated ? `Design saved locally${classroom.lastSavedAt ? ` at ${classroom.lastSavedAt}` : ""}` : "Loading saved design"}</p>
    </div>

    <div className="canvas-view-tabs" aria-label="Classroom drawing view">
      {designViews.map((view) => <button key={view.id} type="button" aria-pressed={activeView === view.id} onClick={() => { setActiveView(view.id); onStatus(`${view.label} opened.`); }}>{view.label}</button>)}
    </div>

    <div className="canvas-toolbar" aria-label="Canvas tools">
      <button type="button" onClick={classroom.undo} disabled={!classroom.canUndo} aria-label="Undo"><Undo2 /></button>
      <button type="button" onClick={classroom.redo} disabled={!classroom.canRedo} aria-label="Redo"><Redo2 /></button>
      <span aria-hidden="true" />
      <button type="button" onClick={() => setZoom((value) => Math.max(75, value - 25))} aria-label="Zoom out"><Minus /></button>
      <output aria-label="Canvas zoom">{zoom}%</output>
      <button type="button" onClick={() => setZoom((value) => Math.min(150, value + 25))} aria-label="Zoom in"><Plus /></button>
      <button type="button" onClick={() => setZoom(100)} aria-label="Fit canvas"><Focus /></button>
      <span aria-hidden="true" />
      <button type="button" onClick={() => { classroom.saveNow(); onStatus("Design draft saved on this device."); }} aria-label="Save design draft"><Save /></button>
      <button type="button" onClick={() => { classroom.restoreSaved(); onStatus("Saved design draft restored."); }} aria-label="Restore saved design"><RotateCw /></button>
    </div>

    {selectedPlacement && selectedPlacementDevice && <div className="placement-toolbar" aria-label="Selected placement tools">
      <strong>{selectedPlacementDevice.name}</strong>
      <button type="button" aria-pressed={moveArmed} onClick={() => setMoveArmed((value) => !value)}><Move /> Move</button>
      <button type="button" onClick={() => { classroom.updatePlacement(selectedPlacement.instanceId, { rotation: (selectedPlacement.rotation + 45) % 360 }); onStatus("Selected device rotated 45 degrees."); }}><RotateCw /> Rotate</button>
      <button type="button" onClick={() => { classroom.duplicatePlacement(selectedPlacement.instanceId); onStatus("Selected device duplicated."); }}><Copy /> Duplicate</button>
      <button type="button" onClick={() => { classroom.deletePlacement(selectedPlacement.instanceId); setSelectedPlacementId(undefined); onStatus("Selected device deleted."); }}><Trash2 /> Delete</button>
      <div className="placement-nudge" aria-label="Nudge selected device">
        <button type="button" onClick={() => nudge(0, -2)} aria-label="Nudge up"><ArrowUp /></button>
        <button type="button" onClick={() => nudge(-2, 0)} aria-label="Nudge left"><ArrowLeft /></button>
        <button type="button" onClick={() => nudge(0, 2)} aria-label="Nudge down"><ArrowDown /></button>
        <button type="button" onClick={() => nudge(2, 0)} aria-label="Nudge right"><ArrowRight /></button>
      </div>
    </div>}

    <div className="classroom-canvas-scroll">
      <div
        className={`classroom-canvas view-${activeView}`}
        style={{ width: `${zoom}%` }}
        role="application"
        tabIndex={0}
        aria-label="Interactive classroom drawing. Select a device and tap the plan, or drag a device here. Use arrow keys to move the cursor and Enter to place."
        data-testid="classroom-canvas"
        onPointerDown={onCanvasPointer}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onCanvasDrop}
        onKeyDown={onCanvasKeyDown}
      >
        <BaseDrawing view={activeView} coordinationVisible={classroom.design.layers.coordination.visible} />
        {(activeView === "system" || activeView === "composite") && <svg viewBox="0 0 100 62" className="system-path-overlay" aria-hidden="true">
          {visiblePlacements.map((placement) => {
            const destination = placement.layer === "communications" ? { x: 93, y: 14 } : placement.layer === "life-safety" ? { x: 93, y: 48 } : { x: 7, y: 29 };
            return <line key={placement.instanceId} className={`system-path path-${placement.layer}`} x1={placement.x} y1={placement.y * .62} x2={destination.x} y2={destination.y} />;
          })}
        </svg>}
        <span className="canvas-cursor" style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} aria-hidden="true" />
        {reviewTools.review.hintLevel === 4 && <span className="mentor-suggestion" style={{ left: selectedDevice.defaultMountingSurface === "wall" ? "7%" : "50%", top: selectedDevice.defaultMountingSurface === "ceiling" ? "32%" : "55%" }} aria-label={`Suggested provisional zone for ${selectedDevice.name}`}><Lightbulb aria-hidden="true" /></span>}
        {reviewTools.review.qcActive && reviewTools.review.redlines.filter((redline) => activeView === "composite" || redline.view === activeView).map((redline, index) => <button key={redline.id} type="button" className={`redline-marker ${redline.resolved ? "is-resolved" : ""}`} style={{ left: `${redline.x}%`, top: `${redline.y}%` }} onClick={(event) => { event.stopPropagation(); reviewTools.toggleRedline(redline.id); onStatus(`Redline ${index + 1} ${redline.resolved ? "reopened" : "resolved"}.`); }} aria-label={`${redline.resolved ? "Reopen" : "Resolve"} redline ${index + 1}: ${redline.category}`}>{index + 1}</button>)}
        {visiblePlacements.map((placement) => {
          const device = engineeringDevices.find((item) => item.id === placement.deviceId);
          if (!device) return null;
          const layer = classroom.design.layers[placement.layer];
          return <button
            key={placement.instanceId}
            type="button"
            className={`placed-device device-color-${device.systemColor}`}
            style={{ left: `${placement.x}%`, top: `${placement.y}%`, opacity: layer.opacity, transform: `translate(-50%, -50%) rotate(${placement.rotation}deg)` }}
            aria-pressed={selectedPlacementId === placement.instanceId}
            aria-label={`Select placed ${device.name}`}
            draggable={!layer.locked}
            onDragStart={(event) => {
              event.stopPropagation();
              event.dataTransfer.setData("application/x-classroom-placement", placement.instanceId);
              event.dataTransfer.setData("text/plain", `placement:${placement.instanceId}`);
              event.dataTransfer.effectAllowed = "move";
            }}
            onPointerDown={(event) => { event.stopPropagation(); setSelectedPlacementId(placement.instanceId); onDeviceSelected(device.id); onStatus(`${device.name} selected.`); }}
          ><DeviceSymbol kind={device.planSymbol} label={`${device.name} plan symbol`} /></button>;
        })}
      </div>
    </div>

    <p className="canvas-instruction"><Grip aria-hidden="true" /> Desktop: drag a device or placed symbol. Touch: select a device, then tap the drawing. Keyboard: move the cursor with arrow keys and press Enter.</p>

    <div className="layer-manager" aria-labelledby="layer-manager-heading">
      <div className="layer-manager-heading"><div><Layers3 aria-hidden="true" /><h3 id="layer-manager-heading">Design layers</h3></div><button type="button" onClick={classroom.showAllLayers}>Show all</button></div>
      {designLayerCatalog.map((layer) => {
        const state = classroom.design.layers[layer.id];
        const count = classroom.design.placements.filter((placement) => placement.layer === layer.id).length;
        return <div key={layer.id} className={`layer-row layer-row-${layer.id}`}>
          <button type="button" aria-pressed={state.visible} onClick={() => classroom.updateLayer(layer.id, { visible: !state.visible })} aria-label={`${state.visible ? "Hide" : "Show"} ${layer.label}`}>{state.visible ? <Eye /> : <EyeOff />}</button>
          <span><strong>{layer.label}</strong><small>{count} placed</small></span>
          <label><span>Opacity</span><input type="range" min="25" max="100" value={Math.round(state.opacity * 100)} onChange={(event) => classroom.updateLayer(layer.id, { opacity: Number(event.target.value) / 100 })} aria-label={`${layer.label} opacity`} /></label>
          <button type="button" onClick={() => classroom.isolateLayer(layer.id)} aria-label={`Isolate ${layer.label}`}><Focus /></button>
          <button type="button" aria-pressed={state.locked} onClick={() => classroom.updateLayer(layer.id, { locked: !state.locked })} aria-label={`${state.locked ? "Unlock" : "Lock"} ${layer.label}`}>{state.locked ? <Lock /> : <Unlock />}</button>
          <button type="button" onClick={() => classroom.clearLayer(layer.id)} disabled={state.locked || count === 0} aria-label={`Clear ${layer.label}`}><Trash2 /></button>
        </div>;
      })}
      <button type="button" className="clear-design" onClick={() => { classroom.clearAll(); setSelectedPlacementId(undefined); onStatus("Unlocked design layers cleared."); }}><Trash2 aria-hidden="true" /> Clear unlocked design</button>
    </div>
    <ClassroomReviewPanel
      design={classroom.design}
      activeView={activeView}
      selectedPlacement={selectedPlacement}
      selectedDevice={selectedPlacementDevice ?? selectedDevice}
      findings={findings}
      reviewTools={reviewTools}
      redlineArmed={redlineArmed}
      setRedlineArmed={setRedlineArmed}
      redlineCategory={redlineCategory}
      setRedlineCategory={setRedlineCategory}
      redlineConsequence={redlineConsequence}
      setRedlineConsequence={setRedlineConsequence}
      onStatus={onStatus}
    />
  </section>;
}
