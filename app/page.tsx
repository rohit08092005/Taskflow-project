"use client";

import { useTasks } from "@/lib/useTasks";
import Header       from "@/components/Header";
import StatsBar     from "@/components/StatsBar";
import TagFilter    from "@/components/TagFilter";
import TaskForm     from "@/components/TaskForm";
import TaskList     from "@/components/TaskList";

export default function HomePage() {
  const ctx = useTasks();

  return (
    <main style={layout.main}>
      {/* grid background */}
      <div style={layout.grid} />

      <Header completionPct={ctx.completionPct} />

      <StatsBar
        counts={ctx.counts}
        activeView={ctx.view}
        onViewChange={ctx.setView}
      />

      <TagFilter
        activeTag={ctx.activeTag}
        onToggle={ctx.toggleActiveTag}
      />

      <TaskForm
        show={ctx.showForm}
        editId={ctx.editId}
        form={ctx.form}
        setForm={ctx.setForm}
        onSubmit={ctx.submitForm}
        onClose={ctx.closeForm}
        onToggleTag={ctx.toggleFormTag}
        onOpenAdd={ctx.openAddForm}
      />

      <TaskList
        tasks={ctx.filtered}
        onToggle={ctx.toggleTask}
        onDelete={ctx.deleteTask}
        onEdit={ctx.openEditForm}
      />

      <footer style={layout.footer}>
        TASKFLOW · {new Date().getFullYear()}
      </footer>
    </main>
  );
}

const layout = {
  main: {
    position: "relative" as const,
    maxWidth: 720,
    margin: "0 auto",
    padding: "32px 24px 80px",
    minHeight: "100vh",
    overflowX: "hidden" as const,
  },
  grid: {
    position: "fixed" as const,
    inset: 0,
    backgroundImage:
      "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    opacity: 0.4,
    pointerEvents: "none" as const,
    zIndex: 0,
  },
  footer: {
    textAlign: "center" as const,
    marginTop: 48,
    fontSize: 9,
    color: "#2a2a2a",
    letterSpacing: "0.2em",
    position: "relative" as const,
    zIndex: 1,
  },
};
