import type { Metadata } from "next";
import { EngineeringQuestShell } from "@/components/EngineeringQuestShell";

export const metadata: Metadata = {
  title: "Engineering 101: Classroom Design Quest",
  description: "A progressive, game-inspired learning experience for reading classroom plans and coordinating electrical, communications, and life-safety systems.",
};

export default function ClassroomLabPage() {
  return <EngineeringQuestShell />;
}
