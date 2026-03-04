export type Protocol = "TCP" | "UDP" | "ICMP" | "HTTP" | "HTTPS";
export type Action = "allow" | "deny";
export type PacketStatus = "allowed" | "blocked" | "pending";

export interface FirewallRule {
  id: string;
  sourceIP: string;
  destinationIP: string;
  port: string;
  protocol: Protocol;
  action: Action;
  priority: number;
  enabled: boolean;
}

export interface Packet {
  id: string;
  sourceIP: string;
  destinationIP: string;
  port: number;
  protocol: Protocol;
  status: PacketStatus;
  matchedRule?: string;
  timestamp: number;
  position: number; // 0-100 for animation
}

export interface LogEntry {
  id: string;
  timestamp: number;
  type: "received" | "matched" | "blocked" | "forwarded";
  message: string;
  packetId?: string;
  ruleId?: string;
}

export interface SimulationState {
  isRunning: boolean;
  speed: number; // 1-10
  packets: Packet[];
  logs: LogEntry[];
}
