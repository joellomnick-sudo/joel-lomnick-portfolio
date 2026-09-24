import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LionheartLogin } from "@/components/lionheart/LionheartLogin";
import { LionheartShell } from "@/components/lionheart/LionheartShell";
import {
  LIONHEART_ERROR_COOKIE,
  LIONHEART_SESSION_COOKIE,
  isLionheartConfigured,
  verifyLionheartSessionToken,
} from "@/lib/lionheart-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lionheart Private Story Studio",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function LionheartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const configured = isLionheartConfigured();
  const authorized = configured && verifyLionheartSessionToken(cookieStore.get(LIONHEART_SESSION_COOKIE)?.value);

  if (!authorized) {
    return (
      <LionheartLogin
        configured={configured}
        error={cookieStore.get(LIONHEART_ERROR_COOKIE)?.value}
      />
    );
  }

  return <LionheartShell>{children}</LionheartShell>;
}
