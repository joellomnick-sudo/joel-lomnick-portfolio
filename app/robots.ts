import type { MetadataRoute } from "next";
import { publicAssetPath } from "@/data/publicAssets";

export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://lomnickpro.com"; return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", publicAssetPath("public-resume"), publicAssetPath("public-cover-letter")] }, sitemap: `${base}/sitemap.xml` }; }
