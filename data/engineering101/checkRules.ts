import type { ClassroomDesign, DesignView, DevicePlacement } from "@/data/engineering101/design";
import { engineeringDevices } from "@/data/engineering101/devices";
import type { ClassroomReviewState, DesignFinding } from "@/data/engineering101/review";

function distance(a: DevicePlacement, b: DevicePlacement) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function runDesignChecks(design: ClassroomDesign, review: ClassroomReviewState, activeView: DesignView): DesignFinding[] {
  const findings: DesignFinding[] = [];
  const add = (finding: DesignFinding) => { if (!findings.some((item) => item.id === finding.id)) findings.push(finding); };

  if (design.placements.length === 0) {
    add({ id: "empty-design", category: "RESEARCH REQUIRED", severity: "Learning note", title: "Begin with the room", message: "Read the architectural base and choose one useful device before checking the design." });
    return findings;
  }

  if (review.assumptions.length === 0) {
    add({ id: "missing-assumption", category: "ASSUMPTION NEEDED", severity: "Coordination warning", title: "Document the design basis", message: "The concept has placed devices but no recorded room or owner assumption." });
  }

  for (const placement of design.placements) {
    const device = engineeringDevices.find((item) => item.id === placement.deviceId);
    if (!device) {
      add({ id: `unknown-${placement.instanceId}`, category: "RESEARCH REQUIRED", severity: "System error", title: "Unknown symbol", message: "A placed symbol is no longer present in the active educational legend.", placementId: placement.instanceId });
      continue;
    }

    const teachBack = review.teachBack[placement.instanceId];
    if (!teachBack || !teachBack.rationale.trim() || !teachBack.coordinatesWith.trim() || !teachBack.remainingAssumption.trim() || !teachBack.testing.trim()) {
      add({ id: `teach-back-${placement.instanceId}`, category: "TEACH-BACK INCOMPLETE", severity: "Learning note", title: `${device.name} needs an explanation`, message: "Describe its location, coordination, remaining assumption, and verification before final review.", placementId: placement.instanceId });
    }

    if (teachBack) {
      if (teachBack.division && teachBack.division !== device.division) {
        add({ id: `division-${placement.instanceId}`, category: "SYSTEM-PATH ERROR", severity: "System error", title: "Division does not match the device", message: `${device.name} belongs to Division ${device.division} in this learning model.`, placementId: placement.instanceId });
      }
      const servedFrom = teachBack.servedFrom.toLowerCase();
      const pathway = teachBack.pathway.toLowerCase();
      if (["data-outlet", "wap", "teacher-call"].includes(device.id) && (servedFrom.includes("classroom panel") || servedFrom.includes("branch circuit"))) {
        add({ id: `source-${placement.instanceId}`, category: "SYSTEM-PATH ERROR", severity: "System error", title: "Communications source is incorrect", message: `${device.name} traces toward its communications system or headend, not a classroom panel branch load.`, placementId: placement.instanceId });
      }
      if (device.division === "28" && (servedFrom.includes("ordinary branch") || pathway.includes("ordinary branch"))) {
        add({ id: `fire-path-${placement.instanceId}`, category: "SYSTEM-PATH ERROR", severity: "System error", title: "Life-safety pathway is incorrect", message: `${device.name} uses its selected life-safety or security system pathway, not an ordinary branch-load path.`, placementId: placement.instanceId });
      }
      if (!teachBack.servedFrom.trim() || !teachBack.pathway.trim()) {
        add({ id: `missing-path-${placement.instanceId}`, category: "SYSTEM-PATH ERROR", severity: "System error", title: "Source or pathway is missing", message: "Trace both the serving system and the pathway before completing the device explanation.", placementId: placement.instanceId });
      }
    }

    if (placement.view === "floor" && placement.x >= 79 && placement.y >= 73) {
      add({ id: `door-${placement.instanceId}`, category: "INVALID PLACEMENT", severity: "Physical conflict", title: "Device enters the door swing", message: `${device.name} conflicts with the entry-door movement and needs a usable location.`, placementId: placement.instanceId });
    }
    if (placement.view === "floor" && placement.x >= 64 && placement.x <= 79 && placement.y >= 65 && placement.y <= 85) {
      add({ id: `sink-${placement.instanceId}`, category: "COORDINATION QUESTION", severity: "Physical conflict", title: "Device overlaps sink or casework", message: `${device.name} needs casework, plumbing, access, and sink-area verification.`, placementId: placement.instanceId });
    }
    if (placement.view === "floor" && device.defaultMountingSurface === "wall" && placement.x > 10 && placement.x < 90 && placement.y > 15 && placement.y < 87) {
      add({ id: `floating-${placement.instanceId}`, category: "INVALID PLACEMENT", severity: "Physical conflict", title: "Wall device floats inside the room", message: `${device.name} should return to a wall or an explicitly approved mounting surface.`, placementId: placement.instanceId });
    }
    if (placement.view === "ceiling") {
      const xOffset = Math.min(placement.x % 8, 8 - (placement.x % 8));
      const yOffset = Math.min(placement.y % 10, 10 - (placement.y % 10));
      if (xOffset > 1 || yOffset > 1) add({ id: `grid-${placement.instanceId}`, category: "COORDINATION QUESTION", severity: "Coordination warning", title: "Ceiling symbol is off grid", message: `${device.name} should be coordinated with the reflected ceiling grid or documented as a deliberate exception.`, placementId: placement.instanceId });
      if (device.id === "wap" && placement.x >= 42 && placement.x <= 58 && placement.y >= 43 && placement.y <= 58) add({ id: `wap-obstruction-${placement.instanceId}`, category: "COORDINATION QUESTION", severity: "Coordination warning", title: "WAP is near a major obstruction", message: "Review wireless coverage, mounting, and the obstruction before keeping this location.", placementId: placement.instanceId });
      if (device.category === "Lighting" && ((placement.x >= 18 && placement.x <= 29 && placement.y >= 24 && placement.y <= 45) || (placement.x >= 72 && placement.x <= 82 && placement.y >= 48 && placement.y <= 70))) add({ id: `light-hvac-${placement.instanceId}`, category: "COORDINATION QUESTION", severity: "Coordination warning", title: "Light fixture overlaps a ceiling coordination zone", message: "Move or verify the fixture against the nearby air device and sprinkler layout.", placementId: placement.instanceId });
    }
  }

  for (let index = 0; index < design.placements.length; index += 1) {
    for (let other = index + 1; other < design.placements.length; other += 1) {
      const first = design.placements[index];
      const second = design.placements[other];
      if (first.view === second.view && distance(first, second) < 5) add({ id: `overlap-${first.instanceId}-${second.instanceId}`, category: "INVALID PLACEMENT", severity: "Physical conflict", title: "Device symbols overlap", message: "Separate the devices so each symbol, mounting need, and maintenance space can be reviewed." });
    }
  }

  const deviceIds = new Set(design.placements.map((placement) => placement.deviceId));
  if (deviceIds.has("display-receptacle") !== deviceIds.has("display-data")) add({ id: "display-pair", category: "COORDINATION QUESTION", severity: "Coordination warning", title: "Display power and data are not coordinated", message: "The teaching-wall display concept should account for separate power and communications needs." });
  if (deviceIds.has("teacher-receptacle") !== deviceIds.has("teacher-av-data")) add({ id: "teacher-pair", category: "COORDINATION QUESTION", severity: "Coordination warning", title: "Teacher station needs a coordinated pair", message: "Review teacher-station power, communications, furniture feed, and cable management together." });

  if (activeView === "composite") {
    const hidden = Object.values(design.layers).filter((layer) => !layer.visible).length;
    if (hidden) add({ id: "hidden-final-layer", category: "COORDINATION QUESTION", severity: "Coordination warning", title: "A layer is hidden during composite review", message: "Show every required layer before treating the composite as the final classroom review." });
  }

  if (!findings.some((finding) => finding.severity === "System error" || finding.severity === "Physical conflict")) {
    add({ id: "good-practice", category: "GOOD PRACTICE", severity: "Learning note", title: "The design has a workable foundation", message: "The visible system paths and physical locations have no major educational error in the current check. Continue documenting assumptions and coordination." });
  }
  return findings;
}
