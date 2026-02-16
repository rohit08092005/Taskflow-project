// ─── Priority config ────────────────────────────────────────────────
export const PRIORITIES = {
  high:   { label: "High",   color: "#FF3B3B", bg: "#FF3B3B18", icon: "▲" },
  medium: { label: "Medium", color: "#FF9500", bg: "#FF950018", icon: "●" },
  low:    { label: "Low",    color: "#34C759", bg: "#34C75918", icon: "▼" },
} as const;

export type Priority = keyof typeof PRIORITIES;

// ─── Tag config ──────────────────────────────────────────────────────
export const TAGS = [
  { id: "work",     label: "Work",     color: "#0A84FF" },
  { id: "personal", label: "Personal", color: "#BF5AF2" },
  { id: "health",   label: "Health",   color: "#34C759" },
  { id: "finance",  label: "Finance",  color: "#FF9500" },
  { id: "learning", label: "Learning", color: "#FF2D55" },
  { id: "home",     label: "Home",     color: "#5AC8FA" },
] as const;

export type TagId = (typeof TAGS)[number]["id"];

// ─── Task type ───────────────────────────────────────────────────────
export interface Task {
  id: number;
  title: string;
  priority: Priority;
  tags: TagId[];
  dueDate: string;   // "YYYY-MM-DD" or ""
  completed: boolean;
  createdAt: number; // epoch ms
}

// ─── Sample seed data ────────────────────────────────────────────────
export const SEED_TASKS: Task[] = [
  {
    id: 1,
    title: "Review Q1 product roadmap",
    priority: "high",
    tags: ["work"],
    dueDate: "2026-02-18",
    completed: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: 2,
    title: "30-minute morning run",
    priority: "medium",
    tags: ["health", "personal"],
    dueDate: "2026-02-16",
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 3,
    title: "Finish reading Atomic Habits",
    priority: "low",
    tags: ["learning"],
    dueDate: "2026-02-28",
    completed: true,
    createdAt: Date.now() - 172800000,
  },
];
