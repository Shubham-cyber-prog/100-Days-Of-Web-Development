export type Protocol = 'TCP' | 'UDP' | 'HTTP' | 'DNS' | 'ICMP';

export interface Packet {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: Protocol;
  port: number;
  size: number;
  status: 'success' | 'warning' | 'error';
  data?: {
    ethernet?: Record<string, string>;
    ip?: Record<string, string>;
    transport?: Record<string, string>;
    application?: Record<string, string>;
    raw?: string;
  };
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'computer' | 'router' | 'server' | 'cloud';
  x: number;
  y: number;
  ip?: string;
}

export interface PacketFlow {
  id: string;
  from: string;
  to: string;
  protocol: Protocol;
  progress: number;
}

export type CaptureStatus = 'idle' | 'capturing' | 'paused';
