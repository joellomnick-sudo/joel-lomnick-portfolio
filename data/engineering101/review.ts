import type { ClassroomDesign, DesignView } from "@/data/engineering101/design";

export type FeedbackCategory = "GOOD PRACTICE" | "COORDINATION QUESTION" | "RESEARCH REQUIRED" | "SYSTEM-PATH ERROR" | "INVALID PLACEMENT" | "ASSUMPTION NEEDED" | "TEACH-BACK INCOMPLETE";
export type FindingSeverity = "Learning note" | "Coordination warning" | "System error" | "Physical conflict";
export type AssumptionStatus = "Confirmed" | "Pending" | "Owner decision" | "Architectural coordination" | "Consultant coordination" | "Equipment selection" | "Code-review question";
export type RedlineCategory = "Architecture" | "Coordination" | "System path" | "Placement" | "Documentation";

export type DesignFinding = {
  id: string;
  category: FeedbackCategory;
  severity: FindingSeverity;
  title: string;
  message: string;
  placementId?: string;
};

export type DesignAssumption = {
  id: string;
  text: string;
  status: AssumptionStatus;
  createdAt: string;
};

export type TeachBackResponse = {
  placementId: string;
  division: string;
  servedFrom: string;
  pathway: string;
  rationale: string;
  coordinatesWith: string;
  remainingAssumption: string;
  testing: string;
  savedAt: string;
};

export type DesignRedline = {
  id: string;
  x: number;
  y: number;
  view: DesignView;
  category: RedlineCategory;
  consequence: string;
  resolved: boolean;
};

export type ClassroomReviewState = {
  assumptions: DesignAssumption[];
  teachBack: Record<string, TeachBackResponse>;
  redlines: DesignRedline[];
  hintLevel: number;
  hintUsage: number;
  qcActive: boolean;
  qcStartedAt: string;
  baselineDesign?: ClassroomDesign;
  correctedDesign?: ClassroomDesign;
  correctedAt: string;
};

export const assumptionStatuses: AssumptionStatus[] = [
  "Confirmed",
  "Pending",
  "Owner decision",
  "Architectural coordination",
  "Consultant coordination",
  "Equipment selection",
  "Code-review question",
];

export const redlineCategories: RedlineCategory[] = ["Architecture", "Coordination", "System path", "Placement", "Documentation"];

export const emptyTeachBack = (placementId: string): TeachBackResponse => ({
  placementId,
  division: "",
  servedFrom: "",
  pathway: "",
  rationale: "",
  coordinatesWith: "",
  remainingAssumption: "",
  testing: "",
  savedAt: "",
});

export const initialReviewState: ClassroomReviewState = {
  assumptions: [],
  teachBack: {},
  redlines: [],
  hintLevel: 0,
  hintUsage: 0,
  qcActive: false,
  qcStartedAt: "",
  correctedAt: "",
};

export const plantedQcIssues = [
  { id: "qc-door-swing", title: "Door-swing conflict", prompt: "A device is drawn where the entry door needs clear movement." },
  { id: "qc-ceiling-collision", title: "Ceiling coordination conflict", prompt: "A lighting symbol competes with an air device and sprinkler zone." },
  { id: "qc-sink-question", title: "Sink-area verification missing", prompt: "An electrical condition near the sink has no documented research question." },
];
