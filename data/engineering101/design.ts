import type { EngineeringDevice } from "@/data/engineering101/devices";

export type DesignView = "floor" | "ceiling" | "elevation" | "system" | "composite";
export type PlacementView = "floor" | "ceiling" | "elevation";
export type DesignLayerId = "lighting" | "power" | "communications" | "life-safety" | "coordination";

export type DevicePlacement = {
  instanceId: string;
  deviceId: string;
  x: number;
  y: number;
  rotation: number;
  view: PlacementView;
  layer: DesignLayerId;
};

export type DesignLayerState = {
  visible: boolean;
  locked: boolean;
  opacity: number;
};

export type ClassroomDesign = {
  placements: DevicePlacement[];
  layers: Record<DesignLayerId, DesignLayerState>;
};

export const designViews: Array<{ id: DesignView; label: string }> = [
  { id: "floor", label: "Floor plan" },
  { id: "ceiling", label: "Reflected ceiling" },
  { id: "elevation", label: "Teaching wall" },
  { id: "system", label: "System paths" },
  { id: "composite", label: "Composite" },
];

export const designLayerCatalog: Array<{ id: DesignLayerId; label: string; shortLabel: string }> = [
  { id: "lighting", label: "Lighting and controls", shortLabel: "Lighting" },
  { id: "power", label: "Receptacles and equipment power", shortLabel: "Power" },
  { id: "communications", label: "Communications and AV", shortLabel: "Division 27" },
  { id: "life-safety", label: "Life safety and security", shortLabel: "Division 28" },
  { id: "coordination", label: "Architecture and other trades", shortLabel: "Coordination" },
];

export const initialLayers: ClassroomDesign["layers"] = {
  lighting: { visible: true, locked: false, opacity: 1 },
  power: { visible: true, locked: false, opacity: 1 },
  communications: { visible: true, locked: false, opacity: 1 },
  "life-safety": { visible: true, locked: false, opacity: 1 },
  coordination: { visible: true, locked: false, opacity: 1 },
};

export function layerForDevice(device: EngineeringDevice): DesignLayerId {
  if (device.systemColor === "gold") return "lighting";
  if (device.systemColor === "power") return "power";
  if (device.systemColor === "green") return "communications";
  return "life-safety";
}

export function placementViewFor(device: EngineeringDevice, activeView: DesignView): PlacementView {
  if (activeView === "elevation") return "elevation";
  if (device.defaultMountingSurface === "ceiling") return "ceiling";
  return "floor";
}
