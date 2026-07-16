"use client";

import { BookOpen, ChevronRight, Compass, Grid3X3, Save, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { DeviceSymbol } from "@/components/engineering101/DeviceSymbol";
import { deviceCounts, engineeringDevices, type Division } from "@/data/engineering101/devices";
import { guidePath, stageOverview } from "@/data/engineering101/foundation";

type ExperienceMode = "landing" | "guided" | "free";

const disclaimer = "Educational concept only. Actual device requirements, locations, ratings, pathways, responsibilities, and testing vary by adopted codes, owner standards, project specifications, equipment, and the Authority Having Jurisdiction.";

export function EngineeringQuestShell() {
  const [mode, setMode] = useState<ExperienceMode>("landing");
  const [activeStage, setActiveStage] = useState(1);
  const [deviceFilter, setDeviceFilter] = useState<Division | "all">("all");
  const [selectedDeviceId, setSelectedDeviceId] = useState(engineeringDevices[0].id);
  const filteredDevices = useMemo(() => engineeringDevices.filter((device) => deviceFilter === "all" || device.division === deviceFilter), [deviceFilter]);
  const selectedDevice = engineeringDevices.find((device) => device.id === selectedDeviceId) ?? engineeringDevices[0];

  return (
    <div className="quest-experience">
      <section className="quest-landing" aria-labelledby="quest-title">
        <div className="quest-landing-copy">
          <p className="quest-kicker">Engineering 101</p>
          <h1 id="quest-title">Classroom Design Quest</h1>
          <p className="quest-subtitle">Learn the map. Build the systems. Explain the design.</p>
          <p className="quest-intro">A modern classroom may look simple after it is finished, but lighting, power, communications, life safety, controls, furniture, casework, plumbing, HVAC, and technology all had to find their place. This guided experience lets you learn those systems one step at a time.</p>
          <div className="quest-actions">
            <button type="button" className="quest-primary-action" onClick={() => setMode("guided")}>
              <Compass aria-hidden="true" /> Start Guided Journey
            </button>
            <button type="button" className="quest-secondary-action" onClick={() => setMode("free")}>
              <Grid3X3 aria-hidden="true" /> Enter Free Build
            </button>
            <a className="quest-secondary-action" href={guidePath} target="_blank" rel="noreferrer">
              <BookOpen aria-hidden="true" /> Open the Engineering 101 Guide
            </a>
          </div>
        </div>

        <aside className="quest-status" aria-label="Journey status">
          <div className="quest-rank-mark" aria-hidden="true"><Sparkles /></div>
          <p className="quest-status-label">Current rank</p>
          <p className="quest-rank">Curious Beginner</p>
          <div className="quest-progress-label"><span>Journey progress</span><strong>0 / 20</strong></div>
          <div className="quest-progress-track" role="progressbar" aria-label="Journey progress" aria-valuemin={0} aria-valuemax={20} aria-valuenow={0}><span /></div>
          <p className="quest-save"><Save aria-hidden="true" /> Ready to begin. Progress saves on this device.</p>
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
            {stageOverview.map((stage) => (
              <li key={stage.number}>
                <button type="button" className="quest-stage-button" aria-current={activeStage === stage.number ? "step" : undefined} onClick={() => setActiveStage(stage.number)}>
                  <span className="quest-stage-number">{stage.number}</span>
                  <span><strong>{stage.title}</strong><small>{stage.range}</small></span>
                  <ChevronRight aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="quest-canvas-panel">
          <div className="quest-canvas-header">
            <div><p className="quest-panel-kicker">Stage {activeStage}</p><h2>{stageOverview[activeStage - 1].title}</h2></div>
            <span className="quest-mode-label">{mode === "guided" ? "Guided Journey" : mode === "free" ? "Free Build Preview" : "Map Preview"}</span>
          </div>
          <div className="quest-blueprint" aria-label="Classroom plan preview">
            <svg viewBox="0 0 760 460" role="img" aria-labelledby="blueprint-title blueprint-description">
              <title id="blueprint-title">Classroom plan preview</title>
              <desc id="blueprint-description">A drafting-style classroom with a teaching wall, windows, door swing, furniture, teacher station, and casework.</desc>
              <path className="plan-wall" d="M54 44H706V416H54V44Z" />
              <path className="plan-wall" d="M54 112H706M128 44V112" />
              <path className="plan-window" d="M706 136v62M706 218v62" />
              <path className="plan-door" d="M602 416v-72M602 344a72 72 0 0 1 72 72" />
              <rect className="plan-object" x="235" y="64" width="290" height="28" />
              <rect className="plan-object" x="90" y="294" width="120" height="74" />
              <rect className="plan-object" x="490" y="315" width="92" height="62" />
              {[0, 1, 2].flatMap((row) => [0, 1, 2, 3].map((column) => (
                <rect key={`${row}-${column}`} className="plan-furniture" x={244 + column * 78} y={160 + row * 58} width="48" height="26" />
              )))}
              <text x="380" y="84" textAnchor="middle">TEACHING WALL</text>
              <text x="150" y="336" textAnchor="middle">TEACHER</text>
              <text x="536" y="350" textAnchor="middle">SINK</text>
              <text x="78" y="78">ROOM 101</text>
              <path className="plan-north" d="M92 182v-42M92 140l-10 18M92 140l10 18" />
              <text x="92" y="131" textAnchor="middle">N</text>
            </svg>
            <p className="quest-blueprint-caption">Start by reading the room. Device placement unlocks after the plan-reading foundation.</p>
          </div>

          <section className="device-toolkit" aria-labelledby="device-library-heading">
            <div className="device-toolkit-heading">
              <div><p className="quest-panel-kicker">Device toolkit</p><h2 id="device-library-heading">Learn the symbol. Trace the system.</h2></div>
              <p>{engineeringDevices.length} educational devices</p>
            </div>
            <div className="device-filter" aria-label="Filter device library">
              <button type="button" aria-pressed={deviceFilter === "all"} onClick={() => setDeviceFilter("all")}>All <span>{engineeringDevices.length}</span></button>
              {(["26", "27", "28"] as const).map((division) => (
                <button key={division} type="button" aria-pressed={deviceFilter === division} onClick={() => setDeviceFilter(division)}>Division {division} <span>{deviceCounts[division]}</span></button>
              ))}
            </div>
            <div className="device-library-grid" aria-live="polite">
              {filteredDevices.map((device) => (
                <div key={device.id} className="device-library-item" data-testid="device-library-item">
                  <button
                    type="button"
                    className={`device-library-button device-color-${device.systemColor}`}
                    aria-pressed={selectedDevice.id === device.id}
                    aria-describedby={`device-tooltip-${device.id}`}
                    onClick={() => setSelectedDeviceId(device.id)}
                  >
                    <DeviceSymbol kind={device.previewSymbol} view="preview" label={`${device.name} device preview`} />
                    <span><strong>{device.name}</strong><small>Division {device.division} · {device.category}</small></span>
                    {device.conditional && <em>Conditional</em>}
                  </button>
                  <span id={`device-tooltip-${device.id}`} role="tooltip" className="device-tooltip">{device.description}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="quest-mentor-panel" aria-label="Mentor and device information">
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
            <h3>Coordinate with</h3>
            <ul>{selectedDevice.coordinatesWith.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Verify for the project</h3>
            <ul>{selectedDevice.verifyItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <div className="mentor-note">
            <p className="quest-panel-kicker">Mentor note</p>
            <h2>Read before you place.</h2>
            <blockquote>&ldquo;You do not need to memorize the industry. You need to know what to verify.&rdquo;</blockquote>
            <p>Begin with the walls, door swing, teaching wall, windows, casework, and furniture. The room gives every system a set of questions.</p>
            <div className="quest-next-step">
              <span>Next available quest</span>
              <strong>1. Joel&apos;s Engineering-Learning Testimony</strong>
              <p>Start with what you know, what feels unfamiliar, and what you want to learn.</p>
              <a href={`${guidePath}#page=3`} target="_blank" rel="noreferrer">Open related guide section <ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
