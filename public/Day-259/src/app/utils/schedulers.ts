import { Thread, Algorithm } from "../types/thread";

export interface SchedulerState {
  threads: Thread[];
  currentTime: number;
  currentThread: Thread | null;
  timeQuantum: number;
  quantumRemaining: number;
}

export function getNextThread(
  threads: Thread[],
  algorithm: Algorithm,
  currentTime: number,
  currentThread: Thread | null
): Thread | null {
  const readyThreads = threads.filter(
    (t) => t.status === "ready" && t.arrivalTime <= currentTime
  );

  if (readyThreads.length === 0) return null;

  switch (algorithm) {
    case "FCFS":
      // First Come First Serve - earliest arrival time
      return readyThreads.reduce((prev, curr) =>
        prev.arrivalTime < curr.arrivalTime ? prev : curr
      );

    case "SJF":
      // Shortest Job First - shortest remaining time
      return readyThreads.reduce((prev, curr) =>
        prev.remainingTime < curr.remainingTime ? prev : curr
      );

    case "Priority":
      // Priority Scheduling - lowest priority number (higher priority)
      return readyThreads.reduce((prev, curr) =>
        (prev.priority || 10) < (curr.priority || 10) ? prev : curr
      );

    case "RR":
      // Round Robin - handled in main simulation loop
      if (currentThread && currentThread.status === "ready") {
        return currentThread;
      }
      return readyThreads[0];

    default:
      return readyThreads[0];
  }
}

export function calculateMetrics(thread: Thread, completionTime: number): Thread {
  const turnaroundTime = completionTime - thread.arrivalTime;
  const waitingTime = turnaroundTime - thread.burstTime;

  return {
    ...thread,
    completionTime,
    turnaroundTime,
    waitingTime,
  };
}
