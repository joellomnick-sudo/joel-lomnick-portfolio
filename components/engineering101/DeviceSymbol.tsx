export type FoundationSymbol = "light" | "receptacle" | "data" | "fire-alarm";

type DeviceSymbolProps = {
  kind: FoundationSymbol;
  label: string;
  className?: string;
};

export function DeviceSymbol({ kind, label, className = "" }: DeviceSymbolProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      {kind === "light" && (
        <>
          <rect x="9" y="18" width="46" height="28" rx="2" />
          <path d="M14 23h36M14 32h36M14 41h36M24 18v28M40 18v28" />
        </>
      )}
      {kind === "receptacle" && (
        <>
          <path d="M15 32a17 17 0 1 0 34 0 17 17 0 0 0-34 0Z" />
          <path d="M25 24v8M39 24v8M25 41c3-3 11-3 14 0" />
        </>
      )}
      {kind === "data" && (
        <>
          <rect x="14" y="15" width="36" height="34" rx="3" />
          <path d="M22 24h20v12H22zM27 36v7M32 36v7M37 36v7" />
        </>
      )}
      {kind === "fire-alarm" && (
        <>
          <rect x="13" y="17" width="38" height="30" rx="3" />
          <path d="M19 23h26M20 41l7-12 5 8 4-6 8 10" />
          <path d="M8 26v12M56 26v12" />
        </>
      )}
    </svg>
  );
}
