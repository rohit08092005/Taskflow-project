import { ViewMode } from "@/lib/useTasks";

interface Props {
  counts: Record<ViewMode, number>;
  activeView: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const VIEWS: ViewMode[] = ["All", "Active", "Completed"];

export default function StatsBar({ counts, activeView, onViewChange }: Props) {
  return (
    <div style={s.bar}>
      {VIEWS.map((v) => (
        <button
          key={v}
          style={{
            ...s.chip,
            ...(activeView === v ? s.chipActive : {}),
          }}
          onClick={() => onViewChange(v)}
        >
          <span style={s.count}>{counts[v]}</span>
          <span style={s.label}>{v}</span>
        </button>
      ))}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  bar: {
    display: "flex", gap: 10, marginBottom: 20,
    position: "relative", zIndex: 1,
  },
  chip: {
    flex: 1,
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "12px 8px",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  chipActive: {
    background: "#FFD60A10",
    borderColor: "#FFD60A44",
  },
  count: {
    fontFamily: "var(--font-display)",
    fontSize: 24, fontWeight: 800,
    color: "#fff", lineHeight: 1,
  },
  label: {
    fontSize: 9, color: "var(--muted)",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    marginTop: 4,
  },
};
