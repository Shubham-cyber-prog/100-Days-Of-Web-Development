export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  deadline: string
  assignee: string
  assigneeAvatar?: string
  progress?: number
  comments?: number
  tags?: string[]
  timeEstimate?: number
}
