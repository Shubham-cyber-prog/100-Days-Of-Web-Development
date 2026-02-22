import type { Task } from "./types"

const TASKS_STORAGE_KEY = "pm_board_tasks"
const TEAM_MEMBERS_STORAGE_KEY = "pm_board_team_members"

export interface TeamMember {
  name: string
  avatar: string
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  todoTasks: number
  completionRate: number
  overdueTasks: number
  highPriorityTasks: number
  mediumPriorityTasks: number
  lowPriorityTasks: number
}

// Tasks storage functions
export const loadTasks = (): Task[] | null => {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error)
    return null
  }
}

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

// Team members storage functions
export const loadTeamMembers = (): TeamMember[] | null => {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading team members from localStorage:", error)
    return null
  }
}

export const saveTeamMembers = (teamMembers: TeamMember[]): void => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(teamMembers))
  } catch (error) {
    console.error("Error saving team members to localStorage:", error)
  }
}
