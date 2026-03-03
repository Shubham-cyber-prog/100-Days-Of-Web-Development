export interface Pod {
  id: string;
  name: string;
  namespace: string;
  status: "Running" | "Pending" | "Failed" | "Succeeded";
  node: string;
  containers: number;
  restarts: number;
  age: string;
  cpu: number;
  memory: number;
  labels: Record<string, string>;
}

export interface Node {
  id: string;
  name: string;
  status: "Ready" | "NotReady";
  role: string;
  version: string;
  cpu: number;
  memory: number;
  pods: number;
  age: string;
}

export interface Service {
  id: string;
  name: string;
  namespace: string;
  type: string;
  clusterIP: string;
  externalIP: string;
  ports: string;
  age: string;
}

export interface Deployment {
  id: string;
  name: string;
  namespace: string;
  ready: string;
  upToDate: number;
  available: number;
  age: string;
}

export const mockNodes: Node[] = [
  {
    id: "node-1",
    name: "control-plane",
    status: "Ready",
    role: "control-plane",
    version: "v1.28.0",
    cpu: 45,
    memory: 62,
    pods: 12,
    age: "45d"
  },
  {
    id: "node-2",
    name: "worker-node-01",
    status: "Ready",
    role: "worker",
    version: "v1.28.0",
    cpu: 68,
    memory: 71,
    pods: 24,
    age: "45d"
  },
  {
    id: "node-3",
    name: "worker-node-02",
    status: "Ready",
    role: "worker",
    version: "v1.28.0",
    cpu: 52,
    memory: 58,
    pods: 18,
    age: "44d"
  },
  {
    id: "node-4",
    name: "worker-node-03",
    status: "Ready",
    role: "worker",
    version: "v1.28.0",
    cpu: 39,
    memory: 48,
    pods: 15,
    age: "42d"
  }
];

export const mockPods: Pod[] = [
  {
    id: "pod-1",
    name: "nginx-deployment-7d8f6dd4c8-9xk2p",
    namespace: "default",
    status: "Running",
    node: "worker-node-01",
    containers: 1,
    restarts: 0,
    age: "5d",
    cpu: 12,
    memory: 45,
    labels: { app: "nginx", version: "1.21" }
  },
  {
    id: "pod-2",
    name: "redis-master-0",
    namespace: "default",
    status: "Running",
    node: "worker-node-02",
    containers: 1,
    restarts: 1,
    age: "12d",
    cpu: 8,
    memory: 68,
    labels: { app: "redis", role: "master" }
  },
  {
    id: "pod-3",
    name: "api-server-6c8f9d7b5a-h4t9w",
    namespace: "production",
    status: "Running",
    node: "worker-node-01",
    containers: 2,
    restarts: 0,
    age: "3d",
    cpu: 34,
    memory: 52,
    labels: { app: "api", tier: "backend" }
  },
  {
    id: "pod-4",
    name: "frontend-deployment-5d6f7c8b9a-p2m5n",
    namespace: "production",
    status: "Running",
    node: "worker-node-03",
    containers: 1,
    restarts: 2,
    age: "8d",
    cpu: 18,
    memory: 38,
    labels: { app: "frontend", tier: "web" }
  },
  {
    id: "pod-5",
    name: "database-backup-job-27859600-x7k4p",
    namespace: "production",
    status: "Succeeded",
    node: "worker-node-02",
    containers: 1,
    restarts: 0,
    age: "2h",
    cpu: 0,
    memory: 0,
    labels: { app: "backup", type: "job" }
  },
  {
    id: "pod-6",
    name: "monitoring-prometheus-0",
    namespace: "monitoring",
    status: "Running",
    node: "worker-node-01",
    containers: 3,
    restarts: 0,
    age: "30d",
    cpu: 42,
    memory: 76,
    labels: { app: "prometheus", component: "server" }
  },
  {
    id: "pod-7",
    name: "logging-elasticsearch-0",
    namespace: "logging",
    status: "Pending",
    node: "worker-node-03",
    containers: 0,
    restarts: 5,
    age: "1h",
    cpu: 0,
    memory: 0,
    labels: { app: "elasticsearch", role: "data" }
  },
  {
    id: "pod-8",
    name: "cache-redis-replica-1",
    namespace: "default",
    status: "Failed",
    node: "worker-node-02",
    containers: 1,
    restarts: 10,
    age: "4d",
    cpu: 0,
    memory: 0,
    labels: { app: "redis", role: "replica" }
  }
];

export const mockServices: Service[] = [
  {
    id: "svc-1",
    name: "nginx-service",
    namespace: "default",
    type: "LoadBalancer",
    clusterIP: "10.96.0.45",
    externalIP: "34.123.45.67",
    ports: "80:30080/TCP",
    age: "5d"
  },
  {
    id: "svc-2",
    name: "redis-master",
    namespace: "default",
    type: "ClusterIP",
    clusterIP: "10.96.1.23",
    externalIP: "<none>",
    ports: "6379/TCP",
    age: "12d"
  },
  {
    id: "svc-3",
    name: "api-service",
    namespace: "production",
    type: "ClusterIP",
    clusterIP: "10.96.2.89",
    externalIP: "<none>",
    ports: "8080/TCP",
    age: "3d"
  },
  {
    id: "svc-4",
    name: "frontend",
    namespace: "production",
    type: "NodePort",
    clusterIP: "10.96.3.12",
    externalIP: "<none>",
    ports: "3000:32000/TCP",
    age: "8d"
  }
];

export const mockDeployments: Deployment[] = [
  {
    id: "deploy-1",
    name: "nginx-deployment",
    namespace: "default",
    ready: "3/3",
    upToDate: 3,
    available: 3,
    age: "5d"
  },
  {
    id: "deploy-2",
    name: "api-server",
    namespace: "production",
    ready: "5/5",
    upToDate: 5,
    available: 5,
    age: "3d"
  },
  {
    id: "deploy-3",
    name: "frontend-deployment",
    namespace: "production",
    ready: "2/3",
    upToDate: 2,
    available: 2,
    age: "8d"
  }
];

export const mockLogs = [
  { timestamp: "2026-03-03 14:23:45", level: "INFO", message: "Starting nginx server on port 80" },
  { timestamp: "2026-03-03 14:23:46", level: "INFO", message: "Server successfully started" },
  { timestamp: "2026-03-03 14:24:12", level: "WARN", message: "High memory usage detected: 76%" },
  { timestamp: "2026-03-03 14:25:03", level: "INFO", message: "Health check passed" },
  { timestamp: "2026-03-03 14:26:45", level: "ERROR", message: "Failed to connect to database: connection timeout" },
  { timestamp: "2026-03-03 14:26:46", level: "INFO", message: "Retrying database connection..." },
  { timestamp: "2026-03-03 14:26:48", level: "INFO", message: "Database connection established" },
  { timestamp: "2026-03-03 14:28:12", level: "INFO", message: "Processing request: GET /api/users" },
];
