"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SavedReading = {
  href: string;
  title: string;
  volume: number;
  chapter: number;
  years?: string;
};

const fallback: SavedReading = {
  href: "/lionheart/volume-one/1",
  title: "The First Blueprint",
  volume: 1,
  chapter: 1,
  years: "1981–1988",
};

export function ContinueReading() {
  const [saved, setSaved] = useState<SavedReading>(fallback);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lionheart:last-read");
      if (raw) setSaved(JSON.parse(raw) as SavedReading);
    } catch {
      setSaved(fallback);
    }
  }, []);

  return (
    <Link href={saved.href} className="lionheart-continue-card">
      <p className="lionheart-kicker">Continue reading</p>
      <h2>{saved.title}</h2>
      <p>
        Volume {saved.volume} · Chapter {saved.chapter}
        {saved.years ? ` · ${saved.years}` : ""}
      </p>
      <span>Return to chapter →</span>
    </Link>
  );
}
