"use client"

import { CheckCircle2, Clock, ListTodo, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { loadTeamMembers } from "@/lib/storage"
import { useEffect, useState } from "react"

interface OverviewStatsProps {
  tasks: Task[]
}

export function OverviewStats({ tasks }: OverviewStatsProps) {
  const [teamMembers, setTeamMembers] = useState<Record<string, string>>({})

  useEffect(() => {
    const members = loadTeamMembers()
    if (members && members.length > 0) {
      const memberMap = members.reduce(
        (acc, member) => {
          acc[member.name] = member.avatar
          return acc
        },
        {} as Record<string, string>,
      )
      setTeamMembers(memberMap)
    }
  }, [])

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const todoTasks = tasks.filter((task) => task.status === "todo").length

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate overdue tasks
  const overdueTasks = tasks.filter((task) => task.status !== "done" && new Date(task.deadline) < new Date()).length

  // Calculate assignee distribution
  const assignees = tasks.reduce(
    (acc, task) => {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const assigneeData = Object.entries(assignees)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-slate-800/50 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">Total Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalTasks}</div>
          <p className="text-xs text-slate-400">{completionRate}% completion rate</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">In Progress</CardTitle>
          <Loader2 className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{inProgressTasks}</div>
          <p className="text-xs text-slate-400">
            {Math.round((inProgressTasks / totalTasks) * 100) || 0}% of all tasks
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{completedTasks}</div>
          <p className="text-xs text-slate-400">{Math.round((completedTasks / totalTasks) * 100) || 0}% of all tasks</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">Overdue</CardTitle>
          <Clock className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{overdueTasks}</div>
          <p className="text-xs text-slate-400">{Math.round((overdueTasks / totalTasks) * 100) || 0}% of all tasks</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-4 bg-slate-800/50 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-white">Team Workload</CardTitle>
          <CardDescription className="text-slate-400">Number of tasks assigned to each team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assigneeData.map((assignee) => (
              <div key={assignee.name} className="flex items-center">
                <Avatar className="w-9 h-9 mr-3 border border-slate-600">
                  <AvatarImage src={teamMembers[assignee.name] || "/placeholder.svg"} alt={assignee.name} />
                  <AvatarFallback className="bg-slate-700 text-white">{getInitials(assignee.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{assignee.name}</p>
                  <div className="flex items-center text-xs text-slate-400">
                    <div className="w-full bg-slate-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full"
                        style={{ width: `${(assignee.count / totalTasks) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-400">{assignee.count} tasks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
