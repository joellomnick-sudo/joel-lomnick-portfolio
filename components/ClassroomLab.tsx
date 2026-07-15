"use client";

import { Check, Eye, EyeOff, Lightbulb, RotateCcw, Trash2, Undo2 } from "lucide-react";
import { useMemo, useState } from "react";

type Division = "26" | "27" | "28";
type Device = { id: string; label: string; short: string; division: Division; layer: string; note: string };
type Placement = Device & { placementId: number; x: number; y: number };

const devices: Device[] = [
  { id: "light", label: "Light fixture", short: "L", division: "26", layer: "26", note: "Even illumination supports instruction and screen viewing." },
  { id: "switch", label: "Manual light control", short: "S", division: "26", layer: "26", note: "Place the primary lighting control near the main entrance." },
  { id: "occupancy", label: "Occupancy or vacancy sensor", short: "OS", division: "26", layer: "26", note: "Room sensing can support controls and energy requirements." },
  { id: "daylight", label: "Daylight sensor", short: "DS", division: "26", layer: "26", note: "Daylight response coordinates with windows, zoning, and energy requirements." },
  { id: "receptacle", label: "General receptacle", short: "R", division: "26", layer: "26", note: "General-use branch-circuit power belongs on the power system." },
  { id: "gfci", label: "GFCI receptacle", short: "G", division: "26", layer: "26", note: "A receptacle near the sink may require GFCI protection and plumbing coordination." },
  { id: "teacher-power", label: "Teacher-station power", short: "TP", division: "26", layer: "26", note: "Coordinate teacher power with furniture and AV needs." },
  { id: "display-power", label: "Interactive-display power", short: "DP", division: "26", layer: "26", note: "The teaching wall needs coordinated power and data, kept as distinct systems." },
  { id: "controlled", label: "Controlled receptacle", short: "CR", division: "26", layer: "26", note: "Controlled receptacles must be identified and coordinated with the control sequence." },
  { id: "panel", label: "Branch panel", short: "P", division: "26", layer: "26", note: "A branch panel usually serves several rooms and is normally outside the classroom." },
  { id: "data", label: "Data outlet", short: "D", division: "27", layer: "27", note: "Data cabling routes to an IDF or system headend, not an ordinary classroom branch circuit." },
  { id: "wireless", label: "Wireless access-point outlet", short: "AP", division: "27", layer: "27", note: "The WAP connects to the communications system and IDF, not directly to a classroom panel." },
  { id: "av-plate", label: "Teacher AV/data plate", short: "AV", division: "27", layer: "27", note: "Coordinate AV and data at the teaching position while keeping pathways distinct from power." },
  { id: "hdmi", label: "HDMI connection", short: "H", division: "27", layer: "27", note: "A wired presentation connection may support dependable classroom instruction." },
  { id: "usb-a", label: "USB-A connection", short: "UA", division: "27", layer: "27", note: "Confirm the current teaching equipment before selecting connection types." },
  { id: "usb-c", label: "USB-C connection", short: "UC", division: "27", layer: "27", note: "USB-C can support modern devices but requires equipment and distance coordination." },
  { id: "clock", label: "Digital clock", short: "C", division: "27", layer: "27", note: "Clock systems may be networked or connected to a central system." },
  { id: "speaker", label: "Classroom speaker", short: "SP", division: "27", layer: "27", note: "Distributed sound should support clear, intelligible program audio." },
  { id: "intercom", label: "Intercom or call button", short: "IC", division: "27", layer: "27", note: "Main-office communication needs a coordinated system connection and accessible location." },
  { id: "fire-alarm", label: "Fire-alarm speaker/strobe", short: "FA", division: "28", layer: "28", note: "Fire-alarm notification belongs to a supervised fire-alarm system." },
  { id: "detector", label: "Conditional detector", short: "SD", division: "28", layer: "28", note: "Detector need and type are conditional; verify code, system design, and the authority having jurisdiction." },
  { id: "security", label: "Security/access interface", short: "SEC", division: "28", layer: "28", note: "Use only when the school security plan requires it and coordinate with door hardware and egress." },
];

const initial: Placement[] = [];
const layerLabels: Record<string, string> = { "26": "Division 26", "27": "Division 27", "28": "Division 28" };

