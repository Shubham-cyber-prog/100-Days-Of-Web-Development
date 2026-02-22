"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import type { Task } from "@/lib/types"
import { TaskCard } from "@/components/task-card"

interface TaskColumnProps {
  title: string
  status: string
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

export function TaskColumn({ title, status, tasks, onEditTask, onDeleteTask }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${status}`,
  })

  return (
    <div
      ref={setNodeRef}
      className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border-2 transition-all ${
        isOver ? "border-violet-500 shadow-lg shadow-violet-500/20" : "border-slate-700"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              status === "todo" ? "bg-blue-400" : status === "in-progress" ? "bg-amber-400" : "bg-green-400"
            }`}
          ></div>
          <h2 className="font-bold text-lg text-white">{title}</h2>
        </div>
        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">{tasks.length}</span>
      </div>

      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}

          {tasks.length === 0 && (
            <div className="h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-500 text-sm">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
