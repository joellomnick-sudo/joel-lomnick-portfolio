import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Robots-Tag": "noindex, noarchive",
      },
    },
  );
}