export function ClassroomLab() {
  const [selected, setSelected] = useState<Device>(devices[0]);
  const [placements, setPlacements] = useState<Placement[]>(initial);
  const [history, setHistory] = useState<Placement[][]>([]);
  const [layers, setLayers] = useState<Record<string, boolean>>({ "26": true, "27": true, "28": true });
  const [feedback, setFeedback] = useState("Choose a device, then place it on the classroom plan.");
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const visible = useMemo(() => placements.filter((item) => layers[item.layer]), [placements, layers]);
  const save = (next: Placement[]) => { setHistory((items) => [...items.slice(-19), placements]); setPlacements(next); };
  const place = (x: number, y: number) => { save([...placements, { ...selected, placementId: Date.now() + Math.random(), x, y }]); setFeedback(`${selected.label} placed. ${selected.note}`); };

  function onBoardPointer(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    place(Math.max(3, Math.min(97, ((event.clientX - rect.left) / rect.width) * 100)), Math.max(4, Math.min(96, ((event.clientY - rect.top) / rect.height) * 100)));
  }

  function onBoardKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const amount = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") { event.preventDefault(); setCursor((item) => ({ ...item, x: Math.max(3, item.x - amount) })); }
    if (event.key === "ArrowRight") { event.preventDefault(); setCursor((item) => ({ ...item, x: Math.min(97, item.x + amount) })); }
    if (event.key === "ArrowUp") { event.preventDefault(); setCursor((item) => ({ ...item, y: Math.max(4, item.y - amount) })); }
    if (event.key === "ArrowDown") { event.preventDefault(); setCursor((item) => ({ ...item, y: Math.min(96, item.y + amount) })); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); place(cursor.x, cursor.y); }
  }

  function checkDesign() {
    const ids = new Set(placements.map((item) => item.id));
    const messages = [
      !ids.has("av-plate") ? "The teaching wall needs coordinated power and data." : "Teacher AV and data are represented.",
      !ids.has("data") && !ids.has("wireless") ? "Add network connectivity." : "Technology connectivity is represented.",
      !ids.has("fire-alarm") ? "Add fire alarm notification for a complete concept." : "Life-safety notification is represented.",
      !ids.has("light") ? "Add classroom lighting." : "Lighting is represented.",
    ];
    setFeedback(messages.join(" "));
  }

  function suggest() {
    const suggestions: Placement[] = [
      { ...devices[0], placementId: Date.now() + 1, x: 28, y: 28 }, { ...devices[0], placementId: Date.now() + 2, x: 72, y: 28 },
      { ...devices[12], placementId: Date.now() + 3, x: 50, y: 8 }, { ...devices[10], placementId: Date.now() + 4, x: 45, y: 13 },
      { ...devices[19], placementId: Date.now() + 5, x: 92, y: 12 }, { ...devices[4], placementId: Date.now() + 6, x: 12, y: 78 },
    ];
    save(suggestions); setFeedback("A starter concept has been placed. Adjust it for teaching position, accessibility, pathways, and local code requirements.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border border-deepBrown/20 bg-warmIvory p-4" aria-label="Device library">
        <h2 className="subsection-title">Device library</h2>
        {["26", "27", "28"].map((division) => <section key={division} className="mt-5"><h3 className="text-sm font-black uppercase text-mutedBrown">Division {division}</h3><div className="mt-2 grid gap-2">{devices.filter((item) => item.division === division).map((device) => <button key={device.id} type="button" aria-pressed={selected.id === device.id} onClick={() => { setSelected(device); setFeedback(`${device.label} selected. ${device.note}`); }} className="min-h-12 rounded-md border border-deepBrown/20 px-3 py-2 text-left text-base font-bold aria-pressed:border-emerald aria-pressed:bg-emerald aria-pressed:text-white focus-ring">{device.short} <span className="ml-2 font-normal">{device.label}</span></button>)}</div></section>)}
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap gap-2 border border-deepBrown/20 bg-warmIvory p-3" aria-label="Classroom lab toolbar">
          <button type="button" className="lab-tool" onClick={() => { const last = history.at(-1); if (last) { setPlacements(last); setHistory((items) => items.slice(0, -1)); setFeedback("Last change undone."); } }} disabled={!history.length}><Undo2 size={18} />Undo</button>
          <button type="button" className="lab-tool" onClick={() => { save([]); setFeedback("All placed devices were removed."); }}><Trash2 size={18} />Clear</button>
          <button type="button" className="lab-tool" onClick={() => { save(placements.filter((item) => item.division !== selected.division)); setFeedback(`Division ${selected.division} was cleared.`); }}><Trash2 size={18} />Clear Division {selected.division}</button>
          <button type="button" className="lab-tool" onClick={() => { setHistory([]); setPlacements(initial); setCursor({ x: 50, y: 50 }); setFeedback("The lab was reset."); }}><RotateCcw size={18} />Reset</button>
          <button type="button" className="lab-tool" onClick={checkDesign}><Check size={18} />Check design</button>
          <button type="button" className="lab-tool" onClick={suggest}><Lightbulb size={18} />Suggest layout</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="Layer visibility">{Object.entries(layers).map(([layer, shown]) => <button key={layer} type="button" className="inline-flex min-h-11 items-center gap-2 text-base font-bold focus-ring" aria-pressed={shown} onClick={() => setLayers((items) => ({ ...items, [layer]: !shown }))}>{shown ? <Eye size={18} /> : <EyeOff size={18} />}{layerLabels[layer]}</button>)}</div>

        <p className="mt-4 text-sm leading-6 text-mutedBrown xl:hidden">For the best placement experience, scroll the plan horizontally or return on a wider screen. All controls remain available below the plan.</p>
        <div className="mt-3 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="overflow-auto border border-deepBrown/25 bg-white p-3">
          <div role="application" aria-label="Interactive classroom plan. Use arrow keys to move the placement cursor and Enter to place the selected device." tabIndex={0} onKeyDown={onBoardKey} onPointerDown={onBoardPointer} className="classroom-plan relative mx-auto min-w-[600px] max-w-none cursor-crosshair overflow-hidden border-2 border-deepBrown bg-paper focus-ring" data-testid="classroom-plan">
            <div className="absolute left-[7%] top-[5%] h-[8%] w-[86%] border-2 border-deepBrown bg-warmIvory text-center text-sm font-bold">TEACHING WALL / DISPLAY ZONE</div>
            <div className="absolute bottom-[8%] left-[4%] h-[19%] w-[18%] border border-mutedBrown/50 bg-parchment p-2 text-center text-xs font-bold">INSTRUCTOR</div>
            <div className="absolute bottom-[5%] right-[28%] h-[16%] w-[19%] border border-mutedBrown/50 bg-parchment p-2 text-center text-xs font-bold">SINK + CABINETRY</div>
            <div className="absolute right-[3%] top-[25%] h-[40%] w-[3%] border-y-2 border-deepBrown bg-emerald/20" title="Windows" />
            <div className="absolute left-0 top-[30%] h-[16%] w-[6%] -translate-x-1/3 border border-deepBrown bg-warmIvory text-center text-[9px] font-bold">PANEL OUTSIDE</div>
            {[0,1,2].flatMap((row) => [0,1,2,3].map((column) => <div key={`${row}-${column}`} className="absolute h-[10%] w-[13%] border border-mutedBrown/40 bg-warmIvory" style={{ left: `${28 + column * 16}%`, top: `${31 + row * 18}%` }} />))}
            <div className="absolute bottom-0 right-[9%] h-[5%] w-[13%] border-x-2 border-t-2 border-deepBrown bg-white text-center text-[10px] font-bold">DOOR</div>
            <span className="pointer-events-none absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-burgundy bg-white" style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} aria-hidden="true" />
            {visible.map((item) => <button key={item.placementId} type="button" className={`device-marker layer-${item.layer}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} title={`${item.label}: ${item.note}`} aria-label={`Remove ${item.label}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => { save(placements.filter((placed) => placed.placementId !== item.placementId)); setFeedback(`${item.label} removed.`); }}>{item.short}</button>)}
          </div>
        </div>
        <aside className="border-l-4 border-mutedGold bg-warmIvory p-4 xl:sticky xl:top-4"><div role="status" aria-live="polite"><p className="font-bold">Design feedback</p><p className="mt-1 text-base leading-7 text-mutedBrown">{feedback}</p></div><p className="mt-5 text-sm leading-6 text-mutedBrown">This activity is an educational demonstration. It is not a construction document, code-compliance review, or substitute for a licensed design professional.</p></aside>
        </div>
      </div>
    </div>
  );
}
