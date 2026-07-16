export type EngineeringSymbol =
  | "led-grid" | "linear-light" | "switch" | "three-way" | "occupancy" | "daylight" | "dimmer"
  | "receptacle" | "gfci" | "controlled" | "teacher-power" | "display-power" | "floor-box" | "equipment" | "panelboard"
  | "data" | "wap" | "av-plate" | "hdmi" | "usb-a" | "usb-c" | "display-data" | "clock" | "speaker" | "teacher-call" | "audio-control"
  | "fire-speaker" | "fire-horn" | "smoke" | "pull-station" | "security";

type DeviceSymbolProps = {
  kind: EngineeringSymbol;
  label: string;
  className?: string;
  view?: "plan" | "preview";
};

function Receptacle({ variant }: { variant: "standard" | "gfci" | "controlled" | "teacher" | "display" }) {
  return <>
    <path d="M15 32a17 17 0 1 0 34 0 17 17 0 0 0-34 0Z" />
    <path d="M25 24v8M39 24v8M25 41c3-3 11-3 14 0" />
    {variant === "gfci" && <path d="M29 34h6M29 37h6" />}
    {variant === "controlled" && <path d="M14 32h36" />}
    {variant === "teacher" && <path d="M10 14h14M17 9v10" />}
    {variant === "display" && <path d="M40 12h14v10H40zM47 22v5" />}
  </>;
}

export function DeviceSymbol({ kind, label, className = "", view = "plan" }: DeviceSymbolProps) {
  const preview = view === "preview";
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={label} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{label}</title>
      {kind === "led-grid" && <><rect x="8" y="17" width="48" height="30" rx="2" /><path d="M14 23h36M14 32h36M14 41h36M24 17v30M40 17v30" /></>}
      {kind === "linear-light" && <><rect x="7" y="26" width="50" height="12" rx="2" /><path d="M13 32h38" />{preview && <path d="M12 20v-5M52 20v-5M12 44v5M52 44v5" />}</>}
      {kind === "switch" && <><rect x="18" y="10" width="28" height="44" rx="3" /><path d="M32 18v28M26 24l6-6 6 6" /></>}
      {kind === "three-way" && <><rect x="17" y="10" width="30" height="44" rx="3" /><path d="M25 23h14l-14 18h14" /></>}
      {kind === "occupancy" && <><path d="M14 46V18h36v28" /><path d="M22 39a10 10 0 0 1 20 0M26 31a6 6 0 0 1 12 0M30 23a2 2 0 1 1 4 0" /></>}
      {kind === "daylight" && <><circle cx="32" cy="32" r="11" /><path d="M32 7v9M32 48v9M7 32h9M48 32h9M14 14l7 7M43 43l7 7M50 14l-7 7M21 43l-7 7" /></>}
      {kind === "dimmer" && <><rect x="17" y="9" width="30" height="46" rx="3" /><path d="M32 18v28M27 37h10" /><circle cx="32" cy="30" r="4" /></>}
      {kind === "receptacle" && <Receptacle variant="standard" />}
      {kind === "gfci" && <Receptacle variant="gfci" />}
      {kind === "controlled" && <Receptacle variant="controlled" />}
      {kind === "teacher-power" && <Receptacle variant="teacher" />}
      {kind === "display-power" && <Receptacle variant="display" />}
      {kind === "floor-box" && <><rect x="11" y="11" width="42" height="42" rx="4" /><circle cx="32" cy="32" r="12" /><path d="M26 28v7M38 28v7" /></>}
      {kind === "equipment" && <><path d="M10 45h44M14 45V19h36v26" /><path d="M22 37l7-12 7 9 5-6" /></>}
      {kind === "panelboard" && <><rect x="14" y="7" width="36" height="50" rx="2" /><path d="M22 16h20M22 24h8M34 24h8M22 32h8M34 32h8M22 40h8M34 40h8M32 48h10" /></>}
      {kind === "data" && <><rect x="14" y="14" width="36" height="36" rx="3" /><path d="M21 23h22v14H21zM26 37v7M32 37v7M38 37v7" /></>}
      {kind === "wap" && <><path d="M13 38a27 27 0 0 1 38 0M20 45a17 17 0 0 1 24 0M28 52a6 6 0 0 1 8 0" /><path d="M11 14h42v12H11z" /></>}
      {kind === "av-plate" && <><rect x="10" y="15" width="44" height="34" rx="3" /><path d="M17 23h12v10H17zM35 23h12M35 29h12M17 41h30" /></>}
      {kind === "hdmi" && <><path d="M10 24h44l-6 20H16l-6-20Z" /><path d="M20 30v7M26 30v7M32 30v7M38 30v7M44 30v7" /></>}
      {kind === "usb-a" && <><rect x="11" y="20" width="42" height="24" rx="3" /><path d="M18 26h28v12H18zM24 29h5v6h-5M35 29h5v6h-5" /></>}
      {kind === "usb-c" && <><rect x="9" y="21" width="46" height="22" rx="11" /><path d="M21 27h22v10H21z" /></>}
      {kind === "display-data" && <><rect x="8" y="10" width="48" height="34" rx="2" /><path d="M24 54h16M32 44v10M17 21h30v13H17z" /></>}
      {kind === "clock" && <><circle cx="32" cy="32" r="22" /><path d="M32 17v16l10 6" /></>}
      {kind === "speaker" && <><circle cx="32" cy="32" r="23" /><circle cx="32" cy="32" r="11" /><path d="M18 18l28 28M46 18L18 46" /></>}
      {kind === "teacher-call" && <><rect x="14" y="10" width="36" height="44" rx="4" /><path d="M23 24h18M23 32h18M23 40h10" /><circle cx="43" cy="42" r="4" /></>}
      {kind === "audio-control" && <><rect x="10" y="12" width="44" height="40" rx="3" /><path d="M18 23h28M18 32h28M18 41h28" /><circle cx="25" cy="23" r="3" /><circle cx="39" cy="32" r="3" /><circle cx="30" cy="41" r="3" /></>}
      {kind === "fire-speaker" && <><rect x="11" y="15" width="42" height="34" rx="3" /><path d="M18 22h28M18 42l8-13 6 9 5-7 9 11" /><path d="M6 25v14M58 25v14" /></>}
      {kind === "fire-horn" && <><path d="M12 38h10l24 12V14L22 26H12v12Z" /><path d="M52 23c5 5 5 13 0 18" /></>}
      {kind === "smoke" && <><circle cx="32" cy="32" r="21" /><circle cx="32" cy="32" r="12" /><path d="M25 35c4 4 10 4 14 0M24 27h16" /></>}
      {kind === "pull-station" && <><rect x="14" y="8" width="36" height="48" rx="3" /><path d="M21 18h22v13H21zM24 47l8-12 8 12" /></>}
      {kind === "security" && <><path d="M32 7l20 9v14c0 12-8 21-20 27C20 51 12 42 12 30V16l20-9Z" /><path d="M24 32l6 6 11-13" /></>}
    </svg>
  );
}
