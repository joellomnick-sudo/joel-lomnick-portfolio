import { NextResponse } from "next/server";
import { LIONHEART_SESSION_COOKIE } from "@/lib/lionheart-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/lionheart", request.url), 303);
  response.cookies.set(LIONHEART_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/lionheart",
    maxAge: 0,
  });
  return response;
}
