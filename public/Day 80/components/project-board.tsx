"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { PlusCircle, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskColumn } from "@/components/task-column"
import { TaskModal } from "@/components/task-modal"
import type { Task, TaskStatus } from "@/lib/types"

interface ProjectBoardProps {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

export function ProjectBoard({ tasks, setTasks, addTask, updateTask, deleteTask }: ProjectBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterTag, setFilterTag] = useState<string>("all")

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // If dropping on a column
    if (overId.startsWith("column-")) {
      const newStatus = overId.replace("column-", "") as TaskStatus
      const taskIndex = tasks.findIndex((task) => task.id === activeId)

      if (taskIndex !== -1) {
        const updatedTasks = [...tasks]
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: newStatus }
        setTasks(updatedTasks)
      }
    }
  }

  const openAddTaskModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesTag = filterTag === "all" || (task.tags && task.tags.includes(filterTag))

    return matchesSearch && matchesPriority && matchesTag
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search tasks, assignees..."
            className="pl-8 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white focus:text-white focus:bg-slate-700">
                  All Priorities
                </SelectItem>
                <SelectItem value="low" className="text-white focus:text-white focus:bg-slate-700">
                  Low
                </SelectItem>
                <SelectItem value="medium" className="text-white focus:text-white focus:bg-slate-700">
                  Medium
                </SelectItem>
                <SelectItem value="high" className="text-white focus:text-white focus:bg-slate-700">
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white focus:text-white focus:bg-slate-700">
                  All Tags
                </SelectItem>
                <SelectItem value="bug" className="text-white focus:text-white focus:bg-slate-700">
                  Bug
                </SelectItem>
                <SelectItem value="feature" className="text-white focus:text-white focus:bg-slate-700">
                  Feature
                </SelectItem>
                <SelectItem value="design" className="text-white focus:text-white focus:bg-slate-700">
                  Design
                </SelectItem>
                <SelectItem value="documentation" className="text-white focus:text-white focus:bg-slate-700">
                  Documentation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={openAddTaskModal}
            className="ml-auto md:ml-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={filteredTasks.filter((task) => task.status === "todo")}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            status="in-progress"
            tasks={filteredTasks.filter((task) => task.status === "in-progress")}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={filteredTasks.filter((task) => task.status === "done")}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
          />
        </div>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(task) => {
          if (editingTask) {
            updateTask({ ...task, id: editingTask.id })
          } else {
            addTask(task)
          }
          setIsModalOpen(false)
        }}
        task={editingTask}
      />
    </div>
  )
}
