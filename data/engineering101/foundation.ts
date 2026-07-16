import { publicAssetPath } from "@/data/publicAssets";

export const guidePath = publicAssetPath("engineering-guide");

export const stageOverview = [
  { number: 1, title: "Build the Map", range: "Quests 1-4", description: "Read the room before you place a device." },
  { number: 2, title: "Learn the Language", range: "Quests 5-8", description: "Trace symbols, sources, loads, and pathways." },
  { number: 3, title: "Unlock the Systems", range: "Quests 9-12", description: "Separate Divisions 26, 27, and 28." },
  { number: 4, title: "Build the Classroom", range: "Quests 13-16", description: "Coordinate layers into one defensible concept." },
  { number: 5, title: "Prove the Design", range: "Quests 17-20", description: "Review, revise, compare, and teach it back." },
] as const;
