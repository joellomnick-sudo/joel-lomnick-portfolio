import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LionheartReader } from "@/components/LionheartReader";
import { getLionheartVolume, lionheartVolumes } from "@/data/lionheart";
import { publicAssetPath } from "@/data/publicAssets";

export function generateStaticParams() {
  return lionheartVolumes.map((volume) => ({ slug: volume.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const volume = getLionheartVolume(slug);
  if (!volume) return {};
  return {
    title: `${volume.label} Reader`,
    description: `Read and listen to the public ${volume.title} sneak preview in an accessible responsive reader.`,
  };
}

export default async function LionheartPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const volume = getLionheartVolume(slug);
  if (!volume) notFound();
  return <LionheartReader volume={volume} pdfUrl={publicAssetPath(volume.assetId)} />;
}
