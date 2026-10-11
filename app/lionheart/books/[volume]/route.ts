import { NextRequest, NextResponse } from "next/server";
import { LIONHEART_SESSION_COOKIE, verifyLionheartSessionToken } from "@/lib/lionheart-auth";
import { bookEditions, fetchEdition } from "@/lib/lionheart-book-download";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;
const headers = { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow, noarchive", "Referrer-Policy": "no-referrer" };
export async function GET(request: NextRequest, context: { params: Promise<{ volume: string }> }) {
  if (!verifyLionheartSessionToken(request.cookies.get(LIONHEART_SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unlock Lionheart to download your books." }, { status: 401, headers });
  const { volume } = await context.params;
  if (volume !== "one" && volume !== "two") return NextResponse.json({ error: "Unknown book." }, { status: 404, headers });
  try {
    const pdf = await fetchEdition(volume);
    return new NextResponse(new Uint8Array(pdf), { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${bookEditions[volume].filename}"`, "Content-Length": String(pdf.length), "X-Content-Type-Options": "nosniff" } });
  } catch {
    return NextResponse.json({ error: "The verified October 11 edition is temporarily unavailable. Please try again later." }, { status: 502, headers });
  }
}
