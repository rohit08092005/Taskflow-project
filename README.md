# ⬡ TaskFlow

A bold, modern task management dashboard built with **Next.js 14** and **TypeScript**.

## Features

- ✅ Add, edit, complete, and delete tasks
- 🎯 Three priority levels — High, Medium, Low — with colour-coded indicators
- 📅 Due dates with smart labels (Today / Tomorrow / Xd left / Xd overdue)
- 🏷️ Six task tags — Work, Personal, Health, Finance, Learning, Home
- 🔍 Filter tasks by tag or by status (All / Active / Completed)
- 📊 Live progress bar showing overall completion %
- 🎨 Bold dark UI with animated cards and grid background

## Project Structure

```
taskflow/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Main page — wires all components together
│   └── globals.css       # Global styles, CSS variables, animations
├── components/
│   ├── Header.tsx        # Logo + progress bar
│   ├── StatsBar.tsx      # All / Active / Completed stat chips
│   ├── TagFilter.tsx     # Tag filter pill row
│   ├── TaskForm.tsx      # Add / Edit task form (inline)
│   ├── TaskList.tsx      # Renders list or empty state
│   └── TaskCard.tsx      # Individual task row
├── lib/
│   ├── constants.ts      # PRIORITIES, TAGS, Task type, seed data
│   ├── utils.ts          # formatDueDate, dueDateColor helpers
│   └── useTasks.ts       # All task state logic (custom hook)
├── package.json
├── next.config.js
└── tsconfig.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Vercel auto-detects Next.js and deploys instantly.
# Taskflow-project
