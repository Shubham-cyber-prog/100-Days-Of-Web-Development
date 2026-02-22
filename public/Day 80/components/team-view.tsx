"use client"

import { useState, useEffect } from "react"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useForm } from "react-hook-form"
import type { Task } from "@/lib/types"
import { loadTeamMembers, saveTeamMembers, type TeamMember } from "@/lib/storage"

const DEFAULT_AVATAR = "/images/img-20251219-wa0001.jpg"

interface TeamViewProps {
  tasks: Task[]
}

export function TeamView({ tasks }: TeamViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const form = useForm<{ name: string; avatar: string }>({
    defaultValues: {
      name: "",
      avatar: "",
    },
  })

  useEffect(() => {
    const storedMembers = loadTeamMembers()
    if (storedMembers && storedMembers.length > 0) {
      setTeamMembers(storedMembers)
    } else {
      const extractedMembers = extractTeamMembers(tasks)
      setTeamMembers(extractedMembers)
      saveTeamMembers(extractedMembers)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && teamMembers.length > 0) {
      saveTeamMembers(teamMembers)
    }
  }, [teamMembers, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      const updatedMembers = teamMembers.map((member) => {
        const memberTasks = tasks.filter((task) => task.assignee === member.name)
        const completedTasks = memberTasks.filter((task) => task.status === "done").length
        const totalTasks = memberTasks.length
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

        const overdueTasks = memberTasks.filter(
          (task) => task.status !== "done" && new Date(task.deadline) < new Date(),
        ).length

        const highPriorityTasks = memberTasks.filter((task) => task.priority === "high").length
        const mediumPriorityTasks = memberTasks.filter((task) => task.priority === "medium").length
        const lowPriorityTasks = memberTasks.filter((task) => task.priority === "low").length

        return {
          ...member,
          totalTasks,
          completedTasks,
          inProgressTasks: memberTasks.filter((task) => task.status === "in-progress").length,
          todoTasks: memberTasks.filter((task) => task.status === "todo").length,
          completionRate,
          overdueTasks,
          highPriorityTasks,
          mediumPriorityTasks,
          lowPriorityTasks,
        }
      })
      setTeamMembers(updatedMembers)
    }
  }, [tasks])

  function extractTeamMembers(tasks: Task[]): TeamMember[] {
    return Array.from(new Set(tasks.map((task) => task.assignee))).map((assignee) => {
      const memberTasks = tasks.filter((task) => task.assignee === assignee)
      const completedTasks = memberTasks.filter((task) => task.status === "done").length
      const totalTasks = memberTasks.length
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

      const overdueTasks = memberTasks.filter(
        (task) => task.status !== "done" && new Date(task.deadline) < new Date(),
      ).length

      const highPriorityTasks = memberTasks.filter((task) => task.priority === "high").length
      const mediumPriorityTasks = memberTasks.filter((task) => task.priority === "medium").length
      const lowPriorityTasks = memberTasks.filter((task) => task.priority === "low").length

      return {
        name: assignee,
        avatar: memberTasks[0]?.assigneeAvatar || DEFAULT_AVATAR,
        totalTasks,
        completedTasks,
        inProgressTasks: memberTasks.filter((task) => task.status === "in-progress").length,
        todoTasks: memberTasks.filter((task) => task.status === "todo").length,
        completionRate,
        overdueTasks,
        highPriorityTasks,
        mediumPriorityTasks,
        lowPriorityTasks,
      }
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const openAddMemberModal = () => {
    setEditingMember(null)
    form.reset({ name: "", avatar: "" })
    setIsModalOpen(true)
  }

  const openEditMemberModal = (member: TeamMember) => {
    setEditingMember(member)
    form.reset({ name: member.name, avatar: member.avatar })
    setIsModalOpen(true)
  }

  const handleDeleteMember = (memberName: string) => {
    setTeamMembers(teamMembers.filter((member) => member.name !== memberName))
  }

  const handleSubmit = (data: { name: string; avatar: string }) => {
    if (editingMember) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.name === editingMember.name
            ? { ...member, name: data.name, avatar: data.avatar || DEFAULT_AVATAR }
            : member,
        ),
      )
    } else {
      const newMember: TeamMember = {
        name: data.name,
        avatar: data.avatar || DEFAULT_AVATAR,
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        todoTasks: 0,
        completionRate: 0,
        overdueTasks: 0,
        highPriorityTasks: 0,
        mediumPriorityTasks: 0,
        lowPriorityTasks: 0,
      }
      setTeamMembers([...teamMembers, newMember])
    }
    setIsModalOpen(false)
  }

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="pl-8 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={openAddMemberModal}
          className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeamMembers.map((member) => (
          <Card key={member.name} className="bg-slate-800/50 border-slate-700 group relative text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-slate-600">
                  <AvatarImage src={member.avatar || DEFAULT_AVATAR} />
                  <AvatarFallback className="bg-slate-700 text-white">{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base text-white">{member.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {member.totalTasks} {member.totalTasks === 1 ? "task" : "tasks"} assigned
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-white">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Completion rate</span>
                  <span className="text-white">{member.completionRate}%</span>
                </div>
                <Progress
                  value={member.completionRate}
                  className="h-1.5 bg-slate-700"
                  indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-lg font-semibold text-white">{member.todoTasks}</div>
                  <div className="text-xs text-slate-400">To Do</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-lg font-semibold text-white">{member.inProgressTasks}</div>
                  <div className="text-xs text-slate-400">In Progress</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-lg font-semibold text-white">{member.completedTasks}</div>
                  <div className="text-xs text-slate-400">Completed</div>
                </div>
              </div>

              <div className="flex gap-1 flex-wrap">
                {member.highPriorityTasks > 0 && (
                  <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                    {member.highPriorityTasks} High
                  </Badge>
                )}
                {member.mediumPriorityTasks > 0 && (
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                    {member.mediumPriorityTasks} Medium
                  </Badge>
                )}
                {member.lowPriorityTasks > 0 && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {member.lowPriorityTasks} Low
                  </Badge>
                )}
                {member.overdueTasks > 0 && (
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 ml-auto">
                    {member.overdueTasks} Overdue
                  </Badge>
                )}
              </div>
            </CardContent>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-slate-800/80 text-white hover:text-white hover:bg-slate-700"
                onClick={() => openEditMemberModal(member)}
              >
                <Edit className="h-3.5 w-3.5" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-slate-800/80 hover:text-rose-400 text-white hover:bg-slate-700"
                onClick={() => handleDeleteMember(member.name)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeamMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No team members found. Add a new team member to get started.</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter team member name"
                        {...field}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Avatar URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter avatar URL"
                        {...field}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-slate-700 bg-slate-800 text-black hover:bg-slate-800 hover:text-black hover:border-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white"
                >
                  {editingMember ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
