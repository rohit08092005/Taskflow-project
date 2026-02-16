interface Props {
  completionPct: number;
}

export default function Header({ completionPct }: Props) {
  return (
    <header className="animate-fade-in" style={s.header}>
      {/* Logo */}
      <div style={s.left}>
        <div style={s.logoBox}>
          <span style={s.logoIcon}>⬡</span>
        </div>
        <div>
          <h1 style={s.title}>TASKFLOW</h1>
          <p style={s.subtitle}>Command your day</p>
        </div>
      </div>

      {/* Progress */}
      <div style={s.right}>
        <div style={s.pctRow}>
          <span style={s.pct}>{completionPct}%</span>
          <span style={s.pctLabel}>complete</span>
        </div>
        <div style={s.track}>
          <div style={{ ...s.fill, width: `${completionPct}%` }} />
        </div>
      </div>
    </header>
  );
}

const s: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
    position: "relative",
    zIndex: 1,
  },
  left: { display: "flex", alignItems: "center", gap: 14 },
  logoBox: {
    width: 44, height: 44,
    background: "linear-gradient(135deg, #FFD60A, #FF9500)",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 0 24px #FFD60A44",
  },
  logoIcon: { fontSize: 22, color: "#0a0a0a" },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: "#fff",
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 10,
    color: "var(--muted)",
    letterSpacing: "0.15em",
    marginTop: 3,
    textTransform: "uppercase",
  },
  right: { textAlign: "right" },
  pctRow: {
    display: "flex", alignItems: "baseline",
    gap: 5, justifyContent: "flex-end", marginBottom: 7,
  },
  pct: {
    fontFamily: "var(--font-display)",
    fontSize: 26, fontWeight: 800, color: "var(--gold)",
  },
  pctLabel: { fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" },
  track: {
    width: 120, height: 4,
    background: "#1e1e1e",
    borderRadius: 2, overflow: "hidden",
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #FFD60A, #FF9500)",
    borderRadius: 2,
    transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
  },
};
