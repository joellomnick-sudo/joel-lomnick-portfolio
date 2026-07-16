import type { EngineeringDevice } from "@/data/engineering101/devices";

export type MentorHint = {
  level: number;
  label: string;
  message: string;
};

export function mentorHintsFor(device: EngineeringDevice): MentorHint[] {
  const surface = device.defaultMountingSurface === "ceiling" ? "ceiling grid" : device.defaultMountingSurface === "wall" ? "room perimeter" : "usable floor area";
  return [
    { level: 1, label: "Guiding question", message: `What serves the ${device.name}, and what must it coordinate with before you choose a location?` },
    { level: 2, label: "Relevant zone", message: `Study the ${surface} and the ${device.category.toLowerCase()} layer. Look for access, coverage, furniture, and nearby systems.` },
    { level: 3, label: "Two approaches", message: `Approach one: prioritize the most direct useful location. Approach two: shift the device to reduce a coordination conflict while preserving its purpose.` },
    { level: 4, label: "Suggested placement", message: `Try a provisional ${device.defaultMountingSurface} location in the highlighted zone, then explain why it works. The suggestion is a starting point, not an approval.` },
  ];
}

export const qcMentorNotes = [
  "First drafts are supposed to reveal questions. That is their job.",
  "A clean symbol in the wrong system is still the wrong answer.",
  "Before moving the device, ask what is actually serving it.",
  "You do not need to memorize the industry. You need to know what to verify.",
  "Good catch. The room just taught you something.",
  "Do not hide the assumption. Put it where the team can see it.",
];
