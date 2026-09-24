import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const LIONHEART_SESSION_COOKIE = "lionheart_session";
export const LIONHEART_ERROR_COOKIE = "lionheart_login_error";

const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(sha256(left), sha256(right));
}

function sessionSecret() {
  return process.env.LIONHEART_SESSION_SECRET || "";
}

export function isLionheartConfigured() {
  return Boolean(process.env.LIONHEART_ACCESS_KEY && sessionSecret());
}

export function verifyLionheartAccessKey(candidate: string) {
  const expected = process.env.LIONHEART_ACCESS_KEY || "";
  if (!expected || !candidate) return false;
  return safeEqual(candidate, expected);
}

export function createLionheartSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", sessionSecret()).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyLionheartSessionToken(token?: string) {
  if (!token || !isLionheartConfigured()) return false;

  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = createHmac("sha256", sessionSecret()).update(expiresAtRaw).digest("hex");
  return safeEqual(signature, expected);
}

export function lionheartCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/lionheart",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}
