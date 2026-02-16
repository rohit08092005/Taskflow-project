import { TAGS } from "@/lib/constants";
import { TagId } from "@/lib/constants";

interface Props {
  activeTag: TagId | null;
  onToggle: (id: TagId) => void;
}

export default function TagFilter({ activeTag, onToggle }: Props) {
  return (
    <div style={s.row}>
      <span style={s.label}>FILTER</span>
      <div style={s.pills}>
        {TAGS.map((tag) => {
          const active = activeTag === tag.id;
          return (
            <button
              key={tag.id}
              style={{
                ...s.pill,
                borderColor: active ? tag.color : "transparent",
                background:  active ? tag.color + "22" : "#ffffff08",
                color:       active ? tag.color : "#888",
              }}
              onClick={() => onToggle(tag.id)}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  row: {
    display: "flex", alignItems: "center", gap: 12,
    marginBottom: 20,
    position: "relative", zIndex: 1,
  },
  label: {
    fontSize: 9, color: "#444",
    letterSpacing: "0.18em", whiteSpace: "nowrap",
  },
  pills: { display: "flex", flexWrap: "wrap", gap: 6 },
  pill: {
    fontSize: 10,
    padding: "4px 10px",
    border: "1px solid",
    borderRadius: 20,
    cursor: "pointer",
    letterSpacing: "0.08em",
    background: "transparent",
    transition: "all 0.2s",
    fontFamily: "var(--font-body)",
  },
};
