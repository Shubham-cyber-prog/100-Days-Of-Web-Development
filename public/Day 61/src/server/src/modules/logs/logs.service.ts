import { LogsRepository } from "./logs.repository";
import { LogEntry } from "./logs.types";

export class LogsService {
  constructor(private logsRepository: LogsRepository) {}

  async getLogs(): Promise<any> {
    return this.logsRepository.getLogs();
  }

  async getLogById(id: string): Promise<any> {
    return this.logsRepository.getLogById(id);
  }

  async getLogByLevel(level: string): Promise<any> {
    return this.logsRepository.getLogsByLevel(level);
  }

  async deleteLog(id: string): Promise<any> {
    return this.logsRepository.deleteLog(id);
  }

  async clearLogs(): Promise<any> {
    return this.logsRepository.clearLogs();
  }

  async log(entry: LogEntry): Promise<void> {
    console.log(
      `[${entry.level.toUpperCase()}] ${entry.message}`,
      entry.context || ""
    );

    await this.logsRepository.createLog({
      level: entry.level,
      message: entry.message,
      context: entry.context,
    });
  }

  async info(message: string, context?: Record<string, any>): Promise<void> {
    await this.log({ level: "info", message, context });
  }

  async error(message: string, context?: Record<string, any>): Promise<void> {
    await this.log({ level: "error", message, context });
  }

  async warn(message: string, context?: Record<string, any>): Promise<void> {
    await this.log({ level: "warn", message, context });
  }

  async debug(message: string, context?: Record<string, any>): Promise<void> {
    await this.log({ level: "debug", message, context });
  }
}
