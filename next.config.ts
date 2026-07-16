import type { NextConfig } from "next";
import publicAssetManifest from "./data/publicAssets.json";

const buildTimestamp = process.env.BUILD_TIMESTAMP || new Date().toISOString();

function manifestPath(id: string) {
  const asset = publicAssetManifest.assets.find((candidate) => candidate.id === id);
  if (!asset?.publicPath || asset.status !== "active") throw new Error(`Missing active public asset: ${id}`);
  return asset.publicPath;
}

const privateDocumentHeaders = [
  manifestPath("public-resume"),
  manifestPath("public-cover-letter"),
];

const nextConfig: NextConfig = {
  env: {
    BUILD_TIMESTAMP: buildTimestamp,
  },
  async headers() {
    return privateDocumentHeaders.map((source) => ({
      source,
      headers: [
        { key: "X-Robots-Tag", value: "noindex, noarchive" },
        { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
      ],
    }));
  },
};

export default nextConfig;
