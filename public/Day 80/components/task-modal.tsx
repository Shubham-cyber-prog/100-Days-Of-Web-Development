"use client"

import { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { loadTeamMembers, type TeamMember } from "@/lib/storage"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Omit<Task, "id">) => void
  task: Task | null
}

const availableTags = ["bug", "feature", "design", "documentation", "testing", "research", "backend", "frontend"]

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  const form = useForm<Omit<Task, "id">>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      deadline: new Date().toISOString(),
      assignee: "",
      assigneeAvatar: "",
      progress: 0,
      comments: 0,
      tags: [],
      timeEstimate: 0,
    },
  })

  useEffect(() => {
    const members = loadTeamMembers()
    if (members && members.length > 0) {
      setTeamMembers(members)
    }
  }, [])

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        assignee: task.assignee,
        assigneeAvatar: task.assigneeAvatar || "",
        progress: task.progress || 0,
        comments: task.comments || 0,
        tags: task.tags || [],
        timeEstimate: task.timeEstimate || 0,
      })
      setSelectedTags(task.tags || [])
    } else {
      form.reset({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        deadline: new Date().toISOString(),
        assignee: "",
        assigneeAvatar: "",
        progress: 0,
        comments: 0,
        tags: [],
        timeEstimate: 0,
      })
      setSelectedTags([])
    }
  }, [task, form])

  const handleSubmit = (data: Omit<Task, "id">) => {
    const selectedMember = teamMembers.find((member) => member.name === data.assignee)
    onSave({
      ...data,
      tags: selectedTags,
      assigneeAvatar: selectedMember?.avatar || data.assigneeAvatar,
    })
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description"
                      {...field}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select status" className="text-white" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="todo" className="text-white focus:text-white focus:bg-slate-700">
                          To Do
                        </SelectItem>
                        <SelectItem value="in-progress" className="text-white focus:text-white focus:bg-slate-700">
                          In Progress
                        </SelectItem>
                        <SelectItem value="done" className="text-white focus:text-white focus:bg-slate-700">
                          Done
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select priority" className="text-white" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
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
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal bg-slate-800 border-slate-700 text-white",
                              !field.value && "text-slate-400",
                            )}
                          >
                            {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700 text-white" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => field.onChange(date?.toISOString() || new Date().toISOString())}
                          initialFocus
                          className="bg-slate-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                rules={{ required: "Assignee is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Assignee</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select assignee" className="text-white" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {teamMembers.map((member) => (
                          <SelectItem
                            key={member.name}
                            value={member.name}
                            className="text-white focus:text-white focus:bg-slate-700"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-slate-600">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-slate-700 text-white">
                                  {getInitials(member.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Progress ({field.value}%)</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={100}
                      step={5}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeEstimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Time Estimate (hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.5}
                      placeholder="Enter time estimate"
                      {...field}
                      className="bg-slate-800 border-slate-700 text-white"
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-white">Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer hover:bg-slate-700 text-white",
                      selectedTags.includes(tag)
                        ? "bg-violet-500 hover:bg-violet-600 text-white"
                        : "bg-transparent text-slate-300 border-slate-600",
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slate-700 bg-slate-800 text-black hover:bg-slate-800 hover:text-black hover:border-slate-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white"
              >
                {task ? "Update Task" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
