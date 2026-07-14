import type { NextConfig } from "next";

const privateDocumentHeaders = [
  "/documents/joel-lomnick-comprehensive-resume-public.pdf",
  "/documents/joel-lomnick-comprehensive-cover-letter-public.pdf",
];

const nextConfig: NextConfig = {
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
