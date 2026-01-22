export interface LogEntry {
  level: "info" | "error" | "warn" | "debug";
  message: string;
  context?: Record<string, any>;
}
