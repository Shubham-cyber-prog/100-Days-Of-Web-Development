import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { ServiceNode } from '../components/ServiceNode';
import { TrafficFlow } from '../components/TrafficFlow';
import { ServiceDetailPanel } from '../components/ServiceDetailPanel';
import { LogsViewer } from '../components/LogsViewer';
import { StatusCard } from '../components/StatusCard';

export default function ArchitectureOverview() {
  const {
    services,
    selectedService,
    setSelectedService,
    isRunning,
    addLog,
    activateTraffic,
    deactivateTraffic,
    trafficFlows,
  } = useSimulationStore();

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        // Simulate traffic flows
        const randomService = services[Math.floor(Math.random() * services.length)];
        if (randomService && randomService.dependencies.length > 0) {
          const randomDep =
            randomService.dependencies[
              Math.floor(Math.random() * randomService.dependencies.length)
            ];
          const depService = services.find((s) => s.id === randomDep);
          
          if (depService) {
            activateTraffic(randomService.id, depService.id);
            
            setTimeout(() => {
              deactivateTraffic(randomService.id, depService.id);
            }, 2000);
          }
        }

        // Generate random logs
        if (Math.random() > 0.7) {
          const service = services[Math.floor(Math.random() * services.length)];
          const levels: ('info' | 'error' | 'warning')[] = ['info', 'info', 'info', 'warning', 'error'];
          const level = levels[Math.floor(Math.random() * levels.length)];
          
          const messages = {
            info: [
              'Request processed successfully',
              'Connection established',
              'Health check passed',
              'Cache hit',
            ],
            warning: [
              'High memory usage detected',
              'Slow query detected',
              'Connection pool exhausted',
            ],
            error: [
              'Connection timeout',
              'Database query failed',
              'Authentication failed',
            ],
          };

          const messageList = messages[level];
          const message = messageList[Math.floor(Math.random() * messageList.length)];

          addLog({
            id: Date.now().toString() + Math.random(),
            timestamp: new Date(),
            service: service.name,
            level,
            message,
          });
        }
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, services, addLog, activateTraffic, deactivateTraffic]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Main diagram area */}
        <div className="flex-1 overflow-auto bg-gray-900 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Architecture Overview
            </h2>
            <p className="text-gray-400">
              Interactive system diagram showing microservices communication
            </p>
          </div>

          {/* Service status cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {services.slice(0, 3).map((service) => (
              <StatusCard
                key={service.id}
                service={service}
                onClick={setSelectedService}
              />
            ))}
          </div>

          {/* Interactive diagram */}
          <div className="relative bg-gray-950 border border-gray-800 rounded-xl p-8 min-h-[600px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Background grid */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Traffic flows */}
            {trafficFlows.map((flow, index) => {
              const fromService = services.find((s) => s.id === flow.from);
              const toService = services.find((s) => s.id === flow.to);
              if (fromService && toService) {
                return (
                  <TrafficFlow
                    key={`${flow.from}-${flow.to}-${index}`}
                    from={fromService}
                    to={toService}
                  />
                );
              }
              return null;
            })}

            {/* Service nodes */}
            {services.map((service) => (
              <ServiceNode
                key={service.id}
                service={service}
                onClick={setSelectedService}
                isSelected={selectedService?.id === service.id}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar - Service details */}
        {selectedService && (
          <ServiceDetailPanel
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </div>

      {/* Bottom panel - Logs */}
      <div className="h-64">
        <LogsViewer />
      </div>
    </div>
  );
}
