import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ClassroomLab } from "@/components/ClassroomLab";

export const metadata: Metadata = { title: "Interactive Classroom Lab", description: "An educational, interactive introduction to electrical power, lighting, communications, and life-safety coordination in a modern classroom." };

export default function ClassroomLabPage() { return <>
  <section className="dark-hero py-14"><div className="site-container"><p className="eyebrow">Engineering 101</p><h1 className="display-title mt-4">Design a modern classroom concept.</h1><p className="prose-copy prose-copy-dark mt-6">Select a Division 26, 27, or 28 device and place it on the plan. The activity offers guidance rather than one rigid answer.</p><div className="button-row mt-6"><ButtonLink href="/documents/engineering-101-modern-classroom.pdf" target="_blank">Read the guide</ButtonLink><ButtonLink href="/engineering" variant="quiet">Back to Engineering</ButtonLink></div></div></section>
  <section className="py-10 lg:py-14"><div className="site-container"><ClassroomLab /></div></section>
  </>; }
