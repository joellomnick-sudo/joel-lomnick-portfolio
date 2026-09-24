import type { ReactNode } from "react";
import { LionheartNav } from "@/components/lionheart/LionheartNav";

export function LionheartShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="lionheart-studio-header">
        <div className="site-container py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="lionheart-kicker">Private Story Studio</p>
              <p className="mt-1 font-serif text-3xl font-bold">Lionheart</p>
              <p className="mt-1 text-sm opacity-70">The Joel Lomnick Story</p>
            </div>
            <form action="/api/lionheart/logout" method="post">
              <button type="submit" className="lionheart-lock-button">Lock studio</button>
            </form>
          </div>
          <LionheartNav />
        </div>
      </header>
      {children}
    </div>
  );
}
