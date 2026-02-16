import { Task } from "@/lib/constants";
import TaskCard from "./TaskCard";

interface Props {
  tasks:    Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit:   (task: Task) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
  if (tasks.length === 0) {
    return (
      <div style={s.empty}>
        <span style={s.emptyIcon}>◎</span>
        <p style={s.emptyTitle}>No tasks here</p>
        <p style={s.emptyHint}>Add one above or clear your filter</p>
      </div>
    );
  }

  return (
    <div style={s.list}>
      {tasks.map((task, i) => (
        <TaskCard
          key={task.id}
          task={task}
          index={i}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  list: {
    display: "flex", flexDirection: "column", gap: 10,
    position: "relative", zIndex: 1,
  },
  empty: {
    textAlign: "center", padding: "64px 20px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 8,
    position: "relative", zIndex: 1,
  },
  emptyIcon:  { fontSize: 36, color: "#222" },
  emptyTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 16, color: "#333", fontWeight: 700,
  },
  emptyHint: { fontSize: 11, color: "#2a2a2a", letterSpacing: "0.1em" },
};
