import { create } from 'zustand';
import { Service, TrafficFlow, LogEntry, MetricData, ServiceStatus, Environment } from '../types/service';

interface SimulationState {
  services: Service[];
  trafficFlows: TrafficFlow[];
  logs: LogEntry[];
  metrics: MetricData[];
  selectedService: Service | null;
  isRunning: boolean;
  speed: number;
  environment: Environment;
  setServices: (services: Service[]) => void;
  updateServiceStatus: (id: string, status: ServiceStatus) => void;
  setSelectedService: (service: Service | null) => void;
  addLog: (log: LogEntry) => void;
  addMetric: (metric: MetricData) => void;
  toggleSimulation: () => void;
  setSpeed: (speed: number) => void;
  setEnvironment: (env: Environment) => void;
  injectFailure: () => void;
  reset: () => void;
  activateTraffic: (from: string, to: string) => void;
  deactivateTraffic: (from: string, to: string) => void;
}

const initialServices: Service[] = [
  {
    id: 'client',
    name: 'Client / Frontend',
    status: 'healthy',
    cpu: 25,
    memory: 512,
    requests: 1200,
    errorRate: 0.1,
    responseTime: 45,
    instances: 1,
    endpoint: 'https://app.example.com',
    dependencies: ['api-gateway'],
    position: { x: 100, y: 200 },
    type: 'client',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'healthy',
    cpu: 45,
    memory: 1024,
    requests: 5000,
    errorRate: 0.2,
    responseTime: 12,
    instances: 3,
    endpoint: 'https://api.example.com',
    dependencies: ['user-service', 'order-service', 'payment-service'],
    position: { x: 350, y: 200 },
    type: 'gateway',
  },
  {
    id: 'user-service',
    name: 'User Service',
    status: 'healthy',
    cpu: 60,
    memory: 2048,
    requests: 2000,
    errorRate: 0.3,
    responseTime: 85,
    instances: 4,
    endpoint: '/api/users',
    dependencies: ['user-db', 'message-queue'],
    position: { x: 600, y: 100 },
    type: 'service',
  },
  {
    id: 'order-service',
    name: 'Order Service',
    status: 'healthy',
    cpu: 55,
    memory: 1536,
    requests: 1500,
    errorRate: 0.4,
    responseTime: 120,
    instances: 3,
    endpoint: '/api/orders',
    dependencies: ['order-db', 'message-queue', 'payment-service'],
    position: { x: 600, y: 250 },
    type: 'service',
  },
  {
    id: 'payment-service',
    name: 'Payment Service',
    status: 'healthy',
    cpu: 40,
    memory: 1024,
    requests: 800,
    errorRate: 0.1,
    responseTime: 200,
    instances: 5,
    endpoint: '/api/payments',
    dependencies: ['payment-db', 'message-queue'],
    position: { x: 600, y: 400 },
    type: 'service',
  },
  {
    id: 'user-db',
    name: 'User Database',
    status: 'healthy',
    cpu: 30,
    memory: 4096,
    requests: 2500,
    errorRate: 0.05,
    responseTime: 15,
    instances: 2,
    endpoint: 'postgres://users-db',
    dependencies: [],
    position: { x: 900, y: 100 },
    type: 'database',
  },
  {
    id: 'order-db',
    name: 'Order Database',
    status: 'healthy',
    cpu: 35,
    memory: 4096,
    requests: 2000,
    errorRate: 0.08,
    responseTime: 18,
    instances: 2,
    endpoint: 'postgres://orders-db',
    dependencies: [],
    position: { x: 900, y: 250 },
    type: 'database',
  },
  {
    id: 'payment-db',
    name: 'Payment Database',
    status: 'healthy',
    cpu: 25,
    memory: 2048,
    requests: 1000,
    errorRate: 0.02,
    responseTime: 12,
    instances: 3,
    endpoint: 'postgres://payments-db',
    dependencies: [],
    position: { x: 900, y: 400 },
    type: 'database',
  },
  {
    id: 'message-queue',
    name: 'Message Queue',
    status: 'healthy',
    cpu: 20,
    memory: 1024,
    requests: 5000,
    errorRate: 0.1,
    responseTime: 5,
    instances: 3,
    endpoint: 'rabbitmq://queue',
    dependencies: [],
    position: { x: 350, y: 450 },
    type: 'queue',
  },
];

export const useSimulationStore = create<SimulationState>((set, get) => ({
  services: initialServices,
  trafficFlows: [],
  logs: [],
  metrics: [],
  selectedService: null,
  isRunning: false,
  speed: 1,
  environment: 'Production',
  
  setServices: (services) => set({ services }),
  
  updateServiceStatus: (id, status) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, status } : s
      ),
    })),
  
  setSelectedService: (service) => set({ selectedService: service }),
  
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs].slice(0, 100),
    })),
  
  addMetric: (metric) =>
    set((state) => ({
      metrics: [...state.metrics, metric].slice(-50),
    })),
  
  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),
  
  setSpeed: (speed) => set({ speed }),
  
  setEnvironment: (environment) => set({ environment }),
  
  injectFailure: () => {
    const services = get().services;
    const randomService = services[Math.floor(Math.random() * services.length)];
    if (randomService) {
      get().updateServiceStatus(randomService.id, 'down');
      get().addLog({
        id: Date.now().toString(),
        timestamp: new Date(),
        service: randomService.name,
        level: 'error',
        message: `Service ${randomService.name} has failed - Connection timeout`,
      });
    }
  },
  
  reset: () => {
    set({
      services: initialServices.map(s => ({ ...s, status: 'healthy' })),
      logs: [],
      metrics: [],
      isRunning: false,
      selectedService: null,
      trafficFlows: [],
    });
  },
  
  activateTraffic: (from, to) =>
    set((state) => ({
      trafficFlows: [...state.trafficFlows, { from, to, active: true }],
    })),
  
  deactivateTraffic: (from, to) =>
    set((state) => ({
      trafficFlows: state.trafficFlows.filter(
        (f) => !(f.from === from && f.to === to)
      ),
    })),
}));
