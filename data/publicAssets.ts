import manifest from "@/data/publicAssets.json";

export type PublicAssetId = string;
export type PublicAsset = {
  id: PublicAssetId;
  publicPath: string | null;
  archivePath: string | null;
  type: "image" | "pdf";
  role: string;
  title: string;
  description: string;
  revisionDate: string;
  usedBy: string[];
  status: "active" | "archived";
  replacementAssetId: PublicAssetId | null;
  sha256?: string;
  pageCount?: number;
};

export const publicAssetManifest = manifest;
export const publicAssets = manifest.assets as PublicAsset[];

export function getPublicAsset(id: PublicAssetId): PublicAsset {
  const asset = publicAssets.find((item) => item.id === id);
  if (!asset) throw new Error(`Unknown public asset: ${id}`);
  return asset;
}

export function publicAssetPath(id: PublicAssetId): string {
  const asset = getPublicAsset(id);
  if (asset.status !== "active" || !asset.publicPath) throw new Error(`Public asset is not active: ${id}`);
  return asset.publicPath;
}
