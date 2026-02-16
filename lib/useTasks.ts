
"use client";

import { useState, useEffect, useMemo } from "react";
import { Task, Priority, TagId, SEED_TASKS } from "./constants";
import { uid } from "./utils";

const STORAGE_KEY = "taskflow:tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Task[];
  } catch {}
  return SEED_TASKS;
}

function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

export type ViewMode = "All" | "Active" | "Completed";

export interface FormState {
  title: string;
  priority: Priority;
  tags: TagId[];
  dueDate: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  priority: "medium",
  tags: [],
  dueDate: "",
};

export function useTasks() {
  // Start empty, hydrate from localStorage after mount (avoids SSR mismatch)
  const [tasks,     setTasks]     = useState<Task[]>([]);
  const [hydrated,  setHydrated]  = useState(false);
  const [view,      setView]      = useState<ViewMode>("All");
  const [activeTag, setActiveTag] = useState<TagId | null>(null);
  const [showForm,  setShowForm]  = useState(false);
  const [editId,    setEditId]    = useState<number | null>(null);
  const [form,      setForm]      = useState<FormState>(EMPTY_FORM);

  // ── Hydrate from localStorage once on mount ────────────────────────
  useEffect(() => {
    setTasks(loadTasks());
    setHydrated(true);
  }, []);

  // ── Persist to localStorage on every tasks change ─────────────────
  useEffect(() => {
    if (hydrated) saveTasks(tasks);
  }, [tasks, hydrated]);

  // ── Derived lists ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (view === "Active"    && t.completed)  return false;
      if (view === "Completed" && !t.completed) return false;
      if (activeTag && !t.tags.includes(activeTag)) return false;
      return true;
    });
  }, [tasks, view, activeTag]);

  const counts = useMemo(() => ({
    All:       tasks.length,
    Active:    tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) =>  t.completed).length,
  }), [tasks]);

  const completionPct = tasks.length
    ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
    : 0;

  // ── Actions ────────────────────────────────────────────────────────
  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function openAddForm() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(task: Task) {
    setEditId(task.id);
    setForm({ title: task.title, priority: task.priority, tags: task.tags, dueDate: task.dueDate });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
  }

  function submitForm() {
    if (!form.title.trim()) return;

    if (editId !== null) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t))
      );
    } else {
      const newTask: Task = {
        id: uid(),
        ...form,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setForm(EMPTY_FORM);
    setShowForm(false);
    setEditId(null);
  }

  function toggleFormTag(tagId: TagId) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tagId)
        ? f.tags.filter((t) => t !== tagId)
        : [...f.tags, tagId],
    }));
  }

  function toggleActiveTag(tagId: TagId) {
    setActiveTag((prev) => (prev === tagId ? null : tagId));
  }

  function clearAllTasks() {
    setTasks([]);
  }

  return {
    tasks, filtered, counts, completionPct, hydrated,
    view, setView,
    activeTag, toggleActiveTag,
    showForm, editId,
    form, setForm,
    toggleTask, deleteTask, clearAllTasks,
    openAddForm, openEditForm, closeForm, submitForm, toggleFormTag,
  };
}