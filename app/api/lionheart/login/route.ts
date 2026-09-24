import { NextResponse } from "next/server";
import {
  LIONHEART_ERROR_COOKIE,
  LIONHEART_SESSION_COOKIE,
  createLionheartSessionToken,
  isLionheartConfigured,
  lionheartCookieOptions,
  verifyLionheartAccessKey,
} from "@/lib/lionheart-auth";

export async function POST(request: Request) {
  const destination = new URL("/lionheart", request.url);

  if (!isLionheartConfigured()) {
    const response = NextResponse.redirect(destination, 303);
    response.cookies.set(LIONHEART_ERROR_COOKIE, "unconfigured", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/lionheart",
      maxAge: 60,
    });
    return response;
  }

  const form = await request.formData();
  const accessKey = String(form.get("accessKey") || "");

  if (!verifyLionheartAccessKey(accessKey)) {
    const response = NextResponse.redirect(destination, 303);
    response.cookies.set(LIONHEART_ERROR_COOKIE, "invalid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/lionheart",
      maxAge: 60,
    });
    return response;
  }

  const response = NextResponse.redirect(destination, 303);
  response.cookies.set(LIONHEART_SESSION_COOKIE, createLionheartSessionToken(), lionheartCookieOptions());
  response.cookies.set(LIONHEART_ERROR_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/lionheart",
    maxAge: 0,
  });
  return response;
}
