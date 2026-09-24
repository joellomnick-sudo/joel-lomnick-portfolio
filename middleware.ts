import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "lionheart_session";

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedSignature(payload: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

async function hasValidLionheartSession(request: NextRequest) {
  const secret = process.env.LIONHEART_SESSION_SECRET;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!secret || !token) return false;

  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = await expectedSignature(expiresAtRaw, secret);
  return signature === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/lionheart") {
    return NextResponse.next();
  }

  if (await hasValidLionheartSession(request)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = "/lionheart";
  destination.search = "";
  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/lionheart/:path*"],
};
