"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectBoard } from "@/components/project-board"
import { TeamView } from "@/components/team-view"
import { OverviewStats } from "@/components/overview-stats"
import type { Task } from "@/lib/types"
import { initialTasks } from "@/lib/data"
import { loadTasks, saveTasks } from "@/lib/storage"

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedTasks = loadTasks()
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks)
    } else {
      setTasks(initialTasks)
      saveTasks(initialTasks)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && tasks.length > 0) {
      saveTasks(tasks)
    }
  }, [tasks, isLoaded])

  const completedTasks = tasks.filter((task) => task.status === "done").length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
            Project Management Board
          </h1>
          <p className="text-slate-400 mt-1">
            Track your team's progress and manage tasks efficiently By Kavya Trivedi
          </p>
        </div>
      </div>

      <Tabs defaultValue="board">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="bg-slate-800/50">
            <TabsTrigger value="overview" className="text-white data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="board" className="text-white data-[state=active]:text-black">
              Board
            </TabsTrigger>
            <TabsTrigger value="team" className="text-white data-[state=active]:text-black">
              Team
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="text-sm text-slate-400">Project Progress:</div>
            <div className="flex-1 sm:w-32 md:w-48 flex items-center gap-2">
              <Progress value={completionRate} className="h-2 bg-slate-700 flex-1" />
              <span className="text-sm font-medium text-white whitespace-nowrap">{completionRate}%</span>
            </div>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0">
          <OverviewStats tasks={tasks} />
        </TabsContent>

        <TabsContent value="board" className="mt-0">
          <ProjectBoard
            tasks={tasks}
            setTasks={setTasks}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </TabsContent>

        <TabsContent value="team" className="mt-0">
          <TeamView tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
