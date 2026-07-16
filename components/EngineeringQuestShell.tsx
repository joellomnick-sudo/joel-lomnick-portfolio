"use client";

import { Award, BookOpen, Check, ChevronRight, Compass, Grid3X3, LockKeyhole, RotateCcw, Save, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ClassroomCanvas } from "@/components/engineering101/ClassroomCanvas";
import { DeviceSymbol } from "@/components/engineering101/DeviceSymbol";
import { useQuestProgress, type ExperienceMode } from "@/components/engineering101/useQuestProgress";
import { badgeDescriptions } from "@/data/engineering101/badges";
import { deviceCounts, engineeringDevices, type Division } from "@/data/engineering101/devices";
import { guidePath, stageOverview } from "@/data/engineering101/foundation";
import { categoryTotals, engineeringQuests, questById } from "@/data/engineering101/quests";

const disclaimer = "Educational concept only. Actual device requirements, locations, ratings, pathways, responsibilities, and testing vary by adopted codes, owner standards, project specifications, equipment, and the Authority Having Jurisdiction.";

export function EngineeringQuestShell() {
  const questProgress = useQuestProgress();
  const { progress } = questProgress;
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [activeQuestId, setActiveQuestId] = useState(1);
  const [deviceFilter, setDeviceFilter] = useState<Division | "all">("all");
  const [selectedDeviceId, setSelectedDeviceId] = useState(engineeringDevices[0].id);
  const [announcement, setAnnouncement] = useState("Choose a quest to review its learning goal.");

  useEffect(() => {
    if (!questProgress.hydrated) return;
    const quest = questById.get(progress.lastOpenQuest) ?? engineeringQuests[0];
    setActiveQuestId(quest.id);
    setActiveStage(quest.stage);
  }, [progress.lastOpenQuest, questProgress.hydrated]);

  const filteredDevices = useMemo(() => engineeringDevices.filter((device) => deviceFilter === "all" || device.division === deviceFilter), [deviceFilter]);
  const selectedDevice = engineeringDevices.find((device) => device.id === selectedDeviceId) ?? engineeringDevices[0];
  const activeQuest = questById.get(activeQuestId) ?? engineeringQuests[0];
  const stageQuests = engineeringQuests.filter((quest) => quest.stage === activeStage);
  const nextQuestId = questProgress.nextQuest?.id ?? engineeringQuests.length + 1;
  const lastCompletedQuest = [...engineeringQuests].reverse().find((quest) => progress.completedQuestIds.includes(quest.id));

  function changeMode(mode: ExperienceMode) {
    questProgress.setMode(mode);
    if (mode === "guided") {
      const quest = questProgress.nextQuest ?? engineeringQuests[engineeringQuests.length - 1];
      setActiveQuestId(quest.id);
      setActiveStage(quest.stage);
      questProgress.openQuest(quest.id);
      setAnnouncement(`Guided Journey opened at Quest ${quest.id}: ${quest.title}.`);
    } else if (mode === "free") {
      setAnnouncement("Free Build preview opened. All educational device references are available.");
    }
  }

  function openQuest(questId: number) {
    const quest = questById.get(questId);
    if (!quest || quest.id > nextQuestId) return;
    setActiveQuestId(quest.id);
    setActiveStage(quest.stage);
    questProgress.openQuest(quest.id);
    setAnnouncement(`Quest ${quest.id} opened: ${quest.title}.`);
  }

  function completeActiveQuest() {
    if (activeQuest.id !== nextQuestId) return;
    questProgress.completeQuest(activeQuest.id);
    const next = questById.get(activeQuest.id + 1);
    setAnnouncement(next ? `${activeQuest.title} complete. Quest ${next.id} is now available.` : `${activeQuest.title} complete. The full learning journey is complete.`);
  }

  function resetProgress() {
    if (!window.confirm("Reset all Engineering 101 quest progress saved on this device?")) return;
    questProgress.resetProgress();
    setActiveQuestId(1);
    setActiveStage(1);
    setAnnouncement("Progress reset. Quest 1 is ready when you are.");
  }

  const modeLabel = progress.currentMode === "guided" ? "Guided Journey" : progress.currentMode === "free" ? "Free Build" : "Map Preview";

  return (
    <div className="quest-experience">
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      <section className="quest-landing" aria-labelledby="quest-title">
        <div className="quest-landing-copy">
          <p className="quest-kicker">Engineering 101</p>
          <h1 id="quest-title">Classroom Design Quest</h1>
          <p className="quest-subtitle">Learn the map. Build the systems. Explain the design.</p>
          <p className="quest-intro">A modern classroom may look simple after it is finished, but lighting, power, communications, life safety, controls, furniture, casework, plumbing, HVAC, and technology all had to find their place. This guided experience lets you learn those systems one step at a time.</p>
          <div className="quest-actions">
            <button type="button" className="quest-primary-action" onClick={() => changeMode("guided")}>
              <Compass aria-hidden="true" /> {progress.completedQuestIds.length ? "Continue Journey" : "Start Guided Journey"}
            </button>
            <button type="button" className="quest-secondary-action" onClick={() => changeMode("free")}>
              <Grid3X3 aria-hidden="true" /> Enter Free Build
            </button>
            <a className="quest-secondary-action" href={guidePath} target="_blank" rel="noopener noreferrer">
              <BookOpen aria-hidden="true" /> Open the Engineering 101 Guide
            </a>
          </div>
        </div>

        <aside className="quest-status" aria-label="Journey status">
          <div className="quest-rank-mark" aria-hidden="true"><Sparkles /></div>
          <p className="quest-status-label">Current rank</p>
          <p className="quest-rank">{questProgress.currentRank.name}</p>
          <div className="quest-progress-label"><span>Journey progress</span><strong>{progress.completedQuestIds.length} / {engineeringQuests.length}</strong></div>
          <div className="quest-progress-track" role="progressbar" aria-label="Journey progress" aria-valuemin={0} aria-valuemax={engineeringQuests.length} aria-valuenow={progress.completedQuestIds.length}><span style={{ width: `${Math.max(2, questProgress.progressPercent)}%` }} /></div>
          <p className="quest-save"><Save aria-hidden="true" /> {questProgress.hydrated ? `Saved locally${questProgress.lastSavedAt ? ` at ${questProgress.lastSavedAt}` : ""}.` : "Checking saved progress..."}</p>
          <p className="quest-last-completed">{lastCompletedQuest ? `Last completed: Quest ${lastCompletedQuest.id}` : "No completed quests yet."}</p>
        </aside>
      </section>

      <p className="quest-disclaimer"><strong>Educational checkpoint:</strong> {disclaimer}</p>

      <section className="quest-workspace" aria-label="Classroom Design Quest workspace">
        <aside className="quest-map-panel" aria-labelledby="quest-map-heading">
          <div className="quest-panel-heading">
            <p className="quest-panel-kicker">Quest map</p>
            <h2 id="quest-map-heading">Five stages. One method.</h2>
          </div>
          <ol className="quest-stage-list">
            {stageOverview.map((stage) => {
              const stageDone = engineeringQuests.filter((quest) => quest.stage === stage.number && progress.completedQuestIds.includes(quest.id)).length;
              return <li key={stage.number}>
                <button type="button" className="quest-stage-button" aria-current={activeStage === stage.number ? "step" : undefined} onClick={() => setActiveStage(stage.number)}>
                  <span className="quest-stage-number">{stage.number}</span>
                  <span><strong>{stage.title}</strong><small>{stageDone} / 4 complete</small></span>
                  <ChevronRight aria-hidden="true" />
                </button>
              </li>;
            })}
          </ol>

          <ol className="quest-list" aria-label={`Stage ${activeStage} quests`}>
            {stageQuests.map((quest) => {
              const completed = progress.completedQuestIds.includes(quest.id);
              const locked = quest.id > nextQuestId;
              return <li key={quest.id}>
                <button type="button" className="quest-list-button" aria-current={activeQuest.id === quest.id ? "step" : undefined} aria-disabled={locked} onClick={() => openQuest(quest.id)}>
                  <span>{completed ? <Check aria-label="Completed" /> : locked ? <LockKeyhole aria-label="Locked" /> : quest.id}</span>
                  <span><strong>{quest.title}</strong><small>Guide page {quest.guidePage} · {quest.xp} XP</small></span>
                </button>
              </li>;
            })}
          </ol>

          <div className="quest-growth" aria-label="Experience point growth">
            <div className="quest-growth-heading"><h3>Skill growth</h3><strong>{questProgress.totalXP} XP</strong></div>
            {Object.entries(progress.xpByCategory).map(([category, value]) => (
              <div key={category} className="quest-growth-row">
                <span>{category}</span><strong>{value}</strong>
                <div><span style={{ width: `${Math.round((value / categoryTotals[category as keyof typeof categoryTotals]) * 100)}%` }} /></div>
              </div>
            ))}
            <p>{questProgress.nextRank ? `${questProgress.nextRank.minimumXP - questProgress.totalXP} XP to ${questProgress.nextRank.name}` : "Highest educational rank reached"}</p>
          </div>

          <div className="quest-badges" aria-label="Earned educational badges">
            <h3>Milestone badges</h3>
            {progress.badges.length ? progress.badges.map((badge) => <div key={badge} title={badgeDescriptions[badge]}><Award aria-hidden="true" /><span>{badge}</span></div>) : <p>Complete milestone quests to reveal badges.</p>}
          </div>
          <button type="button" className="quest-reset" onClick={resetProgress}><RotateCcw aria-hidden="true" /> Reset progress</button>
        </aside>

        <div className="quest-canvas-panel">
          <div className="quest-canvas-header">
            <div><p className="quest-panel-kicker">Stage {activeStage}</p><h2>{stageOverview[activeStage - 1].title}</h2></div>
            <span className="quest-mode-label">{modeLabel}</span>
          </div>
          <ClassroomCanvas
            selectedDevice={selectedDevice}
            placementEnabled={progress.currentMode === "free" || selectedDevice.unlockQuest <= nextQuestId}
            onDeviceSelected={setSelectedDeviceId}
            onStatus={setAnnouncement}
          />

          <section className="device-toolkit" aria-labelledby="device-library-heading">
            <div className="device-toolkit-heading">
              <div><p className="quest-panel-kicker">Device toolkit</p><h2 id="device-library-heading">Learn the symbol. Trace the system.</h2></div>
              <p>{engineeringDevices.length} educational devices</p>
            </div>
            <div className="device-filter" aria-label="Filter device library">
              <button type="button" aria-pressed={deviceFilter === "all"} onClick={() => setDeviceFilter("all")}>All <span>{engineeringDevices.length}</span></button>
              {(["26", "27", "28"] as const).map((division) => <button key={division} type="button" aria-pressed={deviceFilter === division} onClick={() => setDeviceFilter(division)}>Division {division} <span>{deviceCounts[division]}</span></button>)}
            </div>
            <div className="device-library-grid" aria-live="polite">
              {filteredDevices.map((device) => {
                const locked = progress.currentMode !== "free" && device.unlockQuest > nextQuestId;
                return <div key={device.id} className="device-library-item" data-testid="device-library-item">
                  <button
                    type="button"
                    className={`device-library-button device-color-${device.systemColor}`}
                    aria-pressed={!locked && selectedDevice.id === device.id}
                    aria-disabled={locked}
                    aria-describedby={`device-tooltip-${device.id}`}
                    data-locked={locked || undefined}
                    draggable={!locked}
                    onDragStart={(event) => {
                      setSelectedDeviceId(device.id);
                      event.dataTransfer.setData("application/x-engineering-device", device.id);
                      event.dataTransfer.setData("text/plain", `device:${device.id}`);
                      event.dataTransfer.effectAllowed = "copy";
                    }}
                    onClick={() => { if (!locked) setSelectedDeviceId(device.id); }}
                  >
                    <DeviceSymbol kind={device.previewSymbol} view="preview" label={`${device.name} device preview`} />
                    <span><strong>{device.name}</strong><small>Division {device.division} · {device.category}</small></span>
                    {(locked || device.conditional) && <em>{locked ? `Unlocks at Quest ${device.unlockQuest}` : "Conditional"}</em>}
                  </button>
                  <span id={`device-tooltip-${device.id}`} role="tooltip" className="device-tooltip">{locked ? `Locked until Quest ${device.unlockQuest}. ` : ""}{device.description}</span>
                </div>;
              })}
            </div>
          </section>
        </div>

        <aside className="quest-mentor-panel" aria-label="Mentor, quest, and device information">
          <section className="quest-detail" aria-labelledby="active-quest-title">
            <p className="quest-panel-kicker">Quest {activeQuest.id} · Guide page {activeQuest.guidePage}</p>
            <h2 id="active-quest-title">{activeQuest.title}</h2>
            <p>{activeQuest.objective}</p>
            <h3>Learning activity</h3>
            <p>{activeQuest.activity}</p>
            <h3>Unlock</h3>
            <p>{activeQuest.unlock}</p>
            <blockquote>&ldquo;{progress.completedQuestIds.includes(activeQuest.id) ? activeQuest.mentorCompletion : activeQuest.mentorIntro}&rdquo;</blockquote>
            <a href={`${guidePath}#page=${activeQuest.guidePage}`} target="_blank" rel="noopener noreferrer"><BookOpen aria-hidden="true" /> Open related guide section</a>
            {progress.completedQuestIds.includes(activeQuest.id) ? <p className="quest-complete-label"><Check aria-hidden="true" /> Educational checkpoint complete</p> : activeQuest.id === nextQuestId ? <button type="button" className="quest-complete-button" onClick={completeActiveQuest}>Complete learning checkpoint <ChevronRight aria-hidden="true" /></button> : <p className="quest-locked-label"><LockKeyhole aria-hidden="true" /> Complete the earlier quests to unlock this one.</p>}
          </section>

          <section className={`device-information device-color-${selectedDevice.systemColor}`} aria-live="polite">
            <p className="quest-panel-kicker">Selected device</p>
            <div className="device-information-title">
              <DeviceSymbol kind={selectedDevice.planSymbol} label={`${selectedDevice.name} plan symbol`} />
              <div><h2>{selectedDevice.name}</h2><p>Division {selectedDevice.division} · {selectedDevice.category}</p></div>
            </div>
            {selectedDevice.conditional && <p className="device-conditional">Use only when required by the project, system design, and governing criteria.</p>}
            <p>{selectedDevice.description}</p>
            <dl>
              <div><dt>Typical surface</dt><dd>{selectedDevice.defaultMountingSurface}</dd></div>
              <div><dt>Served from</dt><dd>{selectedDevice.sourceType}</dd></div>
              <div><dt>Pathway</dt><dd>{selectedDevice.pathwayType}</dd></div>
            </dl>
            <h3>Coordinate with</h3><ul>{selectedDevice.coordinatesWith.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Verify for the project</h3><ul>{selectedDevice.verifyItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </aside>
      </section>
    </div>
  );
}
