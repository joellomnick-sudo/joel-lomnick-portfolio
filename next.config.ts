import type { NextConfig } from "next";

const buildTimestamp = process.env.BUILD_TIMESTAMP || new Date().toISOString();

const privateDocumentHeaders = [
  "/documents/joel-lomnick-comprehensive-resume-public.pdf",
  "/documents/joel-lomnick-comprehensive-cover-letter-public.pdf",
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
