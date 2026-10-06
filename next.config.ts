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
  // The Vercel host serves the private Lionheart studio only.
  // Public portfolio pages and Power PE always live on the canonical www host.
  async redirects() {
    return [{
      source: "/:path((?!lionheart(?:/|$)|api(?:/|$)|_next(?:/|$)|images(?:/|$)|documents(?:/|$)|audio(?:/|$)|favicon\\.ico$).*)",
      destination: "https://www.lomnickpro.com/:path",
      permanent: true,
    }];
  },
  async headers() {
    return [
      ...privateDocumentHeaders.map((source) => ({
        source,
        headers: [
          { key: "X-Robots-Tag", value: "noindex, noarchive" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      })),
      {
        source: "/lionheart/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
