export type ThreadStatus = "ready" | "running" | "waiting" | "completed";

export interface Thread {
  id: number;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  priority?: number;
  status: ThreadStatus;
  startTime?: number;
  completionTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
}

export type Algorithm = "FCFS" | "SJF" | "RR" | "Priority";

export interface GanttBlock {
  threadId: number;
  startTime: number;
  endTime: number;
}

export interface LogEntry {
  id: number;
  timestamp: number;
  type: "added" | "started" | "preempted" | "completed";
  threadId: number;
  message: string;
}
