export const ranks = [
  { name: "Curious Beginner", minimumXP: 0 },
  { name: "Plan Reader", minimumXP: 150 },
  { name: "Symbol Navigator", minimumXP: 300 },
  { name: "System Tracer", minimumXP: 450 },
  { name: "Device Coordinator", minimumXP: 620 },
  { name: "Classroom Designer", minimumXP: 800 },
  { name: "Quality-Control Reviewer", minimumXP: 1000 },
  { name: "Design Mentor", minimumXP: 1200 },
] as const;

export const badgeDescriptions: Record<string, string> = {
  "Map Reader": "Recognized the architectural conditions that shape the classroom.",
  "Symbol Spotter": "Traced a device through the documents that define it.",
  "Source Tracer": "Kept power, network, and supervised pathways distinct.",
  "Division 26 Builder": "Built a basic lighting, controls, and power concept.",
  "Network Navigator": "Routed communications toward the proper system headend.",
  "Life-Safety Steward": "Treated Division 28 devices as part of supervised systems.",
  "Coordination Resolver": "Found and resolved cross-trade conflicts.",
  "Assumption Tracker": "Made unknowns visible and ready to verify.",
  "Layer Builder": "Built independently reviewable classroom layers.",
  "Classroom Designer": "Combined and revised a coordinated classroom concept.",
  "Redline Detective": "Found, classified, and corrected design issues.",
  "Teach-Back Mentor": "Explained a final concept in clear system language.",
};

export function rankForXP(xp: number) {
  return [...ranks].reverse().find((rank) => xp >= rank.minimumXP) ?? ranks[0];
}

export function nextRankForXP(xp: number) {
  return ranks.find((rank) => rank.minimumXP > xp);
}
