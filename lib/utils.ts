// ─── Due-date helper ─────────────────────────────────────────────────
export interface DueInfo {
  label: string;
  overdue?: boolean;
  today?: boolean;
  soon?: boolean;
  future?: boolean;
}

export function formatDueDate(dateStr: string): DueInfo | null {
  if (!dateStr) return null;

  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((date.getTime() - today.getTime()) / 86_400_000);

  if (diff < 0)  return { label: `${Math.abs(diff)}d overdue`, overdue: true };
  if (diff === 0) return { label: "Today",    today: true };
  if (diff === 1) return { label: "Tomorrow", soon: true };
  if (diff <= 7)  return { label: `${diff}d left`, soon: true };

  return {
    label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    future: true,
  };
}

// ─── Due-date colour helper ──────────────────────────────────────────
export function dueDateColor(due: DueInfo) {
  if (due.overdue) return { color: "#FF3B3B", background: "#FF3B3B18" };
  if (due.today)   return { color: "#FF9500", background: "#FF950018" };
  if (due.soon)    return { color: "#FFD60A", background: "#FFD60A12" };
  return            { color: "#555",    background: "#ffffff08" };
}

// ─── Unique ID ───────────────────────────────────────────────────────
export const uid = () => Date.now() + Math.random();
