import { Task, PRIORITIES, TAGS } from "@/lib/constants";
import { formatDueDate, dueDateColor } from "@/lib/utils";

interface Props {
  task: Task;
  index: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit:   (task: Task) => void;
}

export default function TaskCard({ task, index, onToggle, onDelete, onEdit }: Props) {
  const p   = PRIORITIES[task.priority];
  const due = task.dueDate ? formatDueDate(task.dueDate) : null;
  const dueStyle = due ? dueDateColor(due) : {};

  return (
    <div
      className="animate-slide-in"
      style={{
        ...s.card,
        animationDelay: `${index * 55}ms`,
        opacity: task.completed ? 0.52 : 1,
        borderLeft: `3px solid ${p.color}`,
      }}
    >
      {/* Checkbox */}
      <button
        style={{
          ...s.checkbox,
          borderColor: task.completed ? p.color : "#333",
          background:  task.completed ? p.color : "transparent",
        }}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && <span style={s.checkmark}>✓</span>}
      </button>

      {/* Body */}
      <div style={s.body}>
        {/* Top row: title + priority badge */}
        <div style={s.topRow}>
          <span
            style={{
              ...s.title,
              textDecoration: task.completed ? "line-through" : "none",
              color:          task.completed ? "#555" : "var(--text)",
            }}
          >
            {task.title}
          </span>
          <span style={{ ...s.priorityBadge, color: p.color, background: p.bg }}>
            {p.icon} {p.label}
          </span>
        </div>

        {/* Meta row: tags + due date */}
        <div style={s.meta}>
          {task.tags.map((tagId) => {
            const tag = TAGS.find((t) => t.id === tagId);
            if (!tag) return null;
            return (
              <span
                key={tagId}
                style={{ ...s.tag, color: tag.color, background: tag.color + "18" }}
              >
                {tag.label}
              </span>
            );
          })}

          {due && (
            <span style={{ ...s.dueChip, ...dueStyle }}>
              ◷ {due.label}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button style={s.actionBtn}                         onClick={() => onEdit(task)}   title="Edit">✎</button>
        <button style={{ ...s.actionBtn, color: "#FF3B3B" }} onClick={() => onDelete(task.id)} title="Delete">✕</button>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  card: {
    display: "flex", alignItems: "flex-start", gap: 14,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "16px 16px 16px 14px",
    transition: "background 0.2s, border-color 0.2s",
  },
  checkbox: {
    width: 22, height: 22,
    borderRadius: 6, border: "1.5px solid",
    background: "transparent", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, marginTop: 1,
    transition: "all 0.2s",
  },
  checkmark: { color: "#0a0a0a", fontSize: 12, fontWeight: 700, lineHeight: 1 },
  body:   { flex: 1, minWidth: 0 },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 },
  title: {
    fontSize: 13, letterSpacing: "0.02em",
    lineHeight: 1.4, flex: 1,
    transition: "color 0.2s",
  },
  priorityBadge: {
    fontSize: 9, padding: "3px 8px", borderRadius: 20,
    letterSpacing: "0.1em", whiteSpace: "nowrap" as const,
    flexShrink: 0, fontWeight: 500,
  },
  meta: { display: "flex", flexWrap: "wrap" as const, gap: 6, alignItems: "center" },
  tag:  { fontSize: 9, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.1em" },
  dueChip: { fontSize: 9, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.06em" },
  actions:   { display: "flex", gap: 4, flexShrink: 0 },
  actionBtn: {
    background: "transparent", border: "none",
    color: "#444", fontSize: 14, cursor: "pointer",
    padding: "4px 6px", borderRadius: 6,
    transition: "color 0.2s, background 0.2s",
  },
};
