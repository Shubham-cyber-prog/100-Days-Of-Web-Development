export type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'overloaded';
export type Environment = 'Local' | 'Staging' | 'Production';

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  cpu: number;
  memory: number;
  requests: number;
  errorRate: number;
  responseTime: number;
  instances: number;
  endpoint: string;
  dependencies: string[];
  position: { x: number; y: number };
  type: 'service' | 'gateway' | 'database' | 'queue' | 'client';
}

export interface TrafficFlow {
  from: string;
  to: string;
  active: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  service: string;
  level: 'info' | 'error' | 'warning';
  message: string;
}

export interface MetricData {
  timestamp: number;
  rps: number;
  latency: number;
  errorRate: number;
}
