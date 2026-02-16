import { PRIORITIES, TAGS, TagId } from "@/lib/constants";
import { FormState } from "@/lib/useTasks";

interface Props {
  show: boolean;
  editId: number | null;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
  onClose: () => void;
  onToggleTag: (id: TagId) => void;
  onOpenAdd: () => void;
}

export default function TaskForm({
  show, editId, form, setForm,
  onSubmit, onClose, onToggleTag, onOpenAdd,
}: Props) {
  if (!show) {
    return (
      <button style={s.addBtn} onClick={onOpenAdd}>
        <span style={s.plus}>+</span> New Task
      </button>
    );
  }

  return (
    <div className="animate-slide-in" style={s.card}>
      {/* Header row */}
      <div style={s.cardHeader}>
        <span style={s.cardTitle}>{editId !== null ? "Edit Task" : "New Task"}</span>
        <button style={s.closeBtn} onClick={onClose}>✕</button>
      </div>

      {/* Title input */}
      <input
        style={s.input}
        placeholder="What needs to be done?"
        value={form.title}
        autoFocus
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />

      {/* Priority + Due date row */}
      <div style={s.row}>
        {/* Priority */}
        <div style={s.group}>
          <label style={s.groupLabel}>PRIORITY</label>
          <div style={s.priorityBtns}>
            {(Object.entries(PRIORITIES) as [keyof typeof PRIORITIES, (typeof PRIORITIES)[keyof typeof PRIORITIES]][]).map(([key, p]) => (
              <button
                key={key}
                style={{
                  ...s.priorityBtn,
                  background:  form.priority === key ? p.bg    : "transparent",
                  borderColor: form.priority === key ? p.color : "#333",
                  color:       form.priority === key ? p.color : "#555",
                }}
                onClick={() => setForm((f) => ({ ...f, priority: key }))}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div style={s.group}>
          <label style={s.groupLabel}>DUE DATE</label>
          <input
            type="date"
            style={s.dateInput}
            value={form.dueDate}
            onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Tags */}
      <div style={s.group}>
        <label style={s.groupLabel}>TAGS</label>
        <div style={s.pills}>
          {TAGS.map((tag) => {
            const active = form.tags.includes(tag.id);
            return (
              <button
                key={tag.id}
                style={{
                  ...s.pill,
                  borderColor: active ? tag.color : "#333",
                  background:  active ? tag.color + "22" : "transparent",
                  color:       active ? tag.color : "#555",
                }}
                onClick={() => onToggleTag(tag.id)}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
        <button
          style={{ ...s.submitBtn, opacity: form.title.trim() ? 1 : 0.4 }}
          onClick={onSubmit}
        >
          {editId !== null ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  addBtn: {
    width: "100%", padding: "14px 20px",
    background: "transparent",
    border: "1px dashed #2e2e2e",
    borderRadius: 12,
    color: "#555", fontSize: 13,
    cursor: "pointer", letterSpacing: "0.05em",
    marginBottom: 20,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    position: "relative", zIndex: 1,
    transition: "border-color 0.2s, color 0.2s",
  },
  plus: { fontSize: 18, color: "var(--gold)", lineHeight: 1 },
  card: {
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 16, padding: 24,
    marginBottom: 20,
    position: "relative", zIndex: 1,
  },
  cardHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 14, fontWeight: 700,
    letterSpacing: "0.1em", color: "#fff",
  },
  closeBtn: {
    background: "transparent", border: "none",
    color: "#444", fontSize: 14, cursor: "pointer",
    padding: "2px 6px",
  },
  input: {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8, padding: "12px 14px",
    color: "var(--text)", fontSize: 13,
    marginBottom: 16, outline: "none",
    letterSpacing: "0.03em",
    transition: "border-color 0.2s",
  },
  row: { display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" as const },
  group: { display: "flex", flexDirection: "column" as const, gap: 8, flex: 1, minWidth: 160 },
  groupLabel: { fontSize: 9, color: "#444", letterSpacing: "0.18em" },
  priorityBtns: { display: "flex", gap: 6 },
  priorityBtn: {
    flex: 1, padding: "8px 6px",
    border: "1px solid",
    borderRadius: 8, fontSize: 10,
    cursor: "pointer", letterSpacing: "0.06em",
    transition: "all 0.15s", whiteSpace: "nowrap" as const,
  },
  dateInput: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8, padding: "9px 12px",
    color: "#888", fontSize: 12, outline: "none",
    width: "100%",
  },
  pills: { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  pill: {
    fontSize: 10, padding: "4px 10px",
    border: "1px solid", borderRadius: 20,
    cursor: "pointer", letterSpacing: "0.08em",
    transition: "all 0.2s",
  },
  actions: {
    display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20,
  },
  cancelBtn: {
    padding: "10px 18px",
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: 8, color: "#555",
    fontSize: 12, cursor: "pointer",
    letterSpacing: "0.05em",
  },
  submitBtn: {
    padding: "10px 20px",
    background: "var(--gold)",
    border: "none", borderRadius: 8,
    color: "#0a0a0a", fontSize: 12,
    fontWeight: 500, cursor: "pointer",
    letterSpacing: "0.08em",
    transition: "opacity 0.2s",
  },
};
