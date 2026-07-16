import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { publicAssetManifest, publicAssets } from "@/data/publicAssets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const activeAssets = publicAssets.filter((asset) => asset.status === "active");
const assetManifestHash = createHash("sha256")
  .update(JSON.stringify(publicAssetManifest))
  .digest("hex");

export function GET() {
  const commit =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    "local";
  const environment =
    process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

  return NextResponse.json(
    {
      commit,
      environment,
      builtAt: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
      assetManifest: {
        version: publicAssetManifest.manifestVersion,
        hash: assetManifestHash,
        activeCount: activeAssets.length,
        documents: activeAssets
          .filter((asset) => asset.type === "pdf")
          .map(({ id, publicPath: path, pageCount, sha256 }) => ({ id, path, pageCount, sha256 })),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Robots-Tag": "noindex, noarchive",
      },
    },
  );
}
