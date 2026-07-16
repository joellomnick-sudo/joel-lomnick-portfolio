"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { badgeDescriptions, nextRankForXP, rankForXP } from "@/data/engineering101/badges";
import { engineeringQuests, questById, type XPCategory } from "@/data/engineering101/quests";

export type ExperienceMode = "landing" | "guided" | "free" | "qc" | "compare";

export type QuestProgress = {
  completedQuestIds: number[];
  xpByCategory: Record<XPCategory, number>;
  badges: string[];
  currentMode: ExperienceMode;
  lastOpenQuest: number;
  hintUsage: number;
};

const storageKey = "lomnickpro-engineering-101-progress-v1";

const emptyXP: Record<XPCategory, number> = {
  Exploration: 0,
  Systems: 0,
  Coordination: 0,
  Communication: 0,
  "Quality Control": 0,
};

const initialProgress: QuestProgress = {
  completedQuestIds: [],
  xpByCategory: emptyXP,
  badges: [],
  currentMode: "landing",
  lastOpenQuest: 1,
  hintUsage: 0,
};

function readProgress(): QuestProgress {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return initialProgress;
    const value = JSON.parse(raw) as Partial<QuestProgress>;
    const completedQuestIds = Array.isArray(value.completedQuestIds)
      ? value.completedQuestIds.filter((id): id is number => Number.isInteger(id) && id >= 1 && id <= engineeringQuests.length)
      : [];
    const badges = Array.isArray(value.badges) ? value.badges.filter((badge): badge is string => typeof badge === "string" && badge in badgeDescriptions) : [];
    const currentMode: ExperienceMode = ["landing", "guided", "free", "qc", "compare"].includes(value.currentMode ?? "") ? value.currentMode as ExperienceMode : "landing";
    return {
      completedQuestIds: [...new Set(completedQuestIds)].sort((a, b) => a - b),
      xpByCategory: { ...emptyXP, ...value.xpByCategory },
      badges: [...new Set(badges)],
      currentMode,
      lastOpenQuest: Number.isInteger(value.lastOpenQuest) ? Math.max(1, Math.min(engineeringQuests.length, value.lastOpenQuest as number)) : 1,
      hintUsage: Number.isFinite(value.hintUsage) ? Math.max(0, value.hintUsage as number) : 0,
    };
  } catch {
    return initialProgress;
  }
}

export function useQuestProgress() {
  const [progress, setProgress] = useState<QuestProgress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string>("");

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
    setLastSavedAt(new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()));
  }, [hydrated, progress]);

  const totalXP = useMemo(() => Object.values(progress.xpByCategory).reduce((sum, value) => sum + value, 0), [progress.xpByCategory]);
  const currentRank = rankForXP(totalXP);
  const nextRank = nextRankForXP(totalXP);
  const nextQuest = engineeringQuests.find((quest) => !progress.completedQuestIds.includes(quest.id));
  const progressPercent = Math.round((progress.completedQuestIds.length / engineeringQuests.length) * 100);

  const setMode = useCallback((currentMode: ExperienceMode) => {
    setProgress((current) => ({ ...current, currentMode }));
  }, []);

  const openQuest = useCallback((lastOpenQuest: number) => {
    setProgress((current) => ({ ...current, lastOpenQuest }));
  }, []);

  const completeQuest = useCallback((questId: number) => {
    setProgress((current) => {
      if (current.completedQuestIds.includes(questId)) return current;
      const firstIncomplete = engineeringQuests.find((quest) => !current.completedQuestIds.includes(quest.id));
      if (!firstIncomplete || firstIncomplete.id !== questId) return current;
      const quest = questById.get(questId);
      if (!quest) return current;
      const badges = quest.badge && !current.badges.includes(quest.badge) ? [...current.badges, quest.badge] : current.badges;
      return {
        ...current,
        completedQuestIds: [...current.completedQuestIds, questId].sort((a, b) => a - b),
        xpByCategory: { ...current.xpByCategory, [quest.xpCategory]: current.xpByCategory[quest.xpCategory] + quest.xp },
        badges,
        lastOpenQuest: Math.min(engineeringQuests.length, questId + 1),
        currentMode: "guided",
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setProgress({ ...initialProgress, xpByCategory: { ...emptyXP } });
  }, []);

  return {
    progress,
    hydrated,
    lastSavedAt,
    totalXP,
    currentRank,
    nextRank,
    nextQuest,
    progressPercent,
    setMode,
    openQuest,
    completeQuest,
    resetProgress,
  };
}
