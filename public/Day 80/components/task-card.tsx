"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Clock, Edit, MessageSquare, Trash2 } from "lucide-react"

import type { Task } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isOverdue = new Date(task.deadline) < new Date()
  const daysLeft = Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    high: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Calculate progress percentage
  const progress = task.progress || (task.status === "done" ? 100 : task.status === "in-progress" ? 50 : 0)

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab border-slate-700/50 bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-violet-900/20 transition-all group",
        isDragging && "opacity-50 shadow-xl rotate-3 border-violet-500/50",
      )}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-white">{task.title}</h3>
          <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>
        </div>

        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{task.description}</p>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-slate-700/50 text-xs border-slate-600 text-slate-300">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="text-slate-400">Progress</span>
            <span className="text-white">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-1.5 bg-slate-700"
            indicatorClassName={
              progress === 100
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
            }
          />
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t border-slate-700/50 flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-6 w-6 border border-slate-600">
                  <AvatarImage src={task.assigneeAvatar || "/placeholder.svg"} alt={task.assignee} />
                  <AvatarFallback className="text-xs bg-slate-700 text-white">
                    {getInitials(task.assignee)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 border-slate-700 text-white">
              <p className="text-xs text-white">Assigned to: {task.assignee}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs text-slate-400 gap-1">
            <Clock className="h-3 w-3" />
            <span className={cn(isOverdue ? "text-rose-400" : daysLeft <= 2 ? "text-amber-400" : "text-slate-400")}>
              {isOverdue ? `${Math.abs(daysLeft)}d late` : `${daysLeft}d left`}
            </span>
          </div>

          {task.comments && (
            <div className="flex items-center text-xs text-slate-400 gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments}</span>
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 bg-slate-800/80 text-white hover:text-white hover:bg-slate-700"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            <Edit className="h-3.5 w-3.5" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 bg-slate-800/80 hover:text-rose-400 text-white hover:bg-slate-700"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
